'use client'

import React, { useState, useEffect } from 'react'
import styles from "../../../styles/modules/courseList.module.css";

export default function SideBar() {
  return (
    <>  
        {/* 篩選 */}
        <aside className={`col-lg-3 ${styles.sidebar}`}>
              {/* 搜尋 */}
              <div className={styles.searchGroup}>
                <img
                  className={styles.searchIcon}
                  src="/course/img/searchIcon.png"
                  alt
                />
                <input
                  type="text"
                  className={styles.searchInput}
                  id="courseInput"
                  placeholder="搜尋課程"
                />
                <img className={styles.xIcon} src="/course/img/x.png" alt />
              </div>
              {/* 課程類別 */}
              <div className={styles.filterGroup}>
                <div className={styles.bar}>
                  <h6 className={styles.filterTitle}>課程類別</h6>
                  <img
                    className={styles.arrowDown}
                    src="/course/img/arrow-down.png"
                    alt
                  />
                </div>
                <div className={styles.filter}>
                  <div className={`form-check ${styles.checks}`}>
                    <input
                      className={`form-check-input ${styles.checkbox}`}
                      type="checkbox"
                      id="train"
                    />
                    <label className={`form-check-label ${styles.labels}`} htmlFor="train">
                      寵物訓練
                    </label>
                  </div>
                  <div className={`form-check ${styles.checks}`}>
                    <input
                      className={`form-check-input ${styles.checkbox}`}
                      type="checkbox"
                      id="food"
                    />
                    <label className={`form-check-label ${styles.labels}`} htmlFor="food">
                      寵膳食育
                    </label>
                  </div>
                  <div className={`form-check ${styles.checks}`}>
                    <input
                      className={`form-check-input ${styles.checkbox}`}
                      type="checkbox"
                      id="beauty"
                    />
                    <label className={`form-check-label ${styles.labels}`} htmlFor="beauty">
                      寵物美容
                    </label>
                  </div>
                  <div className={`form-check ${styles.checks}`}>
                    <input
                      className={`form-check-input ${styles.checkbox}`}
                      type="checkbox"
                      id="takecare"
                    />
                    <label className={`form-check-label ${styles.labels}`} htmlFor="takecare">
                      寵物照護
                    </label>
                  </div>
                  <div className={`form-check ${styles.checks}`}>
                    <input
                      className={`form-check-input ${styles.checkbox}`}
                      type="checkbox"
                      id="profession"
                    />
                    <label className={`form-check-label ${styles.labels}`} htmlFor="profession">
                      商業思維與專業培訓
                    </label>
                  </div>
                </div>
              </div>
              {/* 上課地點 */}
              <div className={styles.filterGroup}>
                <div className={styles.bar}>
                  <h6 className={styles.filterTitle}>上課地點</h6>
                  <img
                    className={styles.arrowDown}
                    src="/course/img/arrow-down.png"
                    alt
                  />
                </div>
                <div className={styles.filter}>
                  <div className={`form-check ${styles.checks}`}>
                    <input
                      className={`form-check-input ${styles.checkbox}`}
                      type="checkbox"
                      id="train"
                    />
                    <label className={`form-check-label ${styles.labels}`} htmlFor="train">
                      台北
                    </label>
                  </div>
                  <div className={`form-check ${styles.checks}`}>
                    <input
                      className={`form-check-input ${styles.checkbox}`}
                      type="checkbox"
                      id="food"
                    />
                    <label className={`form-check-label ${styles.labels}`} htmlFor="food">
                      台中
                    </label>
                  </div>
                  <div className={`form-check ${styles.checks}`}>
                    <input
                      className={`form-check-input ${styles.checkbox}`}
                      type="checkbox"
                      id="beauty"
                    />
                    <label className={`form-check-label ${styles.labels}`} htmlFor="beauty">
                      高雄
                    </label>
                  </div>
                  <div className={`form-check ${styles.checks}`}>
                    <input
                      className={`form-check-input ${styles.checkbox}`}
                      type="checkbox"
                      id="takecare"
                    />
                    <label className={`form-check-label ${styles.labels}`} htmlFor="takecare">
                      線上直播
                    </label>
                  </div>
                  <div className={`form-check ${styles.checks}`}>
                    <input
                      className={`form-check-input ${styles.checkbox}`}
                      type="checkbox"
                      id="profession"
                    />
                    <label className={`form-check-label ${styles.labels}`} htmlFor="profession">
                      線上預錄
                    </label>
                  </div>
                </div>
              </div>
              {/* 🔹 價格篩選區 */}
              <div
                className={`${styles.filteGroup} ${styles.priceFilterContainer}`}
              >
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
                      defaultValue={200}
                      min={0}
                      max={10000}
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
                      defaultValue={1000}
                      min={0}
                      max={10000}
                    />
                    <span>元</span>
                  </div>
                </div>
                {/* Bootstrap Slider */}
                <input
                  id="priceRange"
                  type="text"
                  data-slider-min={0}
                  data-slider-max={10000}
                  data-slider-step={100}
                  data-slider-value="[200,1000]"
                />
              </div>
              {/* 清除按鈕 */}
              <button id="resetFilter" className={styles.clearFilterBtn}>
                清除搜尋
              </button>
              {/* 廣告 */}
              <div className={styles.ad}>
                <p className={styles.adWords}>最新課程優惠中!</p>
                <button className={styles.buynow}>BUY NOW</button>
                <img className src="/course/img/girlPic.png" alt />
              </div>

              {/* <a href>
                <figure>
                  <img
                    src="/course/hotel-images/page-image/hotelad2.png"
                    alt
                    className={`mx-4`}
                  />
                </figure>
              </a> */}
        </aside>
    </>
  )
}
