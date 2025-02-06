"use client";
import React, { useEffect, useRef } from "react";
import styles from "../../../styles/modules/operatorCamera.module.css";
import hotelStyles from "../../../styles/modules/operatorHotel.module.css";
import { useRouter } from "next/navigation";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";

export default function HotelEditPage() {
  const router = useRouter();
  const { fileInputRef, avatarRef, uploadPhoto, fileChange, deletePhoto } =
    usePhotoUpload("/hotel/hotel-images/page-image/default-avatar.png");

  const changepage = (path) => {
    router.push(`/hotel-coupon/${path}`);
  };

  const handleDelete = () => {
    if (confirm("確定要刪除這間旅館嗎？")) {
      console.log("刪除成功！");
      changepage("hotelList"); // 刪除後跳轉回旅館列表
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        {/* 左邊 */}
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
              <button className="btn btn-outline-success btn-sm">已認證</button>
            </div>

            <hr />
            <ul className="list-unstyled text-start">
              <li className="py-2" onClick={() => changepage("operatorDetail")}>
                <a
                  className="text-decoration-none text-dark"
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-person-fill me-2"></i>負責人資訊
                </a>
              </li>
              <li className="py-2" onClick={() => changepage("hotel")}>
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
          <div className="mx-auto">
            <h3 className="mb-3">旅館資訊</h3>
            <form id="hotelForm">
              <div className="section">
                <h5>基本資訊</h5>
                <div className="mb-3">
                  <label className="form-label">旅館名稱 *</label>
                  <input
                    type="text"
                    className="form-control"
                    value="寵物樂園"
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">地址 *</label>
                  <input
                    type="text"
                    className="form-control"
                    value="台北市中山區 123 號"
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">電話 *</label>
                  <input
                    type="text"
                    className="form-control"
                    value="02-12345678"
                    readOnly
                  />
                </div>
              </div>

              <div className="section">
                <h5>旅館圖片</h5>
                <div
                  id="imagePreviewContainer"
                  className="d-flex flex-wrap gap-3 mb-2"
                >
                  <div className="image-card">
                    <img
                      src="/hotel/hotel-uploads/11-room.webp"
                      alt="旅館圖片1"
                    />
                  </div>
                  <div className="image-card">
                    <img
                      src="/hotel/hotel-uploads/13-s-room.jpg"
                      alt="旅館圖片2"
                    />
                  </div>
                </div>
              </div>

              <div className="section">
                <h5>營業時間</h5>
                <div className="mb-3">
                  <label className="form-label">營業時間</label>
                  <input
                    type="text"
                    className="form-control"
                    value="09:00 - 20:00"
                    readOnly
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-3">
                <button
                  type="button"
                  className="btn btn-success btn-sm px-4"
                  onClick={() => changepage("hotelList")}
                >
                  返回
                </button>
                <button
                  type="button"
                  className="btn btn-warning btn-sm px-4"
                  onClick={() => changepage("hotelEdit")}
                >
                  編輯
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm px-4"
                  onClick={handleDelete}
                >
                  刪除
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
