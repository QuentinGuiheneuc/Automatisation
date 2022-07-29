/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getData } from "../../data/data";
import { useAppDispatch, useAppSelector } from "../../store/store";
import TopBar from "./TopBar";
import SubTopBar from "./SubTopBar";
import LeftMenu from "./LeftMenu";
import { logout } from "../../states/authSlice";
import localTokenSet from "../../data/localStokage";

export default function Layout() {
  const navigate = useNavigate();
  const { isLogged } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("isLogged", isLogged);
    if (!isLogged) {
      navigate("/login");
    } else {
      getData(dispatch).catch((e) => {
        dispatch(logout());
        localTokenSet({});
        navigate("/login");
      });
    }
  }, [getData, isLogged, navigate]);

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
