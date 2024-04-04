import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./common";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Root from "../pages/Root";
import ErrorPage from "../pages/error-page";
import Welcome from "../pages/Welcome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Welcome />,
      },
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
]);
