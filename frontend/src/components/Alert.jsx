import React, { useState } from 'react'

const Alert = (props) => {


  if(!props.alert){
    return null;
  }

  const alertStyles = {
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    success: 'bg-green-100 border-green-500 text-green-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    error: 'bg-red-100 border-red-500 text-red-700',
  };
  
  return (
    <div className={`w-full flex justify-center items-center absolute h-10 ${alertStyles[props.alert.type]} z-20`}>
      <p className="font-bold">{props.alert.message}</p>
    </div>
  )
}

export default Alert