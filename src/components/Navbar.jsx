import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { Button } from "./index";

function Navbar() {
  const isLogIn = useSelector((state) => state.isLogIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return isLogIn ? (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
      <Button onClick={() => navigate("/create")}>Create Post</Button>
    </div>
  ) : null;
}

export default Navbar;
