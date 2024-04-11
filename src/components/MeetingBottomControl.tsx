import { CallEndOutlined, CheckCircleOutlined, ClosedCaptionOffOutlined, ClosedCaptionOutlined, CopyAllOutlined, InfoOutlined, KeyboardVoiceOutlined, MicOffOutlined, PublicOutlined, TranslateOutlined, VideocamOffOutlined, VideocamOutlined } from '@mui/icons-material';
import { Box, Dropdown, IconButton, Menu, MenuButton, MenuItem, Stack, Tooltip, Typography } from '@mui/joy';
import { languages } from '../helpers/i18n';
import { t } from 'i18next';
import { copyToClipboard } from '../helpers/helpers';
import { useState } from 'react';

type MeetingBottomControlProps = {
    setMicIsOn: any; micIsOn: boolean, roomId: string | undefined
}

export function MeetingBottomControl({ micIsOn, setMicIsOn, roomId }: MeetingBottomControlProps) {
    const [copied_icon, setCopied_icon] = useState(<CopyAllOutlined />)

    async function copy() {
        if (await copyToClipboard(window.location.href)) {
            setCopied_icon(<CheckCircleOutlined />)
            setTimeout(() => {
                setCopied_icon(<CopyAllOutlined />)
            }, 2500);
        }
    }

    return <Box sx={{
        display: "flex",
        width: "97%",
        flexDirection: "row",
        justifyContent: "space-between",
        bottom: 0,
        position: 'fixed',
        mb: { xs: 4, sm: 2 }
    }}>

        <Stack direction="row" spacing={1} sx={{ display: { xs: "none", sm: "flex" } }}>
            <Typography>{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} | {roomId}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
            <Tooltip title={t("welcome.microphone")}>
                <IconButton sx={{ m: 2 }} variant='solid' size='lg' onClick={() => setMicIsOn(!micIsOn)}>
                    {micIsOn ? <KeyboardVoiceOutlined /> : <MicOffOutlined />}
                </IconButton>
            </Tooltip>
            <Tooltip title={t("welcome.camera")}>
                <IconButton sx={{ m: 2 }} variant='solid' size='lg' onClick={() => setMicIsOn(!micIsOn)}>
                    {micIsOn ? <VideocamOutlined /> : <VideocamOffOutlined />}
                </IconButton>
            </Tooltip>
            <Tooltip title={t("welcome.caption")}>
                <IconButton sx={{ m: 2 }} variant='solid' size='lg' onClick={() => setMicIsOn(!micIsOn)}>
                    {micIsOn ? <ClosedCaptionOutlined /> : <ClosedCaptionOffOutlined />}
                </IconButton>
            </Tooltip>
            <IconButton sx={{ m: 2 }} variant='solid' color='danger' onClick={() => setMicIsOn(!micIsOn)}>
                <CallEndOutlined />
            </IconButton>
            <Tooltip title={t("welcome.copy_meeting_link")}>
                <IconButton sx={{ m: 2 }} variant='solid' onClick={copy}>
                    {copied_icon}
                </IconButton>
            </Tooltip>
            <Tooltip title={t("welcome.change_listening_language")}>
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
            <Tooltip title={t("welcome.meetingdetails")}>
                <IconButton sx={{ m: 2 }} variant='solid' size='lg' >
                    <InfoOutlined />
                </IconButton>
            </Tooltip>
        </Stack>
    </Box >;
}
