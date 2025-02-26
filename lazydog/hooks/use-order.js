"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export function useOrder() {
  // 狀態管理
  const [orders, setOrders] = useState([]); // 訂單列表
  const [loading, setLoading] = useState(false); // 加載狀態
  const [error, setError] = useState(null); // 錯誤狀態

  // 獲取訂單資料
  const fetchOrders = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/productOrders", {
        user_id: userId,
      });
      setOrders(response.data.orders);
    } catch (err) {
      setError("無法獲取訂單資料");
    } finally {
      setLoading(false);
    }
  };

  // 創建訂單
  const createOrder = async (orderData) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/product", orderData);
      setOrders((prevOrders) => [...prevOrders, response.data]);
    } catch (err) {
      setError("創建訂單失敗");
    } finally {
      setLoading(false);
    }
  };

  // 你也可以把這個 hook 做成能夠清除訂單資料的功能
  const clearOrders = () => {
    setOrders([]);
  };

  return {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    clearOrders,
  };
}
