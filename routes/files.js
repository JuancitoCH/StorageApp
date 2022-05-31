const express = require('express')
const upload = require('../middleware/uploadFile') //midldware
const {deleteFile} = require('../libs/storage')
const FilesService = require('../services/files')

function files(app){
    const router = express.Router()
    const fileServ = new FilesService()

    app.use('/api/files',router)

    router.get('/', async (req,res)=>{
        const files = await fileServ.getAll()
        return res.json(files)
    })

    router.post('/upload',upload.array('files'),async(req,res)=>{
        // console.log(req.files)
        const response = await fileServ.uploadMany(req.files,req.body.id)
        return res.json(response)
    })
    router.delete('/delete',async(req,res)=>{
        const {files} = req.body
        const response = await fileServ.deleteMany(files)
        return res.json(response)
    })
}

module.exports=files