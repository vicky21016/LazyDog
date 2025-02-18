//還沒轉moudles還沒轉moudles

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "../../../html/hotel-coupon/css/fontHotelHome.css";
import hotelStyles from "../../../styles/modules/fontHotelDetail.module.css";
import styles from "../../../styles/modules/fontHotelHome.module.css";
import "nouislider/dist/nouislider.css";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Image from "next/image";
import { useLocationSelector } from "@/hooks/useLocationSelector";
import { useGoogleMap } from "@/hooks/useGoogleMap";
import Header from "../../components/layout/header";
import SearchBar from "../../components/hotel/search";
import Breadcrumb  from "../../components/teacher/breadcrumb";
export default function HotelHomePage() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [hotel, setHotel] = useState(null);
  const mapRef = useGoogleMap(hotel?.address);
  const { query } = router; //  URL 參數

  const [hotelId, setHotelId] = useState(null);
  useEffect(() => {
    if (router?.query?.id) {
      setHotelId(router.query.id);
    }
  }, [router.query]);
  const {
    location,
    locationModalRef,
    googleMapUrl,
    openModal,
    closeModal,
    confirmLocation,
    openMap,
  } = useLocationSelector();

  useEffect(() => {
    if (typeof window === "undefined") return;

    flatpickr("#date-date", {
      mode: "range",
      dateFormat: "Y-m-d",
      minDate: "today",
      locale: {
        firstDayOfWeek: 1,
        weekdays: {
          shorthand: ["日", "一", "二", "三", "四", "五", "六"],
          longhand: [
            "星期日",
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六",
          ],
        },
        rangeSeparator: " 至 ",
      },
    });
    if (!hotelId) return;

    const fetchHotelData = async () => {
      try {
        const res = await fetch(`/api/hotels/${hotelId}`);
        if (!res.ok) throw new Error("API 請求失敗");
        const data = await res.json();
        setHotel(data);
      } catch (error) {
        console.error("獲取旅館資訊失敗:", error);
      }
    };

    fetchHotelData();
  }, [hotelId]);
  // [hotelId]
  const changepage = (path) => {
    if (path) {
      router.push(`/hotel-coupon/${path}`);
    }
  };
    const handleSearch = () => {
      console.log("開始搜尋飯店...");
    };
  return (
    <>
      <Header />
      <SearchBar
        location={location}
        openModal={openModal}
        quantity={quantity}
        setQuantity={setQuantity}
        onSearch={handleSearch}
      />
      {/* 地區選擇 Modal */}
      <div
        className="modal fade"
        ref={locationModalRef}
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">選擇地區</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <div id="twzipcode">
                <select className="county"></select>
                <select className="district"></select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={confirmLocation}>
                確定
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 旅館簡介 */}
      <div className="container mt-5">
        <Breadcrumb
          links={[
            { label: "首頁 ", href: "/" },
            { label: "旅館列表", href: "/hotel-coupon/fonthotelHome" },
            {
              label: "旅館介紹",
              href: "/hotel-coupon/fonthotelDetail",
              active: true,
            },
          ]}
        />
        <div className="mt-5 row ">
          <div className="col-lg-6">
            <img
              src="/hotel/hotel-uploads/1-outside.png"
              alt={hotel?.name || "飯店圖片"}
              className={hotelStyles.suHotelImage}
            />
          </div>
          <div className={`col-lg-6 ps-5 ${hotelStyles.suHotelDescription}`}>
            <h2 className="mb-5">旅館簡介</h2>
            <p>
              專為寵物打造的舒適旅宿，讓您的毛孩安心入住。
              我們提供完善的照顧環境，讓毛孩享受舒適的空間與專業的服務。
              此外，我們的旅館設施皆採用無毒、抗菌材質，確保您的毛孩入住期間，擁有最安全健康的體驗。
              無論是短期住宿或長期寄宿，我們的專業團隊將提供最優質的照顧服務，讓您的毛孩擁有賓至如歸的感受！
            </p>
          </div>
        </div>

        {/* 房型選擇 */}
        <h2 className="my-5">房型選擇</h2>
        <div className="row mt-4">
          {[
            { name: "豪華大房", price: 1000, img: "1-l-room.webp" },
            { name: "普通房", price: 900, img: "1-m-room.webp" },
            { name: "精緻小房", price: 750, img: "1-s-room.webp" },
          ].map((room, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className={`card ${hotelStyles.suRoomCard}`}>
                <Image
                  className={hotelStyles.suRoomImage}
                  src={`/hotel/hotel-uploads/${room.img}`}
                  alt={room.name}
                  width={300}
                  height={200}
                />
                <div className="card-body">
                  <h3>{room.name}</h3>
                  <p className={hotelStyles.suRoomPrice}>
                    價格: {room.price}元
                  </p>
                  <select className="my-4 form-select ">
                    <option>選擇數量</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                  <button className={hotelStyles.suRoomBookBtn}>BOOK</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 我們的努力 */}
      <div className={hotelStyles.suEffortSection}>
        <div className="container text-center">
          <h2 className={hotelStyles.suEffortTitle}>我們的努力，看的見</h2>
          <p className={hotelStyles.suEffortSubtitle}>
            每一次陪伴、每一小時的付出，都為毛孩創造更快樂、更健康的生活！
          </p>
          <div className={hotelStyles.suEffortStats}>
            {[
              { img: "Dog2.png", text: "總服務時數：8,520+ 小時" },
              { img: "Dog5.png", text: "服務狗狗：1,200+ 隻" },
              { img: "Mask group.png", text: "滿意度：98.7%" },
            ].map((item, index) => (
              <div key={index} className={hotelStyles.suStatItem}>
                <Image
                  className={hotelStyles.suStatImage}
                  src={`/hotel/hotel-images/page-image/${item.img}`}
                  alt={item.text}
                  width={150}
                  height={150}
                />
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <div className={hotelStyles.suEffortButtons}>
            <button className={`btn  ${hotelStyles.suBtnPrimary}`}>
              立即預約
            </button>
            <button className={`btn ${hotelStyles.suBtnOutlineLight}`}>
              了解更多
            </button>
          </div>
        </div>
      </div>

      {/* Google 地圖 */}
      <div className={hotelStyles.suMapContainer}>
        <h1 className="map-title text-center mt-5">
          {hotel?.name || "載入中..."}
        </h1>
        <p className="map-title text-center mt-5">
          地址: {hotel?.address || "無資料"}
        </p>
        <div ref={mapRef} style={{ height: "500px", width: "100%" }}></div>
        <div className={hotelStyles.suWaveContainer}>
          <svg className={hotelStyles.suRoomWave} viewBox="0 0 1440 320">
            <path
              fill="#FFA500"
              fillOpacity="1"
              d="M0,280 C360,260 720,300 1080,280 C1260,270 1380,250 1440,240 V320 H0 Z"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
}
