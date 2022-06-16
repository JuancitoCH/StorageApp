import { get } from '../api/axios'
import '../css/FileMenu.css'

export default function FileMenu({name}) {
  function download(e){
    e.preventDefault()
    fetch("http://localhost:4000/api/files/"+name,{
      mode:'cors',
      credentials:'include'
    })
    .then(response=>response.blob())
    .then(blob=>{
      let blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a')
      a.href = blobUrl
      a.setAttribute('download',name)
      a.target='_blank'
      a.click()
      a.remove()
    })
  }

  function open(e){
    e.preventDefault()
    const a = document.createElement('a')
    a.href = "http://localhost:4000/api/files/"+name
    a.target='_blank'
    a.click()
    a.remove()
  }

  
  return (
    <div onClick={(e)=>e.preventDefault()} className="absolute menuAnimate bg-slate-700 z-50 border-b-2">
        <button className='block w-full p-2 hover:text-emerald-600 hover:bg-slate-800' >Rename</button>
        <button onClick={open} className='block w-full p-2 hover:text-emerald-600 hover:bg-slate-800' >Open</button>
        <button onClick={download} className='block w-full p-2 hover:text-emerald-600 hover:bg-slate-800' >Download</button>
    </div>
  )
}
