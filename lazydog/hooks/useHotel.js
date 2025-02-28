import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";

export function useHotel(id) {
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

                const res = await fetch(`http://localhost:5000/api/hotels/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) throw new Error(`無法獲取旅館，錯誤碼: ${res.status}`);

                const result = await res.json();

                // ✅ 確保只有負責人可以存取
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
