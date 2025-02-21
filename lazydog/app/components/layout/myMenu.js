"use client";

import React, { useEffect, useState } from "react";
import { List } from "semantic-ui-react";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/app/components/utils/firebase";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faTicket,
  faHeart,
  faPen,
  faCirclePlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../../styles/modules/menu.module.css"

export default function MyMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth(); //  從 `useAuth` 獲取 `user` & `logout`
  const [profile, setProfile] = useState(null);

  //  監聽 `localStorage`，確保會員資訊即時更新
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setProfile(JSON.parse(storedUser));
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      console.log("執行登出...");
      await signOut(auth);
      logout(); //  清空
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setProfile(null); //  確保立即更新
      router.push("/login");
    } catch (error) {}
  };

  const { fileInputRef, avatarRef, uploadPhoto, fileChange, deletePhoto } =
      usePhotoUpload("/images/hotel/hotel-images/page-image/default-avatar.png");

  const menuItems = [
    { name: "會員資料", path: "/pages", icon: faUser },
    { name: "訂單紀錄", path: "/my/orders", icon: faCartShopping },
    { name: "我的優惠", path: "/hotel-coupon/profileCoupon", icon: faTicket },
    { name: "我的收藏", path: "/my/favorite", icon: faHeart },
    { name: "我的文章", path: "/my/posts", icon: faPen },
    { name: "修改密碼", path: "/pages/forgot-password", icon: faCirclePlus },
  ];

  return (
    <div className={`${styles.container}`}>
      {/*  顯示會員頭像與名稱 */}
      <div className="lumi-profile-section position-relative d-inline-block">
        <img
        ref={avatarRef}
          src={profile?.avatar}
          alt="User Avatar"
          className={`mb-4 rounded-circle ${styles.suAvatarImg}`}
          width="50"

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
        <h5 className={`mb-4 ${styles.welcome}`}>歡迎，{profile?.name || "會員"}！</h5>
      </div>

      <List animated selection>
        {menuItems.map((menuItem) => (
          <List.Item
            key={menuItem.path}
            active={menuItem.path === pathname}
            className={`${styles.item}`}
          >
            <Link className={`${styles.link}`} href={menuItem.path}>
              <span>
                <FontAwesomeIcon icon={menuItem.icon} />
              </span>{" "}
              {menuItem.name}
            </Link>
          </List.Item>
        ))}

        {/* Google & 一般會員通用登出按鈕 */}
        <List.Item className={`${styles.item}`} onClick={handleLogout}>
          <span>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </span>{" "}
          登出
        </List.Item>
      </List>
    </div>
  );
}
