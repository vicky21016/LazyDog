import { useState, useEffect, useMemo } from "react";
import { getCouponss, getCoupons, useCoupon } from "@/services/couponService";

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

  // 取得可用的優惠券 (從 coupon_usage 查找擁有的優惠券，再從 coupons 查詳細資料)
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const usageResponse = await getCouponss("claimed", "all");

        if (!usageResponse.success || !usageResponse.data) {
          console.error("無法獲取 coupon_usage:", usageResponse);
          return;
        }

        const couponIds = usageResponse.data.map((u) => u.coupon_id);

        if (couponIds.length == 0) {
          setAvailableCoupons([]);
          return;
        }

        const couponsResponse = await getCoupons(couponIds);
        if (couponsResponse.success) {
          const coupons = couponsResponse.data.map((c) => ({
            id: c.id,
            name: c.name,
            value: c.value,
            discount_type: c.type,
            min_order_value: c.min_order_value,
          }));

          setAvailableCoupons(coupons);
        } else {
          console.error("無法獲取 coupons:", couponsResponse);
        }
      } catch (error) {
        console.error("獲取優惠券失敗:", error);
      }
    };

    fetchCoupons();
  }, []);

  // 計算折扣金額
  const calculateDiscount = (couponId) => {
    const coupon = availableCoupons.find((c) => c.id == Number(couponId));

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

  //  變化並更新折扣金額
  useEffect(() => {
    if (selectedCoupon) {
      const discount = calculateDiscount(selectedCoupon);
      setDiscountAmount(discount);
    } else {
      setDiscountAmount(0);
    }
  }, [selectedCoupon, cartTotal]);

  // 使用優惠券
  const applyCoupon = async (couponId) => {
    console.log("Applying coupon with ID:", couponId);

    if (!couponId) {
      console.error("未選擇優惠券");
      return;
    }

    const coupon = availableCoupons.find((c) => c.id == Number(couponId));

    if (!coupon) {
      console.error("優惠券不存在:", couponId);
      return;
    }

    if (!orderId || !orderTable || !userId) {
      console.error(" 缺少必要參數: orderId, orderTable, userId");
      console.log(
        "orderId:",
        orderId,
        "orderTable:",
        orderTable,
        "userId:",
        userId
      );
      return;
    }

    const validOrderTables = ["hotel_order", "course_orders", "yi_orderlist"];
    const cleanedOrderTable = orderTable.trim(); // 避免空格錯誤

    if (!validOrderTables.includes(cleanedOrderTable)) {
      console.error(" 無效的訂單類型:", cleanedOrderTable);
      return;
    }

    const requestBody = {
      userId: Number(userId),
      orderId: orderId,
      orderTable: cleanedOrderTable,
      couponId: Number(coupon.id),
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/coupon/usage/use/${coupon.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        console.error(" 優惠券無法使用:", data.message);
        return;
      }

      console.log(" 優惠券成功套用:", data);
    } catch (error) {
      console.error(" 套用優惠券失敗:", error);
    }
    
    try {
      await applyCoupon(selectedCoupon, orderId, orderTable, user.id);
    } catch (error) {
      console.error("applyCoupon 失敗，但不影響主要訂單:", error);
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
