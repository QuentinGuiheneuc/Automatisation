import React from 'react';
import { Link } from 'react-router-dom';

type props = {
    to: string;
    text: string;
    icon: string;
}; 

export default function MenuButton({ to, text, icon }: props) {

    return (
        <Link to={to} className='flex flex-row items-start pl-3'>
            <img src={icon} className='w-5 h-5' alt={`${text} icon`}/>
            <span className='text-base ml-3 text-grey-light'>{text}</span>
        </Link>
    );
}
