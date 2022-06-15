const express = require('express')
const { isUser } = require('../middleware/auth')
const Subscription = require('../services/subscriptions')


function subscriptions(app){
    const router  =express.Router()
    const subscriptionService = new Subscription()

    app.use('/api/subscriptions',router)
    
    router.post('/create/:price',isUser,async(req,res)=>{
        const {id} = req.userData
        const {price} = req.params
        const result = await subscriptionService.createSubscriptions(id,price)

        return res.json({...result})
    })


}

module.exports=subscriptions