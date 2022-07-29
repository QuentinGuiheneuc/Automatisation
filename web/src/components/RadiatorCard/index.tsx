import { useEffect, useState } from "react";

import { ConnectedObject } from "../../types/ConnectedObject";
import { Cache } from "../../types/Cache";

import { getExeId, getObjectsAPI, setObject } from "../../data/objectApi";

import radiator_close_icon from "../../assets/icons/radiator_close_icon.svg";
import radiator_open_icon from "../../assets/icons/radiator_open_icon.svg";
import disconnected_icon from "../../assets/icons/disconnected_icon.svg";

import { useAppDispatch } from "../../store/store";
import { setRadiator } from "../../states/objectSlice";

type props = {
  radiator: ConnectedObject;
  cache: Cache;
};

export default function RadiatorCard({ radiator, cache }: props) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleRadiator = () => {
    getExeId(radiator.id_client).then(async (responses) => {
      await setObject(responses, { value: isOpen ? "&T=0" : "&T=1" }).then(
        (responses) => {
          setIsOpen(!isOpen);
        }
      );
      await getObjectsAPI().then((responses: Array<ConnectedObject>) => {
        dispatch(setRadiator(responses));
      });
    });
  };
  return (
    <>
      {cache && (
        <div className="relative bg-grey-dark max-w-max p-5 ml-2 mt-2">
          {cache.value.status === "offline" && (
            <>
              <img
                src={disconnected_icon}
                className="absolute right-2 top-2 h-5 w-5 z-50"
              />
              <div className="absolute w-full h-full bg-black-transparent top-0 left-0" />
            </>
          )}
          <img
            src={isOpen ? radiator_open_icon : radiator_close_icon}
            onClick={handleRadiator}
            alt="light icon"
            className="w-28 h-28 mb-2 cursor-pointer"
          />
          <span className="text-grey-light text-xl">{radiator.client}</span>
          <div className="flex items-center">
            <div className="flex w-5/6 items-center mr-1"></div>
          </div>
        </div>
      )}
    </>
  );
}
