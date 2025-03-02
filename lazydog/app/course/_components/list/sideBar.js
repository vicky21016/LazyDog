"use client";

import React, { useState, useEffect } from "react";
import styles from "../courseList.module.css";
import Link from "next/link";

export default function SideBar({ filters, setFilters }) {
  const [types, setTypes] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/teacher/createGet`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("loginWithToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTypes(data.data.types);
        setPlaces(data.data.places);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  const [keyword, setKeyword] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [minPrice, setMinPrice] = useState(200);
  const [maxPrice, setMaxPrice] = useState(1000);

  // 搜尋關鍵字
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
    setFilters((prev) => ({ ...prev, keyword: e.target.value }));
  };

  // 更新課程類別篩選
  const handleTypeChange = (id) => {
    setFilters((prev) => ({
      ...prev,
      types: prev.types.includes(id)
        ? prev.types.filter((t) => t !== id)
        : [...prev.types, id],
    }));
  };

  // 更新地點篩選
  const handlePlaceChange = (id) => {
    setFilters((prev) => ({
      ...prev,
      places: prev.places.includes(id)
        ? prev.places.filter((p) => p !== id)
        : [...prev.places, id],
    }));
  };

  // 更新價格範圍
  const handlePriceChange = (e, type) => {
    setFilters((prev) => ({
      ...prev,
      [type]: Number(e.target.value),
    }));
  };

  return (
    <>
      {/* 篩選 */}
      <aside className={`col-lg-3 ${styles.sidebar}`}>
        {/* 搜尋 */}
        <div className={styles.searchGroup}>
          <img
            className={styles.searchIcon}
            src="/course/img/searchIcon.png"
            alt={`搜尋課程內容`}
          />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="搜尋課程"
            value={keyword}
            onChange={handleKeywordChange}
          />
          <img
            className={styles.xIcon}
            src="/course/img/x.png"
            alt={`清除搜尋內容`}
          />
        </div>
        {/* 課程類別 */}
        <div className={styles.filterGroup}>
          <div className={styles.bar}>
            <h6 className={styles.filterTitle}>課程類別</h6>
            <img
              className={styles.arrowDown}
              src="/course/img/arrow-down.png"
              alt={`點選看更多 課程類別`}
            />
          </div>
          <div className={styles.filter}>
            {types.map((t) => (
              <div key={t.type_id} className={`form-check ${styles.checks}`}>
                <input
                  className={`form-check-input ${styles.checkbox}`}
                  type="checkbox"
                  checked={filters.types.includes(t.id)}
                  onChange={() => handleTypeChange(t.id)}
                />
                <label
                  className={`form-check-label ${styles.labels}`}
                  htmlFor="train"
                >
                  {t.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* 上課地點 */}
        <div className={styles.filterGroup}>
          <div className={styles.bar}>
            <h6 className={styles.filterTitle}>上課地點</h6>
            <img
              className={styles.arrowDown}
              src="/course/img/arrow-down.png"
              alt={`點選看更多 上課地點`}
            />
          </div>
          <div className={styles.filter}>
            {places.map((p) => (
              <div key={p.id} className={`form-check ${styles.checks}`}>
                <input
                  className={`form-check-input ${styles.checkbox}`}
                  type="checkbox"
                  checked={filters.places.includes(p.id)}
                  onChange={() => handlePlaceChange(p.id)}
                />
                <label
                  className={`form-check-label ${styles.labels}`}
                  htmlFor="train"
                >
                  {p.region}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* 🔹 價格篩選區 */}
        <div className={`${styles.filteGroup} ${styles.priceFilterContainer}`}>
          <div className={`${styles.bar} ${styles.priceBar}`}>
            <h6 className={styles.filterTitle}>價格篩選</h6>
          </div>
          {/* 價格輸入框 */}
          <div className={styles.priceInputGroup}>
            <div className={styles.priceInput}>
              <label className={`visually-hidden`} htmlFor="filterMin">
                最少
              </label>
              <input
                id="filterMin"
                type="number"
                value={filters.minPrice}
                onChange={(e) => handlePriceChange(e, "minPrice")}
                min={0}
              />
              <span>元</span>
            </div>
            <div className={styles.priceInput}>
              <label className={`visually-hidden`} htmlFor="filterMax">
                最多
              </label>
              <input
                id="filterMax"
                type="number"
                value={filters.maxPrice}
                onChange={(e) => handlePriceChange(e, "maxPrice")}
                max={100000}
              />
              <span>元</span>
            </div>
          </div>
          {/* Bootstrap Slider */}
          {/* <input
            id="priceRange"
            type="text"
            data-slider-min={0}
            data-slider-max={10000}
            data-slider-step={100}
            data-slider-value="[200,1000]"
          /> */}
        </div>
        {/* 清除按鈕 */}
        <button id="resetFilter" className={styles.clearFilterBtn}>
          清除搜尋
        </button>
        {/* 廣告 */}
        <div className={styles.ad}>
          <p className={styles.adWords}>最新課程優惠中!</p>
          <button className={styles.buynow}>BUY NOW</button>
          <Link href="/product/list">
            <img src="/course/img/girlPic.png" alt={`最新課程優惠中`} />
          </Link>
        </div>
      </aside>
    </>
  );
}
