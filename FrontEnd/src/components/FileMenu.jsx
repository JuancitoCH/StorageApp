import { deleteA, patch, post } from '../api/axios'
import '../css/FileMenu.css'
import {useDispatch} from 'react-redux'
import { filesChangedFunction } from '../features/files/filesSlice'

export default function FileMenu({ name, renameInput }) {
  const Dispatch = useDispatch()


  function download(e) {
    e.preventDefault()
    fetch("http://localhost:4000/api/files/" + name, {
      mode: 'cors',
      credentials: 'include'
    })
      .then(response => response.blob())
      .then(blob => {
        let blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a')
        a.href = blobUrl
        a.setAttribute('download', name)
        a.target = '_blank'
        a.click()
        a.remove()
      })
  }

  function open(e) {
    e.preventDefault()
    const a = document.createElement('a')
    a.href = "http://localhost:4000/api/files/" + name
    a.target = '_blank'
    a.click()
    a.remove()
  }

  function renameFile(e) {
    const inputRename = renameInput.current
    const contenidoP = renameInput.current.previousSibling
    const name = contenidoP.textContent.substring(3, contenidoP.textContent.length)

    inputRename.value = name
    inputRename.classList = 'bg-slate-400'
    inputRename.focus()
    inputRename.select()
    contenidoP.textContent = '📄'

    inputRename.addEventListener('keypress', async (e) => {
      if (e.key !== 'Enter') return
      const inputContent = inputRename.value
      const idFile = contenidoP.parentNode.getAttribute('idfile')
      patch('/api/files/rename/' + idFile, {
        name: inputContent || 'sinNombre'
      })
        .then(({data}) => {
          console.log(data)
          contenidoP.textContent ='📄 '+data.data.originalName
          inputRename.classList = 'hidden'
        })
    })
  }
  async function deleteFile(e){
    post('/api/files/delete',{
      files:[ name ]
    })
    .then(({data})=>{
      Dispatch(filesChangedFunction())
    })
  }

  return (
    <div onClick={(e) => e.preventDefault()} className="absolute menuAnimate bg-slate-700 z-50 border-b-2">
      <button onClick={renameFile} className='block w-full p-2 hover:text-emerald-600 hover:bg-slate-800' >Rename</button>
      <button onClick={open} className='block w-full p-2 hover:text-emerald-600 hover:bg-slate-800' >Open</button>
      <button onClick={download} className='block w-full p-2 hover:text-emerald-600 hover:bg-slate-800' >Download</button>
      <button onClick={deleteFile} className='block w-full p-2 hover:text-emerald-600 hover:bg-slate-800' >Delete</button>
    </div>
  )
}
