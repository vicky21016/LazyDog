"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./aside.module.css";
import "nouislider/dist/nouislider.css";
import noUiSlider from "nouislider";
import FilterGroup from "./filtergroup";
import HotSaleGroup from "./hotsalegroup";

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
    <aside className={styles.Sidebar}>
      <div className={styles.SearchTable}>
        <img src="/product/font/search.png" alt="" />
        <input type="text" placeholder="搜尋商品" />
      </div>
      <HotSaleGroup />
      <FilterGroup />
      <FilterGroup />
      <div className={`text-center ${styles.PriceFilterContainer}`}>
        <h5 className={styles.FilterTitle} style={{ justifyContent: "center" }}>
          價格篩選
        </h5>
        <div className="d-flex justify-content-center gap-3">
          <div className={styles.PriceInput}>
            <label htmlFor="filterMin">$</label>
            <input
              id="filterMin"
              type="number"
              placeholder="最少"
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
          <div className={styles.PriceInput}>
            <label htmlFor="filterMax">$</label>
            <input
              id="filterMax"
              type="number"
              placeholder="最多"
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
          className={`btn btn-outline-danger mt-3 ${styles.ClearFilterBtn}`}
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
