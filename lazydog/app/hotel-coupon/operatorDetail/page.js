"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "../../../styles/modules/operatorCamera.module.css";
import { useRouter } from "next/navigation";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";

export default function OperatorDetailPage() {
  const modalRef = useRef(null);
  const router = useRouter();
  const { fileInputRef, avatarRef, uploadPhoto, fileChange, deletePhoto } =
    usePhotoUpload("/images/hotel/hotel-images/page-image/default-avatar.png");

  const [showModal, setShowModal] = useState(false);
  const [operatorInfo, setOperatorInfo] = useState({
    name: "陳大方",
    license: "A12345678",
    phone: "0912-345-678",
    email: "owner@example.com",
    company: "台北狗狗飯",
  });

  const openModal = () => {
    if (modalRef.current) {
      import("bootstrap/dist/js/bootstrap.bundle.min.js")
        .then((bootstrap) => {
          const Modal = bootstrap.Modal;
          modalRef.current.modalInstance = new Modal(modalRef.current, {
            backdrop: "static",
            keyboard: false,
          });
          modalRef.current.modalInstance.show();
        })
        .catch((err) => console.error("Bootstrap 加載失敗：", err));
    } else {
      console.error(" modalRef.current 尚未初始化");
    }
  };

  const closeModal = () => {
    if (modalRef.current?.modalInstance) {
      modalRef.current.modalInstance.hide();
    } else {
      console.error(" 無法關閉 Modal，modalInstance 尚未初始化");
    }
  };

  const handleInputChange = (e) => {
    setOperatorInfo({ ...operatorInfo, [e.target.name]: e.target.value });
  };

  const saveChanges = () => {
    console.log("已更新：", operatorInfo);
    closeModal();
  };
  const changepage = (path) => {
    if (path) {
      router.push(`/hotel-coupon/${path}`);
    }
  };
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
          <div className="col-md-9">
            <div className="card p-4">
              <h5 className="mb-3">負責人資訊</h5>
              <div className="row">
                <div className="col-md-6">
                  <label className="fw-bold">姓名 *</label>
                  <p
                    className="form-control-plaintext border-bottom"
                    id="ownerName"
                  >
                    陳大方
                  </p>
                </div>
                <div className="col-md-6">
                  <label className="fw-bold">許可證號 *</label>
                  <p
                    className="form-control-plaintext border-bottom"
                    id="licenseNumber"
                  >
                    A12345678
                  </p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label className="fw-bold">電話 *</label>
                  <p
                    className="form-control-plaintext border-bottom"
                    id="phoneNumber"
                  >
                    0912-345-678
                  </p>
                </div>
                <div className="col-md-6">
                  <label className="fw-bold">信箱 *</label>
                  <p
                    className="form-control-plaintext border-bottom"
                    id="email"
                  >
                    owner@example.com
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <label className="fw-bold">公司名稱</label>
                <p
                  className="form-control-plaintext border-bottom"
                  id="companyName"
                >
                  台北狗狗飯
                </p>
              </div>

              <div className="d-flex justify-content-end mt-4">
                <button
                  type="button"
                  className="btn btn-outline-primary me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  onClick={() => setShowModal(true)}
                >
                  編輯
                </button>
                <button type="button" className="btn btn-warning">
                  刪除
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          ref={modalRef}
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">編輯負責人資訊</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <label>姓名：</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={operatorInfo.name}
                  onChange={handleInputChange}
                />
                <label className="mt-2">許可證號：</label>
                <input
                  type="text"
                  className="form-control"
                  name="license"
                  value={operatorInfo.license}
                  onChange={handleInputChange}
                />
                <label className="mt-2">電話：</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={operatorInfo.phone}
                  onChange={handleInputChange}
                />
                <label className="mt-2">信箱：</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={operatorInfo.email}
                  onChange={handleInputChange}
                />
                <label className="mt-2">公司名稱：</label>
                <input
                  type="text"
                  className="form-control"
                  name="company"
                  value={operatorInfo.company}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  取消
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveChanges}
                >
                  儲存變更
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
