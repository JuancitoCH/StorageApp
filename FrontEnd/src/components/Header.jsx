import React,{useState} from 'react'
import LeftSlider from './LeftSlider'
import { Link } from 'react-router-dom'
export default function Header() {
  const [menu,setMenu]= useState(false)
  return (
    <header className='bg-slate-400 flex p-2 items-center'>
        <LeftSlider state={menu} />
        <button onClick={()=>setMenu(!menu)} className='hover:text-rose-500 h-3 w-3'>|||</button>
        <img src="" alt="" />
        <Link to={'/'}>
          <h1 className='text-5xl font-semibold'>STORAGEAPP</h1>
        </Link>
    </header>
  )
}
