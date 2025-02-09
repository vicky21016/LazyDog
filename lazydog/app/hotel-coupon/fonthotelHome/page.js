//思考要不要轉moudles
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../styles/modules/fontHotelHome.module.css";
import "nouislider/dist/nouislider.css";
import noUiSlider from "nouislider";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useLocationSelector } from "@/hooks/useLocationSelector";

export default function HotelHomePage() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const priceSliderRef = useRef(null);
  const [showMore, setShowMore] = useState(false);

  const {
    location,
    locationModalRef,
    googleMapUrl,
    openModal,
    closeModal,
    confirmLocation,
    openMap,
  } = useLocationSelector();

  useEffect(() => {
    if (typeof window === "undefined") return;

    flatpickr("#date-date", {
      mode: "range",
      dateFormat: "Y-m-d",
      minDate: "today",
      locale: {
        firstDayOfWeek: 1,
        weekdays: {
          shorthand: ["日", "一", "二", "三", "四", "五", "六"],
          longhand: [
            "星期日",
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六",
          ],
        },
        rangeSeparator: " 至 ",
      },
    });

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
  return (
    <>
      <div className="suBody">
        <div
          className={styles.suSearchBg}
          style={{
            backgroundImage: `url("/hotel/hotel-images/services-banner-dog-boarding.2203041608391.jpg")`,
          }}
        >
          {" "}
          <div className="container mt-4">
            <div className={styles.suSearchBar}>
              <div className={styles.suSearchGroup}>
                <img
                  className={styles.suIcon}
                  src="/hotel/hotel-images/page-image/icon-search.png"
                  alt=""
                />
                <input
                  type="text"
                  className={styles.suSearchInput}
                  placeholder="搜尋關鍵字、地區..."
                  value={location}
                  readOnly
                  onClick={openModal}
                />
              </div>
              <div className={styles.suSearchGroup}>
                <img
                  className={styles.suIcon}
                  src="/hotel/hotel-images/page-image/icon-Calendar.png"
                  alt=""
                />
                <input
                  type="text"
                  id="date-date"
                  className={styles.suSearchDate}
                  placeholder="入住日期 → 退房日期"
                />
              </div>
              <div className={styles.suSearchGroup}>
                <img
                  className={styles.suIcon}
                  src="/hotel/hotel-images/page-image/Icon-mimi.png"
                  alt=""
                />
                <span className="text">數量</span>
                <button
                  className={styles.suQuantityBtn}
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                >
                  -
                </button>
                <span className={styles.suQuantityNumber}>{quantity}</span>
                <button
                  className={styles.suQuantityBtn}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <button className={styles.suSearchBtn}>搜尋</button>
            </div>
          </div>
        </div>
        {/* 地區選擇 Modal */}
        <div
          className="modal fade"
          ref={locationModalRef}
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">選擇地區</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <div id="twzipcode">
                  <select className="county"></select>
                  <select className="district"></select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={confirmLocation}>
                  確定
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-4">
          <div className="row">
            {/* 篩選 */}
            <aside className={`col-lg-3 ${styles.suSidebar}`}>
              <div
                className={styles.suMapCard}
                onClick={openMap}
                style={{ cursor: "pointer" }}
              >
                <button className={`btn btn-primary ${styles.suMapBtn}`}>
                  📍 於地圖上顯示
                </button>
                <img
                  src={googleMapUrl}
                  alt="地圖縮圖"
                  className={styles.suMapImg}
                />
              </div>

              {/* 設施篩選 */}
              <div className={styles.suFilterGroup}>
                <h6 className={styles.suFilterTitle}>設施</h6>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="walk"
                  />
                  <label className="form-check-label" htmlFor="walk">
                    免費散步
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="pool"
                  />
                  <label className="form-check-label" htmlFor="pool">
                    游泳池
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="pets"
                  />
                  <label className="form-check-label" htmlFor="pets">
                    戶外運動
                  </label>
                </div>

                {/* 顯示更多 */}
                <span
                  className={styles.suShowMore}
                  onClick={() => setShowMore(!showMore)}
                  style={{
                    cursor: "pointer",
                    color: "#007bff",
                    display: "block",
                    marginTop: "10px",
                  }}
                >
                  {showMore ? "收起 ▲" : "顯示全部 ▼"}
                </span>

                {/* 額外設施選項 */}
                {showMore && (
                  <div className="mt-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="wifi"
                      />
                      <label className="form-check-label" htmlFor="wifi">
                        免費 Wi-Fi
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="spa"
                      />
                      <label className="form-check-label" htmlFor="spa">
                        SPA 按摩
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="gym"
                      />
                      <label className="form-check-label" htmlFor="gym">
                        健身房
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* 價格篩選 */}
              <div
                className={` text-center ${styles.suFilterGroup} ${styles.suPriceFilterContainer}`}
              >
                <h6 className={styles.suFilterTitle}>價格篩選</h6>
                <div className="d-flex justify-content-center gap-3">
                  <div className={styles.suPriceInput}>
                    <label htmlFor="filterMin">最少</label>
                    <input
                      id="filterMin"
                      type="number"
                      value={minPrice === "" ? "" : minPrice} // 允許清空
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
                          priceSliderRef.current?.noUiSlider.set([
                            minPrice,
                            10000,
                          ]);
                        }
                      }}
                    />
                    <span>元</span>
                  </div>
                </div>
                <div
                  id="priceRange"
                  ref={priceSliderRef}
                  className="mt-3"
                ></div>
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

              {/* 廣告區 */}
              <a href="">
                <figure>
                  <img
                    src="/hotel/hotel-images/page-image/hotelad2.png"
                    alt="廣告"
                    className="mx-4 img-fluid"
                  />
                </figure>
              </a>
            </aside>

            <section className="col-lg-9">
              <div className={styles.suHotelCard}>
                <img src="/hotel/hotel-uploads/1-outside.png" alt="飯店圖片" />
                <div className={styles.suHotelInfo}>
                  <h5>烏來Spring Spa溫泉山莊</h5>
                  <p>烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池...</p>
                </div>
                <div className={styles.suPriceBox}>
                  <div className={styles.suReview}>很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className={styles.suBookBtn}>查看價格</button>
                </div>
              </div>
              <div className={styles.suHotelCard}>
                <img src="/hotel/hotel-uploads/1-outside.png" alt="飯店圖片" />
                <div className={styles.suHotelInfo}>
                  <h5>烏來Spring Spa溫泉山莊</h5>
                  <p>烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池...</p>
                </div>
                <div className={styles.suPriceBox}>
                  <div className={styles.suReview}>很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className={styles.suBookBtn}>查看價格</button>
                </div>
              </div>
              <div className={styles.suHotelCard}>
                <img src="/hotel/hotel-uploads/1-outside.png" alt="飯店圖片" />
                <div className={styles.suHotelInfo}>
                  <h5>烏來Spring Spa溫泉山莊</h5>
                  <p>烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池...</p>
                </div>
                <div className={styles.suPriceBox}>
                  <div className={styles.suReview}>很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className={styles.suBookBtn}>查看價格</button>
                </div>
              </div>
              <div className={styles.suHotelCard}>
                <img src="/hotel/hotel-uploads/1-outside.png" alt="飯店圖片" />
                <div className={styles.suHotelInfo}>
                  <h5>烏來Spring Spa溫泉山莊</h5>
                  <p>烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池...</p>
                </div>
                <div className={styles.suPriceBox}>
                  <div className={styles.suReview}>很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className={styles.suBookBtn}>查看價格</button>
                </div>
              </div>
              <div className={styles.suHotelCard}>
                <img src="/hotel/hotel-uploads/1-outside.png" alt="飯店圖片" />
                <div className={styles.suHotelInfo}>
                  <h5>烏來Spring Spa溫泉山莊</h5>
                  <p>烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池...</p>
                </div>
                <div className={styles.suPriceBox}>
                  <div className={styles.suReview}>很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className={styles.suBookBtn}>查看價格</button>
                </div>
              </div>
              <div className={styles.suHotelCard}>
                <img src="/hotel/hotel-uploads/1-outside.png" alt="飯店圖片" />
                <div className={styles.suHotelInfo}>
                  <h5>烏來Spring Spa溫泉山莊</h5>
                  <p>烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池...</p>
                </div>
                <div className={styles.suPriceBox}>
                  <div className={styles.suReview}>很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className={styles.suBookBtn}>查看價格</button>
                </div>
              </div>
              <div className={styles.suHotelCard}>
                <img src="/hotel/hotel-uploads/1-outside.png" alt="飯店圖片" />
                <div className={styles.suHotelInfo}>
                  <h5>烏來Spring Spa溫泉山莊</h5>
                  <p>烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池...</p>
                </div>
                <div className={styles.suPriceBox}>
                  <div className={styles.suReview}>很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className={styles.suBookBtn}>查看價格</button>
                </div>
              </div>
              <div className={styles.suHotelCard}>
                <img src="/hotel/hotel-uploads/1-outside.png" alt="飯店圖片" />
                <div className={styles.suHotelInfo}>
                  <h5>烏來Spring Spa溫泉山莊</h5>
                  <p>烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池...</p>
                </div>
                <div className={styles.suPriceBox}>
                  <div className={styles.suReview}>很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className={styles.suBookBtn}>查看價格</button>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="container page">
          <nav aria-label="Page navigation">
            <ul
              className={`pagination justify-content-center ${styles.suPagination}`}
              id="pagination"
            >
              <li className={`page-item disabled ${styles.pageItem}`}>
                <a
                  className={`page-link ${styles.pageLink}`}
                  href="#"
                  aria-label="Previous"
                  onClick={(e) => e.preventDefault()}
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className={`page-item active ${styles.pageItemActive}`}>
                <a
                  className={`page-link ${styles.pageLink}`}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  1
                </a>
              </li>
              <li className={`page-item ${styles.pageItem}`}>
                <a
                  className={`page-link ${styles.pageLink}`}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  2
                </a>
              </li>
              <li className={`page-item ${styles.pageItem}`}>
                <a
                  className={`page-link ${styles.pageLink}`}
                  href="#"
                  aria-label="Next"
                  onClick={(e) => e.preventDefault()}
                >
                  <span aria-hidden="true" className={styles.pageLink}>&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
