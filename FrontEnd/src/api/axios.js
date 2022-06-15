import axios from 'axios'


const axiosInstance = axios.create({
    baseURL:'http://localhost:4000'
})

const get = async (url)=>{
    return await axiosInstance.get(url,{
        withCredentials:true
    })
}
const post = async (url,data)=>{
    return await axiosInstance.post(url,data,{
        withCredentials:true
    })
}
const deleteA = async (url,data)=>{
    return await axiosInstance.delete(url,data,{
        withCredentials:true
    })
}

export {
    get,
    post,
    deleteA
}