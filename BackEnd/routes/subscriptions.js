const express = require('express')
const { isUser } = require('../middleware/auth')
const Subscription = require('../services/subscriptions')


function subscriptions(app){
    const router  =express.Router()
    const subscriptionService = new Subscription()

    app.use('/api/subscriptions',router)
    
    router.post('/create/:price',isUser,async(req,res)=>{
        const {id} = req.userData.data
        const {price} = req.params
        const result = await subscriptionService.createSubscriptions(id,price)

        return res.json({...result})
    })

    router.get('/details',isUser,async (req,res)=>{
        const details = await Subscription.getInfoSuscription(req.userData.data.id)
        return res.json(details)
    })
    router.get('/cancel',isUser,async (req,res)=>{
        const details = await subscriptionService.cancelSuscription(req.userData.data.id)
        return res.status(details.success?200:400).json(details)
    })

}

module.exports=subscriptions