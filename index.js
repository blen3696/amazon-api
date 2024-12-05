const express = require('express')
const cors = require('cors')
const stripe = require('stripe')(
    'sk_test_51QNHe7C7ZyN2MUI2ozaWE9334qbLTciJVLcnvQdYeN9267U8eir6cYjho8PwZ7aOiIkiBxDqCRChlCA8nZZz1PV20084bVDpED'
)

const app = express()

//app.use(cors({origin:true}))
app.use(express.json())



// Configure CORS
app.use(cors({
    origin: "http://localhost:3000", // Allow requests from this origin
  }));
  
  // Alternatively, allow all origins (for development purposes only)
app.use(cors());

app.get('/', (request,response) => response.status(200).send('hello world'))

app.post('/payments/create', async (request, response) => {
   const  total =parseInt(request.query.total)

   const paymentIntents = await stripe.paymentIntents.create({
    amount: total,
    currency: 'usd',
   })

   response.status(201).send({
    clientSecret: paymentIntents.client_secret,
   })
});

app.listen(5000,(err)=>{
    if(err) throw err
    console.log("amazon server is running")
})
//functions.https.onRequest(app)


//http://127.0.0.1:5001/clone-f416e/us-central1/api