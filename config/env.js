require('dotenv').config()
// console.log(process.env.MODE.length)
const config = {
    mode:process.env.MODE,
    bucket_name:process.env.BUCKET_NAME,
    port:process.env.PORT,
}

module.exports= config