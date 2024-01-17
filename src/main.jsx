import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { ThemeProvider } from "@material-tailwind/react";

import {
  Home,
  LoginPage,
  SignupPage,
  CreatePost,
  UpdatePostPage,
} from "./pages/page.js";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/Login", element: <LoginPage /> },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/create",
        element: <CreatePost />,
      },
      {
        path: "/updatepost/:id",
        element: <UpdatePostPage />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);
