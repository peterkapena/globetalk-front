import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

import ColorSchemeToggle from './ColorSchemeToggle';
import { useAppDispatch } from '../redux/hooks';
import { signOut, useUser } from '../redux/user-slice';
import { useNavigate } from 'react-router-dom';
import { APP_NAME, ROUTES } from '../helpers/common';
import { closeSidebar } from '../helpers/helpers';
import { t } from 'i18next';

export default function Sidebar() {
  const navigate = useNavigate()
  const user = useUser()

  function logout() {
    dispatch(signOut());
  }

  const dispatch = useAppDispatch();
  return (
    <Sheet
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        }, transition: 'transform 0.4s, width 0.4s', zIndex: 10000,
        height: '100dvh', width: 'var(--Sidebar-width)', top: 0,
        p: 2, flexShrink: 0, display: 'flex',
        flexDirection: 'column', gap: 2,
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed', zIndex: 9998, top: 0,
          left: 0, width: '100vw', height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)', backgroundColor: 'var(--joy-palette-background-backdrop)', transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))', lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography level="title-lg">{APP_NAME}</Typography>
        <ColorSchemeToggle sx={{ ml: 'auto' }} />
      </Box>
      <Box
        sx={{
          minHeight: 0, overflow: 'hidden auto', flexGrow: 1,
          display: 'flex', flexDirection: 'column', [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton onClick={() => navigate(ROUTES.HOME)}>
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">{t("sidebar.home")}</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

        </List>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar
          variant="outlined"
          size="sm"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm" noWrap>{user.email} </Typography>
          <Typography level="body-xs" noWrap>{user.email}</Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="neutral" onClick={logout}>
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}
