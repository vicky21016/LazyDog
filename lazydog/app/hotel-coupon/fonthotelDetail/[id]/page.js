//還沒轉moudles還沒轉moudles

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "../../../../html/hotel-coupon/css/fontHotelHome.css";
import hotelStyles from "../../../../styles/modules/fontHotelDetail.module.css";

import Image from "next/image";
import { useLocationSelector } from "@/hooks/useLocationSelector";
import { useGoogleMap } from "@/hooks/useGoogleMap";
import { getHotelById, getHotelRoomById, getRoomInventory } from "@/services/hotelService";

import Header from "../../../components/layout/header";
import SearchBar from "../../../components/hotel/search";
import Breadcrumb from "../../../components/teacher/breadcrumb";
// import HotelCard from "@/app/components/hotel/hotelCard";
import RoomSelection from "../../../components/hotel/roomSelection";
export default function HotelHomePage({ params }) {
  const { id } = params;   
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const mapRef = useGoogleMap(hotel?.address);
  const {
    location,
    address,
    locationModalRef,
    googleMapUrl,
    openModal,
    closeModal,
    confirmLocation,
    openMap,
  } = useLocationSelector();

  useEffect(() => {
    if (!id) return;

    const fetchHotelData = async () => {
      setLoading(true);
      try {
        const hotelData = await getHotelById(id);
        setHotel(hotelData);

        // 獲取房型與庫存
        const roomTypes = await getHotelRoomById(id);
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
        console.error("獲取旅館資訊失敗:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, [id]);

  return (
    <>
      <Header />
      <SearchBar
        location={location}
        address={address}
        openModal={openModal}
        closeModal={closeModal}
        locationModalRef={locationModalRef}
        quantity={1}
        confirmLocation={confirmLocation}
        setQuantity={() => {}}
        onSearch={() => console.log("開始搜尋飯店...")}
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
                  src={hotel?.main_image_url || "/hotel/hotel-uploads/default.png"}
                  alt={hotel?.name || "飯店圖片"}
                  className={hotelStyles.suHotelImage}
                />
              </div>
              <div className={`col-lg-6 ps-5 ${hotelStyles.suHotelDescription}`}>
                <h2 className="mb-5">{hotel.name}</h2>
                <p>{hotel.introduce || "無介紹"}</p>
              </div>
            </div>

            {/* 房型選擇 */}
            <h2 className="my-5">房型選擇</h2>
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
        <div ref={mapRef} style={{ height: "500px", width: "100%" }}></div>
      </div>
    </>
  );
}
