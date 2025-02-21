"use client";

import { useState, useEffect } from "react";
import { getAllCoupons, claimCoupon } from "@/services/couponService";
import CouponCard from "./couponCard";
import styles from "../../../styles/modules/fontCoupon.module.css";

export default function CouponSection({ setSelectedCoupon }) {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    async function fetchCoupons() {
      const data = await getAllCoupons();
      setCoupons(data);
    }
    fetchCoupons();
  }, []);

  const handleClaim = async (couponId) => {
    const response = await claimCoupon(couponId);
    if (response.success) {
      setSelectedCoupon(response.coupon);
      alert("優惠券領取成功！");
    } else {
      alert(response.message || "領取失敗");
    }
  };

  return (
    <div className={`container-fluid ${styles.suCouponContainer}`}>
      <div className="container">
        <div className="row d-flex justify-content-center">
          {coupons.length > 0 ? (
            coupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                onClaim={handleClaim}
              />
            ))
          ) : (
            <p>目前沒有可用的優惠券</p>
          )}
        </div>
      </div>
    </div>
  );
}
