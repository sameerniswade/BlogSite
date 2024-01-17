import React, { useRef } from "react";
import { GetAllPost, Button, Navbar } from ".././../components/index";
import { useSelector } from "react-redux";
function Home() {
  const ref = useRef();
  const isLogin = useSelector((state) => state.isLogIn);

  return <div>{isLogin ? <GetAllPost /> : <h2>Please Login</h2>}</div>;
}

export default Home;
