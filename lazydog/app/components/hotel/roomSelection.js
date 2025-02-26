import React, { useState, useEffect } from "react";
import hotelStyles from "../../../styles/modules/fontHotelDetail.module.css";
import Image from "next/image";
import { getHotelRoomById, getRoomInventory } from "@/services/hotelService";

const RoomSelection = ({ hotelId }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hotelId) {
      console.warn("🚨 錯誤: `hotelId` 為 undefined，無法載入房型");
      setLoading(false);
      return;
    }

    const fetchRooms = async () => {
      try {
        console.log(`🔍 請求 API: /api/hotel_room_types/${hotelId}`);
        
        let roomTypes = await getHotelRoomById(hotelId);
        if (!Array.isArray(roomTypes)) {
          console.error("⚠️ API 回傳房型格式錯誤:", roomTypes);
          roomTypes = []; // 確保不為 `null`
        }

        const roomData = await Promise.all(
          roomTypes.map(async (room) => {
            let inventory = await getRoomInventory(room.id);
            if (!Array.isArray(inventory)) {
              console.warn(`⚠️ `, room.id, "無房間庫存資料");
              inventory = [];
            }
            
            return {
              ...room,
              price: inventory.length ? inventory[0].price : room.price_per_night,
              available: inventory.length ? inventory[0].available_quantity : 0,
            };
          })
        );

        setRooms(roomData);
      } catch (error) {
        console.error("🚨 房型載入失敗:", error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotelId]);

  return (
    <>
      <h2 className="my-5">房型選擇</h2>
      {loading ? (
        <p className="text-center">載入中...</p>
      ) : rooms.length > 0 ? (
        <div className="row mt-4">
          {rooms.map((room, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className={`card ${hotelStyles.suRoomCard}`}>
                <Image
                  className={hotelStyles.suRoomImage}
                  src={room.image_url || "/hotel/location.jpg"}
                  alt={room.name}
                  width={300}
                  height={200}
                />
                <div className="card-body">
                  <h3>{room.room_type_name}</h3>
                  <p className={hotelStyles.suRoomPrice}>價格: {room.price}元</p>
                  <p>允許寵物體型: {room.allowed_pet_size}</p>
                  <p>是否提供食物: {room.default_food_provided ? "是" : "否"}</p>
                  <select className="my-4 form-select">
                    <option>選擇數量</option>
                    {[...Array(room.available).keys()].map((num) => (
                      <option key={num + 1}>{num + 1}</option>
                    ))}
                  </select>
                  <button className={hotelStyles.suRoomBookBtn} disabled={room.available === 0}>
                    {room.available > 0 ? "BOOK" : "已滿"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">暫無房型資料</p>
      )}
    </>
  );
};

export default RoomSelection;
