import { AspectRatio, Button, Card, Grid, Sheet, Skeleton, Typography } from '@mui/joy';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Socket, io } from "socket.io-client";
import { useUser } from '../redux/user-slice';
import AlertDialogModal, { AlertProps } from '../components/Alert';
import Video from '../components/Video';

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
};
const pc_config = {
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:19302',
        },
    ],
};

const Meeting = () => {
    const user = useUser()
    let { roomId } = useParams();
    const socketRef = useRef<Socket>()
    const localStreamRef = useRef<MediaStream>();
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
    const [alert, setAlert] = useState<AlertProps>()
    const [users, setUsers] = useState<WebRTCUser[]>([]);

    const createPeerConnection = useCallback((socketID: string, email: string) => {
        try {
            const pc = new RTCPeerConnection(pc_config);

            pc.onicecandidate = (e) => {
                if (!(socketRef.current && e.candidate)) return;
                console.log('onicecandidate');
                socketRef.current.emit('candidate', {
                    candidate: e.candidate,
                    candidateSendID: socketRef.current.id,
                    candidateReceiveID: socketID,
                });
            };

            pc.oniceconnectionstatechange = (e) => {
                console.log(e);
            };

            pc.ontrack = (e) => {
                console.log('ontrack success');
                setUsers((oldUsers) =>
                    oldUsers
                        .filter((user) => user.id !== socketID)
                        .concat({
                            id: socketID,
                            email,
                            stream: e.streams[0],
                        }),
                );
            };

            if (localStreamRef.current) {
                console.log('localstream add');
                localStreamRef.current.getTracks().forEach((track) => {
                    if (!localStreamRef.current) return;
                    pc.addTrack(track, localStreamRef.current);
                });
            } else {
                console.log('no local stream');
            }

            return pc;
        } catch (e) {
            console.error(e);
            return undefined;
        }
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

            if (socketRef.current) {
                socketRef.current?.emit('join_room', {
                    room: roomId,
                    email: user.email,
                });
                console.log(`joined room ${roomId}`)
            }
        } catch (e) {
            if (e instanceof DOMException) {
                switch (e.name) {
                    case 'NotReadableError':
                        setAlert(alerts[0])
                        console.log(alerts[0].message);
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
    }, []);

    useEffect(() => {
        if (process.env.REACT_APP_SIGNALING_SERVER) {
            socketRef.current = io(process.env.REACT_APP_SIGNALING_SERVER)
            getLocalStream();
        }

        when_i_receive_users_in_room();

        when_i_receive_an_offer();

        when_i_receive_an_answer();

        when_i_receive_ice_candidate();

        when_user_exits();

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
            users.forEach((user) => {
                if (!pcsRef.current[user.id]) return;
                pcsRef.current[user.id].close();
                delete pcsRef.current[user.id];
            });
        }
    }, [createPeerConnection, getLocalStream])

    function when_user_exits() {
        if (socketRef.current)
            socketRef.current.on('user_exit', (data: { id: string; }) => {
                if (!pcsRef.current[data.id]) return;
                pcsRef.current[data.id].close();
                delete pcsRef.current[data.id];
                setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
            });
    }

    function when_i_receive_ice_candidate() {
        if (socketRef.current)
            socketRef.current.on(
                'getCandidate',
                async (data: { candidate: RTCIceCandidateInit; candidateSendID: string; }) => {
                    console.log('get candidate');
                    const pc: RTCPeerConnection = pcsRef.current[data.candidateSendID];
                    if (!pc) return;
                    await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
                    console.log('candidate add success');
                }
            );
    }

    function when_i_receive_an_answer() {
        if (socketRef.current)
            socketRef.current.on(
                'getAnswer',
                (data: { sdp: RTCSessionDescription; answerSendID: string; }) => {
                    const { sdp, answerSendID } = data;
                    console.log('get answer');
                    const pc: RTCPeerConnection = pcsRef.current[answerSendID];
                    if (!pc) return;
                    // Check if the PeerConnection is in a non-stable state, indicating it's ready for a remote description
                    if (pc.signalingState !== "stable") {
                        console.log('Setting remote description on:', answerSendID);
                        pc.setRemoteDescription(new RTCSessionDescription(sdp))
                            .then(() => console.log("Remote description set successfully for:", answerSendID))
                            .catch((error) => console.error("Error setting remote description:", error));
                    } else {
                        // If we are in a stable state, this might not be the right time to set a remote description
                        // This could indicate an issue with the signaling logic or might require renegotiation handling.
                        console.warn("Attempted to set remote description in a stable state for:", answerSendID);
                    }
                }
            );
    }

    function when_i_receive_an_offer() {
        if (socketRef.current) {
            socketRef.current.on(
                'getOffer',
                async (data: {
                    sdp: RTCSessionDescription;
                    offerSendID: string;
                    offerSendEmail: string;
                }) => {
                    const { sdp, offerSendID, offerSendEmail } = data;
                    console.log('get offer');
                    if (!localStreamRef.current) return;
                    const pc = createPeerConnection(offerSendID, offerSendEmail);
                    if (!(pc && socketRef.current)) return;
                    pcsRef.current = { ...pcsRef.current, [offerSendID]: pc };
                    try {
                        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
                        console.log('answer set remote description success');
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
                }
            );
        }
    }

    function when_i_receive_users_in_room() {
        if (socketRef.current) {
            socketRef.current.on('all_users', (allUsers: Array<{ id: string; email: string; }>) => {
                allUsers.forEach(async (user) => {
                    if (!localStreamRef.current) return;
                    const pc = createPeerConnection(user.id, user.email);
                    if (!(pc && socketRef.current)) return;
                    pcsRef.current = { ...pcsRef.current, [user.id]: pc };
                    try {
                        const localSdp = await pc.createOffer({
                            offerToReceiveAudio: true,
                            offerToReceiveVideo: true,
                        });
                        console.log('create offer success');
                        await pc.setLocalDescription(new RTCSessionDescription(localSdp));
                        socketRef.current.emit('offer', {
                            sdp: localSdp,
                            offerSendID: socketRef.current.id,
                            offerSendEmail: user.email,
                            offerReceiveID: user.id,
                        });
                    } catch (e) {
                        console.error(e);
                    }
                });
            });
        }
    }
    
    return (
        <Sheet sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            m: 4,
        }}>
            {/* <Button onClick={testSocket}>Test Socket</Button> */}
            <video
                style={{
                    width: 240,
                    height: 240,
                    margin: 5,
                    backgroundColor: 'black',
                }}
                muted
                ref={localVideoRef}
                autoPlay
            />
            {users.map((user, index) => (
                <Video key={index} email={user.email} stream={user.stream} />
            ))}
            {/* <MeetingBottomControl setMicIsOn={setMicIsOn} micIsOn={micIsOn} roomId={roomId} /> */}
            {alert && <AlertDialogModal message={alert.message} onClose={alert.onClose} onYes={alert.onYes} type={alert.type}></AlertDialogModal>}
        </Sheet >
    )
}

export default Meeting


