import React, { useState, useEffect } from "react";
import hotelStyles from "../../../styles/modules/fontHotelDetail.module.css";
import Image from "next/image";
import { getHotelRoomById, getRoomInventory } from "@/services/hotelService";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

const RoomSelection = ({ hotelId, checkInDate, checkOutDate }) => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { onAddHotel } = useCart();
  const router = useRouter();
  const loginRoute = "/login";
  const [selectedQuantities, setSelectedQuantities] = useState({});

  useEffect(() => {
    if (!hotelId) {
      console.warn("錯誤: `hotelId` 為 undefined，無法載入房型");
      setLoading(false);
      return;
    }

    const fetchRooms = async () => {
      try {
        let response = await getHotelRoomById(hotelId);
        console.log("API 回傳的房型資料:", response);

        if (!response || response.status !== "success" || !Array.isArray(response.data)) {
          console.error(" API 回傳房型格式錯誤:", response);
          setRooms([]);
          return;
        }

        let roomTypes = response.data;
        console.log("API 回傳的房型陣列:", roomTypes);

        if (!Array.isArray(roomTypes) || roomTypes.length === 0) {
          console.warn("API 回傳空的房型資料");
          setRooms([]);
          return;
        }

        // 如果有提供日期，就查詢 `room_inventory`
        let roomData = await Promise.all(
          roomTypes.map(async (room) => {
            let availableRooms = room.quantity; // 預設為 `hotel_room_types.quantity`

            if (checkInDate && checkOutDate) {
              // 從 `room_inventory` 查詢可用數量
              let inventory = await getRoomInventory(room.id, checkInDate, checkOutDate);
              console.log(` ${room.room_type_name} 的庫存:`, inventory);

              if (Array.isArray(inventory) && inventory.length > 0) {
                availableRooms = inventory[0].available_quantity;
              }
            }

            return {
              ...room,
              price: room.price_per_night, // 直接用 `price_per_night`
              imageUrl: room.image_url && room.image_url.startsWith("http")
                ? room.image_url
                : "lazydog.png", // 預設圖片，避免 `next/image` 出錯
              available: availableRooms, // 最終可用房數
            };
          })
        );

        console.log(" 最終要存入 `rooms` state 的資料:", roomData);
        setRooms(roomData);
      } catch (error) {
        console.error(" 房型載入失敗:", error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotelId, checkInDate, checkOutDate]);

  const handleQuantityChange = (roomId, quantity) => {
    setSelectedQuantities({
      ...selectedQuantities,
      [roomId]: quantity,
    });
  };

  const handleAddToCart = (room) => {
    if (!user) {
      alert("請先登入");
      router.push(loginRoute);
      return;
    }

    const quantity = selectedQuantities[room.id] || 1;
    const hotelToAdd = {
      id: room.id,
      name: room.room_type_name,
      price: room.price,
      imageUrl: room.imageUrl,
      petSize: room.allowed_pet_size,
      provideFood: room.default_food_provided,
      count: quantity,
    };

    onAddHotel(hotelToAdd);
  };

  return (
    <>
      <h4 className="my-5">房型選擇</h4>
      {loading ? (
        <p className="text-center">載入中...</p>
      ) : rooms.length > 0 ? (
        <div className="row mt-4 justify-content-center">
          {rooms.map((room, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className={`card ${hotelStyles.suRoomCard}`}>
                <Image
                  className={hotelStyles.suRoomImage}
                  src={room.imageUrl}
                  alt={room.room_type_name || "房型圖片"}
                  width={300}
                  height={200}
                  unoptimized
                />
                <div className="card-body">
                  <h3>{room.room_type_name}</h3>
                  <p className={hotelStyles.suRoomPrice}>
                    價格: {room.price} 元
                  </p>
                  <p>允許寵物體型: {room.allowed_pet_size}</p>
                  <p>
                    是否提供食物: {room.default_food_provided ? "是" : "否"}
                  </p>
                  <select
                    className="my-4 form-select"
                    onChange={(e) =>
                      handleQuantityChange(room.id, Number(e.target.value))
                    }
                  >
                    <option value="">選擇數量</option>
                    {[...Array(room.available).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    className={hotelStyles.suRoomBookBtn}
                    disabled={room.available === 0}
                    onClick={() => handleAddToCart(room)}
                    type="button"
                  >
                    {room.available > 0 ? "訂購" : "已滿"}
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
