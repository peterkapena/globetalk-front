import { Outlet } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { IS_DEVELOPER, ROUTES, STR_TOKEN } from "../helpers/common";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/user-slice";
import { CssVarsProvider, CssBaseline, Box } from "@mui/joy";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { t } from "i18next";

const VERIFY_TOKEN = gql(`
mutation VerifyToken($input: String!) {
  verifyToken(input: $input) {
    isValid
    token
    email
  }
}
`);

export default function Root() {
  const [loaded, setLoaded] = useState(false);
  const token = sessionStorage.getItem(STR_TOKEN);

  const [verifyToken] = useMutation(VERIFY_TOKEN, {
    variables: { input: token || "" },
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    const verifyTokenAsync = async () => {
      try {
        if (!token) window.location.href = ROUTES.SIGNIN;

        const rtn = await verifyToken({ variables: { input: token || "" } });
        if (IS_DEVELOPER) console.log(rtn.data);
        if (rtn.data) {
          const { isValid } = rtn.data?.verifyToken;
          if (isValid) {
            const {
              email,
              givenName,
              surName,
              token,
              username,
              organisationId,
              organisationName,
            } = rtn.data?.verifyToken;

            sessionStorage.setItem(STR_TOKEN, token);
            dispatch(
              setUser({
                user: {
                  organisationName,
                  email,
                  givenName,
                  surName,
                  username,
                  organisationId,
                },
              })
            );
            setLoaded(true);
          } else {
            sessionStorage.removeItem(STR_TOKEN);
            window.location.href = ROUTES.SIGNIN;
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyTokenAsync();
  }, [dispatch, token, verifyToken]);

  if (loaded) return <Layout />;
  else
    return (
      <>
        <p>{t("home.loading")}</p>
      </>
    );
}

export function Layout() {
  return (
    <div>
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
          <Sidebar />
          <Header />
          <Box component="main" className="MainContent"
            sx={{
              pt: { xs: 'calc(12px + var(--Header-height))', md: 3 },
              pb: { xs: 2, sm: 2, md: 3 }, flex: 1, display: 'flex',
              flexDirection: 'column', minWidth: 0, height: '100dvh',
              gap: 1, overflow: 'auto', m: 2
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </CssVarsProvider>
    </div>
  );
}
