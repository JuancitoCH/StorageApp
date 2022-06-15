import { loadStripe } from '@stripe/stripe-js'
import {
    CardElement,
    Elements,
    useStripe,
    useElements
} from '@stripe/react-stripe-js'

const stripe = loadStripe("pk_test_51L9wAjESAjUw9wD9O0ubftrdLAmZedClw1zPZ5xS8zmElVZIDXOmPae1ECpXhIFAgwMoHomszFX6YjVX8ISJxAK5008gAJhbtG")


const PaymentForm = (e) => {

    const stripe = useStripe()
    const elements = useElements()

    const paySubscription = async (e)=>{
        e.preventDefault()
        
        const cardElement = elements.getElement(CardElement)
        const clietnSecret ="pi_3LA0IFESAjUw9wD91L6yAXzl_secret_fHjEr0LshMeF5Oya36LsqgDvI"
        const paymentResult = await stripe.confirmCardPayment(clietnSecret,{
            payment_method:{
                card:cardElement,
                billing_details:{
                    name:"Test",
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


export default function Payment() {
    return (
        <div>
            <h1>Formulario de Pago</h1>
            <Elements stripe={stripe}>
                <PaymentForm/>

            </Elements>
        </div>
    )
}
