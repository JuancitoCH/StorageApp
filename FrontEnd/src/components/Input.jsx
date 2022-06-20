import React from 'react'

export default function Input({type,placeholder,name=''}) {
  return (
    <input className='shadow-md p-2 rounded-md outline-none' type={type} placeholder={placeholder} name={name} />
  )
}
