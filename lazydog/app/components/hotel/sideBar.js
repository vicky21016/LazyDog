"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/modules/fontHotelHome.module.css";
import Link from "next/link";
import "nouislider/dist/nouislider.css";
import noUiSlider from "nouislider";

export default function SideBar() {
  const [showAllFacilities, setShowAllFacilities] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [isSearching, setIsSearching] = useState(true); // 搜尋/清除狀態
  const priceSliderRef = useRef(null);

  useEffect(() => {
    if (!priceSliderRef.current) return;

    noUiSlider.create(priceSliderRef.current, {
      start: [minPrice, maxPrice],
      connect: true,
      range: { min: 0, max: 10000 },
      step: 100,
    });

    priceSliderRef.current.noUiSlider.on("update", (values) => {
      setMinPrice(parseFloat(values[0]));
      setMaxPrice(parseFloat(values[1]));
    });

    return () => {
      if (priceSliderRef.current?.noUiSlider) {
        priceSliderRef.current.noUiSlider.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (priceSliderRef.current?.noUiSlider) {
      priceSliderRef.current.noUiSlider.set([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice]);

  const toggleFacilities = () => {
    setShowAllFacilities((prev) => !prev);
  };

  const openMap = () => {
    alert("地圖功能待實作");
  };

  const handleSearch = () => {
    console.log("開始搜尋...");
    setIsSearching(false); // 切換到清除狀態
  };

  const handleClear = () => {
    console.log("篩選條件已清除");
    setMinPrice(0);
    setMaxPrice(10000);
    priceSliderRef.current?.noUiSlider.set([0, 10000]);
    setIsSearching(true); // 切換回搜尋狀態
  };

  return (
    <>
      <aside className={`container col-lg-3${styles.suSidebar}`}>
        {/* 地圖區塊 */}
        <div className={styles.suMapCard}>
          <button
            className={`btn ${styles.suMapBtn} btn-primary`}
            onClick={openMap}
          >
            📍 於地圖上顯示
          </button>
          <img
            src="https://maps.googleapis.com/maps/api/staticmap?center=台北,台灣&zoom=13&size=300x200&maptype=roadmap
                &markers=color:blue%7Clabel:台北%7C25.0330,121.5654
                &key=AIzaSyDfCdeVzmet4r4U6iU5M1C54K9ooF3WrV4"
            alt="地圖縮圖"
            className={styles.suMapImage}
          />
        </div>

        {/* 優質住宿篩選 */}
        <div className={styles.suFilterGroup}>
          <h6 className={styles.suFilterTitle}>優質住宿</h6>
          <select className="form-select">
            <option>選擇類型</option>
            <option>五星級</option>
            <option>四星級</option>
          </select>
        </div>

        {/* 設施篩選 */}
        <div className={styles.suFilterGroup}>
          <h6 className={styles.suFilterTitle}>設施</h6>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="walk" />
            <label className="form-check-label" htmlFor="walk">
              免費散步
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="pool" />
            <label className="form-check-label" htmlFor="pool">
              游泳池
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="pets" />
            <label className="form-check-label" htmlFor="pets">
              戶外運動
            </label>
          </div>

          <span className={styles.suShowMore} onClick={toggleFacilities}>
            {showAllFacilities ? "收起 ▲" : "顯示全部 ▼"}
          </span>

          {showAllFacilities && (
            <div className={`${styles.suHidden} mt-2`}>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="wifi" />
                <label className="form-check-label" htmlFor="wifi">
                  免費 Wi-Fi
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="spa" />
                <label className="form-check-label" htmlFor="spa">
                  SPA 按摩
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="gym" />
                <label className="form-check-label" htmlFor="gym">
                  健身房
                </label>
              </div>
            </div>
          )}
        </div>

        {/* 價格篩選 */}
        <div className={styles.suFilterGroup}>
          <h6 className={styles.suFilterTitle}>價格篩選</h6>
          <div className={styles.suPriceInputGroup}>
            <div className={styles.suPriceInput}>
              <label htmlFor="filterMin">最少</label>
              <span>{minPrice} 元</span>
            </div>
            <div className={styles.suPriceInput}>
              <label htmlFor="filterMax">最多</label>
              <span>{maxPrice} 元</span>
            </div>
          </div>

          <div id="priceRange" ref={priceSliderRef} className="mt-3"></div>

          {/* 搜尋 / 清除篩選 按鈕 */}
          <button
            className={`btn btn-sm btn-outline-danger mt-3 ${styles.suClearFilterBtn}`}
            onClick={isSearching ? handleSearch : handleClear}
          >
            {isSearching ? "搜尋" : "清除篩選"}
          </button>
        </div>

        {/* 廣告圖片 */}
        <Link href="#">
          <figure>
            <img
              src="/hotel/hotel-images/page-image/hotelad2.png"
              alt="廣告"
              className="mx-4"
            />
          </figure>
        </Link>
      </aside>
    </>
  );
}
