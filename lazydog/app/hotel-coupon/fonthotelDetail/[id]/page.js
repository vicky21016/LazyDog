"use client";

import React, { useState, useEffect,useRef } from "react";
import { useRouter } from "next/navigation";
import "../../../../html/hotel-coupon/css/fontHotelHome.css";
import hotelStyles from "../../../../styles/modules/fontHotelDetail.module.css";

import Image from "next/image";
import { useLocationSelector } from "@/hooks/useLocationSelector";
import { useGoogleMap } from "@/hooks/useGoogleMap";
import {
  getHotelById,
  getHotelRoomById,
  getRoomInventory,
} from "@/services/hotelService";

import Header from "../../../components/layout/header";
import SearchBar from "../../../components/hotel/search";
import Breadcrumb from "../../../components/teacher/breadcrumb";
import RoomSelection from "../../../components/hotel/roomSelection";

export default function HotelDetailPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFiltered, setIsFiltered] = useState(false);

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  
  //  確保 `sessionStorage` 只在瀏覽器內部操作
  const getInitialSearchParams = () => {
    if (typeof window !== "undefined") {
      const storedParams = sessionStorage.getItem("searchParams");
      return storedParams ? JSON.parse(storedParams) : {};
    }
    return {};
  };

  const [searchParams, setSearchParams] = useState(getInitialSearchParams);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("searchParams", JSON.stringify(searchParams));
    }
  }, [searchParams]);

  const {
    location,
    locationModalRef,
    openModal,
    city,
    district,
    closeModal,
    confirmLocation,
    clearLocation,
  } = useLocationSelector();

  useEffect(() => {
    if (!id) return;
    fetchHotelData();
  }, [id]);

  const fetchHotelData = async () => {
    setLoading(true);
    try {
      const hotelData = await getHotelById(id);
      if (!hotelData) {
        console.error(" Hotel data is null");
        return;
      }
      console.log(" 獲取旅館數據:", hotelData);
      setHotel(hotelData);

      // 更新經緯度
      if (hotelData.latitude && hotelData.longitude) {
        setLat(parseFloat(hotelData.latitude));
        setLng(parseFloat(hotelData.longitude));
      }
      console.log(" 獲取的經緯度:", hotelData.latitude, hotelData.longitude);

      // 取得 RoomType
      const roomTypes = await getHotelRoomById(id);
      if (!Array.isArray(roomTypes) || roomTypes.length === 0) {
        console.warn("無房型資料");
        setRooms([]);
        return;
      }

      // 取得房間價格
      const roomData = await Promise.all(
        roomTypes.map(async (room) => {
          const inventory = await getRoomInventory(room.id);
          return {
            ...room,
            price: inventory.length ? inventory[0].price : room.price_per_night,
            available: inventory.length ? inventory[0].available_quantity : 0,
          };
        })
      );
      setRooms(roomData);
    } catch (error) {
      console.error(" 獲取旅館資訊失敗:", error);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  // 處理搜尋邏輯
  const handleSearch = async (newParams) => {
    setIsFiltered(true); //  加入這行修正
    const updatedParams = { ...searchParams, ...newParams };

    console.log("🔍 送出 API 查詢:", updatedParams);

    setSearchParams(updatedParams);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("searchParams", JSON.stringify(updatedParams));
    }

    const paramsString = new URLSearchParams(
      Object.entries(updatedParams)
        .filter(([_, value]) => value !== null && value !== undefined)
        .map(([key, value]) => [
          key,
          Array.isArray(value) ? value.join(",") : String(value),
        ])
    ).toString();

    router.push(`/hotel-coupon/fonthotelHome?${paramsString}`);
  };
  const mapRef = useRef(null);
  useGoogleMap(lat, lng, mapRef);
  
  return (
    <>
      <Header />
      <SearchBar
        location={location}
        city={city}
        district={district}
        openModal={openModal}
        closeModal={closeModal}
        locationModalRef={locationModalRef}
        quantity={quantity}
        confirmLocation={confirmLocation}
        clearLocation={clearLocation}
        setQuantity={setQuantity}
        onSearch={handleSearch}
      />
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
        {loading ? (
          <p className="text-center mt-5">載入中...</p>
        ) : hotel ? (
          <>
            <div className="mt-5 row">
              <div className="col-lg-6">
                <img
                  src={hotel?.main_image_url || "/hotel/location.png"}
                  alt={hotel?.name || "飯店圖片"}
                  className={hotelStyles.suHotelImage}
                />
              </div>
              <div
                className={`col-lg-6 ps-5 ${hotelStyles.suHotelDescription}`}
              >
                <h2 className="mb-5">{hotel.name}</h2>
                <p>{hotel.introduce || "暫無介紹"}</p>
              </div>
            </div>

            {/* 房型選擇 */}
            <RoomSelection hotelId={id} />
          </>
        ) : (
          <p className="text-center">飯店不存在</p>
        )}
      </div>
      {/* 我們的努力 */} {/* KEEP */}
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
      {/* KEEP */}
      {/* KEEP */}
      {/* Google 地圖 */}
      <div className={hotelStyles.suMapContainer}>
        <h1 className="map-title text-center mt-5">
          {hotel?.name || "載入中..."}
        </h1>
        <p className="map-title text-center mt-5">
          地址: {hotel?.address || "無資料"}
        </p>
        {lat && lng ? (
          <div ref={mapRef} style={{ height: "500px", width: "100%" }}></div>
        ) : (
          <p className="text-center">
            無法載入地圖，請確認旅館是否有經緯度數據。
          </p>
        )}
      </div>
    </>
  );
}
