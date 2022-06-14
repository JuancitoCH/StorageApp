const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/env')

// const isUserFree = (req, res, next) => {
//     const { token } = req.cookies
//     const { data: dataDecode } = jwt.verify(token, jwt_secret)
//     delete dataDecode.password
//     req.userData = dataDecode
//     return next()
// }

const isUser = (req, res, next) => {
    const { token } = req.cookies
    try {
        const { data: dataDecode } = jwt.verify(token, jwt_secret)
        delete dataDecode.password
        req.userData = {
            success:true,
            data:dataDecode,
        }
        return next()
    }
    catch (err) {
        return res.status(400).json({ success: false, message: 'User not Login' })
    }
}
const isAmdmin = (req, res, next) => {
    const { token } = req.cookies
    try {
        const { data: dataDecode } = jwt.verify(token, jwt_secret)
        delete dataDecode.password
        if(dataDecode.email!=='cjuan.chona@hotmail.com')return res.status(400).json({ success: false,message:"User dont have access" })
        req.userData = {
            success:true,
            data:dataDecode,
        }
        return next()
    }
    catch (err) {
        return res.status(400).json({ success: false, message: 'User not Login' })
    }
}

module.exports = {
    // isUserFree,
    isUser,
    isAmdmin
}