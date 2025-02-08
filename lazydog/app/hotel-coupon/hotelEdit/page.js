"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "../../../styles/modules/operatorCamera.module.css";
import hotelStyles from "../../../styles/modules/operatorHotel.module.css";
import { useRouter } from "next/navigation";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";

export default function HotelEditPage(props) {
  const imageUploadRef = useRef(null);
  const [hotelName, setHotelName] = useState("寵物樂園");
  const [address, setAddress] = useState("台北市中山區 123 號");
  const [phone, setPhone] = useState("02-12345678");
  const [description, setDescription] = useState(
    "寵物樂園是一個專門提供給狗狗的住宿場所，提供優質的照顧與設施。"
  );
  const [businessHours, setBusinessHours] = useState("09:00 - 20:00");
  const [tags, setTags] = useState("寵物友善, 免費早餐");
  const [rooms, setRooms] = useState([
    { type: "大型犬房", quantity: 5, price: "1500 元/晚", extra: "500 元" },
    { type: "中型犬房", quantity: 3, price: "1200 元/晚", extra: "400 元" },
  ]);
  const handleRoomChange = (index, field, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[index][field] = value;
    setRooms(updatedRooms);
  };
  const addRoom = () => {
    setRooms([...rooms, { type: "", quantity: 0, price: "", extra: "" }]);
  };
  const removeRoom = (index) => {
    const updatedRooms = rooms.filter((_, i) => i !== index);
    setRooms(updatedRooms);
  };

  const router = useRouter();
  const { fileInputRef, avatarRef, uploadPhoto, fileChange, deletePhoto } =
    usePhotoUpload("/images/hotel/hotel-images/page-image/default-avatar.png");
  const changepage = (path) => {
    if (path) {
      router.push(`/hotel-coupon/${path}`);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
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
          <div className="col-md-9  mx-auto">
            <h3 className="mb-3">編輯旅館資訊</h3>
            <form id="editForm">
              <div className={`section ${hotelStyles.suSection}`}>
                <h5>基本資訊</h5>
                <div className="mb-3">
                  <label>旅館名稱</label>
                  <input
                    type="text"
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    className={`form-control ${hotelStyles.suFormControl}`}
                  />
                </div>

                <div className="mb-3">
                  <label>地址</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={`form-control ${hotelStyles.suFormControl}`}
                  />
                </div>

                <div className="mb-3">
                  <label>電話</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`form-control ${hotelStyles.suFormControl}`}
                  />
                </div>
              </div>

              <div className={`section ${hotelStyles.suSection}`}>
                <h5>旅館圖片</h5>
                <div
                  id="imagePreviewContainer"
                  className="d-flex flex-wrap gap-3 mb-2"
                >
                  <div className={hotelStyles.suImageCard}>
                    <img
                      src="/hotel/hotel-uploads/11-room.webp"
                      alt="旅館圖片1"
                    />
                    <button type="button" className={hotelStyles.suDeleteBtn}>
                      &times;
                    </button>
                  </div>
                  <div className={hotelStyles.suImageCard}>
                    <img
                      src="/hotel/hotel-uploads/6-s-room.jpg"
                      alt="旅館圖片2"
                    />
                    <button type="button" className={hotelStyles.suDeleteBtn}>
                      &times;
                    </button>
                  </div>
                </div>
                <input
                  type="file"
                  ref={imageUploadRef}
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
              <div className={`section ${hotelStyles.suSection}`}>
                <h5>旅館圖片</h5>
                <div className="mb-3">
                  <label>房型</label>
                  {rooms.map((room, index) => (
                    <div key={index} className="d-flex mb-2">
                      <input
                        type="text"
                        value={room.type}
                        onChange={(e) =>
                          handleRoomChange(index, "type", e.target.value)
                        }
                        placeholder="房型"
                        className={`form-control me-2 ${hotelStyles.suFormControl}`}
                      />
                      <input
                        type="number"
                        value={room.quantity}
                        onChange={(e) =>
                          handleRoomChange(index, "quantity", e.target.value)
                        }
                        placeholder="數量"
                        className={`form-control me-2 ${hotelStyles.suFormControl}`}
                      />
                      <input
                        type="text"
                        value={room.price}
                        onChange={(e) =>
                          handleRoomChange(index, "price", e.target.value)
                        }
                        placeholder="價格"
                        className={`form-control me-2 ${hotelStyles.suFormControl}`}
                      />
                      <input
                        type="text"
                        value={room.extra}
                        onChange={(e) =>
                          handleRoomChange(index, "extra", e.target.value)
                        }
                        placeholder="附加費"
                        className={`form-control me-2 ${hotelStyles.suFormControl}`}
                      />
                      <button
                        type="button"
                        className={`btn ${hotelStyles.suBtnDanger}`}
                        onClick={() => removeRoom(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addRoom}
                  >
                    + 新增房型
                  </button>
                </div>
              </div>
              <div className={`section ${hotelStyles.suSection}`}>
                <h5>營業時間</h5>
                <div className="mb-3">
                  <label>營業時間</label>
                  <input
                    type="text"
                    value={businessHours}
                    onChange={(e) => setBusinessHours(e.target.value)}
                    className={`form-control ${hotelStyles.suFormControl}`}
                  />
                </div>

                <div className="mb-3">
                  <label>標籤</label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className={`form-control ${hotelStyles.suFormControl}`}
                  />
                </div>

                <div className="mb-3">
                  <label>旅館簡介</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`form-control ${hotelStyles.suFormControl}`}
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div className="d-flex justify-content-end gap-2 mt-3">
                <button
                  type="button"
                  className={`btn  btn-sm px-4  ${hotelStyles.suBtnSecondary}`}
                  onClick={() => changepage("hotel")}
                >
                  返回
                </button>
                <button
                  type="submit"
                  className={`btn btn-sm px-4 ${hotelStyles.suBtnSuccess}`}
                >
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
