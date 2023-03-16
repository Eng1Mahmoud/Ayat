import React from "react";
import ReactDOM from "react-dom/client";
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
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./App.css";
const router = createBrowserRouter([
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
