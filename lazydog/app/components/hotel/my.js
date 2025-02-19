import React, { useRef } from "react";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";
import { useRouter } from "next/navigation";
import styles from "../../../styles/modules/operatorCamera.module.css";
export default function My() {
     const router = useRouter();
  const { fileInputRef, avatarRef, uploadPhoto, fileChange, deletePhoto } =
    usePhotoUpload("/images/hotel/hotel-images/page-image/default-avatar.png");

      const changepage = (path) => {
        if (path) {
          router.push(`/hotel-coupon/${path}`);
        }
      };
      
  return (
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
          <button
            className={`btn btn-outline-success btn-sm ${styles.suBtnSecondary}`}
          >
            已認證
          </button>
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
  );
}
