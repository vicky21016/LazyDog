import { useEffect, useState } from "react";

export function useFetch(url) {
  //fetch得到的資料(預設為null，用於除錯)
  const [data, setData] = useState(null);
  // 載入指示開關
  const [loading, setLoading] = useState(true);
  // 錯誤物件
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        let url ="http://localhost:5000/api/course";
        const res = await fetch(url, {
          method: "GET",
          body: data
        });
        const result = await res.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return {};
}
