const {mode} = require('../config/env')

const cookieResponse=(res,data)=>{
    const {token=''} = data
    delete data.token
    const date = new Date(new Date().setDate(new Date().getDate()+7))
    return res.cookie('token',token,{
        httpOnly:true,
        // ...(mode!=='dev')&&( {secure:true, sameSite:'none'} ),
        ...(mode!=='dev')&&( {sameSite:'none'} ),
        expires:date
    }).json(data)
}

module.exports = cookieResponse