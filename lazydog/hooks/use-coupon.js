import { useState, useEffect, useMemo } from "react";
import { getCouponss } from "@/services/couponService";

export function useCoupons(cartTotal, orderId, orderTable, token, userId) {
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [error, setError] = useState(null);

  // 計算最終金額
  const finalAmount = useMemo(() => {
    console.log(
      "Final Amount Calculation:",
      cartTotal,
      "-",
      discountAmount,
      "=",
      cartTotal - discountAmount
    );
    return cartTotal - discountAmount;
  }, [cartTotal, discountAmount]);

  // 取得可用的優惠券
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await getCouponss("claimed", "all");
  
        if (response.success) {
          const coupons = response.data.map((c) => ({
            id: c.id,
            name: c.name,
            value: c.value,
            discount_type: c.type,
            min_order_value: c.min_order_value,
          }));
          
          console.log("Fetched Coupons:", coupons); // 🔍 Debug
          setAvailableCoupons(coupons);
        }
      } catch (error) {
        console.error("獲取優惠券失敗:", error);
      }
    };
  
    fetchCoupons();
  }, []);
  
  

  // 計算折扣金額
  const calculateDiscount = (couponId) => {
  
    // 查找 `coupons`，而不是 `coupon_usage`
    const coupon = availableCoupons.find((c) => c.id === Number(couponId));
  
    if (!coupon) {
      console.error("優惠券不存在:", couponId);
      return 0;
    }
  
    let discount = 0;
    if (coupon.discount_type == "percentage") {
      discount = (cartTotal * coupon.value) / 100;
    } else {
      discount = Math.min(coupon.value, cartTotal);
    }
  
    console.log("Final Calculated Discount:", discount);
    return discount;
  };
  

  // 監聽 selectedCoupon 變化並更新折扣金額
  useEffect(() => {
    if (selectedCoupon) {
      const discount = calculateDiscount(selectedCoupon);
      console.log("Discount updated:", discount);

      setDiscountAmount(discount);
    } else {
      setDiscountAmount(0);
    }
  }, [selectedCoupon, cartTotal]); // 修正這裡，確保 cartTotal 變化時更新折扣

  // 使用優惠券
  const applyCoupon = async (couponId) => {
    console.log("Applying coupon with ID:", couponId);
  
    if (!couponId) {
      console.error("未選擇優惠券");
      return;
    }
  
    // 🔍 這裡要找 `coupons` 表，而不是 `coupon_usage`
    const coupon = availableCoupons.find((c) => c.id === Number(couponId));
    console.log("Coupon Data:", coupon); // ✅ Debug
  
    if (!coupon) {
      console.error("優惠券不存在:", couponId);
      return;
    }
  
    if (!orderId || !orderTable) {
      console.error("找不到對應的訂單 ID 或訂單類型");
      return;
    }
  
    try {
      const response = await fetch(
        `http://localhost:5000/api/coupon/usage/use/${coupon.id}`, // ✅ 確保這裡的 `id` 是 `coupons.id`
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
      if (!data.success) {
        console.error("優惠券無法使用:", data.message);
      } else {
        console.log("優惠券成功套用:", data);
      }
    } catch (error) {
      console.error("套用優惠券失敗:", error);
    }
  };
  

  return {
    availableCoupons,
    selectedCoupon,
    setSelectedCoupon,
    discountAmount,
    finalAmount,
    setDiscountAmount,
    calculateDiscount,
    applyCoupon,
    error,
  };
}
