"use client";

import React, { useEffect } from "react";
import styles from "../../../styles/modules/operatorCamera.module.css";
import couponStyles from "../../../styles/modules/userCoupon.module.css";
import { useRouter } from "next/navigation";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";
import Header from "../../components/layout/header";
import MyMenu from "../../components/layout/myMenu";
export default function ProfileCouponPage(props) {
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
            <h5 className="mb-3">我的優惠券</h5>

            <div className="suFeatureLinks mb-3">
              <a
                className={couponStyles.suFeatureLinks1}
                href="#"
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

            <ul className={`nav ${couponStyles.suNavTabs}`}>
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

            <div className={`mt-2 ${couponStyles.suCouponCard}`}>
              <span className={couponStyles.suPrice}>NT200</span>
              <div className={couponStyles.suDetails}>
                <p>
                  <strong>整單折扣！訂單滿 1,600 折 200 元</strong>
                </p>
                <p className="text-muted">有效期限: 2025/12/31</p>
                <p className={couponStyles.suExpired}>⚠ 已使用</p>
              </div>
              <div className={couponStyles.suAction}>
                <a href="#">前往購物</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
