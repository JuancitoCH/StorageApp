const express = require('express')
const subscriptions = require('../services/subscriptions')


function webhook(app) {
    const router = express.Router()
    app.use('/webhook', router)
    const subscriptionService = new subscriptions()


    router.post('/stripe', async(req, res) => {
        const sig = req.headers['stripe-signature'];
        const result = await subscriptionService.webhookStripe(sig,req.body)
        return res.status(result.success?200:400).json({})
    })
}
module.exports = webhook