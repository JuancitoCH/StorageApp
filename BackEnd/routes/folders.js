const express = require('express')
const FoldersService = require('../services/folders')
const {isUser, isAmdmin} = require('../middleware/auth')

const Folder = (app) =>{
    const router = express.Router()
    const folderServ = new FoldersService()

    app.use('/api/folders',router)


    router.get('/all',isAmdmin, async (req,res)=>{
        const result = await folderServ.getAllFolders()
        return res.json(result)
    })
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

    router.patch('/rename/:id',isUser,async(req,res)=>{
        const response = await folderServ.rename({
            userId:req.userData.data.id,
            id:req.params.id,
            name:req.body.name
        })
        return res.json(response)
    })

    router.delete('/delete/:id',isUser, async (req,res)=>{
        const {id}= req.params
        const result = await folderServ.deleteFolderId({
            userId:req.userData.data.id,
            id
        })
        return res.status(result.success?200:400).json(result)
    })
}

module.exports = Folder