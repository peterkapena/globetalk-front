import { Sheet } from '@mui/joy';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Socket, io } from "socket.io-client";
import Video from '../components/Video';
import { useUser } from '../redux/user-slice';
import { useParams } from 'react-router-dom';
import AlertDialogModal, { AlertProps } from '../components/Alert';
import { MediaControlPanel } from '../components/MediaControlPanel';
import { Language } from '../helpers/i18n';
import { useTranslation } from 'react-i18next';
import { updateLanguage } from '../redux/meeting-slice';
import { useAppDispatch } from '../redux/hooks';

// https://github.com/millo-L/Typescript-ReactJS-WebRTC-1-N-P2P

const alerts: AlertProps[] = [
    {
        message: "The device is currently in use or not accessible",
        type: "error",
        onClose: () => { },
        onYes: () => { }
    },
    {
        message: "An error occurred",
        type: "error",
        onClose: () => { },
        onYes: () => { }
    }
]

type WebRTCUser = {
    id: string;
    email: string;
    stream: MediaStream;
    language: string;
    muted?: boolean
};

const pc_config = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun.l.google.com:5349" },
        { urls: "stun:stun1.l.google.com:3478" },
        { urls: "stun:stun1.l.google.com:5349" },
        { urls: "stun:stun2.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:5349" },
        { urls: "stun:stun3.l.google.com:3478" },
        { urls: "stun:stun3.l.google.com:5349" },
        { urls: "stun:stun4.l.google.com:19302" },
        { urls: "stun:stun4.l.google.com:5349" }
    ],
};

const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_ENDPOINT;

const Meeting = () => {
    const user = useUser()
    let { roomId } = useParams();
    const socketRef = useRef<Socket>()
    const localStreamRef = useRef<MediaStream>();
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
    const [alert, setAlert] = useState<AlertProps>()
    const [users, setUsers] = useState<WebRTCUser[]>([]);
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isCaptionsEnabled, setIsCaptionsEnabled] = useState(true);
    const [_, setRemoteAudioTrack] = useState<{ socketId: string, audioTrack: MediaStreamTrack, sourceLanguage: string, targetLanguage: string }>()
    const { i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const currentLanguage = i18n.language;

    function changeLanguage({ script }: Language) {
        dispatch(updateLanguage(script));
        socketRef.current?.emit("updateLanguage", script)
    }

    const leaveCall = useCallback(() => {
        // Notify other users
        if (socketRef.current) {
            socketRef.current.disconnect();
        }

        // Stop all local media tracks
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => track.stop());
        }

        // Close all PeerConnections
        Object.values(pcsRef.current).forEach(pc => {
            pc.close();
        });
        pcsRef.current = {};

        // Optionally, manage state to reflect that the user has left the call
        setUsers([]);
    }, []);

    const toggleAudio = useCallback(() => {
        if (localStreamRef.current) {
            const audioTracks = localStreamRef.current.getAudioTracks();
            audioTracks.forEach(track => {
                track.enabled = !track.enabled;
            });

            const muted = !isAudioMuted

            setIsAudioMuted(muted);

            socketRef.current?.emit('muted', muted)
        }
    }, [isAudioMuted]);

    const toggleCaptions = useCallback(() => {
        setIsCaptionsEnabled(!isCaptionsEnabled)
    }, [isCaptionsEnabled]);

    const toggleVideo = useCallback(() => {
        if (localStreamRef.current) {
            const videoTracks = localStreamRef.current.getVideoTracks();
            videoTracks.forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsVideoEnabled(!isVideoEnabled);
        }
    }, [isVideoEnabled]);

    const muteUser = useCallback((id: string) => {
        socketRef.current?.emit('mute_user', id)
    }, []);

    const getLocalStream = useCallback(async () => {
        try {
            const localStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: {
                    width: 240,
                    height: 240,
                },
            });
            localStreamRef.current = localStream;
            if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
            if (!socketRef.current) return;

            const current_id = sessionStorage.getItem("id")
            if (current_id !== socketRef.current.id) {
                socketRef.current.emit('join_room', {
                    room: roomId,
                    email: user.email,
                    language: currentLanguage,
                });
                sessionStorage.setItem("id", String(socketRef.current.id));
            }
        } catch (e) {
            if (e instanceof DOMException) {
                switch (e.name) {
                    case 'NotReadableError':
                        setAlert(alerts[0])
                        // console.log(alerts[0].message);
                        break;
                    default:
                        setAlert(alerts[alerts.length - 1])
                        console.log('An error occurred: ', e.message);
                        break;
                }
            } else {
                // Handle non-DOMException errors
                console.log('An unexpected error occurred: ', e);
            }
        }
    }, [roomId, user.email]);

    const createPeerConnection = useCallback((socketId: string, email: string, language: string) => {
        try {
            const pc = new RTCPeerConnection(pc_config);

            pc.onicecandidate = (e) => {
                if (!(socketRef.current && e.candidate)) return;
                // console.log('onicecandidate');
                socketRef.current.emit('candidate', {
                    candidate: e.candidate,
                    candidateSendID: socketRef.current.id,
                    candidateReceiveID: socketId,
                });
            };

            pc.oniceconnectionstatechange = (e) => {
                console.log(e);
            };

            pc.ontrack = (e) => {
                // console.log(e)
                console.log('ontrack success');
                if (e.track.kind === 'audio') {
                    setRemoteAudioTrack({ socketId, audioTrack: e.track, sourceLanguage: language, targetLanguage: currentLanguage })
                }
                setUsers((oldUsers) =>
                    oldUsers
                        .filter((user) => user.id !== socketId)
                        .concat({
                            id: socketId,
                            email,
                            stream: e.streams[0],
                            language
                        }),
                );
            };

            if (localStreamRef.current) {
                // console.log('localstream add');
                localStreamRef.current.getTracks().forEach((track) => {
                    if (!localStreamRef.current) return;
                    pc.addTrack(track, localStreamRef.current);
                });
            } else {
                // console.log('no local stream');
            }

            return pc;
        } catch (e) {
            console.error(e);
            return undefined;
        }
    }, []);

    useEffect(() => {
        if (!SOCKET_SERVER_URL) return;
        socketRef.current = io(SOCKET_SERVER_URL);

        if (socketRef.current) {
            console.log(socketRef.current)
            getLocalStream();
            socketRef.current.on('all_users', (allUsers: [{ id: string; email: string, language: string }]) => {
                allUsers.forEach(async (user) => {
                    if (!localStreamRef.current) return;
                    const pc = createPeerConnection(user.id, user.email, user.language);
                    if (!(pc && socketRef.current)) return;
                    pcsRef.current = { ...pcsRef.current, [user.id]: pc };
                    try {
                        const localSdp = await pc.createOffer({
                            offerToReceiveAudio: true,
                            offerToReceiveVideo: true,
                        });
                        // console.log('create offer success');
                        await pc.setLocalDescription(new RTCSessionDescription(localSdp));
                        socketRef.current.emit('offer', {
                            sdp: localSdp,
                            offerSendID: socketRef.current.id,
                            offerSendEmail: user.email,
                            offerReceiveID: user.id,
                            offerLanguage: currentLanguage
                        });
                    } catch (e) {
                        console.error(e);
                    }
                });
            });

            socketRef.current.on(
                'getOffer',
                async (data: {
                    sdp: RTCSessionDescription;
                    offerSendID: string;
                    offerSendEmail: string;
                    offerLanguage: string
                }) => {
                    const { sdp, offerSendID, offerSendEmail, offerLanguage } = data;
                    // console.log('get offer');
                    if (!localStreamRef.current) return;
                    const pc = createPeerConnection(offerSendID, offerSendEmail, offerLanguage);
                    if (!(pc && socketRef.current)) return;
                    pcsRef.current = { ...pcsRef.current, [offerSendID]: pc };
                    try {
                        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
                        // console.log('answer set remote description success');
                        const localSdp = await pc.createAnswer({
                            offerToReceiveVideo: true,
                            offerToReceiveAudio: true,
                        });
                        await pc.setLocalDescription(new RTCSessionDescription(localSdp));
                        socketRef.current.emit('answer', {
                            sdp: localSdp,
                            answerSendID: socketRef.current.id,
                            answerReceiveID: offerSendID,
                        });
                    } catch (e) {
                        console.error(e);
                    }
                },
            );

            socketRef.current.on(
                'getAnswer',
                (data: { sdp: RTCSessionDescription; answerSendID: string; }) => {
                    const { sdp, answerSendID } = data;
                    // console.log('get answer');
                    const pc: RTCPeerConnection = pcsRef.current[answerSendID];
                    if (!pc) return;
                    // Check if the PeerConnection is in a non-stable state, indicating it's ready for a remote description
                    if (pc.signalingState !== "stable") {
                        // console.log('Setting remote description on:', answerSendID);
                        pc.setRemoteDescription(new RTCSessionDescription(sdp))
                            .then(() => console.log("Remote description set successfully for:", answerSendID))
                            .catch((error) => console.error(`pc.signalingStateError"${pc.signalingState} setting remote description:`, error));
                    } else {
                        // If we are in a stable state, this might not be the right time to set a remote description
                        // This could indicate an issue with the signaling logic or might require renegotiation handling.
                        console.warn("Attempted to set remote description in a stable state for:", answerSendID);
                    }
                }
            );
            socketRef.current.on(
                'getCandidate',
                async (data: { candidate: RTCIceCandidateInit; candidateSendID: string }) => {
                    // console.log('get candidate');
                    const pc: RTCPeerConnection = pcsRef.current[data.candidateSendID];
                    if (!pc) return;
                    await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
                    // console.log('candidate add success');
                },
            );

            socketRef.current.on('user_exit', (data: { id: string }) => {
                if (!pcsRef.current[data.id]) return;
                pcsRef.current[data.id].close();
                delete pcsRef.current[data.id];
                setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
            });

            socketRef.current.on('muted', (data) => {
                const { muted, id } = data
                setUsers((oldUsers) => oldUsers.map(user => user.id === id ? { ...user, muted } : user),);
            })

            socketRef.current.on('mute_user', toggleAudio)
          
            socketRef.current.on('getLanguage', ({ language, id }: { language: string, id: string }) => {
                setUsers((oldUsers) => oldUsers.map(user => user.id === id ? { ...user, language } : user),);
            })
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
            users.forEach((user) => {
                if (!pcsRef.current[user.id]) return;
                pcsRef.current[user.id].close();
                delete pcsRef.current[user.id];
            });
        };
    }, [createPeerConnection, getLocalStream]);

    useEffect(() => {
        return () => leaveCall()
    }, [leaveCall]);

    return (
        <Sheet sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
        }}>
            {/* {remoteAudioTrack && <AudioProcessor {...remoteAudioTrack} ></AudioProcessor>} */}
            <Video toggleAudio={toggleAudio} email={user.email || "..."} videoRef={localVideoRef} muted={isAudioMuted} isLocalStream={true} />
            {users.map((user, index) => {
                console.log(!user.stream.getAudioTracks().some(t => t.enabled));
                return (
                    user.stream.active &&
                    <Video key={index} email={user.email} isLocalStream={false}
                        stream={user.stream} muted={Boolean(user.muted)} toggleAudio={() => muteUser(user.id)}// Check if any audio track is enabled
                    />
                )
            })}

            <MediaControlPanel toggleAudio={toggleAudio} toggleVideo={toggleVideo} isAudioMuted={isAudioMuted} leaveCall={leaveCall} setTranslationLanguage={changeLanguage}
                isVideoEnabled={isVideoEnabled} isCaptionsEnabled={isCaptionsEnabled} toggleCaptions={toggleCaptions} />
            {alert && <AlertDialogModal message={alert.message} onClose={alert.onClose} onYes={alert.onYes} type={alert.type}></AlertDialogModal>}
        </Sheet >
    )
}

export default Meeting
