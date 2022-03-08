import React from 'react';

import './styles.css'

type props = {
  text: string,
  className: string
}

export default function ColoredSubmitButton({text, className}: props) {
  return (
    <button type="submit" className={`btn bg-gradient-to-r from-blue-green to-blue-light max-w-max px-4 shadow-2xl ${className}`}>
      {text}
    </button>
  )
}
