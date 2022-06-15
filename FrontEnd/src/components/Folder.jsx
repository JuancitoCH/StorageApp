import { useNavigate } from "react-router-dom"
import fecha from "../helpers/fecha"

export default function Folder({data:{name,id,parentFolderId,createdAt}}) {
  const navigate = useNavigate()
  function carpeta(){
    navigate('/folders/'+id)
  }

  return (
    <article onClick={carpeta} folderid={id} className="flex mx-2 relative">
      <p>📁{name}</p>
      <p className="absolute right-5" >{fecha(createdAt)}</p>
    </article>
  )
}
