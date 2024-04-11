import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { IS_DEVELOPER, ROUTES, STR_TOKEN } from "../helpers/common";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/user-slice";
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

type RootProps = {
  children: React.ReactNode
}

export default function AuthGuard({ children }: RootProps) {
  const [loaded, setLoaded] = useState(false);
  const token = localStorage.getItem(STR_TOKEN);

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
            const { email, token } = rtn.data?.verifyToken;
            localStorage.setItem(STR_TOKEN, token);
            dispatch(setUser({ user: { email } }));
            setLoaded(true);
          } else {
            localStorage.removeItem(STR_TOKEN);
            window.location.href = ROUTES.SIGNIN;
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyTokenAsync();
  }, [dispatch, token, verifyToken]);

  if (loaded) return <>{children}</>;

  else
    return (
      <CircularProgress />
    );
}


