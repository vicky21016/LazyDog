import { useState, useEffect } from "react";

export function useHotelReview (id) {
    const [review, setReview] = useState([]);
    useEffect(() => {

        const fetchReview = async () => {
             let API = `http://localhost:5000/api/hotel_review/${id}`;
            try {
                const res = await fetch(API);
               if (!res.ok) {
                 throw new Error("無法取得資料");
               }
               const result = await res.json();
                console.log("Fetched :", result);
                if (result?.data?.data && Array.isArray(result.data.data)) {
                    setReview(result.data.data);
                } else {
                    throw new Error("資料格式錯誤，找不到 data.data");
                }
            } catch (err) {
                console.log(err.message);
            } 
        };

        fetchReview();
    }, [id]);

    return { review } ;
};