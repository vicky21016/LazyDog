"use client";

import React, { useState } from "react";
import styles from "./TaiwanMap.module.css";

// 縣市對應的推薦旅館資訊
const recommendedHotels = {
  Taipei: { name: "台北毛孩樂園", image: "/hotel/hotel-uploads/1-outside.png" },
  Taichung: {
    name: "台中寵物休閒村",
    image: "/hotel/hotel-uploads/2-outside.png",
  },
  Kaohsiung: {
    name: "高雄狗狗天堂",
    image: "/hotel/hotel-uploads/3-outside.png",
  },
  Tainan: { name: "台南寵物樂園", image: "/hotel/hotel-uploads/5-outside.png" },
  Hualien: {
    name: "花蓮寵物渡假村",
    image: "/hotel/hotel-uploads/6-outside.png",
  },
  Taitung: {
    name: "台東毛孩度假村",
    image: "/hotel/hotel-uploads/7-outside2.jpg",
  },
  Yilan: { name: "宜蘭狗狗天堂", image: "/hotel/hotel-uploads/8-outside.png" },
  Nantou: { name: "南投寵物村", image: "/hotel/hotel-uploads/9-outside.png" },
};

// 手動調整每個縣市在地圖上的位置
const regionPositions = {
  Taipei: { top: "50%", left: "50%" },
  Taichung: { top: "45%", left: "50%" },
  Kaohsiung: { top: "78%", left: "55%" },
  Tainan: { top: "70%", left: "50%" },
  Hualien: { top: "40%", left: "80%" },
  Taitung: { top: "65%", left: "85%" },
  Yilan: { top: "20%", left: "80%" },
  Nantou: { top: "55%", left: "48%" },
};

export default function RegionMap() {
  const [selectedRegion, setSelectedRegion] = useState(null);

  return (
    <div className={styles.mapContainer}>
      {/* 左上角顯示推薦旅館，僅在有選擇區域時顯示 */}
      {selectedRegion && recommendedHotels[selectedRegion] && (
        <div
          className={styles.hotelInfo}
          style={{ position: "absolute", top: "10px", left: "10px" }}
        >
          <h3>{recommendedHotels[selectedRegion].name}</h3>
          <img
            src={recommendedHotels[selectedRegion].image}
            alt={selectedRegion}
          />
        </div>
      )}

      {/* 背景地圖 */}
      <img
        className={styles.mapImage}
        src="/home/img/taiwan.png"
        alt="Taiwan Map"
      />

      {/* 疊加的縣市區域 */}
      {Object.keys(regionPositions).map((region) => (
        <img
          key={region}
          className={styles.region}
          src={`/home/img/${region.toUpperCase()}.svg`}
          alt={region}
          style={{
            top: regionPositions[region].top,
            left: regionPositions[region].left,
          }}
          onMouseEnter={() => setSelectedRegion(region)}
          onMouseLeave={() => setSelectedRegion(null)}
        />
      ))}
    </div>
  );
}
