require('dotenv').config()
// console.log(process.env.MODE.length)
const config = {
    mode:process.env.MODE_DEV,
    bucket_name:process.env.BUCKET_NAME,
    port:process.env.PORT,
    jwt_secret:process.env.JWT_SECRET,
    stripe_public_key:process.env.STRIPE_PK,
    stripe_secret_key:process.env.STRIPE_SK,
    paypal_client_sk:process.env.PAYPAL_CSK,
    paypal_client_id:process.env.PAYPAL_CID,
    webhook_stripe: !process.env.MODE_DEV && process.env.WEBHOOK_STRIPE,
}

module.exports= config
