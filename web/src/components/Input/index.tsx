import React from 'react';

type props = {
    placeholder: string,
    text: string,
    type: string
}

export default function Input({ placeholder, text, type }: props) {
  return (
    <div className="flex flex-col text-left text-lg text-white">
        {text.length > 0 &&
          <span className='mb-2 text-xs'>{text} :</span>
        }
        <input placeholder={placeholder} type={type} className='pl-2 pr-2 bg-grey-dark-light border-grey-light border'/>
    </div>
  );
}
