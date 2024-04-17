import { CallEndOutlined, CheckCircleOutlined, ClosedCaptionDisabledOutlined, ClosedCaptionOffOutlined, CopyAllOutlined, InfoOutlined, KeyboardVoiceOutlined, MicOffOutlined, PublicOutlined, TranslateOutlined, VideocamOffOutlined, VideocamOutlined } from '@mui/icons-material';
import { Box, Dropdown, IconButton, Menu, MenuButton, MenuItem, Stack, Tooltip, Typography } from '@mui/joy';
import { languages } from '../helpers/i18n';
import { copyToClipboard } from '../helpers/helpers';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type MeetingBottomControlProps = {
    toggleAudio: any;
    toggleVideo: any;
    isAudioMuted: boolean;
    isVideoEnabled: boolean;
    roomId: string | undefined;
    toggleCaptions: any;
    isCaptionsEnabled: boolean;
    leaveCall: any
}

export function MediaControlPanel({ isAudioMuted, toggleAudio, roomId, isVideoEnabled, toggleVideo, isCaptionsEnabled, toggleCaptions, leaveCall }: MeetingBottomControlProps) {
    const [copied_icon, setCopied_icon] = useState(<CopyAllOutlined />)
    const navigate = useNavigate()
    const { t } = useTranslation();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timerId);
    }, []);


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

    return <Box
        sx={{
            display: "flex",
            width: "97%",
            flexDirection: "row",
            justifyContent: "space-between",
            bottom: 0,
            position: 'fixed',
            mb: { xs: 4, sm: 2 }
        }}>
        <Stack direction="row" spacing={1} sx={{ display: { xs: "none", sm: "flex" } }}>
            <Typography>
                {currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} | {roomId}
            </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
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
            <Tooltip title={t("meeting.caption")}>
                <IconButton sx={{ m: 2 }} variant='solid' size='lg' onClick={() => toggleCaptions(!isCaptionsEnabled)}>
                    {isCaptionsEnabled ? <ClosedCaptionOffOutlined /> : <ClosedCaptionDisabledOutlined />}
                </IconButton>
            </Tooltip>
            <IconButton sx={{ m: 2 }} variant='solid' color='danger' onClick={endCall}>
                <CallEndOutlined />
            </IconButton>
            <Tooltip title={t("meeting.copy_meeting_link")}>
                <IconButton sx={{ m: 2 }} variant='solid' onClick={copy}>
                    {copied_icon}
                </IconButton>
            </Tooltip>
            <Tooltip title={t("meeting.change_listening_language")}>
                <Box sx={{ display: "flex" }}>
                    <Dropdown>
                        <MenuButton variant="plain" size="md">
                            <TranslateOutlined />
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
                                <MenuItem onClick={() => { }} key={i}>
                                    <PublicOutlined />
                                    {l.label}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Dropdown>
                </Box>
            </Tooltip>
        </Stack>
        <Stack direction="row" spacing={1}>
            <Tooltip title={t("meeting.meetingdetails")}>
                <IconButton sx={{ m: 2 }} variant='solid' size='lg' >
                    <InfoOutlined />
                </IconButton>
            </Tooltip>
        </Stack>
    </Box >;
}
