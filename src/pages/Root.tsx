import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { IS_DEVELOPER, ROUTES, STR_TOKEN } from "../helpers/common";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/user-slice";
import Layout from "../Layout";
import { CircularProgress } from "@mui/joy";

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
      <CircularProgress />
    );
}


