import { useState,useEffect,useRef } from 'react'
import { get, post } from '../api/axios'
import Folder from '../components/Folder'
import File from '../components/File'
import { useParams, Link } from 'react-router-dom'
import '../css/MyFolders.css'
import {useSelector} from 'react-redux'

export default function MyFolders() {
  const [myFolders, setMyFolders] = useState([])
  const [loading,setLoading] = useState(false)
  const [myFiles, setMyFiles] = useState([])
  const reference = useRef()
  const { id } = useParams()
  const [uploadReload,setUploadReload]=useState(false)
  const {filesChanged} = useSelector(state=>state.files)

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
  }, [id,uploadReload,filesChanged])

  function uploadFile(e){
    e.preventDefault()
    // console.log(e.target.files.files)
    const formData = new FormData()

    for(let file of e.target.files.files){
      formData.append('files',file)
    }
    id&&formData.append('folderId',id)
    post('/api/files/upload',formData)
    .then(data=>{
      setUploadReload(!uploadReload)
    })
  }

  const labelOnClick=(e)=>{
    // console.log(reference.current)
    reference.current.click()
  }

  return (
    <div className='bg-gray-700 text-white p-2'>
      <Link to={'/folders'}>
        <h1>MIS CARPETAS</h1>
      </Link>


      <form className='bg-gray-600 ml-2 absolute right-3 z-10 w-fit p-2 rounded-t-md' onSubmit={uploadFile} >
        <input ref={reference} className='input-file' name='files' type="file" multiple/>
        <label className='text-2xl font-bold hover:text-pink-500 cursor-pointer' onClick={labelOnClick} htmlFor="files">+</label>
        <button className='border-2 hover:text-pink-500 border-slate-700 rounded-md py-1 px-1 font-semibold hover:border-pink-500 ease-in'>UPLOAD</button>
      </form>


      {!loading&&<div className='fixed w-full text-center text-5xl text-orange-600 z-50'>Loading...</div>}
      <section className='bg-gray-600 text-white py-2 rounded-lg relative'>

        {myFolders.map((data, i) => <Folder key={i} data={data} />)}
        {myFiles.map((data, i) => <File key={i} data={data} />)}
      </section>
    </div>
  )
}
