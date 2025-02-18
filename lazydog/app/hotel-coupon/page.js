"use client";
import React, { useEffect, useState } from "react";
import { getAllCoupons, claimCoupon } from "@/hooks/useCoupon"; //  引入 API

//可以到F12打fetch做測試
export default function CouponList() {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const data = await getAllCoupons();
        console.log("優惠券資料:", data); //  檢查 API 回應
        setCoupons(data);
      } catch (error) {
        console.error("獲取優惠券失敗:", error);
      }
    };

    fetchCoupons();
  }, []);

  const handleClaim = async (couponId) => {
    if (!couponId) {
      alert("錯誤：未提供 couponId");
      return;
    }
  
    try {
      const result = await claimCoupon(couponId);
      alert(result.message);
    } catch (error) {
      console.error("領取優惠券失敗:", error);
    }
  };
  

  return (
    <div>
      <h2>優惠券列表</h2>
      <ul>
        {coupons.map((coupon) => (
          <li key={coupon.id}>
            {coupon.name} - {coupon.discount}%
            <button onClick={() => handleClaim(coupon.id)}>領取</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
