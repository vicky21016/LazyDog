"use client";
import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRouter } from "next/navigation";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";

export default function HotelEditPage(props) {
  const router = useRouter();
  const { fileInputRef, avatarRef, uploadPhoto, fileChange, deletePhoto } =
    usePhotoUpload("/images/hotel/hotel-images/page-image/default-avatar.png");
  const changepage = (path) => {
    router.push(`/hotel-coupon/${path}`);
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
                    className="rounded-circle avatar-img"
                  />

                  <div className="dropdown">
                    <button
                      className="btn btn-light camera-icon p-0"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src="/images/hotel/hotel-images/page-image/icon-camera.png"
                        alt="相機"
                        className="camera-icon-img"
                      />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          id="deletePhoto"
                          onClick={deletePhoto}
                        >
                          刪除照片
                        </button>
                      </li>
                      <li>
                        <label
                          htmlFor="uploadPhoto"
                          className="dropdown-item"
                          onClick={uploadPhoto}
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
                  onClick={() => changepage("operatorHotel")}
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
          <div className="col-md-9 mx-auto">
            <h3 className="mb-3">編輯旅館資訊</h3>
            <form id="editForm">
              <div className="section">
                <h5>基本資訊</h5>
                <div className="mb-3">
                  <label className="form-label">旅館名稱 *</label>
                  <input
                    type="text"
                    className="form-control"
                    value="寵物樂園"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">地址 *</label>
                  <input
                    type="text"
                    className="form-control"
                    value="台北市中山區 123 號"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">電話 *</label>
                  <input
                    type="text"
                    className="form-control"
                    value="02-12345678"
                    required
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
                      src="https://via.placeholder.com/120"
                      alt="旅館圖片1"
                    />
                    <button type="button" className="delete-btn">
                      &times;
                    </button>
                  </div>
                  <div className="image-card">
                    <img
                      src="https://via.placeholder.com/120"
                      alt="旅館圖片2"
                    />
                    <button type="button" className="delete-btn">
                      &times;
                    </button>
                  </div>
                </div>
                <input
                  type="file"
                  id="imageUpload"
                  className="form-control d-none"
                  accept="image/*"
                  multiple
                />
                <button
                  type="button"
                  className="btn btn-primary btn-sm mt-2"
                  onClick={uploadPhoto}
                >
                  + 新增圖片
                </button>
              </div>
              <div className="section">
                <h5>房型</h5>
                <div id="roomContainer">
                  <div className="row g-2 align-items-center mb-2 room-entry">
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        value="大型犬房"
                        required
                      />
                    </div>
                    <div className="col-md-2">
                      <input
                        type="number"
                        className="form-control"
                        value="5"
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        value="1500 元/晚"
                        required
                      />
                    </div>
                    <div className="col-md-3 d-flex">
                      <input
                        type="text"
                        className="form-control"
                        value="500 元"
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-danger btn-sm ms-2 remove-room"
                      >
                        X
                      </button>
                    </div>
                  </div>
                  <div className="row g-2 align-items-center mb-2 room-entry">
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        value="中型犬房"
                        required
                      />
                    </div>
                    <div className="col-md-2">
                      <input
                        type="number"
                        className="form-control"
                        value="3"
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        value="1200 元/晚"
                        required
                      />
                    </div>
                    <div className="col-md-3 d-flex">
                      <input
                        type="text"
                        className="form-control"
                        value="400 元"
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-danger btn-sm ms-2 remove-room"
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-sm mt-2"
                  id="addRoom"
                >
                  + 新增房型
                </button>
              </div>
              <div className="section">
                <h5>營業時間</h5>
                <div className="mb-3">
                  <label className="form-label">營業時間</label>
                  <input
                    type="text"
                    className="form-control"
                    value="09:00 - 20:00"
                    required
                  />
                </div>
              </div>

              <div className="section">
                <h5>其他資訊</h5>
                <div className="mb-3">
                  <label className="form-label">標籤</label>
                  <input
                    type="text"
                    className="form-control"
                    value="寵物友善, 免費早餐"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">旅館簡介</label>
                  <textarea className="form-control" rows="3" required />
                  寵物樂園是一個專門提供給狗狗的住宿場所，提供優質的照顧與設施。
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-3">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm px-4"
                  onClick={() => changepage("hotel")}
                >
                  返回
                </button>
                <button type="submit" className="btn btn-orange btn-sm px-4">
                  儲存
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
