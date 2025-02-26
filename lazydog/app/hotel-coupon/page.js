"use client";

import React, { useEffect, useState } from "react";
import { getAllCoupons, claimCoupon } from "@/services/couponService";

const GetCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  // 獲取所有優惠券
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const data = await getAllCoupons();
        setCoupons(data || []);
      } catch (error) {
        console.error("獲取優惠券失敗:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);


  const handleClaim = async (couponId) => {
    try {
      const response = await claimCoupon(couponId);
      if (response?.success) {
        alert("優惠券領取成功！");
      } else {
        alert("領取失敗：" + (response?.message || "未知錯誤"));
      }
    } catch (error) {
      console.error("領取優惠券失敗:", error);
      alert("領取優惠券時發生錯誤");
    }
  };

  return (
    <div className="container mt-4">
      <h2>優惠券列表</h2>

      {loading ? (
        <p>載入中...</p>
      ) : coupons.length === 0 ? (
        <p>目前沒有可用的優惠券。</p>
      ) : (
        <div className="row">
          {coupons.map((coupon) => (
            <div key={coupon.id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{coupon.name}</h5>
                  <p className="card-text">折扣: {coupon.value}</p> 
                  <p className="card-text">有效期限: {coupon.end_time}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleClaim(coupon.id)}
                  >
                    領取優惠券
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetCoupons;
