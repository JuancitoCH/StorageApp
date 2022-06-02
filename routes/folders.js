const express = require('express')
const FoldersService = require('../services/folders')

const Folder = (app) =>{
    const router = express.Router()
    const folderServ = new FoldersService()

    app.use('/api/folders',router)


    router.get('/myfolders', async (req,res)=>{
        const result = await folderServ.getMyFolders({
            ...req.body
        })
        return res.status(result.success?200:400).json(result)
    })

    router.post('/', async (req,res)=>{
        const result = await folderServ.create({
            ...req.body
        })
        return res.status(result.success?200:400).json(result)
    })
}

module.exports = Folder