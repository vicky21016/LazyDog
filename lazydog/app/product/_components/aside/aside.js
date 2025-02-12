"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./aside.module.css";
import "nouislider/dist/nouislider.css";
import noUiSlider from "nouislider";

export default function AsideAside(props) {
  const [showMore, setShowMore] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const priceSliderRef = useRef(null);

  const handleMinPriceChange = (e) => {
    let value = e.target.value;
    if (value === "") {
      setMinPrice(""); // 清空
      return;
    }

    value = Number(value);
    if (isNaN(value)) return;
    if (value < 0) value = 0;
    if (value > maxPrice) value = maxPrice;

    setMinPrice(value);

    // 滑桿不會影響使用者輸入
    if (priceSliderRef.current?.noUiSlider) {
      priceSliderRef.current.noUiSlider.set([value, maxPrice]);
    }
  };

  const handleMaxPriceChange = (e) => {
    let value = e.target.value;
    if (value === "") {
      setMaxPrice(""); // 清空
      return;
    }

    value = Number(value);
    if (isNaN(value)) return;
    if (value > 10000) value = 10000;
    if (value < minPrice) value = minPrice;

    setMaxPrice(value);

    if (priceSliderRef.current?.noUiSlider) {
      priceSliderRef.current.noUiSlider.set([minPrice, value]);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!priceSliderRef.current) return;

    // 初始化滑桿
    noUiSlider.create(priceSliderRef.current, {
      start: [minPrice, maxPrice],
      connect: true,
      range: { min: 0, max: 10000 },
      step: 100,
    });

    // 滑桿更新時同步 `state`
    priceSliderRef.current.noUiSlider.on("change", (values) => {
      setMinPrice(parseFloat(values[0]));
      setMaxPrice(parseFloat(values[1]));
    });

    return () => {
      if (priceSliderRef.current?.noUiSlider) {
        priceSliderRef.current.noUiSlider.destroy();
      }
    };
  }, []);
  return (
    <aside className={`col-lg-3 ${styles.suSidebar}`}>
      <div className={styles.SearchTable}>
        <img src="/product/font/search.png" alt="" />
        <input type="text" placeholder="搜尋商品" />
      </div>
      <div className={styles.suFilterGroup}>
        <h5 className={styles.suFilterTitle}>設施</h5>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="walk" />
          <label className="form-check-label" htmlFor="walk">
            免費散步
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="pool" />
          <label className="form-check-label" htmlFor="pool">
            游泳池z
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="pets" />
          <label className="form-check-label" htmlFor="pets">
            戶外運動
          </label>
        </div>
        {showMore && (
          <>
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
          </>
        )}

        <span
          className={styles.suShowMore}
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "收起 ▲" : "顯示全部 ▼"}
        </span>
      </div>

      <div
        className={` text-center ${styles.suFilterGroup} ${styles.suPriceFilterContainer}`}
      >
        <h5 className={styles.suFilterTitle}>價格篩選</h5>
        <div className="d-flex justify-content-center gap-3">
          <div className={styles.suPriceInput}>
            <label htmlFor="filterMin">最少</label>
            <input
              id="filterMin"
              type="number"
              value={minPrice === "" ? "" : minPrice}
              onChange={handleMinPriceChange}
              onBlur={() => {
                if (minPrice === "" || isNaN(minPrice)) {
                  setMinPrice(0);
                  priceSliderRef.current?.noUiSlider.set([0, maxPrice]);
                }
              }}
            />
            <span>元</span>
          </div>
          <div className={styles.suPriceInput}>
            <label htmlFor="filterMax">最多</label>
            <input
              id="filterMax"
              type="number"
              value={maxPrice === "" ? "" : maxPrice}
              onChange={handleMaxPriceChange}
              onBlur={() => {
                if (maxPrice === "" || isNaN(maxPrice)) {
                  setMaxPrice(10000);
                  priceSliderRef.current?.noUiSlider.set([minPrice, 10000]);
                }
              }}
            />
            <span>元</span>
          </div>
        </div>
        <div id="priceRange" ref={priceSliderRef} className="mt-3"></div>
        <button
          className={`btn btn-outline-danger mt-3 ${styles.suClearFilterBtn}`}
          onClick={() => {
            setMinPrice(0);
            setMaxPrice(10000);
            if (priceSliderRef.current?.noUiSlider) {
              priceSliderRef.current.noUiSlider.set([0, 10000]);
            }
          }}
        >
          清除搜尋
        </button>
      </div>

      <a href="">
        <figure>
          <img
            src="/product/DM/DM_aside.png"
            alt="廣告"
            className="img-fluid"
          />
        </figure>
      </a>
    </aside>
  );
}
