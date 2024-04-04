import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import { useNavigate } from 'react-router-dom';

import { t } from 'i18next';
import { ROUTES } from '../helpers/common';
import { VideoCallOutlined } from '@mui/icons-material';

export default function Navigation() {
    const navigate = useNavigate()
    return (
        <List
            size="sm"
            sx={{ '--ListItem-radius': 'var(--joy-radius-sm)', '--List-gap': '4px' }}
        >
            <ListItem nested>
                <List
                    aria-labelledby="nav-list-browse"
                    sx={{
                        '& .JoyListItemButton-root': { p: '8px' },
                    }}
                >
                    <ListItem>
                        <ListItemButton selected onClick={() => navigate(ROUTES.HOME)}>
                            <ListItemDecorator>
                                <VideoCallOutlined fontSize="small" />
                            </ListItemDecorator>
                            <ListItemContent>{t("sidebar.home")}</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                </List>
            </ListItem>
        </List>
    );
}