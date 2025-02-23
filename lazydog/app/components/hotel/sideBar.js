"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/modules/fontHotelHome.module.css";
import GoogleMapComponent from "../../components/hotel/GoogleMapComponent";
import Link from "next/link";
import { ratingAv, getAllTags, getHotelTags } from "@/services/hotelService";
import "nouislider/dist/nouislider.css";
import noUiSlider from "nouislider";

export default function SideBar({ hotelId, onSearch }) {
  const [showAllFacilities, setShowAllFacilities] = useState(true);
  const [hotels, setHotels] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [selectedRating, setSelectedRating] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [isSearching, setIsSearching] = useState(true);
  const priceSliderRef = useRef(null);
  const [showGoogleMaps, setShowGoogleMaps] = useState(false);

  useEffect(() => {
    fetchHotels();
    fetchTags();
    fetchRatings();
  }, []);

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
  const fetchHotels = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/hotels");
      const data = await res.json();
      setHotels(data || []);
    } catch (error) {
      console.error("獲取所有飯店失敗:", error);
    }
  };

  const fetchTags = async () => {
    try {
      const allTags = await getAllTags();
      console.log("獲取到的標籤:", allTags);
      setTags(allTags);
    } catch (error) {
      console.error("獲取標籤失敗:", error);
      setTags([]);
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
  const handleTagChange = (tagId) => {
    if (!tagId && tagId !== 0) return;
    setSelectedTags((prev) => {
      return prev.includes(tagId)
        ? prev.filter((t) => t !== tagId)
        : [...prev, tagId];
    });
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
    setSelectedTags([]);
    setSelectedRating("");
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
          {!showGoogleMaps ? (
            <>
              <button
                className={`btn btn-primary ${styles.suMapBtn}`}
                onClick={() => setShowGoogleMaps(true)}
              >
                📍 於地圖上顯示
              </button>
              <img
                src={`https://maps.googleapis.com/maps/api/staticmap?center=台灣&zoom=7&size=300x200&maptype=roadmap&key=AIzaSyDfCdeVzmet4r4U6iU5M1C54K9ooF3WrV4`}
                alt="地圖縮圖"
                className={styles.suMapImage}
              />
            </>
          ) : (
            <>
              <button
                className={`btn btn-primary ${styles.suMapBtn}`}
                onClick={() => setShowGoogleMaps(false)}
              >
                返回縮圖
              </button>
              {/*  使用 Google Maps 動態地圖 */}
              <GoogleMapComponent hotels={hotels} />
            </>
          )}
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

          {/* 根據 showAllFacilities 來決定顯示數量 */}
          {tags.slice(0, showAllFacilities ? tags.length : 5).map((tag) => (
            <div className="form-check" key={tag.id}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`tag-${tag.id}`}
                checked={selectedTags.includes(tag.id)}
                onChange={() => handleTagChange(tag.id)}
              />
              <label className="form-check-label" htmlFor={`tag-${tag.id}`}>
                {tag.name}
              </label>
            </div>
          ))}

          {/* 只有當標籤數超過 5 個時，才顯示切換按鈕 */}
          {tags.length > 5 && (
            <span
              className={styles.suShowMore}
              onClick={() => setShowAllFacilities(!showAllFacilities)}
            >
              {showAllFacilities ? "收起 ▲" : "顯示全部 ▼"}
            </span>
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
