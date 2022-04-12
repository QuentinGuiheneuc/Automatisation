import React, { useState } from 'react';

import { ConnectedObject } from '../../types/ConnectedObject';
import { Cache } from '../../types/Cache';

import { getExeId, getObjects, setObject } from '../../data/objectApi';

import light_close_icon from '../../assets/icons/light_close_icon.svg'
import light_open_icon from '../../assets/icons/light_open_icon.svg'
import disconnected_icon from '../../assets/icons/disconnected_icon.svg'

import { useAppDispatch } from '../../store/store'
import { setLights } from '../../states/objectSlice'

type props = {
  light: ConnectedObject
  cache: Cache
}

export default function LightCard({ light, cache }: props) {
  const [isOpen, setIsOpen] = useState(cache.value.v?.vs?.ac > 0)
  const dispatch = useAppDispatch()

  const handleLight = () => {
    getExeId(light.id_client)
      .then(async(responses) => {
        await setObject(responses, JSON.stringify({"value": isOpen? "&T=0":"&T=1"}))
                .then((responses) => {
                  setIsOpen(!isOpen)
                })
        await getObjects()
                .then((responses: Array<ConnectedObject>) => {
                  dispatch(setLights(responses))
                })
      })
  }
  return (
    <>
      {cache &&
        <div className='relative bg-grey-dark max-w-max p-5 ml-2 mt-2'>
          {cache.value.status === 'offline' &&
            <>
              <img src={disconnected_icon} className='absolute right-2 top-2 h-5 w-5 z-10'/>
              <div className='absolute w-full h-full bg-black-transparent top-0 left-0'/>
            </>
          }
          <img src={isOpen? light_open_icon : light_close_icon} onClick={handleLight} alt='light icon' className='w-28 h-28 mb-2 cursor-pointer' />
          <span className='text-grey-light text-xl'>{light.client}</span>
          <div>

          </div>
        </div>
      }
    </>

  );
}
