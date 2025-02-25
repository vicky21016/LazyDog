"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/modules/fontHotelHome.module.css";
import GoogleMapComponent from "../../components/hotel/GoogleMapComponent";
import Link from "next/link";
import { 
  ratingAv,
  getAllTags,
  getHotelPriceRange,
  getGlobalPriceRange,
  getAllRoomTypes,
  getFilteredHotelsS,
} from "@/services/hotelService";
import "nouislider/dist/nouislider.css";
import noUiSlider from "nouislider";

export default function SideBar({ hotelId, onSearch, onClear,searchParams }) {
  const [showAllFacilities, setShowAllFacilities] = useState(true);
  const [roomTypes, setRoomTypes] = useState([]); //所有房型
  const [selectedRoomType, setSelectedRoomType] = useState("");
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
  const [isFiltered, setIsFiltered] = useState(false);


  useEffect(() => {
    fetchTags();
    fetchRatings();
    fetchPriceRange();
    fetchRoomTypes();

    const loadRoomTypes = async () => {
      try {
        const types = await getAllRoomTypes();
        setRoomTypes(types);
      } catch (error) {
        console.error("獲取房型失敗:", error);
      }
    };

    loadRoomTypes();
  }, []);
  const fetchHotels = async () => {
    try {
      if (isFiltered) return; //  如果已經在篩選，不要載入全部飯店
  
      const response = await fetch(`http://localhost:5000/api/hotels`);
      if (!response.ok) throw new Error("無法獲取飯店");
  
      const data = await response.json();
      setHotels(data);
  
      if (onSearch) {
        onSearch(data); // 避免覆蓋篩選結果
      }
    } catch (error) {
      console.error("獲取飯店時發生錯誤:", error);
    }
  };
  


useEffect(() => {
  if (!isFiltered) {
    fetchHotels();
  }
}, [isFiltered]);

  useEffect(() => {
    if (!priceSliderRef.current) return;

    if (!priceSliderRef.current.noUiSlider) {
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
    }
  }, []);

  useEffect(() => {
    if (priceSliderRef.current && priceSliderRef.current.noUiSlider) {
      priceSliderRef.current.noUiSlider.set([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice]);

  const fetchTags = async () => {
    try {
      const allTags = await getAllTags();
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
      console.error("獲取評分失敗:", error);
    }
  };
  const fetchRoomTypes = async () => {
    try {
      const types = await getAllRoomTypes();
      setRoomTypes(types);
    } catch (error) {
      console.error("獲取失敗:", error);
    }
  };

  const fetchPriceRange = async () => {
    try {
      let priceData = hotelId
        ? await getHotelPriceRange(hotelId)
        : await getGlobalPriceRange();
      if (priceData) {
        setMinPrice(priceData.min_price ?? 0);
        setMaxPrice(priceData.max_price ?? 10000);
      }
    } catch (error) {
      console.error("獲取價格範圍失敗:", error);
    }
  };
  const handleFilterChange = (filter) => {
    console.log(" 側邊篩選條件變更:", filter);
    onSearch(filter); // 讓 `Sidebar` 影響 `searchParams`
  };
  
  const toggleFacilities = () => {
    setShowAllFacilities((prev) => !prev);
  };
  const handleTagChange = (tagId) => {
    if (!tagId && tagId !== 0) return;

    const numericTagId = Number(tagId); // 確保是數字
    if (isNaN(numericTagId)) return; // 過濾非數字的值

    setSelectedTags((prev) => {
      return prev.includes(numericTagId)
        ? prev.filter((t) => t !== numericTagId)
        : [...prev, numericTagId];
    });
  };
  const handleApplyFilters = async () => {

    setIsFiltered(true); 
  
    const filterParams = {
      ...searchParams, // 保持原本的 searchParams
      minPrice,
      maxPrice,
      roomType: selectedRoomType || null, 
      tags: selectedTags.length > 0 ? selectedTags : [],
      rating: selectedRating || null,
    };
  
  
    try {
      const data = await getFilteredHotelsS(filterParams);
  
      if (data && Array.isArray(data)) {
        console.log("API 回傳篩選結果:", data);
        onSearch(data); //  確保更新到父層狀態
      } else {
        console.warn(" API 沒有返回有效資料");
        onSearch([]); 
      }
  
      setIsSearching(false);
    } catch (error) {
      console.error(" SideBar 篩選 API 錯誤:", error);
      onSearch([]); // 確保 UI 不會卡住
    }
  };
  
  
  
  

  const handleClear = async () => {
    console.log("清除篩選條件開始");
  
    setIsFiltered(false); // 讓 `fetchHotels()` 可以重新載入所有飯店
  
    if (onClear) {
      onClear();
    }
  
    setMinPrice(0);
    setMaxPrice(10000);
    setSelectedRoomType("");
    setSelectedTags([]);
    setSelectedRating("");
    setIsSearching(true);
  
    if (priceSliderRef.current?.noUiSlider) {
      priceSliderRef.current.noUiSlider.set([0, 10000]);
    }
  
    await fetchHotels(); // 重新載入所有飯店
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
                {rating} ⭐ 以上
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
        {/* 房型篩選 */}
        <div className={styles.suFilterGroup}>
          <h6 className={styles.suFilterTitle}>房型篩選</h6>
          <select
            className="form-select"
            value={selectedRoomType}
            onChange={(e) => setSelectedRoomType(e.target.value)}
          >
            <option value="">全部</option>
            {roomTypes.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
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
            onClick={isSearching ? handleApplyFilters : handleClear} 
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
