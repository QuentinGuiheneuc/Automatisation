import React from "react";

import MenuButton from "../MenuButton";
import ProductButtonList from "../ProductButtonList";

import home_icon from "../../../assets/icons/home_icon.png";
import light_icon from "../../../assets/icons/light_close_icon.svg";
import radiator_icon from "../../../assets/icons/radiator_disabled_icon.svg";
import outlet_icon from "../../../assets/icons/outlet_icon.png";

import { Link } from "react-router-dom";
import { useAppSelector } from "../../../store/store";

export default function LeftMenu() {
  const { lights, outlets, radiators } = useAppSelector((store) => store.object);

  return (
    <div className="h-full pb-8">
      <Link to="/" className="font-title text-white h-7 flex">
        <span className="m-auto">DASHBOARD</span>
      </Link>
      <nav className="bg-grey-dark h-full flex flex-col w-60">
        <ul className="w-full">
          <li className="h-10 flex items-center mb-12">
            <MenuButton to="/" text="Home" icon={home_icon} />
          </li>
          <li>
            <ProductButtonList
              to="/lights"
              text="LIGHTS"
              icon={light_icon}
              objects={lights}
            />
          </li>
          <li className="pt-6">
            <ProductButtonList
              to="/radiators"
              text="RADIATEURS"
              icon={radiator_icon}
              objects={radiators}
            />
          </li>
          <li className="pt-6">
            <ProductButtonList
              to="/outlets"
              text="OUTLETS"
              icon={outlet_icon}
              objects={outlets}
            />
          </li>
        </ul>
      </nav>
    </div>
  );
}
