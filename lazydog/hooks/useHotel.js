"use client";
import { useState, useEffect } from "react";

export function useOrder(userId) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      let API = `http://localhost:5000/order/productOrders`;
      try {
        const res = await fetch(API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        });

        if (!res.ok) {
          throw new Error("無法取得訂單資料");
        }

        const result = await res.json();
        console.log("Fetched Orders", result);
        setOrders(result.orders);
      } catch (err) {
        console.log(err.message);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  return { orders };
}
