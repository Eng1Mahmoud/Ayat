import App from "./App";
import { Home } from "./pages/Home";
import { SignUpPage } from "./pages/SignUpPage";
import { VerifyCodePage } from "./pages/VerifyCodePage";
import { ContactPage } from "./pages/ContactPage";
import { Admin } from "./pages/Admin";
import SignIn from "./components/admin/Login"
import { Dashboard } from "./components/admin/Dashboard";
import AddMessage from "./components/admin/AddMessage";
import Replay  from "./components/admin/Replay";
import { Users } from "./components/admin/Users";
import { Mange } from "./components/admin/Mange";
import {ErrorPage} from "./pages/ErrorPage"
import { createBrowserRouter} from "react-router-dom";

export const  router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          path: "/",
          element: <Home />,
        },
        {
          path: "signUp",
          element: <SignUpPage />,
        },
        {
          path: "VerifyCode",
          element: <VerifyCodePage />,
        },
        {
          path: "contact us",
          element: <ContactPage />,
        },
        {
          path: "*",
          element: <ErrorPage />,
        },
        {
          path: "admin",
          element: <Admin />,
          children: [
            {
              index: true,
      
              element: <SignIn />,
            },
            {
           
              path: "dashboard",
              element:<Dashboard/>,
              children: [
                {
                 index:true,
                  element: <Mange />,
                },
                {
                  path: "replay",
                  element: <Replay />,
                },
                {
                  path: "addMessage",
                  element: <AddMessage />,
                },
                {
                  path: "users",
                  element: <Users />,
                },
               
              ]
            },
          ],
        },
      ],
    },
  ]);
  