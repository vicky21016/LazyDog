"use client";

import React, { useEffect, useState } from "react";
import styles from "../../../styles/modules/operatorCamera.module.css";
import couponStyles from "../../../styles/modules/userCoupon.module.css";
import { useRouter } from "next/navigation";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";
import Header from "../../components/layout/header";
import MyMenu from "../../components/layout/myMenu";
import { getCoupons, claimCouponByCode } from "@/services/couponService";

export default function ProfileCouponPage(props) {
  const router = useRouter();
  const [coupons, setCoupons] = useState([]); // 優惠券列表
  const [couponCode, setCouponCode] = useState(""); // 優惠券代碼
  const [error, setError] = useState(""); // 錯誤訊息
  const [selectedCategory, setSelectedCategory] = useState("全部"); // 當前選擇的分類

  const { fileInputRef, avatarRef, uploadPhoto, fileChange, deletePhoto } =
    usePhotoUpload("/images/hotel/hotel-images/page-image/default-avatar.png");

  // 取得優惠券
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await getCoupons();
        if (!response || !response.success) {
          console.error("獲取優惠券失敗：", response?.error || "未知錯誤");
          return;
        }
        setCoupons(response.data || []);
      } catch (error) {
        console.error("獲取優惠券時發生錯誤：", error);
      }
    };

    fetchCoupons();
  }, []);

  // 領取優惠券
  const handleClaimCoupon = async () => {
    setError(""); // 清除錯誤
    if (!couponCode.trim()) {
      setError("請輸入優惠券代碼");
      return;
    }

    try {
      const response = await claimCouponByCode(couponCode);
      if (response.success) {
        alert("優惠券領取成功！");
        setCouponCode(""); // 清空輸入框
        // 重新獲取優惠券
        const updatedCoupons = await getCoupons();
        setCoupons(updatedCoupons.data || []);
      } else {
        setError(response.error);
      }
    } catch (error) {
      console.error("領取優惠券時發生錯誤：", error);
      setError("發生錯誤，請稍後再試");
    }
  };

  const changepage = (path) => {
    if (path) {
      router.push(`/hotel-coupon/${path}`);
    }
  };

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  // 根據選擇的分類過濾優惠券
  const filteredCoupons =
    selectedCategory == "全部"
      ? coupons
      : coupons.filter((coupon) => coupon.type === selectedCategory);

  // 動態生成分類標籤
  const categories = [
    "全部",
    ...new Set(
      coupons.map((coupon) =>
        coupon.type ? coupon.type.toLowerCase() : "其他"
      ) // 過濾 undefined 並統一格式
    ),
  ];

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          {/* 左側 */}
          <div className="d-none d-md-block col-md-3">
            <MyMenu />
          </div>
          {/* 右側 */}
          <div className="col-12 col-md-9 coupon-section">
            <h5 className="mb-3">我的優惠券</h5>

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

            {/* 優惠券輸入 */}
            <div className={couponStyles.suCouponInputGroup}>
              <input
                type="text"
                className="form-control"
                placeholder="請輸入優惠代碼"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleClaimCoupon}>
                領取
              </button>
            </div>

            {/* 錯誤訊息顯示 */}
            {error && <p className="text-danger mt-2">{error}</p>}

            {/* 優惠券分類標籤 */}
            <ul className={`nav ${couponStyles.suNavTabs}`}>
              {categories.map((category, index) => (
                <li key={`category-${category}`} className="nav-item">
                  <a
                    className={`nav-link ${
                      selectedCategory === category ? "active" : ""
                    } ${couponStyles.suNavLink}`}
                    href="#"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>

            {/* 優惠券列表 */}
            {filteredCoupons.length > 0 ? (
              filteredCoupons.map(
                (
                  coupon,
                  index 
                ) => (
                  <div
                    key={`coupon-${coupon.id || `index-${index}`}`}
                    className={`mt-2 ${couponStyles.suCouponCard}`}
                  >
                    <span className={couponStyles.suPrice}>
                      NT{coupon.value || 0}
                    </span>
                    <div className={couponStyles.suDetails}>
                      <p>
                        <strong>{coupon.name || "未命名優惠券"}</strong>
                      </p>
                      <p className="text-muted">
                        有效期限:{" "}
                        {coupon.end_time
                          ? new Date(coupon.end_time).toLocaleDateString()
                          : "無期限"}
                      </p>
                      <p className={couponStyles.suExpired}>
                        {coupon.status === "used" ? "⚠ 已使用" : "可使用"}
                      </p>
                    </div>
                    <div className={couponStyles.suAction}>
                      <a href="#">前往購物</a>
                    </div>
                  </div>
                )
              )
            ) : (
              <p className="text-muted mt-3">目前沒有符合此分類的優惠券</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
