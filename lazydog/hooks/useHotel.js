import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";

export function useHotel(id = null) {  // 🔹 `id` 預設為 `null`
    const { user, loading: authLoading } = useAuth();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (authLoading || !user) return;

        const fetchHotel = async () => {
            try {
                const token = localStorage.getItem("loginWithToken");
                if (!token) throw new Error("未登入，請重新登入");

                //  決定 API URL：如果 `id` 存在，就請求 `/operator/:id`，否則請求 `/operator`
                const url = id
                    ? `http://localhost:5000/api/hotels/operator/${id}`
                    : `http://localhost:5000/api/hotels/operator`;

                console.log("Fetching hotel data from:", url); //  Debug 看看 URL 是否正確

                const res = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) throw new Error(`無法獲取旅館，錯誤碼: ${res.status}`);

                const result = await res.json();

                //  確保 `operator_id` 正確
                if (result.operator_id !== user.id) {
                    throw new Error("你沒有權限查看這間旅館");
                }

                setHotel(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHotel();
    }, [id, user, authLoading]);

    return { hotel, loading, error };
}
