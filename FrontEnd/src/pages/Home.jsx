import React from 'react'
import { Link } from 'react-router-dom'
import home from '../public/svg/home.svg'
import { GrFormClose, GrFormCheckmark } from 'react-icons/gr'

export default function Home() {
    return (
        <div>
            <section className='mt-16 flex flex-col items-center'>
                <img className='w-96' src={home} alt="" />
                <h1 className='text-3xl font-semibold'>Acceso sencillo y seguro a tu contenido</h1>
                <h3 className='text-xl font-semibold' >Guarda, comparte y colabora en archivos y carpetas desde tu dispositivo móvil, tablet u ordenador</h3>
                <Link to={'/login'}>
                    <button className='mt-4 border-2 hover:text-pink-500 border-slate-700 rounded-md py-2 px-4 font-semibold hover:border-pink-500 ease-in'>Acceder</button>
                </Link>
                {/* <Link to={'/signup'}>Registrate</Link> */}
            </section>
            <img src="" alt="" />

            <Link to={'/folders'}>Mis Carpetas</Link>
            <div className=' grid grid-cols-3 h-[calc(40rem)] gap-3 m-5'>
                <article className=' bg-slate-400 h-full rounded-md text-center pt-10'>
                    <h2 className='font-semibold text-5xl mb-10'>Free</h2>
                    <ul className='text-xl font-medium'>
                        <li className=' mx-8 flex gap-2'><GrFormCheckmark /> Almacenamiento de archivos</li>
                        <li className=' mx-8 flex gap-2'><GrFormClose /> Almacenamiento de archivos</li>
                        <li className=' mx-8 flex gap-2'><GrFormClose /> Almacenamiento de archivos</li>
                        <li className=' mx-8 flex gap-2'><GrFormClose /> Almacenamiento de archivos</li>
                        <li className=' mx-8 flex gap-2'><GrFormClose /> Almacenamiento de archivos</li>
                    </ul>
                    <h3 className='font-normal text-4xl'>Cost</h3>
                    <h3 className='font-normal text-4xl'>$0.00</h3>
                    <Link to={'/login'}>
                        <button className='mt-4 border-2 hover:text-pink-500 border-slate-700 rounded-md py-2 px-4 font-semibold hover:border-pink-500 ease-in'>Login</button>
                    </Link>
                </article>
                <article className=' bg-slate-700 text-slate-100 h-full rounded-md text-center pt-10'>
                    <h2 className='font-semibold text-5xl mb-10'>Premium</h2>
                    <ul className='text-xl font-medium'>
                        <li className=' mx-8 flex gap-2'><GrFormCheckmark /> Almacenamiento de archivos</li>
                        <li className=' mx-8 flex gap-2'><GrFormClose /> Almacenamiento de archivos</li>
                        <li className=' mx-8 flex gap-2'><GrFormClose /> Almacenamiento de archivos</li>
                        <li className=' mx-8 flex gap-2'><GrFormClose /> Almacenamiento de archivos</li>
                        <li className=' mx-8 flex gap-2'><GrFormClose /> Almacenamiento de archivos</li>
                    </ul>
                    <h3 className='font-normal text-4xl'>Cost</h3>
                    <h3 className='font-normal text-4xl'>$8.00</h3>
                    <Link to={'/suscription/premium'}>
                        <button className='mt-4 border-2 hover:text-pink-500 border-slate-700 rounded-md py-2 px-4 font-semibold hover:border-pink-500 ease-in'>Login</button>
                    </Link>
                </article>
                <article className=' bg-slate-800 text-slate-100 h-full rounded-md text-center pt-10'>
                    <h2 className='font-semibold text-5xl mb-10'>Enterprise</h2>
                    <ul className='text-xl font-medium'>
                        <li className=' mx-8 flex gap-2'><GrFormCheckmark /> Almacenamiento de archivos</li>
                        <li className=' mx-8 flex gap-2'><GrFormClose /> Almacenamiento de archivos</li>
                        <li className=' mx-8 flex gap-2'><GrFormClose /> Almacenamiento de archivos</li>
                        <li className=' mx-8 flex gap-2'><GrFormClose /> Almacenamiento de archivos</li>
                        <li className=' mx-8 flex gap-2'><GrFormClose /> Almacenamiento de archivos</li>
                    </ul>
                    <h3 className='font-normal text-4xl'>Cost</h3>
                    <h3 className='font-normal text-4xl'>$16.00</h3>
                    <Link to={'/suscription/enterprise'}>
                        <button className='mt-4 border-2 hover:text-pink-500 border-slate-700 rounded-md py-2 px-4 font-semibold hover:border-pink-500 ease-in'>Login</button>
                    </Link>
                </article>
            </div>
        </div>
    )
}
