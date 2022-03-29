import React from 'react';
import { useParams } from 'react-router-dom';

export default function Outlet() {
  const { outlet } = useParams()
  return (
    <div className="w-full h-screen text-white">
      <span>Lights / {outlet}</span>
    </div>
  );
}