import { useState, useEffect, useMemo } from "react";
import { getCouponss } from "@/services/couponService";

export function useCoupons(cartTotal, orderId, orderTable, token, userId) {
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [error, setError] = useState(null);

  const finalAmount = useMemo(() => {
    console.log("cartTotal:", cartTotal);
    console.log("discountAmount:", discountAmount);
    console.log("更新最終金額:", cartTotal - discountAmount);
    return cartTotal - discountAmount;
  }, [cartTotal, discountAmount]);

  // 取得用戶擁有的優惠券
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await getCouponss("claimed", "all");
        console.log("API 回傳優惠券:", response.data);
        if (response.success) {
          setAvailableCoupons(response.data.map((c) => ({
            ...c,
            displayId: c.id,  
            id: c.coupon_id, 
          })));
        }
      } catch (error) {
        console.error("獲取優惠券失敗:", error);
      }
    };
    fetchCoupons();
  }, []);

  // 使用優惠券
  const applyCoupon = async (couponId) => {
    console.log("選擇的優惠券 ID:", couponId);
    console.log("cartTotal:", cartTotal);
  
    if (!couponId) {
      console.error("❌ 未選擇優惠券");
      return;
    }
  
    const couponUsage = availableCoupons.find((c) => c.id === Number(couponId));
    if (!couponUsage) {
      console.error("❌ 優惠券不存在");
      return;
    }
  
    console.log("使用的優惠券:", couponUsage);
  
    setSelectedCoupon(couponId);
  
    if (!orderId || !orderTable) {
      console.error("❌ 找不到對應的訂單 ID 或訂單類型");
      return;
    }
  
    try {
      const response = await fetch(
        `http://localhost:5000/api/coupon/usage/use/${couponUsage.coupon_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: userId,
            orderId: orderId,
            orderTable: orderTable,
          }),
        }
      );
  
      const data = await response.json();
      console.log("API 回應:", data);
  
      if (data.success) {
        let discount = 0;
        if (couponUsage.discount_type === "percentage") {
          discount = (cartTotal * couponUsage.value) / 100;
        } else {
          discount = Math.min(couponUsage.value, cartTotal);
        }
  
        console.log("計算後的折扣金額:", discount);
        setDiscountAmount(discount);
      } else {
        setDiscountAmount(0);
        console.error("❌ 優惠券無法使用:", data.message);
      }
    } catch (error) {
      console.error("❌ 套用優惠券失敗:", error);
      setDiscountAmount(0);
    }
  };
  return {
    availableCoupons,
    selectedCoupon,
    setSelectedCoupon,
    discountAmount,
    finalAmount,
    applyCoupon,
    error,
  };
}