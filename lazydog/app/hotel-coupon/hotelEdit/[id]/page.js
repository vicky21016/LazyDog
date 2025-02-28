"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useHotel } from "@/hooks/useHotel";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";
import hotelStyles from "../../../../styles/modules/operatorHotel.module.css";
import Header from "../../../components/layout/header";
import My from "../../../components/hotel/my";

export default function HotelEditPage() {
  const router = useRouter();
  const { id } = useParams(); // 取得旅館 ID
  const { hotel, images } = useHotel(id); // 取得旅館資訊 + 圖片
  const imageUploadRef = useRef(null);

  const { fileInputRef, avatarRef, uploadPhoto, fileChange, deletePhoto } =
    usePhotoUpload("/images/hotel/hotel-images/page-image/default-avatar.png");

  const [formData, setFormData] = useState({
    name: "",
    county: "",
    district: "",
    address: "",
    phone: "",
    businessHours: {
      monday: { open: "", close: "" },
      tuesday: { open: "", close: "" },
      wednesday: { open: "", close: "" },
      thursday: { open: "", close: "" },
      friday: { open: "", close: "" },
      saturday: { open: "", close: "" },
      sunday: { open: "", close: "" },
    },
    introduce: "",
  });

  // useEffect當 hotel 有資料時，設定 formData
  useEffect(() => {
    if (hotel) {
      // 🛠 確保 businessHours 是 JSON 格式
      let parsedBusinessHours = hotel.business_hours;
      
      if (typeof hotel.business_hours === "string") {
        try {
          parsedBusinessHours = JSON.parse(hotel.business_hours);
        } catch (error) {
          console.error("business_hours JSON 解析失敗:", error);
          parsedBusinessHours = {};
        }
      }
  
      // 設定表單數據
      setFormData({
        name: hotel.name || "",
        county: hotel.county || "",
        district: hotel.district || "",
        address: hotel.address || "",
        phone: hotel.phone || "",
        businessHours: parsedBusinessHours || {
          monday: { open: "", close: "" },
          tuesday: { open: "", close: "" },
          wednesday: { open: "", close: "" },
          thursday: { open: "", close: "" },
          friday: { open: "", close: "" },
          saturday: { open: "", close: "" },
          sunday: { open: "", close: "" },
        },
        introduce: hotel.introduce || "",
      });
    }
  }, [hotel]);
  

  // 處理表單變更
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  處理儲存
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("loginWithToken");
      if (!token) throw new Error("未登入，請重新登入");
  
      const response = await fetch(`http://localhost:5000/api/hotels/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          businessHours: JSON.stringify(formData.businessHours), // ✅ 確保以 JSON 格式存入
        }),
      });
  
      if (!response.ok) throw new Error(`更新失敗，錯誤碼: ${response.status}`);
  
      alert("更新成功！");
      router.push(`/hotel-coupon/hotelDetail/${id}`);
    } catch (error) {
      console.error("更新失敗:", error);
      alert("更新失敗，請重試");
    }
  };
  
  const handleTimeChange = (day, type, value) => {
    setFormData((prev) => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: { 
          open: prev.businessHours[day]?.open || "", 
          close: prev.businessHours[day]?.close || "",
          [type]: value
        },
      },
    }));
  };
  

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row">
          <My />

          <div className="col-12 col-md-9 mx-auto">
            <h3 className="mb-3">編輯旅館資訊</h3>
            <form id="editForm">
              <div className={`section ${hotelStyles.suSection}`}>
                <h5>基本資訊</h5>
                <div className="mb-3">
                  <label>
                    旅館名稱 <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-control ${hotelStyles.suFormControl}`}
                  />
                </div>

                {/*  地址輸入：分為 縣市、區、詳細地址 */}
                <div className="mb-3">
                  <label>縣市</label>
                  <input
                    type="text"
                    name="county"
                    value={formData.county}
                    onChange={handleChange}
                    className={`form-control ${hotelStyles.suFormControl}`}
                  />
                </div>

                <div className="mb-3">
                  <label>區</label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className={`form-control ${hotelStyles.suFormControl}`}
                  />
                </div>

                <div className="mb-3">
                  <label>詳細地址</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`form-control ${hotelStyles.suFormControl}`}
                  />
                </div>

                <div className="mb-3">
                  <label>
                    電話 <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-control ${hotelStyles.suFormControl}`}
                  />
                </div>
              </div>

              {/* 旅館圖片：從 API 獲取 */}
              <div className={`section ${hotelStyles.suSection}`}>
                <h5>旅館圖片</h5>
                <div className="d-flex flex-wrap gap-3 mb-2">
                  {images.length > 0 ? (
                    images.map((img, index) => (
                      <div key={index} className={hotelStyles.suImageCard}>
                        <img src={img.url} alt={`旅館圖片 ${index + 1}`} />
                        <button
                          type="button"
                          className={hotelStyles.suDeleteBtn}
                        >
                          &times;
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">無圖片可顯示</p>
                  )}
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

              {/* 營業時間 */}
              <div className={`section ${hotelStyles.suSection}`}>
                <h5>營業時間</h5>
                {Object.keys(formData.businessHours).map((day, index) => (
                  <div key={index} className="mb-3 d-flex align-items-center">
                    <label className="me-2" style={{ width: "80px" }}>
                      {day.toUpperCase()}
                    </label>
                    <input
                      type="time"
                      name={`open_${day}`}
                      value={formData.businessHours[day]?.open || ""}
                      onChange={(e) =>
                        handleTimeChange(day, "open", e.target.value)
                      }
                      className="form-control me-2"
                      style={{ width: "120px" }}
                    />
                    <span className="me-2">至</span>
                    <input
                      type="time"
                      name={`close_${day}`}
                      value={formData.businessHours[day]?.close || ""}
                      onChange={(e) =>
                        handleTimeChange(day, "close", e.target.value)
                      }
                      className="form-control"
                      style={{ width: "120px" }}
                    />
                  </div>
                ))}
              </div>

              {/* 旅館簡介 */}
              <div className={`section ${hotelStyles.suSection}`}>
                <h5>旅館簡介</h5>
                <textarea
                  name="introduce"
                  value={formData.introduce}
                  onChange={handleChange}
                  rows="3"
                  className={`form-control ${hotelStyles.suFormControl}`}
                />
              </div>

              <div className="d-flex justify-content-end gap-2 mt-3">
                <button
                  type="button"
                  className={`btn btn-sm px-4 ${hotelStyles.suBtnSecondary}`}
                  onClick={() => router.push(`/hotel-coupon/hotelDetail/${id}`)}
                >
                  返回
                </button>
                <button
                  type="button"
                  className={`btn btn-sm px-4 ${hotelStyles.suBtnSuccess}`}
                  onClick={handleSave}
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
