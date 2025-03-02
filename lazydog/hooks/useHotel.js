import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";

export function useHotel(operatorId = null) {
  const { user, loading: authLoading } = useAuth();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    console.log("operatorId:", operatorId);
    console.log("authLoading:", authLoading);
    console.log("user:", user);
  
    if (authLoading || !user || !operatorId) return; // 確保 operatorId 存在
  
    const fetchHotelData = async () => {
      try {
        const token = localStorage.getItem("loginWithToken");
        if (!token) throw new Error("未登入，請重新登入");
  
        console.log("Fetching hotel data...");
        const hotelRes = await fetch(
          `http://localhost:5000/api/hotels/operator/${operatorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        if (!hotelRes.ok)
          throw new Error(`無法獲取旅館資訊，錯誤碼: ${hotelRes.status}`);
  
        const hotelResult = await hotelRes.json();
        const hotelData = Array.isArray(hotelResult) ? hotelResult[0] : hotelResult;
  
        if (!hotelData || !hotelData.id) throw new Error("找不到旅館資料");
        setHotel(hotelData);
        console.log("取得的旅館 ID:", hotelData.id);
  
        // 取得旅館圖片
        const imageRes = await fetch(
          `http://localhost:5000/api/hotel_images/hotel/${hotelData.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        if (imageRes.ok) {
          const imageResult = await imageRes.json();
          console.log("取得的旅館圖片:", imageResult.data);
          setImages(imageResult.data || []);
        }
  
        // 取得所有房型種類
        const roomTypeRes = await fetch(
          `http://localhost:5000/api/hotel_room_types/room-types`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        let roomTypeData = [];
        if (roomTypeRes.ok) {
          const roomTypeResult = await roomTypeRes.json();
          roomTypeData = roomTypeResult.data || [];
          console.log("取得的房型種類:", roomTypeData);
          setRoomTypes(roomTypeData);
        }
  
        // 取得房型資料
        const roomRes = await fetch(
          `http://localhost:5000/api/hotel_room_types/operator/${operatorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        if (!roomRes.ok)
          throw new Error(`無法獲取房型，錯誤碼: ${roomRes.status}`);
  
        const roomResult = await roomRes.json();
        console.log("取得的房型資料:", roomResult.data);
  
        if (roomResult.status == "success" && Array.isArray(roomResult.data)) {
          const mappedRooms = roomResult.data.map((room) => ({
            ...room,
            room_type_name:
              roomTypeData.find((rt) => rt.id == room.room_type_id)?.name ||
              "未知房型",
          }));
  
          console.log("設定的房型:", mappedRooms);
          setRooms(mappedRooms);
        } else {
          console.warn("未獲取到房型資料:", roomResult);
        }
      } catch (err) {
        console.error("useHotel API 錯誤:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchHotelData();
  }, [operatorId, user, authLoading]); // 確保 useEffect 會觸發
  
  return { hotel, loading, error, images, roomTypes, rooms, setRooms };
}
