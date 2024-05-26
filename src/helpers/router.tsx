import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./common";
import Signin from "../routes/Signin";
import Signup from "../routes/Signup";
import AuthGuard from "../routes/AuthGuard";
import ErrorPage from "../routes/error-page";
import Welcome from "../routes/Welcome";
import Meeting from "../routes/Meeting";
import Settings from "../routes/Setting";
import Forgot_Password from "../routes/Forgot_Password";
import Layout from "../Layout";
// import Meeting2 from "../routes/Meeting2";


export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Welcome />,
      },
      {
        path: ROUTES.SETTING,
        element: <Settings />,
      }
    ],
  },
  {
    path: ROUTES.SIGNIN,
    element: <Signin />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <Signup />,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <Forgot_Password />,
  },
  {
    path: `${ROUTES.MEETING}:roomId`,
    element: (
      <AuthGuard>
        <Meeting />
      </AuthGuard>
    ),
  },
]);
