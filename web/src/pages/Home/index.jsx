import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/store';

export default function Home() {
  const navigate = useNavigate()
  const { isLogged } = useAppSelector((store) => store.auth)

  useEffect(() => {
    if(!isLogged){
      navigate('/login')
    }
  }, [isLogged, navigate])

  return (
    <div className="w-full h-screen text-white">
        <span>Home</span>
    </div>
  );
}