const express = require('express')
const FoldersService = require('../services/folders')
const {isUser} = require('../middleware/auth')

const Folder = (app) =>{
    const router = express.Router()
    const folderServ = new FoldersService()

    app.use('/api/folders',router)


    router.get('/myfolders',isUser, async (req,res)=>{
        const result = await folderServ.getMyFolders({
            userId:req.userData.data.id
        })
        return res.status(result.success?200:400).json(result)
    })
    router.get('/myfolders/:id',isUser, async (req,res)=>{
        const {id} = req.params
        const result = await folderServ.getById({
            userId:req.userData.data.id,
            id
        })
        return res.status(result.success?200:400).json(result)
    })

    router.post('/',isUser, async (req,res)=>{
        const {name,parentFolderId}= req.body
        const result = await folderServ.create({
            userId:req.userData.data.id,
            name,
            parentFolderId
        })
        return res.status(result.success?200:400).json(result)
    })
}

module.exports = Folder