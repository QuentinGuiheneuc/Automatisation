import React from "react";
import { useParams } from "react-router-dom";

export default function Light() {
  const { light } = useParams();
  console.log(light);
  return (
    <div className="w-full h-screen text-white">
      <span>Lights / {light}</span>
    </div>
  );
}
