const client = require("../libs/dbClient")
const UserClass = require('./users')

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
        if(user.password !== data.password) return { success:false,message:'invalid email or password' }
        return {
            success:true,
            data:user
        }
    }
    async register(data){
        data.email = data.email.replace(' ','')
        if(!this.emailRegex.test(data.email)) return { success:false,message:'email malformed' }
        if(!this.passwordRegex.test(data.password))return { success:false,message:'password malformed, it musnt have spaces and least 8 characters' }

        const user = await this.UserService.create(data)
        return {
            success:true,
            data:user
        }
    }
}

module.exports=Auth