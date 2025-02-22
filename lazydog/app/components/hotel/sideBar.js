"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/modules/fontHotelHome.module.css";
import {openMap} from "@/hooks/useLocationSelector"
import Link from "next/link";
import { getHotelTags, ratingAv } from "@/services/hotelService";
import "nouislider/dist/nouislider.css";
import noUiSlider from "nouislider";

export default function SideBar({ hotelId, onSearch }) {
  const [showAllFacilities, setShowAllFacilities] = useState(false);
  const [hotelTags, setHotelTags] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [selectedRating, setSelectedRating] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [isSearching, setIsSearching] = useState(true);
  const priceSliderRef = useRef(null);

  useEffect(() => {
    if (hotelId) {
      fetchHotelTags();
    }
    fetchRatings();
  }, [hotelId]); 

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

  const fetchHotelTags = async () => {
    try {
      if (!hotelId) {
        console.warn("Hotel ID 未提供，無法獲取標籤");
        return;
      }
      const tags = await getHotelTags(hotelId);
      setHotelTags(tags || []);
    } catch (error) {
      console.error("獲取飯店標籤失敗:", error);
    }
  };

  const fetchRatings = async () => {
    try {
      const ratingList = await ratingAv();
      setRatings(ratingList || []);
    } catch (error) {
      console.error("獲取飯店評分失敗:", error);
    }
  };

  const toggleFacilities = () => {
    setShowAllFacilities((prev) => !prev);
  };

  const handleSearch = async () => {
    console.log("開始搜尋...");

    const query = selectedRating ? `?min_rating=${selectedRating}` : "";

    try {
      const res = await fetch(`http://localhost:5000/api/hotels${query}`);
      const data = await res.json();

      console.log("搜尋結果:", data);

      if (onSearch) {
        onSearch(data); //props 更新搜尋結果
      }
    } catch (error) {
      console.error("搜尋失敗:", error);
    }

    setIsSearching(false);
  };

  const handleClear = () => {
    console.log("篩選條件已清除");
    setMinPrice(0);
    setMaxPrice(10000);
    priceSliderRef.current?.noUiSlider.set([0, 10000]);
    setIsSearching(true);

    if (onSearch) {
      onSearch([]); // 清空篩選結果
    }
  };

  return (
    <>
      {/* //固定 */}
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
          <h6 className={styles.suFilterTitle}>飯店評分</h6>
          <select
            className="form-select"
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
          >
            <option value="">全部</option>
            {[5, 4, 3, 2, 1].map((rating) => (
              <option key={rating} value={rating}>
                {rating} ★ 以上
              </option>
            ))}
          </select>
        </div>

        {/* 設施篩選 */}
        <div className={styles.suFilterGroup}>
          <h6 className={styles.suFilterTitle}>設施</h6>
          {hotelTags.slice(0, 3).map((tag, index) => (
            <div className="form-check" key={index}>
              <input className="form-check-input" type="checkbox" id={tag} />
              <label className="form-check-label" htmlFor={tag}>
                {tag}
              </label>
            </div>
          ))}

          <span className={styles.suShowMore} onClick={toggleFacilities}>
            {showAllFacilities ? "收起 ▲" : "顯示全部 ▼"}
          </span>

          {showAllFacilities && (
            <div className={`${styles.suHidden} mt-2`}>
              {hotelTags.slice(3).map((tag, index) => (
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={tag}
                  />
                  <label className="form-check-label" htmlFor={tag}>
                    {tag}
                  </label>
                </div>
              ))}
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
