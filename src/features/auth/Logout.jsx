import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useLogoutMutation } from "./authApiSlice";

const Logout = () => {
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const handleOnClick = async () => {
    await logout()
    navigate("/login")
  }

  return <button className="logout_button" onClick={handleOnClick}>Logout</button>;
};

export default Logout;
