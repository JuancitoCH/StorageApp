const express = require('express')
const Subscription = require('../services/subscriptions')

function subscriptions(app){
    const router  =express.Router()
    const subscriptionService = new Subscription()

    app.use('/api/subscriptions',router)

    router.post('/create',async(req,res)=>{
        const {customerID,priceID} = req.body
        const result = await subscriptionService.createSubscriptions(customerID,priceID)

        return res.json({...result})
    })

}

module.exports=subscriptions