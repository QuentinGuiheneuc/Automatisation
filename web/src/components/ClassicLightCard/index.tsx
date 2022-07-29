import React, { useState } from "react";

import { ConnectedObject } from "../../types/ConnectedObject";

import { getExeId, getObjectsAPI, setObject } from "../../data/objectApi";

import light_close_icon from "../../assets/icons/light_close_icon.svg";
import light_open_icon from "../../assets/icons/light_open_icon.svg";

import { useAppDispatch } from "../../store/store";
import { setLights } from "../../states/objectSlice";

type props = {
  name: string;
  isLightOpen: boolean;
};

export default function ClassicLightCard({ name, isLightOpen }: props) {
  const [isOpen, setIsOpen] = useState(isLightOpen);
  const dispatch = useAppDispatch();

  const handleLight = () => {
    getExeId(4).then(async (responses) => {
      await setObject(responses, { value: isOpen ? "&T=0" : "&T=1" }).then(
        () => {
          setIsOpen(!isOpen);
        }
      );
      await getObjectsAPI().then((responses: Array<ConnectedObject>) => {
        dispatch(setLights(responses));
      });
    });
  };
  return (
    <>
      <div className="relative flex flex-col items-center bg-grey-dark w-1/6 p-5 ml-2 mt-2">
        <img
          src={isOpen ? light_open_icon : light_close_icon}
          onClick={handleLight}
          alt="light icon"
          className="w-28 h-28 mb-2 cursor-pointer"
        />
        <span className="text-grey-light text-xl">{name}</span>
      </div>
    </>
  );
}
