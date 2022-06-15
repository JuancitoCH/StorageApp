import { useState } from 'react'
import { useEffect } from 'react'
import { get } from '../api/axios'
import Folder from '../components/Folder'
import File from '../components/File'
import { useParams, Link } from 'react-router-dom'

export default function MyFolders() {
  const [myFolders, setMyFolders] = useState([])
  const [myFiles, setMyFiles] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const url = id ? '/api/folders/myfolders/' + id : '/api/folders/myfolders'
    get(url)
      .then(({ data }) => {
        if (data.success) {
          setMyFolders(data.folders)
          setMyFiles(data.files)
        }
      })
  }, [id])

  return (
    <div className='bg-indigo-800 text-white p-2'>
      <Link to={'/folders'}>
        <h1>MIS CARPETAS</h1>
      </Link>
      <section className='bg-gray-600 text-white py-2 rounded-lg relative'>
        {myFolders.map((data, i) => <Folder key={i} data={data} />)}
        {myFiles.map((data, i) => <File key={i} data={data} />)}
      </section>
    </div>
  )
}
