const { stripe_secret_key } = require("../config/env")
const client = require("../libs/dbClient")
const stripe = require('stripe')(stripe_secret_key)
const endpointSecret = 'whsec_227899105c873f0d15244aa80d62fc537dac3b904c0a07f354c70d72211eda34'

class subscription {
    async createSubscriptions(customerID, priceID) {
        const subscription = await stripe.subscriptions.create({
            customer: customerID,
            items: [
                {
                    price: priceID
                }
            ],
            payment_behavior: 'default_incomplete',
            expand: ['latest_invoice.payment_intent']
        })
        return {
            success: true,
            subscriptionID: subscription.id,
            clientSecret: subscription.latest_invoice.payment_intent.client_secret
        }
    }

    async activateSubscription(idCustomer, subscriptionId, type="PREMIUM") {
        const subscriptionChange = await client.subscription.update({
            where: {
                stripeCustomerId: idCustomer
            },
            data: {
                type,
                stripeSubscriptionId: subscriptionId
            }
        })
        return subscriptionChange
    }

    async webhookStripe(signature, data) {
        let event;
        try {
            event = await stripe.webhooks.constructEvent(data, signature, endpointSecret);
        } catch (err) {
            console.log(err)
            return {
                success: false,
                message: 'An Error Ocurred'
            }
        }
        const stripeEvents = {
            'invoice.payment_succeded': function () {
                const paymentIntent = event.data.object;
                console.log(paymentIntent)
            },
            'customer.subscription.updated': async ()=> {
                const subscriptionUpdated = event.data.object
                if (subscriptionUpdated.status === 'active') {
                    const sub = await this.activateSubscription(
                        subscriptionUpdated.customer,
                        subscriptionUpdated.id
                    )
                    console.log(subscriptionUpdated)
                }
            }
        }
        stripeEvents[event.type] && stripeEvents[event.type]()  || console.log(`Unhandled event type ${event.type}`);
        return {
            success: true,

        }
    }


}

module.exports = subscription