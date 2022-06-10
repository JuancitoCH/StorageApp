const express = require('express')
const upload = require('../middleware/uploadFile') //midldware
const FilesService = require('../services/files')
const {isAmdmin,isUser} = require('../middleware/auth')

function files(app){
    const router = express.Router()
    const fileServ = new FilesService()

    app.use('/api/files',router)

    router.get('/',isAmdmin, async (req,res)=>{
        const files = await fileServ.getAll()
        return res.json(files)
    })

    router.get("/:fileName",isUser,async(req,res)=>{
        const result = await fileServ.get(req.params.fileName,res)
        if(result.success) return res.end()
        if(!result.success)return res.status(404).json(result)
    })

    router.post('/upload',isUser,upload.array('files'),async(req,res)=>{
        // console.log(req.files)
        const response = await fileServ.uploadMany(req.files,req.userData,req.body)
        return res.json(response)
    })
    router.delete('/delete',isUser,async(req,res)=>{
        const {files} = req.body
        const response = await fileServ.deleteMany(files,req.userData)
        return res.json(response)
    })
}

module.exports=files