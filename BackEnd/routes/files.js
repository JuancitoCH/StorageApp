const express = require('express')
const upload = require('../middleware/uploadFile') //midldware
const FilesService = require('../services/files')
const {isAmdmin,isUser} = require('../middleware/auth')

function files(app){
    const router = express.Router()
    const fileServ = new FilesService()
    
    app.use('/api/files',router)
    
    router.get('/user/space',isUser,async(req,res)=>{
        const response = await fileServ.getUserCurrentSpace(req.userData.data.id)
        return res.json(response)
    })
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

    router.patch('/move/:id',isUser,async(req,res)=>{
        const response = await fileServ.changeFolderFile({
            userId:req.userData.data.id,
            folderId:req.body.folderId,
            id:req.params.id
        })
        return res.json(response)
    })
    router.patch('/rename/:id',isUser,async(req,res)=>{
        const response = await fileServ.rename({
            userId:req.userData.data.id,
            id:req.params.id,
            name:req.body.name
        })
        return res.json(response)
    })

    router.post('/delete',isUser,async(req,res)=>{
        const {files} = req.body
        const response = await fileServ.deleteMany(files,req.userData)
        return res.json(response)
    })

    // router.get('/limit/limit',isUser,async(req,res)=>{
        
    //     return res.json(await getSizeFolderUser(req.userData.data.id))
    // })
}

module.exports=files