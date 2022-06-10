const client = require('../libs/dbClient')
const { deleteFile } = require('../libs/storage')

class Folders {

    async getMyFolders({ userId: ownerId }) {
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
            return {
                success: true,
                folders,
                files
            }
        }
        catch (err) {
            console.log(err)
            return {
                success: false
            }
        }
    }

    async getById({ id, userId: ownerId }) {
        try {
            const folders = await client.folder.findFirst({
                where: {
                    ownerId,
                    id: Number.parseInt(id)
                },
                include: {
                    files: true,
                    childFolders: true
                }
            })
            return {
                success: true,
                folders: folders.childFolders,
                files: folders.files
            }
        }
        catch (err) {
            console.log(err)
            return {
                message: 'Folder Not Found',
                success: false
            }
        }
    }

    async create({ name, userId: ownerId, parentFolderId }) {
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

    async deleteFolderId({ id, userId: ownerId }) {
        try {
            await this.deleteFolderChildFiles({ id, userId:ownerId })
            const result = await client.folder.deleteMany({
                where: {
                    id: Number.parseInt(id),
                    ownerId
                }
            })
            return {
                success: true,
                data: result
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: 'An error ocurred'
            }
        }
    }

    async deleteFolderChildFiles(data) {
        console.log('a2')
        const childFolders = await this.getById(data)
        if(!childFolders.folders && !childFolders.files) return { success:true }

        childFolders.files.forEach(async file => {
            await deleteFile(file.name, data.userId)
            // if (!result.success) console.log('ErrorCloud')
        })
        childFolders.folders.forEach(async folder => this.deleteFolderChildFiles({
            id:folder.id,
            userId:data.userId
            }
        ))
    }


    async getAllFolders() {
    return await client.folder.findMany()
    }
}
module.exports = Folders