import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";

export function useHotel(id = null) {
    const { user, loading: authLoading } = useAuth();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]);  // ⬅️ 存圖片

    useEffect(() => {
        if (authLoading || !user) return;

        const fetchHotel = async () => {
            try {
                const token = localStorage.getItem("loginWithToken");
                if (!token) throw new Error("未登入，請重新登入");

                const url = id
                    ? `http://localhost:5000/api/hotels/operator/${id}`
                    : `http://localhost:5000/api/hotels/operator`;

                console.log("Fetching hotel data from:", url);

                const res = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) throw new Error(`無法獲取旅館，錯誤碼: ${res.status}`);

                const result = await res.json();
                console.log("API Response:", result);

                const hotelData = Array.isArray(result) ? result[0] : result;

                if (!hotelData || !hotelData.operator_id) {
                    throw new Error("旅館資料缺少 operator_id，請檢查 API");
                }

                console.log("user.id:", user.id, "hotelData.operator_id:", hotelData.operator_id);

                if (Number(hotelData.operator_id) !== Number(user.id)) {
                    throw new Error("你沒有權限查看這間旅館");
                }

                setHotel(hotelData);

                // 取得旅館圖片
                const imageRes = await fetch(`http://localhost:5000/api/hotel_images/hotel/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!imageRes.ok) throw new Error(`無法獲取圖片，錯誤碼: ${imageRes.status}`);
                const imageResult = await imageRes.json();
                console.log("Hotel Images:", imageResult);

                if (imageResult.status === "success" && Array.isArray(imageResult.data)) {
                    setImages(imageResult.data);  // ✅ 確保 `images` 來自 `data`
                } else {
                    setImages([]);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHotel();
    }, [id, user, authLoading]);

    return { hotel, loading, error, images };  // ⬅️ 回傳 images
}
