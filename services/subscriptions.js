const { stripe_secret_key } = require("../config/env")
const stripe = require('stripe')(stripe_secret_key)

class subscription{
    async createSubscriptions(customerID,priceID){
        const subscription = await stripe.subscriptions.create({
            customer:customerID,
            items:[
                {
                    price:priceID
                }
            ],
            payment_behavior:'default_incomplete',
            expand:['latest_invoice.payment_intent']
        })
        return {
            success:true,
            subscriptionID:subscription.id,
            clientSecret: subscription.latest_invoice.payment_intent.client_secret
        }
    }
}

module.exports = subscription