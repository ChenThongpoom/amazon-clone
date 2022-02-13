import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import Order from "./Order";
import "./Orders.css";
import { useStateValue } from "./StateProvider";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users") // get into users doc in the db
        .doc(user?.uid) // finding the userid in the db
        .collection("orders") // get into the orders collection of that userid in the db.
        .orderBy("created", "desc") // sort to descending order based on the time its created (the most recent one will be on the top)
        .onSnapshot((snapshot) => {
          // give realtime snapshot of the db. If push/remove some value to the db, it will provide  a realtime response.
          setOrders(
            snapshot.docs.map((doc) => ({
              // for each doc in the db, return the object with an id and data.
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }

    return () => {};
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders_order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
