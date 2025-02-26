"use client";
import React, { useEffect, useRef } from "react";
// import styles from "../../../styles/modules/operatorCamera.module.css";
import hotelStyles from "../../../../styles/modules/operatorHotel.module.css";
import { useHotel } from "@/hooks/useHotel";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Header from "../../../components/layout/header";
import My from "../../../components/hotel/my";
export default function HotelEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const { hotel } = useHotel(id);

  const changepage = (path) => {
    router.push(`/hotel-coupon/${path}`);
  };

  const handleDelete = () => {
    if (confirm("確定要刪除這間旅館嗎？")) {
      console.log("刪除成功！");
      changepage("hotelList"); // 刪除後跳轉回旅館列表
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row">
          {/* 左邊 */}
          <My />

          {/* 右邊 */}
          <div className="col-12 col-md-9">
            <div className="mx-auto">
              <h5 className="mb-3">旅館資訊</h5>
              <form id="hotelForm">
                <div className={`section ${hotelStyles.suSection}`}>
                  <h5>基本資訊</h5>
                  <div className="mb-3">
                    <label className="form-label">
                      旅館名稱 <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={hotel.name}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      地址 <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={`${hotel.county}${hotel.district}${hotel.address}`}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      電話 <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={hotel.phone}
                      readOnly
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
                    </div>
                    <div className={hotelStyles.suImageCard}>
                      <img
                        src="/hotel/hotel-uploads/13-s-room.jpg"
                        alt="旅館圖片2"
                      />
                    </div>
                  </div>
                </div>

                <div className={`section ${hotelStyles.suSection}`}>
                  <h5>營業時間</h5>
                  <div className="mb-3">
                    {/* <label className="form-label">營業時間</label> */}
                    <textarea
                      className="form-control"
                      value={hotel.time}
                      readOnly
                      rows="3"
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-3">
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-4"
                    onClick={() => changepage("hotelList")}
                  >
                    返回
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning btn-sm px-4"
                    onClick={() => changepage("hotelEdit")}
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm px-4"
                    onClick={handleDelete}
                  >
                    刪除
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
