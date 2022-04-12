import React from 'react';
import { useAppSelector } from '../../store/store';

import { ConnectedObject } from '../../types/ConnectedObject';
import { Cache } from '../../types/Cache';

import LightCard from '../../components/LightCard';

export default function Lights() {
  const { lights, cache } = useAppSelector((store) => store.object)


  const displayLights = lights.map(
    (light: ConnectedObject) => 
      <LightCard 
        key={light.id_client}
        light={light} 
        cache={cache.find((element: Cache) => {
          return light.id_client === element.id_client
        }) as Cache}/>
    )
    
  return (
    <div className="w-full h-screen text-white">
      <div className='flex'>
        {displayLights}
      </div>
    </div>
  );
}