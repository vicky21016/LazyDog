"use client";

import React, { useState, useEffect } from "react";
import styles from "../../../styles/modules/operatorCamera.module.css";
import { useRouter } from "next/navigation";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";

export default function CouponListPage() {
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const router = useRouter();
  const { fileInputRef, avatarRef, uploadPhoto, fileChange, deletePhoto } =
    usePhotoUpload("/images/hotel/hotel-images/page-image/default-avatar.png");
  const changepage = (path) => {
    if (path) {
      router.push(`/hotel-coupon/${path}`);
    }
  };

  const coupons = [
    {
      code: "SWW2024",
      name: "新春折扣",
      details: "滿 1000 減 200",
      startDate: "2024/03/01",
      endDate: "2024/03/10",
      applicableTo: "所有用戶",
      usage: 1,
      status: "啟用",
    },
    {
      code: "VIP50",
      name: "會員專屬折扣",
      details: "50% 折扣",
      startDate: "2024/02/15",
      endDate: "2024/03/15",
      applicableTo: "會員限定",
      usage: 2,
      status: "啟用",
    },
    {
      code: "SUMMER10",
      name: "夏日優惠",
      details: "滿 500 減 50",
      startDate: "2024/06/01",
      endDate: "2024/06/30",
      applicableTo: "所有用戶",
      usage: 5,
      status: "已過期",
    },
  ];

  const loadCoupon = (coupon) => {
    setSelectedCoupon(coupon);
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
                    src="/hotel/hotel-images/page-image/Dog2.png"
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
                        src="/hotel/hotel-images/page-image/icon-camera.png"
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
                    <i className="bi bi-person-fill me-2"></i>負責人資訊
                  </a>
                </li>
                <li
                  className="py-2"
                  onClick={() => changepage("hotel")}
                >
                  <a
                    className="text-decoration-none text-dark"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-house-heart-fill me-2"></i>旅館資訊
                  </a>
                </li>
                <li className="py-2" onClick={() => changepage("review")}>
                  <a
                    className="text-decoration-none text-dark"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-card-list me-2"></i>旅館評論
                  </a>
                </li>
                <li className="py-2" onClick={() => changepage("couponList")}>
                  <a
                    className="text-decoration-none text-dark"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-ticket-perforated me-2"></i>旅館優惠券
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* 右邊 */}
          <div className="col-md-9">
            <h3 className="mb-4">優惠券列表</h3>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-light">
                  <tr className="text-center">
                    <th>優惠代碼</th>
                    <th>優惠名稱</th>
                    <th>優惠內容</th>
                    <th>開始日期</th>
                    <th>結束日期</th>
                    <th>適用對象</th>
                    <th>使用次數</th>
                    <th>狀態</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon) => (
                    <tr key={coupon.code} className="text-center">
                      <td>{coupon.code}</td>
                      <td>{coupon.name}</td>
                      <td>{coupon.details}</td>
                      <td>{coupon.startDate}</td>
                      <td>{coupon.endDate}</td>
                      <td>{coupon.applicableTo}</td>
                      <td>{coupon.usage}</td>
                      <td>
                        <span
                          className={`badge ${
                            coupon.status === "啟用"
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {coupon.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => loadCoupon(coupon)}
                        >
                          檢視
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 優惠券 Modal */}
            {selectedCoupon && (
              <div
                className="modal fade show"
                style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
                tabIndex="-1"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">優惠券詳細資訊</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setSelectedCoupon(null)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <p>
                        <strong>優惠代碼：</strong> {selectedCoupon.code}
                      </p>
                      <p>
                        <strong>優惠名稱：</strong> {selectedCoupon.name}
                      </p>
                      <p>
                        <strong>優惠內容：</strong> {selectedCoupon.details}
                      </p>
                      <p>
                        <strong>有效期限：</strong> {selectedCoupon.endDate}
                      </p>
                    </div>
                    <div className="modal-footer">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setSelectedCoupon(null)}
                      >
                        關閉
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => changepage("editCoupon")}
                      >
                        編輯
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => changepage("createCoupon")}
              >
                + 新增優惠券
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
