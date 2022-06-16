import { useState } from "react"
import fecha from "../helpers/fecha"
import FileMenu from './FileMenu'


export default function File({data:{originalName,createdAt,id,name}}) {
  const [openMenu,setOpenMenu] = useState(false)
  return (
  <>
    <article onClick={()=>setOpenMenu(!openMenu)} className={` ${openMenu&&"z-40"} flex mx-2 relative hover:cursor-pointer hover:bg-cyan-600 transition-colors ease-in-out duration-200 `}>
      <p>📄{originalName}</p>
      <p className="absolute right-5">{fecha(createdAt)}</p>
     {openMenu&&<FileMenu name={name}/>}
    </article>
    {openMenu&&<div onClick={()=>setOpenMenu(false)} className="fixed left-0 top-0 h-screen w-screen overflow-hidden z-30 "></div>}
  </>
  )
}
