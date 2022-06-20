import { useNavigate } from "react-router-dom"
import { patch } from "../api/axios"
import fecha from "../helpers/fecha"
import FolderMenu from "./FolderMenu"
import {useDispatch} from 'react-redux'
import { filesChangedFunction } from '../features/files/filesSlice'

export default function Folder({data:{name,id,parentFolderId,createdAt}}) {

  const Dispatch = useDispatch()
  const navigate = useNavigate()
  function carpeta(e){
    navigate('/folders/'+id)
  }

  const appendFile=async (e)=>{
    const idFile = e.dataTransfer.getData('file')
    patch('/api/files/move/'+idFile,{
      folderId: parseInt(id)
    })
    .then( data=>Dispatch(filesChangedFunction()) )
  }

  return (
    <div className="relative">

    <article onDrop={appendFile} onDragOver={e=>e.preventDefault()} onClick={carpeta} folderid={id} className="flex mx-2 relative hover:cursor-pointer hover:bg-purple-500 transition-colors ease-in-out duration-200">
      <p>📁{name}</p>
      <p className="absolute right-5" >{fecha(createdAt)}</p>
    </article>
      <FolderMenu/>
    </div>
  )
}
