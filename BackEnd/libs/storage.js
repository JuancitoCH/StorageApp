const { Storage } = require("@google-cloud/storage")
const { bucket_name } = require('../config/env')
const { Readable } = require('stream')
const uuid = require('uuid')
const path = require('path')


// documentacion
// https://www.npmjs.com/package/@google-cloud/storage

const storage = new Storage({
    keyFilename: 'credentials.json'
})

// pipe consume el archivo y lo envia a lo que esta entre parentesis
// originalFile.pipe(file.createWriteStream())

const uploadFile = (file,idUser) => {
    if (!file) return { success: false, message: 'File is required' }

    const ext = path.extname(file.originalname)
    const fileName = uuid.v4() + ext
    const cloudFile = storage.bucket(bucket_name).file(idUser+'/'+fileName) //ref en la nube
    const fileStream = Readable.from(file.buffer)

    return new Promise((resolve, reject) => {
        fileStream.pipe(cloudFile.createWriteStream())
            .on('finish', () => {
                resolve({
                    success: true,
                    message: 'File Uploaded Succesfully',
                    originalName: file.originalname,
                    fileName,
                    size:file.size
                })
            })
            .on('error', (error) => {
                console.log(error)
                reject({
                    success: false,
                    message: 'an error ocurred',
                    error
                })
            })

    })
}

const downloadFile = async (fileName,res,idUser) => {
    const file = storage.bucket(bucket_name).file(idUser+'/'+fileName)
    const stream = file.createReadStream()

    return new Promise((resolve,reject)=>{
        stream.on('error', (error) => {
            console.log(error)
            reject({
                success:false,
                message:"an error ocurred",
                error
            })
        })
        stream.pipe(res)
        
        stream.on('end',()=>{
            resolve({
                success:true,
                message:'downloaded successfully'
            })
        })
    })
}

const deleteFile = async (fileName,idUser) => {
    const file = storage.bucket(bucket_name).file(idUser+'/'+fileName)
    try {
        await file.delete() //http response

        return {
            success: true,
            fileName
        }
    }
    catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'an Error Ocurred or File not Found'
        }
    }
}

const deleteFolderUser = async (idUser) =>{
    try{
        const file = await storage.bucket(bucket_name).deleteFiles({prefix:idUser+'/'})
        return{
            success:true
        }
    }catch (error){
        console.log(error)
        console.log('an Error Ocurred on GCloud')
        return {
            success:false,
            message: 'an Error Ocurred'
        }
    }
}

const uploadFiles = async (files,idUser) => {
    const results = await Promise.allSettled(files.map(file => {
        return uploadFile(file,idUser)
    }))
    // console.log(results)
    return results
}

const getSizeFolderUser = async (idUser)=>{
    try{
        const [folder] = await storage.bucket(bucket_name).getFiles({
            prefix:idUser+'/'
        })
        const sizes = folder.map(file => {
            // console.log(file.metadata.name);
            // console.log(file.metadata.size);
            return Number.parseInt(file.metadata.size)
          });
        return sizes
    }catch(err){
        console.log(err)
        return{
            success:false
        }
    }
    
}

module.exports = { 
    uploadFiles,
    uploadFile,
    deleteFile,
    downloadFile,
    deleteFolderUser,
    getSizeFolderUser
}