import React, { useRef } from "react";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { List } from "semantic-ui-react";
import Link from "next/link";
import styles from "../../../styles/modules/operatorCamera.module.css";
import style from "../../../styles/modules/menu.module.css"
export default function My() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { fileInputRef, avatarRef, uploadPhoto, fileChange, deletePhoto } =
    usePhotoUpload("/images/hotel/hotel-images/page-image/default-avatar.png");

     const menuItems = [
         { name: "業者資訊", path: "/hotel-coupon/operatorDetail", icon: <i className="bi bi-person-fill me-2"></i> },
         { name: "旅館資訊", path: "/hotel-coupon/hotel", icon: <i className="bi bi-house-heart-fill me-2"></i> },
         { name: "旅館評論", path: "/hotel-coupon/review", icon:<i className="bi bi-card-list me-2"></i>  },
         { name: "旅館優惠", path: "/hotel-coupon/couponList", icon:<i className="bi bi-ticket-perforated me-2"></i> },
       
       ]; 
  return (
    <div className=" d-none d-md-block col-md-3">
      <div className={` p-3 ${style.container}`}>
        <div className="text-center">
          <div className="position-relative d-inline-block">
            <img
              ref={avatarRef}
              src="/hotel/hotel-images/page-image/Dog2.png"
              alt="User Avatar"
              className={`mb-4 rounded-circle ${styles.suAvatarImg}`}
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
          <h5 className="mt-2">{user?.name}</h5>
          <p className="text-muted">{user?.email}</p>
          <button
            className={`btn btn-outline-success btn-sm ${styles.suBtnSecondary}`}
          >
            已認證
          </button>
        </div>
        <hr />
        <List animated selection>
          {menuItems.map((menuItem) => (
            <List.Item
              key={menuItem.path}
              active={menuItem.path === pathname}
              className={`${style.item}`}
            >
              <Link className={`${style.link}`} href={menuItem.path}>
                <span>{menuItem.icon}</span> {menuItem.name}
              </Link>
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  );
}
