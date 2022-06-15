import { useState } from 'react'
import { useEffect } from 'react'
import { get } from '../api/axios'

export default function MyFolders() {
  const [myFolders,setMyFolders] = useState([])
  const [myFiles,setMyFiles] = useState([])
  useEffect(()=>{
    get('/api/folders/myfolders')
    .then(({data})=>{
      if(data.success){
        setMyFolders(data.folders)
        setMyFiles(data.files)
      }
    })

  },[])
  return (
    <section>
        <h1>MIS CARPETAS</h1>
        {console.log(myFolders)}
        {console.log(myFiles)}
    </section>
  )
}
