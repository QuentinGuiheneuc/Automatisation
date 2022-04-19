import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/store';

import { ConnectedObject } from '../../types/ConnectedObject';
import { Cache } from '../../types/Cache';

import LightCard from '../../components/LightCard';
import ClassicLightCard from '../../components/ClassicLightCard';

export default function Lights() {
  const { lights, cache } = useAppSelector((store) => store.object)
  const [classicLights, setClassicLights] = useState<[string, number][]>()

  useEffect((): void => {
    const classicLightsId = lights.find((light: ConnectedObject) => {
      return light.topic === 'eleclairage'
    })?.id_client
    const classicLightCache = cache.find((element: Cache) => {
      return element.id_client === classicLightsId
    })
    if(classicLightCache){
      setClassicLights(Object.entries(classicLightCache?.value?.post))
    }
  }, [])

  const displayWLEDLights = lights.map(
    (light: ConnectedObject) => 
      light.topic !== 'eleclairage' && cache &&
      <LightCard 
        key={light.id_client}
        light={light} 
        cache={cache.find((element: Cache) => {
          return light.id_client === element.id_client
        }) as Cache}/>
    )

  const displayClassicLights = classicLights?.map(
    (light: [string, number]) => 
      <ClassicLightCard
        key={light[0]}
        name={light[0]}
        isLightOpen={light[1]? true:false}
      />
    
  )
    
  return (
    <div className="w-full h-screen text-white">
      <div className='flex justify-evenly flex-wrap'>
        {displayClassicLights}
        {displayWLEDLights}
      </div>
    </div>
  );
}