import React from 'react'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import {login} from '../features/user/userSlice'

export default function Login() {
  const Dispatch = useDispatch()
  const {login:loginState} = useSelector((state)=>state.user)
  const navigate = useNavigate()
  useEffect(()=>{
    if(loginState) navigate('/folders')
  },[loginState])

  async function loginForm(e){
    e.preventDefault()
    
    const data = await Dispatch(login({
      email:e.target.email.value,
      password:e.target.password.value
    }))
    if(data.payload.success) navigate('/folders')
  }

  return (
    <div className='flex flex-col gap-3 mt-5 w-1/3 mx-auto shadow-lg p-10 rounded-sm'>
      <h1 className='text-3xl mx-auto font-semibold'>Login</h1>
      <form className='flex flex-col gap-5' onSubmit={loginForm}>
        <Input type="text" name='email' placeholder='Email'/>
        <Input type="password" name='password' placeholder='Password'/>
        <button className='border-2 mx-12'>Login</button>
        <Link className='text-blue-400 mx-auto hover:text-blue-700' to={'register'}>Not Have an Account Yet?</Link>
      </form>
      <button>Acceder con Google</button>
    </div>
  )
}
