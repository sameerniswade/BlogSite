import React from "react";
import { PostCreater } from "../../components";
import { useSelector } from "react-redux";
function CreatePost() {
  const isLogIn = useSelector((state) => state.isLogIn);
  return <div>{isLogIn ? <PostCreater /> : <h1>Please login</h1>}</div>;
}

export default CreatePost;
