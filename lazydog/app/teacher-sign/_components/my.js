import React, { useState } from "react";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { List } from "semantic-ui-react";
import Link from "next/link";
import styles from "../../../styles/modules/operatorCamera.module.css";
import style from "../../../styles/modules/menu.module.css";
export default function My() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [mobileMenu, setmobileMenu] = useState(false);
  const { fileInputRef, avatarRef, uploadPhoto, fileChange, deletePhoto } =
    usePhotoUpload("/images/hotel/hotel-images/page-image/default-avatar.png");

  const menuItems = [
    {
      name: "我的師資",
      path: "/teacher-sign/info",
      icon: <i className="bi bi-book-fill"></i>,
    },
    {
      name: "我的課程",
      path: "/teacher-sign/list",
      icon: <i className="bi bi-calendar-week"></i>,
    },
    {
      name: "課程評論",
      path: `/course/review/${user.teacher_id}`,
      icon: <i className="bi bi-chat-left-heart "></i>,
    },
    {
      name: "開課地點",
      path: "/teacher-sign/place",
      icon: <i className="bi bi-building-fill "></i>,
    },
    {
      name: "訂單紀錄",
      path: "/teacher-sign/orderlist",
      icon: <i class="bi bi-bag-check"></i>,
    },
    {
      name: "會員資料",
      path: "/teacher-sign/user",
      icon: <i className="bi bi-person-fill "></i>,
    },
  ];

  return (
    <>
      <div className={`${styles.collapseAside} d-lg-none`}>
        <div className={`${styles.collapseAsideContent}`}>
          {/* 手機版選單按鈕 */}
          <button
            className={styles.right}
            onClick={() => setmobileMenu(!mobileMenu)}
          >
            <img src={`/product/font/right(orange).png`} />
          </button>
        </div>
      </div>
      {/* <div className="col-md-3 col-12"> */}
      <div
        className={`${styles.mobileFilter} ${
          mobileMenu ? styles.showFilter : ""
        }`}
      >
        <div className={` p-3 text-center`}>
          <div className="text-center">
            <div className="position-relative d-inline-block">
              <img
                ref={avatarRef}
                src={user.avatar}
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
      <div className={`col-3 ${styles.asideContainer}`}>
        <div className={` p-3 ${style.container}`}>
          <div className="text-center">
            <div className="position-relative d-inline-block">
              <img
                ref={avatarRef}
                src={user.avatar}
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
      {/* </div> */}
    </>
  );
}
