"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "../../../styles/modules/courseList.module.css";
import Header from "@/app/components/layout/header";
import Footer from "@/app/components/layout/footer";

export default function CourseListPage() {
  return (
    <>
      <Header/>
      <div className={styles.list}>
        <div className={styles.new}>
          <img className={styles.newImg} src="/course/img/18 (1).jpeg" alt />
          <div className={styles.bottom}>
            <div className={styles.date}>01 / 08</div>
            <div className={styles.arrows}>
              <img
                className={styles.arrowLW}
                src="/course/img/arrow-left-white.png"
                alt
              />
              <img
                className={styles.arrowRW}
                src="/course/img/arrow-right-white.png"
                alt
              />
            </div>
          </div>
        </div>
        <div className={`container ${styles.section1}`}>
          <div className={`row`}>
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
            <div className={`col-lg-9 ${styles.right}`}>
              <div className={styles.top}>
                <h2 className={styles.sTitle}>所有課程</h2>
                <div className={styles.sbar} />
              </div>
              <div className={styles.medium}>
                <div className={styles.count}>
                  共計 <span className={styles.countNum}>42</span> 堂課
                </div>
                <div className={styles.hot}>
                  <img src="/course/img/sort.png" alt />
                  依熱門程度排序
                </div>
              </div>
              <div className={styles.courseGroup}>
                <div className={styles.courseCard}>
                  <img
                    className={styles.img}
                    src="/course/img/18 (1).jpeg"
                    alt
                  />
                  <h5 className={styles.tag}>寵物訓練</h5>
                  <h2 className={styles.name}>犬貓營養與動物中醫</h2>
                  <p className={styles.intro}>
                    了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提
                  </p>
                </div>
                <div className={styles.courseCard}>
                  <img
                    className={styles.img}
                    src="/course/img/18 (1).jpeg"
                    alt
                  />
                  <h5 className={styles.tag}>寵物訓練</h5>
                  <h2 className={styles.name}>犬貓營養與動物中醫</h2>
                  <p className={styles.intro}>
                    了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提
                  </p>
                </div>
                <div className={styles.courseCard}>
                  <img
                    className={styles.img}
                    src="/course/img/18 (1).jpeg"
                    alt
                  />
                  <h5 className={styles.tag}>寵物訓練</h5>
                  <h2 className={styles.name}>犬貓營養與動物中醫</h2>
                  <p className={styles.intro}>
                    了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提
                  </p>
                </div>
                <div className={styles.courseCard}>
                  <img
                    className={styles.img}
                    src="/course/img/18 (1).jpeg"
                    alt
                  />
                  <h5 className={styles.tag}>寵物訓練</h5>
                  <h2 className={styles.name}>犬貓營養與動物中醫</h2>
                  <p className={styles.intro}>
                    了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提
                  </p>
                </div>
                <div className={styles.courseCard}>
                  <img
                    className={styles.img}
                    src="/course/img/18 (1).jpeg"
                    alt
                  />
                  <h5 className={styles.tag}>寵物訓練</h5>
                  <h2 className={styles.name}>犬貓營養與動物中醫</h2>
                  <p className={styles.intro}>
                    了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提
                  </p>
                </div>
                <div className={styles.courseCard}>
                  <img
                    className={styles.img}
                    src="/course/img/18 (1).jpeg"
                    alt
                  />
                  <h5 className={styles.tag}>寵物訓練</h5>
                  <h2 className={styles.name}>犬貓營養與動物中醫</h2>
                  <p className={styles.intro}>
                    了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提
                  </p>
                </div>
                <div className={styles.courseCard}>
                  <img
                    className={styles.img}
                    src="/course/img/18 (1).jpeg"
                    alt
                  />
                  <h5 className={styles.tag}>寵物訓練</h5>
                  <h2 className={styles.name}>犬貓營養與動物中醫</h2>
                  <p className={styles.intro}>
                    了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提
                  </p>
                </div>
                <div className={styles.courseCard}>
                  <img
                    className={styles.img}
                    src="/course/img/18 (1).jpeg"
                    alt
                  />
                  <h5 className={styles.tag}>寵物訓練</h5>
                  <h2 className={styles.name}>犬貓營養與動物中醫</h2>
                  <p className={styles.intro}>
                    了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提
                  </p>
                </div>
                <div className={styles.courseCard}>
                  <img
                    className={styles.img}
                    src="/course/img/18 (1).jpeg"
                    alt
                  />
                  <h5 className={styles.tag}>寵物訓練</h5>
                  <h2 className={styles.name}>犬貓營養與動物中醫</h2>
                  <p className={styles.intro}>
                    了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提
                  </p>
                </div>
              </div>
              <nav className={styles.navigation} aria-label="Page navigation">
                <ul className={`pagination justify-content-center ${styles.pagination}`}>
                  <li className={`page-item ${styles.pageItem} `}>
                    <a className={`page-link ${styles.pageLink}`} href="#" aria-label="Previous">
                      <span aria-hidden="true">
                        <img src="/course/img/pageArrowleft;png.png" alt />
                      </span>
                    </a>
                  </li>
                  <li className={`page-item ${styles.pageItem}`}>
                    <a className={`page-link ${styles.pageLink}`} href="#">
                      1
                    </a>
                  </li>
                  <li className={`page-item ${styles.pageItem}`}>
                    <a className={`page-link ${styles.pageLink}`} href="#">
                      2
                    </a>
                  </li>
                  <li className={`page-item ${styles.pageItem}`}>
                    <a className={`page-link ${styles.pageLink}`} href="#" aria-label="Next">
                      <span aria-hidden="true">
                        <img src="/course/img/pageArrowright.png" alt />
                      </span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className={`container ${styles.section2}`}>
          <div className={styles.similarCourse}>
            <h2 className={styles.sTitle}>熱門內容</h2>
            <div className={styles.sBars}>
              <div className={styles.sbar} />
              <div className={styles.btns}>
                <img
                  className={styles.arrowLeft}
                  src="/course/img/arrow-left.png"
                  alt
                />
                <img
                  className={styles.arrowRight}
                  src="/course/img/arrow-right.png"
                  alt
                />
              </div>
            </div>
            <div className={styles.sCards}>
              <div className={styles.sCard}>
                <img
                  className={styles.cardImg}
                  src="/course/img/7 (1).jpeg"
                  alt
                />
                <h5 className={styles.cardName}>我家也有狗醫生</h5>
              </div>
              <div className={styles.sCard}>
                <img
                  className={styles.cardImg}
                  src="/course/img/7 (1).jpeg"
                  alt
                />
                <h5 className={styles.cardName}>我家也有狗醫生</h5>
              </div>
              <div className={styles.sCard}>
                <img
                  className={styles.cardImg}
                  src="/course/img/7 (1).jpeg"
                  alt
                />
                <h5 className={styles.cardName}>我家也有狗醫生</h5>
              </div>
              <div className={styles.sCard}>
                <img
                  className={styles.cardImg}
                  src="/course/img/7 (1).jpeg"
                  alt
                />
                <h5 className={styles.cardName}>我家也有狗醫生</h5>
              </div>
              <div className={styles.sCard}>
                <img
                  className={styles.cardImg}
                  src="/course/img/7 (1).jpeg"
                  alt
                />
                <h5 className={styles.cardName}>我家也有狗醫生</h5>
              </div>
              <div className={styles.sCard}>
                <img
                  className={styles.cardImg}
                  src="/course/img/7 (1).jpeg"
                  alt
                />
                <h5 className={styles.cardName}>我家也有狗醫生</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>          
    </>
  );
}
