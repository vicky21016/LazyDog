"use client";
import React, { useEffect, useRef } from "react";
import styles from "../../../styles/modules/hotelList.module.css";
import { useRouter } from "next/navigation";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";

export default function PagesHotelList() {
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
          <div className="col-md-9">
            <h3 className="mb-4">旅館名稱</h3>
            <table className="`${styles.hotelTable} table">
              <thead>
                <tr>
                  <th>名稱</th>
                  <th>所在地</th>
                  <th>剩餘房數</th>
                  <th>價格範圍</th>
                  <th>評分</th>
                  <th>狀態</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr className="">
                  <td className="d-flex align-items-center gap-2">
                    <img
                      src="/images/hotel/hotel-uploads/30-outside.png"
                      className={`${styles.hotelImg} rounded`}
                      alt="寵物之星"
                    />
                    <span className="ms-3">寵物之星</span>
                  </td>

                  <td>台北</td>
                  <td>5 間</td>
                  <td>$1500 - $5000</td>
                  <td className="text-warning">4.8 ⭐</td>
                  <td>
                    <span className="badge bg-success">營業中</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => changepage("hotel")}
                    >
                      檢視
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning btn-sm"
                      onClick={() => changepage("hotelEdit")}
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm delete-hotel"
                      id="deleteBtn"
                    >
                      刪除
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="d-flex align-items-center gap-2">
                    <img
                      src="/images/hotel/hotel-uploads/10-outside.png"
                      className={`${styles.hotelImg} rounded`}
                      alt="象山寵物旅館"
                    />
                    <span className="ms-3">象山寵物</span>
                  </td>
                  <td>新北</td>
                  <td>2 間</td>
                  <td>$1200 - $4000</td>
                  <td className="text-warning">4.5 ⭐</td>
                  <td>
                    <span className="badge bg-danger">已關閉</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => changepage("hotel")}
                    >
                      檢視
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning btn-sm"
                      onClick={() => changepage("hotelEdit")}
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm delete-hotel"
                      id="deleteBtn"
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-end mt-3">
              <button
                className={styles.btnAdd}
                onClick={() => changepage("hotelCreate")}
              >
                + 新增旅館
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
