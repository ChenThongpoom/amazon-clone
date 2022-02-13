const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
// eslint-disable-next-line max-len
const stripe = require("stripe")(
  "sk_test_51KSMkIHjrLbxN3WSvwOu9WrRPmGY5ge8LMT5LxG0Z8ScojcGt5z1gWelvzjo4F9uRxehiaMMUrUP0RwFSHbP3tD200LPdD7O3e"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("Payment Request Receive!! for this amount >>>", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });
  // 201 = ok
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/clone-296f3/us-central1/api

// Emulators Execution
// firebase emulators:start

// Deploy Execution
// firebase deploy --only functions
