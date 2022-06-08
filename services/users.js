const { stripe_secret_key } = require("../config/env")
const client = require("../libs/dbClient")
const stripe = require('stripe')(stripe_secret_key)

class user{

    async getOne(data){
        const user = await client.user.findUnique({ 
            where:{
                email: data.email
            }
        })
        return user
    }

    async getAll(){
        const users = await client.user.findMany({
            include:{
                subscription:true
            }
        })
        
        return users
    }
    async create(data){
        try{
            const customer = await stripe.customers.create({
                name:data.name,
                email:data.email
            })
            console.log(customer)
            const user = await client.user.create({
                data:{
                    name:data.name,
                    email:data.email,
                    password:data.password,
                    active:true,
                    subscription:{
                        create:{
                            stripeCustomerId:customer.id
                        }
                    }
                },
                include:{
                    subscription:true
                }
            })
            return {user,success:true}
        }
        catch(error){
            console.log(error)
            return {success:false,error}
        }
    }

    async delete(id){
        const user = await client.user.delete({
            where:{
                id:Number.parseInt(id)
            }
        })
        return user
    }

}

module.exports=user