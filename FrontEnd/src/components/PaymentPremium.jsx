import { loadStripe } from '@stripe/stripe-js'
import {
    CardElement,
    Elements,
    useStripe,
    useElements
} from '@stripe/react-stripe-js'

import { post } from '../api/axios'

const stripe = loadStripe("pk_test_51L9wAjESAjUw9wD9O0ubftrdLAmZedClw1zPZ5xS8zmElVZIDXOmPae1ECpXhIFAgwMoHomszFX6YjVX8ISJxAK5008gAJhbtG")


const PaymentForm = (e) => {
    
    const type = 'PREMIUM'
    const stripe = useStripe()
    const elements = useElements()

    const paySubscription = async (e)=>{
        e.preventDefault()
        const {data} = await post('/api/subscriptions/create/'+type)
        const clientSecret = data.clientSecret

        const cardElement = elements.getElement(CardElement)
        const paymentResult = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:cardElement,
                billing_details:{
                    name:"Juan",
                    email:"cjuancito.chona@gmail.com"
                }
            }
        })

        console.log(paymentResult)
    }
    return <form onSubmit={paySubscription}>
        <CardElement/>
        <button>Suscribirme</button>
    </form>
}


export default function PaymentPremium() {
    return (
        <div>
            <h1>Formulario de Pago</h1>
            <Elements stripe={stripe}>
                <PaymentForm/>

            </Elements>
        </div>
    )
}
