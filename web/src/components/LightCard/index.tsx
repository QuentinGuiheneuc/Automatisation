import React, { useEffect, useState } from "react";

import { ConnectedObject } from "../../types/ConnectedObject";
import { Cache } from "../../types/Cache";

import { getExeId, getObjects, setObject } from "../../data/objectApi";

import light_close_icon from "../../assets/icons/light_close_icon.svg";
import light_open_icon from "../../assets/icons/light_open_icon.svg";
import disconnected_icon from "../../assets/icons/disconnected_icon.svg";

import { useAppDispatch } from "../../store/store";
import { setLights } from "../../states/objectSlice";

import Slider from "@mui/material/Slider";
import ColorButton from "../ColorButton";

type props = {
  light: ConnectedObject;
  cache: Cache;
};

export default function LightCard({ light, cache }: props) {
  const valueToHex = (value: string) => {
    var hex = parseInt(value).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const rgbToHex = (r: string, g: string, b: string): string => {
    return "#" + valueToHex(r) + valueToHex(g) + valueToHex(b);
  };

  const [isOpen, setIsOpen] = useState(cache.value.v?.vs?.ac > 0);
  const [color, setColor] = useState(
    rgbToHex(
      cache.value.v?.vs?.cl[0],
      cache.value.v?.vs?.cl[1],
      cache.value.v?.vs?.cl[2]
    )
  );
  const [color2, setColor2] = useState(
    rgbToHex(
      cache.value.v?.vs?.cs[0],
      cache.value.v?.vs?.cs[1],
      cache.value.v?.vs?.cs[2]
    )
  );
  const [brightness, setBrightness] = useState(cache.value.v?.vs?.ac / 2.55);
  
  const dispatch = useAppDispatch();

  const handleColor = (color: string): void => {
    setColor(color);
  };
  const handleColor2 = (color: string): void => {
    setColor2(color);
  };
  const handleBrightness = (brightness: number): void => {
    setBrightness(brightness);
  };

  const handleBrightnessCommitted = (brightness: number) => {
    const newBrightness: number = brightness * 2;
    getExeId(light.id_client).then((responses) => {
      setObject(responses, { value: `&A=${newBrightness}` });
    });
  };

  const handleLight = () => {
    getExeId(light.id_client).then(async (responses) => {
      await setObject(responses, { value: isOpen ? "&T=0" : "&T=1" }).then(
        () => {
          setIsOpen(!isOpen);
        }
      );
      await getObjects().then((responses: Array<ConnectedObject>) => {
        dispatch(setLights(responses));
      });
    });
  };
  return (
    <>
      {cache && (
        <div className="relative flex flex-col items-center bg-grey-dark w-1/6 p-5 ml-2 mt-2">
          {cache.value.status === "offline" && (
            <>
              <img
                src={disconnected_icon}
                className="absolute right-2 top-2 h-5 w-5 z-50"
                alt='disconnected icon'
              />
              <div className="absolute w-full h-full bg-black-transparent top-0 left-0" />
            </>
          )}
          <img
            src={isOpen ? light_open_icon : light_close_icon}
            onClick={handleLight}
            alt="light icon"
            className="w-28 h-28 mb-2 cursor-pointer"
          />
          <span className="text-grey-light text-xl">{light.client}</span>
          <div className="flex items-center space-x-2 w-full">
            <div className="flex w-5/6 items-center">
              <Slider
                size="small"
                value={brightness}
                onChangeCommitted={(event, brightness) =>
                  handleBrightnessCommitted(brightness as number)
                }
                onChange={(event, brightness) =>
                  handleBrightness(brightness as number)
                }
              />
            </div>
            <ColorButton
              command="&CL"
              lightId={light.id_client}
              color={color}
              handleColor={handleColor}
            />
            <ColorButton
              command="&C2"
              lightId={light.id_client}
              color={color2}
              handleColor={handleColor2}
            />
          </div>
        </div>
      )}
    </>
  );
}
