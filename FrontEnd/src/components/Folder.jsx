import { useNavigate } from "react-router-dom"
import fecha from "../helpers/fecha"

export default function Folder({data:{name,id,parentFolderId,createdAt}}) {
  const navigate = useNavigate()
  function carpeta(){
    navigate('/folders/'+id)
  }

  return (
    <article onClick={carpeta} folderid={id} className="flex mx-2 relative hover:cursor-pointer hover:bg-purple-500 transition-colors ease-in-out duration-200">
      <p>📁{name}</p>
      <p className="absolute right-5" >{fecha(createdAt)}</p>
    </article>
  )
}
