import React, { useState } from "react";

import { ChromePicker } from "react-color";

import { ConnectedObject } from "../../types/ConnectedObject";

import { getExeId, getObjects, setObject } from "../../data/objectApi";

import { useAppDispatch } from "../../store/store";
import { setLights } from "../../states/objectSlice";

type props = {
  commende: string;
  lightId: number;
  color: string;
  handleColor: (color: string) => void;
};

export default function ColorButton({
  commende,
  lightId,
  color,
  handleColor,
}: props) {
  const dispatch = useAppDispatch();
  const [isColorPicker, setIsColorPicker] = useState(false);
  const handleClick = (): void => {
    setIsColorPicker(!isColorPicker);
  };

  const handleChangeComplete = (newColor: string) => {
    getExeId(lightId).then((responses) => {
      setObject(responses, { value: `${commende}=${newColor}` });
    });
  };

  return (
    <div className="relative">
      <div
        className={`h-4 w-4 rounded-full cursor-pointer`}
        style={{ background: `${color}` }}
        onClick={handleClick}
      />
      {isColorPicker && (
        <div className="absolute z-10 top-5 left-2">
          <div
            className="fixed right-0 top-0 bottom-0 left-0"
            onClick={handleClick}
          />
          <ChromePicker
            color={color}
            disableAlpha={true}
            onChange={(newColor) => handleColor(newColor.hex)}
            onChangeComplete={(newColor) => handleChangeComplete(newColor.hex)}
          />
        </div>
      )}
    </div>
  );
}
