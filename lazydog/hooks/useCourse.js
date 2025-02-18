import { useState, useEffect } from "react";

export function useCourse() {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      let API = "http://localhost:5000/api/course/";
      try {
        const res = await fetch(API);
        
        if (!res.ok) throw new Error("feach course err"); // 檢查回應是否成功

        const result = await res.json(); 
        console.log("Fetched courses:", result);

       if (!Array.isArray(result)) throw new Error(result.message); 

       setCourses(result); 

      } catch (err) {
        console.log(err.message);
      }
    };

    fetchCourses();
  }, []); 
useEffect(() => {

}, [courses]);
  return { courses }; // 返回 courses 資料
}
