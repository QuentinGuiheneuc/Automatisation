import React from 'react';

type props = {
    nbNotifications: number,
    icon: string,
    className: string
}

export default function NotificationIcon({ nbNotifications, icon, className }: props) {
  return (
    <div className='relative'>
      <img src={icon} alt='notification icon' className={className}/>
      {nbNotifications > 0 &&
        <div className='absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red flex items-center justify-center'>
          <span className='text-white text-xxxs'>{nbNotifications}</span>
        </div>
      }
    </div>
  );
}
