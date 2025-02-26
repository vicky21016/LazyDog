"use client";

import React, { useState, useEffect } from "react";

export function useHotel(id) {
  const [hotel, setHotel] = useState([]);
  useEffect(() => {
    const fetchHotel = async () => {
      let API = `http://localhost:5000/`;
      try {
        const res = await fetch(API);
        if (!res.ok) {
          throw new Error("無法取得資料");
        }
        const result = await res.json();
        console.log("Fetched", result);
        setHotel(result);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchHotel();
  }, [id]);

  return { hotel };
}
