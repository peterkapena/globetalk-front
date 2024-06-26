import { CallEndOutlined, CheckCircleOutlined, ClosedCaptionDisabledOutlined, ClosedCaptionOffOutlined, CopyAllOutlined, InterpreterModeOutlined, KeyboardVoiceOutlined, MicOffOutlined, MonitorOutlined, PinDropOutlined, PushPinOutlined, ScreenShare, ScreenShareOutlined, VideocamOffOutlined, VideocamOutlined } from '@mui/icons-material';
import { Box, Dropdown, IconButton, Menu, MenuButton, MenuItem, Sheet, Stack, Tooltip, } from '@mui/joy';
import { Language, languages } from '../helpers/i18n';
import { copyToClipboard } from '../helpers/helpers';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type MeetingBottomControlProps = {
    toggleAudio: any;
    toggleVideo: any;
    isAudioMuted: boolean;
    isVideoEnabled: boolean;
    toggleCaptions: any;
    isCaptionsEnabled: boolean;
    leaveCall: any;
    setTranslationLanguage: (l: Language) => void;
    shareScreen: () => void;
}

export function MediaControlPanel({ isAudioMuted, toggleAudio, isVideoEnabled, toggleVideo, isCaptionsEnabled, toggleCaptions, leaveCall, setTranslationLanguage, shareScreen }: MeetingBottomControlProps) {
    const [pinned, setPinned] = useState(false)
    const [copied_icon, setCopied_icon] = useState(<CopyAllOutlined />)
    const navigate = useNavigate()
    const { t } = useTranslation();

    async function copy() {
        if (await copyToClipboard(window.location.href)) {
            setCopied_icon(<CheckCircleOutlined />)
            setTimeout(() => {
                setCopied_icon(<CopyAllOutlined />)
            }, 2500);
        }
    }

    function endCall() {
        leaveCall()
        navigate("/")
    }

    return (
        < Sheet variant="outlined"
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "black",
                bottom: 0,
                position: 'fixed',
                p: 2,
                borderRadius: 8,
                mb: { xs: 4, sm: 2 }
            }}>
            {pinned ?
                <Box>
                    <Stack direction="row" spacing={2}>
                        <IconButton sx={{ m: 2 }} variant='solid' size='lg' onClick={() => setPinned(!pinned)} color='danger' >
                            <PushPinOutlined />
                        </IconButton>
                    </Stack>
                </Box> :
                <Box>
                    <Stack direction="row" spacing={2}>
                        <Tooltip title={t("meeting.microphone")}>
                            <IconButton sx={{ m: 2 }} variant='solid' size='lg' onClick={() => toggleAudio(!isAudioMuted)}>
                                {isAudioMuted ? <MicOffOutlined /> : <KeyboardVoiceOutlined />}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={t("meeting.camera")}>
                            <IconButton sx={{ m: 2 }} variant='solid' size='lg' onClick={() => toggleVideo(!isVideoEnabled)}>
                                {isVideoEnabled ? <VideocamOutlined /> : <VideocamOffOutlined />}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={t("meeting.share_screen")}>
                            <IconButton sx={{ m: 2 }} variant='solid' size='lg' onClick={shareScreen}>
                                <MonitorOutlined />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title={t("meeting.caption")}>
                            <IconButton sx={{ m: 2 }} variant='solid' size='lg' onClick={() => toggleCaptions(!isCaptionsEnabled)}>
                                {isCaptionsEnabled ? <ClosedCaptionOffOutlined /> : <ClosedCaptionDisabledOutlined />}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={t("meeting.copy_meeting_link")}>
                            <IconButton sx={{ m: 2 }} variant='solid' size='lg' onClick={copy}>
                                {copied_icon}
                            </IconButton>
                        </Tooltip>
                        <IconButton sx={{ m: 2 }} variant='solid' size='lg' color='danger' onClick={endCall}>
                            <CallEndOutlined />
                        </IconButton>

                        <Tooltip title={t("meeting.change_listening_language")}>
                            <Box sx={{ display: "flex", backgroundColor: "white" }} borderRadius={6}>
                                <Dropdown>
                                    <MenuButton variant="plain" size="md">
                                        <InterpreterModeOutlined />
                                    </MenuButton>
                                    <Menu
                                        placement="bottom-end"
                                        size="sm"
                                        sx={{
                                            zIndex: '99999',
                                            p: 1,
                                            gap: 1,
                                            '--ListItem-radius': 'var(--joy-radius-sm)',
                                        }}
                                    >
                                        {languages.map((l, i) => (
                                            <MenuItem onClick={() => { }} key={i} onClickCapture={() => setTranslationLanguage(l)} >
                                                <InterpreterModeOutlined />
                                                {l.label}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Dropdown>
                            </Box>
                        </Tooltip>
                        <IconButton sx={{ m: 2 }} variant='solid' size='lg' onClick={() => setPinned(!pinned)}  >
                            <PushPinOutlined sx={{ right: 3, position: "relative" }} />
                        </IconButton>
                    </Stack>
                </Box>
            }
        </Sheet >
    );
}
