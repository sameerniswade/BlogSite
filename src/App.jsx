import { useState } from "react";

import "./App.css";
import { Login, Signup, PostCreater, Navbar } from "./components";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Button } from "@material-tailwind/react";

function App() {
  const state = useSelector((state) => state);
  console.log(state);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
