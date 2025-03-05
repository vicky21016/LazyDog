"use client";

import React, { useState } from "react";
import styles from "./TaiwanMap.module.css";

// 縣市對應的推薦旅館資訊
const recommendedHotels = {
  Taipei: { name: "台北毛孩樂園", image: "/home/img/TAIPEI.svg" },
  Taichung: { name: "台中寵物休閒村", image: "/home/img/TAICHONG.svg" },
  Kaohsiung: { name: "高雄狗狗天堂", image: "/home/img/KAOXUN.svg" },
  Tainan: { name: "台南寵物樂園", image: "/home/img/TAINAN.svg" },
  Hualien: { name: "花蓮寵物渡假村", image: "/home/img/HUALIAN.svg" },
  Taitung: { name: "台東毛孩度假村", image: "/home/img/TAIDONG.svg" },
  Yilan: { name: "宜蘭狗狗天堂", image: "/home/img/YILAN.svg" },
  Nantou: { name: "南投寵物村", image: "/home/img/NANTOU.svg" },
};

const regionPositions = {
  Taipei: { top: "15%", left: "45%" },
  Taichung: { top: "45%", left: "50%" },
  Kaohsiung: { top: "75%", left: "55%" },
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
      {/* 左側顯示推薦旅館 */}
      <div className={styles.hotelInfo}>
        {selectedRegion ? (
          <>
            <h3>{recommendedHotels[selectedRegion].name}</h3>
            <img
              src={recommendedHotels[selectedRegion].image}
              alt={selectedRegion}
            />
          </>
        ) : (
          <p>請選擇地區</p>
        )}
      </div>

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
          style={{ top: regionPositions[region].top, left: regionPositions[region].left }}
          onMouseEnter={() => setSelectedRegion(region)}
          onClick={() => alert(`前往 ${recommendedHotels[region].name}`)}
        />
      ))}
    </div>
  );
}