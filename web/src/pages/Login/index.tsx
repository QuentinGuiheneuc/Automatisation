import React from 'react';

import Input from '../../components/Input';
import ColoredSubmitButton from '../../components/ColoredSubmitButton';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../store/store'
import { login } from '../../states/authSlice';

export default function Login() {
    const navigate: NavigateFunction = useNavigate()

    const dispatch = useAppDispatch()

    const handleSubmit = () => {
        dispatch(login())
        navigate('/')
    }
    
    return (
        <div className='flex flex-col items-center h-full bg-black'>
            <div className='mt-36 w-28%'>
                <h1 className='text-white text-3xl mb-5'>Sign In</h1>
                <form onSubmit={handleSubmit} className='pl-14 pr-14 pt-10 pb-10 bg-grey-dark space-y-10'>
                    <div className='space-y-4'>
                        <Input placeholder='Enter your email' text='Email' type='text'/>
                        <Input placeholder='Enter your password' text='Password' type='password'/>
                    </div>
                    <ColoredSubmitButton text='SIGN IN' className='text-sm'/>
                </form>
            </div>
        </div>
    );
}