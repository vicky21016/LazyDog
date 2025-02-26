"use client";
import { useState } from "react";

export function useCreateOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  const createOrder = async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        throw new Error("訂單創建失敗");
      }

      const result = await res.json();
      console.log("Order Created", result);
      setOrder(result.order);
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { createOrder, order, loading, error };
}

// Example usage in a React component
import { useCreateOrder } from "./useCreateOrder";

function OrderComponent() {
  const { createOrder, order, loading, error } = useCreateOrder();

  const handleCreateOrder = () => {
    createOrder({ user_id: 123, items: [{ productId: 1, quantity: 2 }] });
  };

  return (
    <div>
      <button onClick={handleCreateOrder} disabled={loading}>
        {loading ? "Creating Order..." : "Create Order"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {order && <p>Order Created: {JSON.stringify(order)}</p>}
    </div>
  );
}

export default OrderComponent;
