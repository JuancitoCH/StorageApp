import { useState } from 'react'
import { useEffect } from 'react'
import { get, post } from '../api/axios'
import Folder from '../components/Folder'
import File from '../components/File'
import { useParams, Link } from 'react-router-dom'

export default function MyFolders() {
  const [myFolders, setMyFolders] = useState([])
  const [loading,setLoading] = useState(false)
  const [myFiles, setMyFiles] = useState([])

  const { id } = useParams()


  useEffect(() => {
    setLoading(false)
    const url = id ? '/api/folders/myfolders/' + id : '/api/folders/myfolders'
    get(url)
      .then(({ data }) => {
        if (data.success) {
          setMyFolders(data.folders)
          setMyFiles(data.files)
          setLoading(true)
        }
      })
      .catch(err=>{
        setLoading((true))
      })
  }, [id])

  function uploadFile(e){
    e.preventDefault()
    console.log(e.target.files.files)
    const formData = new FormData()

    for(let file of e.target.files.files){
      formData.append('files',file)
    }
    id&&formData.append('folderId',id)
    post('/api/files/upload',formData)


  }

  return (
    <div className='bg-gray-700 text-white p-2'>
      <Link to={'/folders'}>
        <h1>MIS CARPETAS</h1>
      </Link>
      <form onSubmit={uploadFile} className=''>
        <p>Upload File</p>
        <input name='files' type="file" multiple/>
        <button>send</button>
      </form>
      {!loading&&<div className='fixed w-full text-center text-5xl text-orange-600 z-50'>Loading...</div>}
      <section className='bg-gray-600 text-white py-2 rounded-lg relative'>

        {myFolders.map((data, i) => <Folder key={i} data={data} />)}
        {myFiles.map((data, i) => <File key={i} data={data} />)}
      </section>
    </div>
  )
}
