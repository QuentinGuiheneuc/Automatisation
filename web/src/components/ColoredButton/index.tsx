import React from 'react';

import { Link } from 'react-router-dom'

type props = {
  text: string,
  to: string,
  onClick: React.MouseEventHandler<HTMLAnchorElement>
  className: string,
}

export default function ColoredButton({text, to, onClick, className}: props) {
  return (
    <Link to={to} onClick={onClick} type="submit" className={`bg-gradient-to-r from-blue-green to-blue-light max-w-max px-4 shadow-2xl text-xs ${className}`}>
      {text}
    </Link>
  )
}
