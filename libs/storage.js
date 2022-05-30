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

const uploadFile = (file) => {
    if(!file) return {success:false,message:'File is required'}

    const ext = path.extname(file.originalname)
    const fileName = uuid.v4() + ext
    const cloudFile = storage.bucket(bucket_name).file(fileName) //ref en la nube
    const fileStream = Readable.from(file.buffer)

    return new Promise((resolve,reject)=>{
        fileStream.pipe(cloudFile.createWriteStream())
            .on('finish', () => {
                resolve({
                    success:true,
                    message:'File Uploaded Succesfully',
                    originalName:file.originalname,
                    fileName
                })
            })
            .on('error', (error) => {
                console.log(error)
                reject({
                    success:false,
                    message:'an error ocurred',
                    error
                })
            })

    })
}

const uploadFiles = async (files) => {
    const results = await Promise.allSettled(files.map(file=>{
        return uploadFile(file)
    }))
    // console.log(results)
    return results
}

module.exports = {uploadFiles,uploadFile}