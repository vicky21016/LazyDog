"use client";

import React, { useState, useEffect } from "react";
import styles from "../../../styles/modules/operatorCamera.module.css";
import couponStyles from "../../../styles/modules/userCoupon.module.css";
import { useRouter } from "next/navigation";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";
import Header from "../../components/layout/header";
import MyMenu from "../../components/layout/myMenu";
export default function ProfileCouponPage(props) {
  const [filter, setFilter] = useState("all");

  const coupons = [
    {
      id: 1,
      status: "used",
      price: "NT200",
      description: "整單折扣！訂單滿 1,600 折 200 元",
      expiry: "2025/12/31",
    },
    {
      id: 2,
      status: "unused",
      price: "NT150",
      description: "限時折扣！訂單滿 1,000 折 150 元",
      expiry: "2025/10/01",
    },
    {
      id: 3,
      status: "expired",
      price: "NT100",
      description: "過期優惠券",
      expiry: "2023/12/31",
    },
  ];

  const filterStatus = (status) => {
    setFilter(status);
  };

  const filteredCoupons = coupons.filter((coupon) =>
    filter === "all" ? true : coupon.status === filter
  );

  const router = useRouter();
  const { fileInputRef, avatarRef, uploadPhoto, fileChange, deletePhoto } =
    usePhotoUpload("/images/hotel/hotel-images/page-image/default-avatar.png");
  const changepage = (path) => {
    if (path) {
      router.push(`/hotel-coupon/${path}`);
    }
  };
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          {/* 左邊*/}
          <div className="d-none d-md-block col-md-3">
            <MyMenu />
          </div>
          {/* 右邊 */}
          <div className=" col-12 col-md-9 coupon-section">
            <h3 className="mb-3">我的優惠券</h3>

            <div className="suFeatureLinks mb-3">
              <a
                className={couponStyles.suFeatureLinks1}
                onClick={() => changepage("fontcoupon")}
                style={{ cursor: "pointer" }}
              >
                領取免運券
              </a>
              <a
                className={couponStyles.suFeatureLinks2}
                onClick={() => changepage("profileCouponStatus")}
                style={{ cursor: "pointer" }}
              >
                查看歷史紀錄
              </a>
            </div>

            <div className={couponStyles.suCouponInputGroup}>
              <input
                type="text"
                className="form-control"
                placeholder="請輸入優惠代碼"
              />
              <button className="btn btn-primary">領取</button>
            </div>

            <ul className={`nav mb-3 ${couponStyles.suNavTabs}`}>
              <li className="nav-item">
                <a
                  className={`nav-link active ${couponStyles.suNavLink}`}
                  href="#"
                >
                  全部
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${couponStyles.suNavLink}`} href="#">
                  商品優惠 (05)
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${couponStyles.suNavLink}`} href="#">
                  課程優惠 (10)
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${couponStyles.suNavLink}`} href="#">
                  旅館優惠 (10)
                </a>
              </li>
            </ul>

            <div
              className={`status-filter active mb-3 ${couponStyles.statusFilter}`}
            >
              <button
                className={filter === "used" ? "active" : ""}
                onClick={() => filterStatus("used")}
              >
                已使用
              </button>
              <button
                className={filter === "unused" ? "active" : ""}
                onClick={() => filterStatus("unused")}
              >
                未使用
              </button>
              <button
                className={filter === "expired" ? "active" : ""}
                onClick={() => filterStatus("expired")}
              >
                逾期
              </button>
              <button
                className={filter === "all" ? "active" : ""}
                onClick={() => filterStatus("all")}
              >
                全部
              </button>
            </div>

            {/* 優惠券清單 */}
            {filteredCoupons.map((coupon) => (
              <div
                key={coupon.id}
                className={`coupon-card ${couponStyles.suCouponCard} ${
                  styles[coupon.status]
                }`}
              >
                <span className={`price ${couponStyles.suPrice}`}>
                  {coupon.price}
                </span>
                <div className={`details ${couponStyles.suDetails}`}>
                  <p>
                    <strong>{coupon.description}</strong>
                  </p>
                  <p className="text-muted">有效期限: {coupon.expiry}</p>
                  {coupon.status === "expired" && (
                    <p className={couponStyles.suExpired}>⚠ 已逾期</p>
                  )}
                  {coupon.status === "used" && (
                    <p className={couponStyles.suUsed}>⚠ 已使用</p>
                  )}
                </div>
                {coupon.status === "unused" && (
                  <div className={couponStyles.suUnused}>尚未使用</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
