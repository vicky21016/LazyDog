"use client";

"use client";
import React, { useState, useEffect } from "react";
import styles from "../../../styles/modules/operatorCamera.module.css";
import { useRouter } from "next/navigation";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";

export default function EditCouponPage(props) {
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
          <div class="col-md-9">
            <h3 class="mb-4">編輯優惠券</h3>
            <div class="p-4 border rounded bg-light mb-4">
              <h5 class="mb-3">基本資訊</h5>
              <div class="row">
                <div class="col-md-6">
                  <label class="form-label">優惠券名稱 *</label>
                  <input type="text" class="form-control" value="新春折扣" />
                </div>
                {/* 這裡不能修改  */}
                <div class="col-md-6">
                  <label class="form-label">優惠券代碼 *</label>
                  <input
                    type="text"
                    class="form-control"
                    value="SWW2024"
                    readonly
                  />
                </div>
                {/* 描述  */}
                <div class="col-md-12 mt-3">
                  <label class="form-label">描述 *</label>
                  <input
                    type="text"
                    class="form-control"
                    value="適用於全館，滿 1000 減 200"
                  />
                </div>
              </div>
            </div>

            <div class="p-4 border rounded bg-light mb-4">
              <h5 class="mb-3">使用條件</h5>
              <div class="row">
                <div class="col-md-4">
                  <label class="form-label">折扣類型</label>
                  <select class="form-select">
                    <option selected>滿額折扣</option>
                    <option>折扣百分比</option>
                    <option>滿件折扣</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label class="form-label">最低使用金額</label>
                  <input type="text" class="form-control" value="1000" />
                </div>
                <div class="col-md-4">
                  <label class="form-label">使用次數</label>
                  <input type="text" class="form-control" value="1" />
                </div>
              </div>
            </div>
            <div class="p-4 border rounded bg-light mb-4">
              <h5 class="mb-3">有效期限</h5>
              <div class="row">
                <div class="col-md-6">
                  <label class="form-label">開始日期</label>
                  <input type="date" class="form-control" value="2024-03-01" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">結束日期</label>
                  <input type="date" class="form-control" value="2024-03-10" />
                </div>
              </div>
            </div>
            <div class="p-4 border rounded bg-light mb-4">
              <h5 class="mb-3">其他資訊</h5>
              <div class="row">
                <div class="col-md-4">
                  <label class="form-label">適用對象</label>
                  <select class="form-select">
                    <option selected>所有用戶</option>
                    <option>會員限定</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label class="form-label">使用狀態</label>
                  <select class="form-select">
                    <option selected>啟用</option>
                    <option>已過期</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label class="form-label">剩餘可用次數</label>
                  <input type="text" class="form-control" value="1" />
                </div>
                <div class="col-md-12">
                  <label class="form-label">注意事項</label>
                  <textarea class="form-control">
                    優惠券不得與其他折扣活動併用
                  </textarea>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end gap-2">
              <button
                type="button"
                class="btn btn-success btn-sm px-4"
                onclick="location.href='operatorCouponList.html'"
              >
                返回
              </button>
              <button
                type="submit"
                class="btn btn-primary btn-sm px-4"
                onclick="location.href='operatorCouponList.html'"
              >
                儲存
              </button>
              <button type="button" class="btn btn-danger btn-sm px-4">
                刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
