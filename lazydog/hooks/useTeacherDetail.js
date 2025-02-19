import { useState, useEffect } from "react";

export function useTeacherDetail (id) {
    const [teacher, setTeacher] = useState(null);
console.log(id);
    useEffect(() => {
        console.log("useEffect 觸發，id:", id);
         if (!id) {
           setTeacher(null);
           return;
         } 

        const fetchTeacher = async () => {
             console.log("開始請求 API...");
             let API = `http://localhost:5000/teachers/info/${id}`;
            try {
                const res = await fetch(API);
               if (!res.ok) {
                 throw new Error("無法取得資料");
               }
               const result = await res.json();
                console.log("Fetched teachers:", result);
               setTeacher(result); 
            } catch (err) {
                console.log(err.message);
            } 
        };

        fetchTeacher();
    }, [id]);

    return { teacher } ;
};