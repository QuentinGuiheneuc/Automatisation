import React from 'react';

import search_icon from '../../assets/icons/search_icon.png';

export default function SearchBar() {
  return (
    <div className="flex flex-row text-white border border-grey-light items-center pl-2 pr-2 mr-12">
        <input type='text' className='bg-transparent text-xxs w-36 focus:outline-none'/>
        <img src={search_icon} alt='search icon' className='w-3 h-3'/>
    </div>
  );
}
