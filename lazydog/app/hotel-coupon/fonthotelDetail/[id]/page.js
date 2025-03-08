"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import moment from "moment";
import Swal from "sweetalert2"; // 導入 SweetAlert
import "../../../../html/hotel-coupon/css/fontHotelHome.css";
import hotelStyles from "../../../../styles/modules/fontHotelDetail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import { useLocationSelector } from "@/hooks/useLocationSelector";
import { useGoogleMap } from "@/hooks/useGoogleMap";
import {
  getHotelById,
  getHotelRoomById,
  getRoomInventory,
} from "@/services/hotelService";
import {
  addHotelFavorite,
  removeHotelFavorite,
  getHotelFavorites,
} from "@/services/allFavoriteService";
import Header from "../../../components/layout/header";
import SearchBar from "../../../components/hotel/search";
import Breadcrumb from "../../../components/teacher/breadcrumb";
import RoomSelection from "../../../components/hotel/roomSelection";
import { useAuth } from "@/hooks/use-auth";
import useSafeData from "@/hooks/useSafeData";

export default function HotelDetailPage({ params }) {
  const { id } = params;
  const [favoriteId, setFavoriteId] = useState(null); // 存收藏的 ID

  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, token } = useAuth();

  // 從 URL 中提取 checkIn 和 checkOut
  const initialCheckInDate = searchParams.get("checkInDate") || "";
  const initialCheckOutDate = searchParams.get("checkOutDate") || "";
  const initialQuantity = searchParams.get("quantity") || 1;

  // 狀態管理
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isFavorite, setIsFavorite] = useState(false);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [checkInDate, setCheckInDate] = useState(initialCheckInDate);
  const [checkOutDate, setCheckOutDate] = useState(initialCheckOutDate);

  const checkInDateFromUrl = searchParams.get("checkInDate") || "";
  const checkOutDateFromUrl = searchParams.get("checkOutDate") || "";
  const quantityFromUrl = searchParams.get("quantity") || 1;

  // 確保 state 也更新
  useEffect(() => {
    setCheckInDate(checkInDateFromUrl);
    setCheckOutDate(checkOutDateFromUrl);
    setQuantity(quantityFromUrl);
  }, [checkInDateFromUrl, checkOutDateFromUrl, quantityFromUrl]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedParams = JSON.parse(sessionStorage.getItem("searchParams"));

      if (storedParams) {
        if (!checkInDate) setCheckInDate(storedParams.checkInDate || "");
        if (!checkOutDate) setCheckOutDate(storedParams.checkOutDate || "");
        if (!quantity) setQuantity(storedParams.quantity || 1);
      }
    }
  }, []);

  // 使用 useLocationSelector 獲取 location
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

  // 獲取旅館資料
  useEffect(() => {
    if (!id) return;
    fetchHotelData();
  }, [id]);

  // 獲取收藏狀態
  useEffect(() => {
    if (id && user?.id && token) {
      console.log("用戶已登入，開始獲取收藏資料");
      fetchFavoriteId();
    }
  }, [id, user, token]);

  const fetchFavoriteId = async () => {
    if (!id || !user || !token) {
      console.error("⚠️ Hotel ID、用戶或 token 未定義，無法獲取收藏");
      return;
    }
  
    try {
      const result = await getHotelFavorites();  // API 請求
      console.log("📌 收藏 API 返回:", result);
  
      if (result.success && Array.isArray(result.data)) {
        const favorite = result.data.find((item) => Number(item.hotel_id) === Number(id));
        
        if (favorite) {
          console.log("✅ 找到收藏 ID:", favorite.id);
          setFavoriteId(favorite.id);  // **確保 favoriteId 設置成功**
          setIsFavorite(true);
        } else {
          console.log("❌ 旅館未收藏，favoriteId 設為 null");
          setFavoriteId(null);
          setIsFavorite(false);
        }
      } else {
        console.log("⚠️ 收藏 API 返回資料異常，設定為未收藏");
        setFavoriteId(null);
        setIsFavorite(false);
      }
    } catch (error) {
      console.error("🚨 獲取收藏狀態失敗:", error);
      setFavoriteId(null);
      setIsFavorite(false);
    }
  };
  

  // **確保 isFavorite 狀態正確**
  useEffect(() => {
    if (favoriteId) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favoriteId]);

  console.log("當前 isFavorite:", isFavorite);
  console.log("當前 favoriteId:", favoriteId);
  // 獲取旅館資料的函數
  const fetchHotelData = async () => {
    setLoading(true);
    try {
      const hotelData = await getHotelById(id);
      if (!hotelData) {
        console.error("Hotel data is null");
        return;
      }
      setHotel(hotelData);

      // 更新經緯度
      if (hotelData.latitude && hotelData.longitude) {
        setLat(parseFloat(hotelData.latitude));
        setLng(parseFloat(hotelData.longitude));
      }

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
      console.error("獲取旅館資訊失敗:", error);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  // 處理搜尋邏輯
  const handleSearch = async (newParams) => {
    const updatedParams = {
      checkInDate,
      checkOutDate,
      quantity,
      ...newParams,
    };

    // 更新 URL 參數
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

  // 處理收藏邏輯
  const handleFavorite = async () => {
    if (!user || !user.id) {
      Swal.fire({
        icon: "warning",
        title: "請先登入",
        text: "您需要登入才能收藏旅館！",
      }).then(() => {
        router.push("/login");
      });
      return;
    }
  
    try {
      if (isFavorite && favoriteId) {
        // **移除收藏**
        console.log("🚀 嘗試移除收藏，favoriteId:", favoriteId);
        const response = await removeHotelFavorite(favoriteId, user.id);
        console.log("📌 移除收藏 API 回應:", response);
  
        if (response.success) {
          console.log("✅ 移除收藏成功，更新狀態");
          setIsFavorite(false);
          setFavoriteId(null);
          Swal.fire({
            icon: "success",
            title: "已移除收藏",
            text: "旅館已從您的收藏清單中移除！",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "移除收藏失敗",
            text: response.error || "請稍後再試",
          });
        }
      } else {
        // **新增收藏**
        console.log("🚀 嘗試加入收藏，hotel_id:", id);
        const response = await addHotelFavorite(id, user.id);
        console.log("📌 加入收藏 API 回應:", response);
  
        if (response.success && response.data?.id) {
          console.log("✅ 加入收藏成功，更新狀態");
          setIsFavorite(true);
          setFavoriteId(response.data.id); // **確保 favoriteId 被設置**
          Swal.fire({
            icon: "success",
            title: "收藏成功！",
            text: "旅館已加入您的收藏清單！",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "收藏失敗",
            text: response.error || "請稍後再試",
          });
        }
      }
    } catch (error) {
      console.error("🚨 收藏操作失敗:", error);
      Swal.fire({ icon: "error", title: "操作失敗", text: "請稍後再試！" });
    }
  };
  
  

  useEffect(() => {
    if (favoriteId) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favoriteId]);
  useEffect(() => {
    const storedFavorite = localStorage.getItem(`favorite_${id}`);
    if (storedFavorite) {
      setIsFavorite(JSON.parse(storedFavorite));
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`favorite_${id}`, JSON.stringify(isFavorite));
  }, [isFavorite, id]);

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
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        onCheckInDateChange={setCheckInDate}
        onCheckOutDateChange={setCheckOutDate}
      />
      {/* 簡介 */}
      <div className={`container mt-5 ${hotelStyles.container}`}>
        <Breadcrumb
          links={[
            { label: "首頁 ", href: "/" },
            { label: "旅館列表", href: "/hotel-coupon/fonthotelHome" },
            {
              label: "旅館介紹",
              href: `/hotel-coupon/fonthotelDetail/${id}`,
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
                <h3 className="mb-5 text-center">
                  {hotel.name}
                  <i
                    className={`bi ${
                      isFavorite ? "bi-heart-fill" : "bi-heart"
                    }`}
                    style={{ color: "red", cursor: "pointer", float: "right" }}
                    onClick={handleFavorite}
                  ></i>
                </h3>
                {/* <p>入住時間: {checkInDate}</p>
                <p>退房時間: {checkOutDate}</p>
                <p>數量: {quantity}</p> */}
                {/* 測試用 */}
                <p className={hotelStyles.suIntroduce}>
                  {hotel.introduce || "暫無介紹"}
                </p>
              </div>
            </div>

            {/* 房型選擇 */}
            <RoomSelection
              hotelId={id}
              checkIn={checkInDate}
              checkOut={checkOutDate}
            />
          </>
        ) : (
          <p className="text-center">飯店不存在</p>
        )}
      </div>
      {/* 我們的努力 */}
      <div className={hotelStyles.suEffortSection}>
        <div className={`container text-center ${hotelStyles.container}`}>
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
