import React from 'react';

import profile_icon from '../../../assets/icons/profile_icon.png'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/store';
import { logout } from '../../../states/authSlice';
import ColoredButton from '../../ColoredButton';

export default function TopBar() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className='h-8 bg-grey-dark text-white flex flex-row items-center pr-12 space-x-10 justify-end'>
      <div className='flex flex-row items-center'>
        <img src={profile_icon} alt='user icon' className='h-5 w-5 mr-3'/>
        <span>Edouard Laffont</span>
      </div>
      <span>Admin</span>
      <ColoredButton text='LOGOUT' onClick={handleClick} to='login' className='text-black text-xxs'/>
    </div>
  );
}
