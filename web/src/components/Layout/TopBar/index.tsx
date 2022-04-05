import React from "react";

import profile_icon from "../../../assets/icons/profile_icon.png";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { logout } from "../../../states/authSlice";
import ColoredButton from "../../ColoredButton";

export default function TopBar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((store) => store.auth);

  const handleClick = () => {
    dispatch(logout());
    navigate("/login");
  };

  const icon: string =
    user.path_img.length > 0
      ? `http://localhost:3007${user.path_img}`
      : profile_icon;

  return (
    <div className="h-8 bg-grey-dark text-white flex flex-row items-center pr-12 space-x-10 justify-end">
      <div className="flex flex-row items-center">
        <img src={icon} alt="user icon" className="h-7 w-7 mr-3 rounded-full" />
        <span>
          {user.nom} {user.prenom}
        </span>
      </div>
      <span>{user.type.charAt(0).toUpperCase() + user.type.slice(1)}</span>
      <ColoredButton
        text="LOGOUT"
        onClick={handleClick}
        to="login"
        className="text-black text-xxs"
      />
    </div>
  );
}
