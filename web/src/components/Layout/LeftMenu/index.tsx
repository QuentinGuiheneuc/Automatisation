import React from 'react';

import MenuButton from '../MenuButton';
import ProductButtonList from '../ProductButtonList';

import home_icon from '../../../assets/icons/home_icon.png';
import light_icon from '../../../assets/icons/light_icon.png';
import temperature_icon from '../../../assets/icons/temperature_icon.png';

import { Link } from 'react-router-dom';

export default function LeftMenu() {
  return (
    <div className='h-full pb-8'>
      <Link to='/' className='font-title text-white h-8 flex'>
        <span className='m-auto'>DASHBOARD</span>
      </Link>
      <nav className='bg-grey-dark h-full flex flex-col w-36'>
        <ul className='w-full'>
          <li className='h-8 flex items-center mb-14'>
            <MenuButton to="/" text="Home" icon={home_icon}/>
          </li>
          <li>
            <ProductButtonList to="/lights" text="LIGHT" icon={light_icon}/>
          </li>
          <li className='pt-6'>
            <MenuButton to="/radiators" text="RADIATOR" icon={temperature_icon}/>
          </li>
          
        </ul>
      </nav>
    </div>
  );
}
