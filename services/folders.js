const client = require('../libs/dbClient')

class Folders {

    async getMyFolders({userId:ownerId}) {
        try {
            const folders = await client.folder.findMany({
                where: {
                    ownerId,
                    parentFolderId: null
                },
                // include:{
                //     owner:{
                //         select:{
                //             id:true,
                //             name:true,
                //             email:true
                //         }
                //     }
                // }
            })
            const files = await client.file.findMany({
                where: {
                    ownerId,
                    folderId: null
                }
            })
            return{
                success:true,
                folders,
                files
            }
        }
        catch (err) {
            console.log(err)
            return{
                success:false
            }
        }
    }

    async getById({id,userId:ownerId}){
        try {
            const folders = await client.folder.findFirst({
                where: {
                    ownerId,
                    id: Number.parseInt(id)
                },
                include:{
                    files:true,
                    childFolders:true
                }
            })
            return{
                success:true,
                folders:folders.childFolders,
                files:folders.files
            }
        }
        catch (err) {
            console.log(err)
            return{
                success:false
            }
        }
    }

    async create({ name, userId:ownerId, parentFolderId }) {
        try {
            const folder = await client.folder.create({
                data: {
                    name,
                    owner: {
                        connect: { id: ownerId }
                    },
                    ...parentFolderId && {
                        parentFolder: {
                            connect: { id: parentFolderId }
                        }
                    }
                }
            })
            return {
                success: true,
                folder
            }
        }
        catch (err) {
            console.log(err)
            return {
                success: false,
                message: 'an error ocurred'
            }
        }
    }

}

module.exports = Folders