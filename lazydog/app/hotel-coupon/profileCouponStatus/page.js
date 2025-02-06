"use client";

import React, { useState, useEffect } from "react";
import styles from "../../../styles/modules/operatorCamera.module.css";
import couponStyles from "../../../styles/modules/userCoupon.module.css";
import { useRouter } from "next/navigation";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";

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
      <div className="container mt-5">
        <div className="row">
          {/* 左邊*/}
          <div className="col-md-3">
            <div className="card p-3">
              <div className="text-center">
                <div className="position-relative d-inline-block">
                  <img
                    ref={avatarRef}
                    src="/images/hotel/hotel-images/page-image/Dog2.png"
                    alt="User Avatar"
                    className={`rounded-circle ${styles.suAvatarImg}`}
                  />

                  <div className={styles.dropdownItem}>
                    <button
                      className={`btn btn-light ${styles.suCameraIcon}`}
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src="/images/hotel/hotel-images/page-image/icon-camera.png"
                        alt="相機"
                        className={styles.suCameraIconImg}
                      />
                    </button>
                    <ul className={`dropdown-menu ${styles.suDropdownMenu}`}>
                      <li>
                        <button
                          className={`text-danger dropdown-item ${styles.suDropdownItem}`}
                          onClick={deletePhoto}
                        >
                          刪除照片
                        </button>
                      </li>
                      <li>
                        <label
                          onClick={uploadPhoto}
                          className={`dropdown-item ${styles.dropdownItem}`}
                        >
                          上傳照片
                        </label>
                        <input
                          type="file"
                          id="uploadPhoto"
                          accept="image/*"
                          className="d-none"
                          ref={fileInputRef}
                          onChange={fileChange}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <h5 className="mt-2">陳大方</h5>
                <p className="text-muted">165846hote@gmail.com</p>
                <button className="btn btn-outline-success btn-sm">
                  已認證
                </button>
              </div>
              <hr />
              <ul className="list-unstyled text-start">
                <li
                  className="py-2"
                  onClick={() => changepage("operatorDetail")}
                >
                  <a
                    className="text-decoration-none text-dark"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-person-fill me-2"></i>會員資料
                  </a>
                </li>
                <li
                  className="py-2"
                  onClick={() => changepage("operatorHotel")}
                >
                  <a
                    className="text-decoration-none text-dark"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-bag-check me-2"></i>訂單紀錄
                  </a>
                </li>
                <li
                  className="py-2"
                  onClick={() => changepage("profileCoupon")}
                >
                  <a
                    className="text-decoration-none text-dark"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-ticket-perforated me-2"></i>我的優惠券
                  </a>
                </li>
                <li className="py-2" onClick={() => changepage("couponList")}>
                  <a
                    className="text-decoration-none text-dark"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-house-heart-fill me-2"></i>我的收藏
                  </a>
                </li>
                <li className="py-2" onClick={() => changepage("couponList")}>
                  <a
                    className="text-decoration-none text-dark"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-card-list me-2"></i>我的文章
                  </a>
                </li>
                <li className="py-2" onClick={() => changepage("couponList")}>
                  <a
                    className="text-decoration-none text-dark"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-hammer me-2"></i>修改密碼
                  </a>
                </li>
                <li className="py-2" onClick={() => changepage("couponList")}>
                  <a
                    className="text-decoration-none text-dark"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>登出
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* 右邊 */}
          <div className="col-md-9 coupon-section">
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

            <div className="coupon-input-group">
              <input
                type="text"
                className="form-control"
                placeholder="請輸入優惠代碼"
              />
              <button className="btn btn-primary">領取</button>
            </div>

            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  全部
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  商品優惠 (05)
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  課程優惠 (10)
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  旅館優惠 (10)
                </a>
              </li>
            </ul>

            <div className="status-filter mb-3">
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
              <div key={coupon.id} className={`coupon-card ${coupon.status}`}>
                <span className="price">{coupon.price}</span>
                <div className="details">
                  <p>
                    <strong>{coupon.description}</strong>
                  </p>
                  <p className="text-muted">有效期限: {coupon.expiry}</p>
                  {coupon.status === "expired" && (
                    <p className="expired text-danger">⚠ 已逾期</p>
                  )}
                  {coupon.status === "used" && (
                    <p className="expired text-danger">⚠ 已使用</p>
                  )}
                </div>
                {coupon.status === "expired" && (
                  <div className="expired text-danger">失效</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
