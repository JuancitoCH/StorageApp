const { config } = require("dotenv")
const { stripe_secret_key } = require("../config/env")
const client = require("../libs/dbClient")
const stripe = require('stripe')(stripe_secret_key)

const endpointSecret = config.webhook_stripe || 'whsec_227899105c873f0d15244aa80d62fc537dac3b904c0a07f354c70d72211eda34'



const priceIDS = {
    'price_1L9wDoESAjUw9wD999VedTb2': 'PREMIUM',
    'price_1LAcmYESAjUw9wD9AXfFye8l': 'ENTERPRISE'
}
const priceNames = {
    'PREMIUM':'price_1L9wDoESAjUw9wD999VedTb2',
    'ENTERPRISE':'price_1LAcmYESAjUw9wD9AXfFye8l'
}


class subscription {
    async createSubscriptions(userId, typePrice) {
        const customerID = await this.getStripeCustomerId(userId)
        const priceID = priceNames[typePrice]

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

    async activateSubscription(idCustomer, subscriptionId, type = "PREMIUM") {
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

    async expireSubscription(idCustomer) {
        const subscriptionChange = await client.subscription.update({
            where: {
                stripeCustomerId: idCustomer
            },
            data: {
                type: "FREE",
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
            'customer.subscription.updated': async () => {
                const subscriptionUpdated = event.data.object
                // console.log(subscriptionUpdated)
                if (subscriptionUpdated.status === 'active') {
                    // TODO: al activar suscripcion enviar el type que por defecto esta en premium
                    const sub = await this.activateSubscription(
                        subscriptionUpdated.customer,
                        subscriptionUpdated.id,
                        priceIDS[subscriptionUpdated.plan.id]
                    )
                    // console.log(subscriptionUpdated)
                }
            },
            'customer.subscription.created': async () => {
                const subscriptionUpdated = event.data.object
                // console.log(subscriptionUpdated)
                if (subscriptionUpdated.status === 'active') {
                    // TODO: al activar suscripcion enviar el type que por defecto esta en premium
                    const sub = await this.activateSubscription(
                        subscriptionUpdated.customer,
                        subscriptionUpdated.id,
                        priceIDS[subscriptionUpdated.plan.id]
                    )
                    // console.log(subscriptionUpdated)
                }
            },
            'customer.subscription.deleted': async () => {
                // ocurre cuando la suscripcion expira
                const customerStripe = event.data.object.customer
                console.log(customerStripe)
                try{
                    await this.expireSubscription(customerStripe)

                }catch(err){
                    console.log('igoramos por ahora')
                }
                console.log('suscription expire')
            },
            'customer.subscription.trial_will_end': async () => {
                // ocurre 3 dias antes de que la suscripcion expire
                console.log(event)
            }
        }
        stripeEvents[event.type] && stripeEvents[event.type]() || console.log(`Unhandled event type ${event.type}`);
        return {
            success: true,

        }
    }

    async getStripeCustomerId(userId) {
        const suscriptionData = await client.subscription.findFirst({
            where: {
                userId
            }
        })
        return suscriptionData.stripeCustomerId
    }

    static async getInfoSuscription(idUser) {
        return await client.subscription.findFirst({
            where: {
                userId: idUser
            }
        })
    }
    async cancelSuscription(idUser) {
        try {
            const user = await client.subscription.findFirst({
                where: {
                    userId: idUser
                }
            })
            const response = await stripe.subscriptions.del(user.stripeSubscriptionId)
            if (response.status == 'canceled') return {
                success: true,
                message: "suscription canceled"
            }
            return {
                success: false,
                message: 'an error ocurred'
            }
        } catch (err) {
            console.log(err)
            const error = RegExp(/No such subscription/)
            if (error.exec(err.message)) return {
                success: true,
                message: 'suscription alredy canceled'
            }
            return {
                success: false,
                message: 'an error ocurred Crash'
            }
        }
    }

}

module.exports = subscription