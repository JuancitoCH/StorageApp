import React from 'react'
import { Link } from 'react-router-dom'
import Payment from '../components/Payment'

export default function Home() {
    return (
        <div>
            <section className='bg-red-500 flex flex-col items-center'>
                <h1 className='text-3xl font-semibold'>Acceso sencillo y seguro a tu contenido</h1>
                <h3 className='text-xl font-semibold' >Guarda, comparte y colabora en archivos y carpetas desde tu dispositivo móvil, tablet u ordenador</h3>
                <Link to={'/login'}>
                    <button className=' border-gray-400 rounded-md py-2 px-4 font-semibold hover:bg-blue-600 ease-in'>Acceder</button>
                </Link>
                <Link to={'/signup'}>Registrate</Link>
            </section>
            <img src="" alt="" />
            {/* <Payment/> */}
            
            <Link to={'/folders'}>Mis Carpetas</Link>
        </div>
    )
}
