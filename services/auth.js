const client = require("../libs/dbClient")
const UserClass = require('./users')
const jwt = require('jsonwebtoken')
const {jwt_secret}= require('../config/env')
class Auth{
    constructor(){
        this.UserService = new UserClass()
        this.emailRegex = new RegExp(/^[\w.]+@[\w]+\.{1}[\w]+(.{1}[\w]+)*$/)
        this.passwordRegex = new RegExp(/^([\wñ]{8})[\wñ]*$/)
    }
    async login(data){
        // validacion de email y formateo
        data.email = data.email.replace(' ','')
        if(!this.emailRegex.test(data.email)) return { success:false,message:'email malformed' }

        const user = await this.UserService.getOne(data)
        if(!user) return { success:false,message:'User Not Register' }
        if(user.password !== data.password) return { success:false,message:'invalid email or password' }
        const token = this.generateToken(user)
        delete user.password
        return {
            success:true,
            data:user,
            token
        }
    }
    async register(data){
        data.email = data.email.replace(' ','')
        if(!this.emailRegex.test(data.email)) return { success:false,message:'email malformed' }
        if(!this.passwordRegex.test(data.password))return { success:false,message:'password malformed, it musnt have spaces and least 8 characters' }

        const {user,success} = await this.UserService.create(data)

        if(!success) return { success:false, error:'an error ocurred' }

        const token = this.generateToken(user)
        delete user.password
        return {
            success:true,
            data:user,
            token
        }
    }
    generateToken(data){
        return jwt.sign(
            { data },
            jwt_secret,
            { expiresIn:'5d' }
        )
    }
}

module.exports=Auth