const { uploadFiles } = require('../libs/storage')
const client = require("../libs/dbClient")


class File {
    async uploadMany(files, idUser) {
        const results = await uploadFiles(files)
        const uploadedFiles = results.map(async file => {
            if (!file.value.success) return { success: false, message: 'An Error ocurred' }
            const results = await client.file.create({
                data: {
                    originalName: file.value.originalName,
                    name: file.value.fileName,
                    owner: {
                        connect: { id: parseInt(idUser) }
                    }
                }})
            return {
                success: true,
                file: results
            }
        })
        return await (await Promise.allSettled(uploadedFiles)).map(result => result.value)
    }
}

module.exports = File