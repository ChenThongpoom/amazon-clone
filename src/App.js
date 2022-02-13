import React, { useEffect } from "react";
import Header from "./Header.js";
import Home from "./Home.js";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout.js";
import Login from "./Login.js";
import { auth } from "./firebase.js";
import { useStateValue } from "./StateProvider.js";
import Payment from "./Payment.js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders.js";

const promise = loadStripe(
  "pk_test_51KSMkIHjrLbxN3WS4tOVp1gTx9iKCfh5b20dhgwbb3xoIkcIRk3cj8CKSQUnIriCgkazULKwZOGGL9p6WO2J7foA00gCA97aVr"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads ...
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER iS >>>", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    //BEM
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
