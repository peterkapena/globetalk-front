import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Stack from '@mui/joy/Stack';
import Layout from './components/Layout';
import Header, { LeftHeaderNavigation } from './components/Header';
import Navigation from './components/Navigation';
import { Outlet } from 'react-router-dom';

export default function TeamExample() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </Layout.SideDrawer>
      )}

      <TabNavMobile></TabNavMobile>
      <Layout.Root
        sx={{
          ...(drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          }),
        }}
      >
        <Layout.Header>
          <Header />
        </Layout.Header>
        <Layout.SideNav>
          <Navigation />
        </Layout.SideNav>
        <Layout.Main>
          <Outlet></Outlet>
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}

function TabNavMobile() {
  return <Stack
    id="tab-bar"
    direction="row"
    justifyContent="space-around"
    spacing={1}
    sx={{
      display: { xs: 'flex', sm: 'flex', md: "none" },
      zIndex: '999',
      bottom: 0,
      position: 'fixed',
      width: '100dvw',
      py: 2,
      backgroundColor: 'background.body',
      borderTop: '1px solid',
      borderColor: 'divider',
    }}
  >
    <LeftHeaderNavigation></LeftHeaderNavigation>
  </Stack>;
}
