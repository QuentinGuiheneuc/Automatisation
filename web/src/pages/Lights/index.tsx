import React from 'react';
import { useAppSelector } from '../../store/store';

export default function Lights() {
  const { lights } = useAppSelector((store) => store.object)

  return (
    <div className="w-full h-screen text-white">
        <span>Lights</span>
    </div>
  );
}