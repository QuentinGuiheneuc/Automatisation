import React, { useState } from "react";

import { ChromePicker } from "react-color";

import { getExeId, setObject } from "../../data/objectApi";

type props = {
  command: string;
  lightId: number;
  color: string;
  handleColor: (color: string) => void;
};

export default function ColorButton({
  command,
  lightId,
  color,
  handleColor,
}: props) {
  const [isColorPicker, setIsColorPicker] = useState(false);
  const handleClick = (): void => {
    setIsColorPicker(!isColorPicker);
  };

  const handleChangeComplete = (newColor: string) => {
    getExeId(lightId).then((responses) => {
      setObject(responses, { value: `${command}=${newColor}` });
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
