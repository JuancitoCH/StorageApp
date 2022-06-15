const {uploadFiles,deleteFile, downloadFile, getSizeFolderUser} = require('../libs/storage')
const client = require("../libs/dbClient")
const path = require('path')
const { getInfoSuscription } = require('./subscriptions')


class File{

    async getAll(){
        return await client.file.findMany()
    }

    async get(fileName,res){
        const file = await client.file.findUnique({
            where:{
                name:fileName
            }
        })
        if(!file) return {success:false,message:'File Not Found'}
        
        return await downloadFile(fileName,res)
    }

    async uploadMany(files,{data:{id:idUser}},{folderId=''}){

        const canUpload = await this.limitUploadFiles(idUser,files)
        if(!canUpload.success) return canUpload

        const results = await uploadFiles(files,idUser)
        const uploadedFiles = results.map(async file=>{
            if(file.value.success){
                const results = await client.file.create({
                    data:{
                        originalName:file.value.originalName,
                        name:file.value.fileName,
                        size:file.value.size,
                        owner:{
                            connect:{
                                id:parseInt(idUser)
                            }
                        },
                        ...(folderId && {folder:{
                            connect:{
                                id:parseInt(folderId)
                            }
                        }})
                    }
                })
                return{
                    success:true,
                    file:results
                }
            }
            else{
                return{
                    success:false,
                    message:'An Error ocurred'
                }
            }
        })
        return await (await Promise.allSettled(uploadedFiles)).map(result=>result.value)    
    }


    async deleteMany(files,{data:{id:idUser}}){
        const resultPromises = files.map(file=>this.deleteOne(file,idUser))
        return (await Promise.allSettled(resultPromises)).map(result=>result.value)
    }


    async deleteOne(file,idUser){
        const result = await deleteFile(file,idUser)
        if(result.success){
            try{
                const deletedFile = await client.file.delete({
                    where:{
                        name:result.fileName
                    }
                })
                return {
                    success:true,
                    file:deletedFile
                }
            }
            catch(error){
                console.log(error)
                return {
                    success:false,
                    message:'File Deleted, but BD Error.'
                }
            }
        }
        else{
            return result
        }
    }

    async changeFolderFile({userId,id,folderId=null}){
        try{
            const responseData = await client.file.updateMany({
                where:{
                    ownerId:userId,
                    id:parseInt(id)
                },
                data:{
                    folderId:parseInt(folderId) || folderId
                }
            })
            return {
                data:responseData,
                success: responseData.count===0 ? false : true,
                ...responseData.count===0 && {message:'File not found'}
            }

        }catch(error){
            console.log(error);
            return {
                success:false,
                message:'An Error Ocurred'
            }
        }

    }

    async rename({userId,id,name}){
        try{
            const file = await client.file.findFirst({
                where:{
                    ownerId:userId,
                    id:parseInt(id)
                }
            })
            if(!file) return {
                success:false,
                message:'File not Found'
            }

            const responseData = await client.file.update({
                where:{
                    id:parseInt(id)
                },
                data:{
                    name:name + path.extname(file.originalName)
                }
            })
            return {
                success:true,
                data:responseData
            }

        }catch(error){
            console.log(error)
            return{
                success:false,
                message:'An Error Ocurred'
            }
        }
    }

    async limitUploadFiles(idUser,files){
        const suscription = await getInfoSuscription(idUser)
        const limit ={
            // FREE:1e+9,
            FREE:1000000,
            PREMIUM:1e+10,
            ENTERPRISE:1e+11,
        }
        const sizes = await getSizeFolderUser(idUser)

        let sizeTotalUser =0
        let fileSize =0

        files.forEach( file => fileSize+=file.size )
        sizes.forEach( size => sizeTotalUser+=size )

        if((sizeTotalUser+fileSize)>=limit[suscription.type]) return {
            success:false,
            message:'You Reach the size limit'
        }

        return {
            success:true
        }

    }
}

module.exports = File