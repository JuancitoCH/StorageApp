import React,{useState} from 'react'
import LeftSlider from './LeftSlider'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import { logged } from '../features/user/userSlice'

export default function Header() {
  const [menu,setMenu]= useState(false)
  const {login} = useSelector(state=>state.user)
  const Dispatch = useDispatch()
  useEffect(()=>{
    Dispatch(logged())
  },[])

  console.log(login)
  return (
    <header className='bg-slate-400 flex p-2 items-center'>
        <LeftSlider state={menu} />
        <button onClick={()=>setMenu(!menu)} className='hover:text-rose-500 h-3 w-3'>|||</button>
        <img src="" alt="" />
        <Link to={'/'}>
          <h1 className='text-5xl font-semibold'>STORAGEAPP</h1>
        </Link>
        <div className={`w-10 h-10 rounded-full bg-emerald-500 opacity-0 ${login&&'opacity-100'} transition-opacity ease-in duration-1000`}>
          {/* <img src="" alt="" /> */}
        </div>
          <p className={`font-semibold text-xl text-emerald-500 opacity-0 ${login&&'opacity-100'} transition-opacity ease-in duration-1000`}>Logged</p>
    </header>
  )
}
