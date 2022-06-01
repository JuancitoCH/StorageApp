const {uploadFiles,deleteFile, downloadFile} = require('../libs/storage')
const client = require("../libs/dbClient")


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

    async uploadMany(files,idUser){
        const results = await uploadFiles(files)
        const uploadedFiles = results.map(async file=>{
            if(file.value.success){
                const results = await client.file.create({
                    data:{
                        originalName:file.value.originalName,
                        name:file.value.fileName,
                        owner:{
                            connect:{
                                id:parseInt(idUser)
                            }
                        }
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


    async deleteMany(files){
        const resultPromises = files.map(this.deleteOne)
        return (await Promise.allSettled(resultPromises)).map(result=>result.value)
    }


    async deleteOne(file){
        const result = await deleteFile(file)
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
}

module.exports = File