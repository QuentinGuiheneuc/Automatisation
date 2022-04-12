import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/store";

import TopBar from "./TopBar";
import SubTopBar from "./SubTopBar";
import LeftMenu from "./LeftMenu";

export default function Layout() {
  const navigate = useNavigate();
  const { isLogged } = useAppSelector((store) => store.auth);

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged, navigate]);

  return (
    <div className="max-h-full h-full flex flex-row max-w-full">
      <LeftMenu />
      <div className="flex flex-col w-full ml-0.5">
        <TopBar />
        <SubTopBar />
        <div className="h-full overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
