require('dotenv').config()
// console.log(process.env.MODE.length)
const config = {
    mode:process.env.MODE_DEV,
    bucket_name:process.env.BUCKET_NAME,
    port:process.env.PORT,
    jwt_secret:process.env.JWT_SECRET,
}

module.exports= config