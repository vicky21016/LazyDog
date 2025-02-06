"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "../../../html/hotel-coupon/css/fontHotelHome.css";
import "nouislider/dist/nouislider.css";
import noUiSlider from "nouislider";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useLocationSelector } from "@/hooks/useLocationSelector";

export default function HotelHomePage() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [minPrice, setMinPrice] = useState(200);
  const [maxPrice, setMaxPrice] = useState(5000);
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

    if (priceSliderRef.current && !priceSliderRef.current.noUiSlider) {
      noUiSlider.create(priceSliderRef.current, {
        start: [minPrice, maxPrice],
        connect: true,
        range: { min: 0, max: 10000 },
        step: 100,
        tooltips: [true, true],
        format: {
          to: (value) => Math.round(value),
          from: (value) => Math.round(value),
        },
      });

      priceSliderRef.current.noUiSlider.on("update", (values) => {
        setMinPrice(parseFloat(values[0]));
        setMaxPrice(parseFloat(values[1]));
      });
    }
  }, []);

  return (
    <>
      <div className="suBody">
        <div className="suSearch-bg">
          <div className="container mt-4">
            <div className="suSearch-bar">
              <div className="suSearch-group">
                <img
                  className="suIcon"
                  src="/hotel/hotel-images/page-image/icon-search.png"
                  alt=""
                />
                <input
                  type="text"
                  className="suSearch-input"
                  placeholder="搜尋關鍵字、地區..."
                  value={location}
                  readOnly
                  onClick={openModal}
                />
              </div>
              <div className="suSearch-group">
                <img
                  className="suIcon"
                  src="/hotel/hotel-images/page-image/icon-Calendar.png"
                  alt=""
                />
                <input
                  type="text"
                  id="date-date"
                  className="suSearch-date"
                  placeholder="入住日期 → 退房日期"
                />
              </div>
              <div className="suSearch-group">
                <img
                  className="suIcon"
                  src="/hotel/hotel-images/page-image/Icon-mimi.png"
                  alt=""
                />
                <span className="text">數量</span>
                <button
                  className="suQuantity-btn"
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className="suQuantity-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <button className="suSearch-btn">搜尋</button>
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
            <aside className="col-lg-3 suSidebar">
              <div
                className="suMap-card"
                onClick={openMap}
                style={{ cursor: "pointer" }}
              >
                <button className="btn suMap-btn btn-primary">
                  📍 於地圖上顯示
                </button>
                <img
                  src={googleMapUrl}
                  alt="地圖縮圖"
                  className="suMap-image"
                />
              </div>

              {/* 設施篩選 */}
              <div className="suFilter-group">
                <h6 className="suFilter-title">設施</h6>
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
                  className="suShow-more"
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
              <div className="suFilter-group suPrice-filter-container text-center">
                <h6 className="suFilter-title">價格篩選</h6>
                <div className="d-flex justify-content-center gap-3">
                  <div className="suPrice-input">
                    <label htmlFor="filterMin">最少</label>
                    <input
                      id="filterMin"
                      type="number"
                      value={minPrice}
                      readOnly
                    />
                    <span>元</span>
                  </div>
                  <div className="suPrice-input">
                    <label htmlFor="filterMax">最多</label>
                    <input
                      id="filterMax"
                      type="number"
                      value={maxPrice}
                      readOnly
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
                  className="suClear-filter-btn btn btn-outline-danger mt-3"
                  onClick={() => {
                    setMinPrice(200);
                    setMaxPrice(5000);
                    priceSliderRef.current.noUiSlider.set([200, 5000]);
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
              <div className="suHotel-card">
                <img src="/hotel/hotel-uploads/1-outside.png" alt="飯店圖片" />
                <div className="suHotel-info">
                  <h5>烏來Spring Spa溫泉山莊</h5>
                  <p>烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池...</p>
                </div>
                <div className="price-box">
                  <div className="suReview">很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className="suBook-btn">查看價格</button>
                </div>
              </div>
              <div className="suHotel-card">
                <img src="/hotel/hotel-uploads/1-outside.png" alt="飯店圖片" />
                <div className="suHotel-info">
                  <h5>烏來Spring Spa溫泉山莊</h5>
                  <p>烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池...</p>
                </div>
                <div className="price-box">
                  <div className="suReview">很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className="suBook-btn">查看價格</button>
                </div>
              </div>
              <div className="suHotel-card">
                <img src="/hotel/hotel-uploads/1-outside.png" alt="飯店圖片" />
                <div className="suHotel-info">
                  <h5>烏來Spring Spa溫泉山莊</h5>
                  <p>烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池...</p>
                </div>
                <div className="price-box">
                  <div className="suReview">很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className="suBook-btn">查看價格</button>
                </div>
              </div>
              <div className="suHotel-card">
                <img src="/hotel/hotel-uploads/1-outside.png" alt="飯店圖片" />
                <div className="suHotel-info">
                  <h5>烏來Spring Spa溫泉山莊</h5>
                  <p>烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池...</p>
                </div>
                <div className="price-box">
                  <div className="suReview">很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className="suBook-btn">查看價格</button>
                </div>
              </div>
              <div className="suHotel-card">
                <img src="/hotel/hotel-uploads/1-outside.png" alt="飯店圖片" />
                <div className="suHotel-info">
                  <h5>烏來Spring Spa溫泉山莊</h5>
                  <p>烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池...</p>
                </div>
                <div className="price-box">
                  <div className="suReview">很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className="suBook-btn">查看價格</button>
                </div>
              </div>
              <div className="suHotel-card">
                <img src="/hotel/hotel-uploads/1-outside.png" alt="飯店圖片" />
                <div className="suHotel-info">
                  <h5>烏來Spring Spa溫泉山莊</h5>
                  <p>烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池...</p>
                </div>
                <div className="price-box">
                  <div className="suReview">很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className="suBook-btn">查看價格</button>
                </div>
              </div>
              <div className="suHotel-card">
                <img src="/hotel/hotel-uploads/1-outside.png" alt="飯店圖片" />
                <div className="suHotel-info">
                  <h5>烏來Spring Spa溫泉山莊</h5>
                  <p>烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池...</p>
                </div>
                <div className="price-box">
                  <div className="suReview">很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className="suBook-btn">查看價格</button>
                </div>
              </div>
              <div className="suHotel-card">
                <img src="/hotel/hotel-uploads/1-outside.png" alt="飯店圖片" />
                <div className="suHotel-info">
                  <h5>烏來Spring Spa溫泉山莊</h5>
                  <p>烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池...</p>
                </div>
                <div className="price-box">
                  <div className="suReview">很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className="suBook-btn">查看價格</button>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="container page">
          <nav aria-label="Page navigation">
            <ul
              className="pagination suPagination justify-content-center"
              id="pagination"
            >
              <li className="page-item disabled">
                <a
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                  onClick={(e) => e.preventDefault()}
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item active">
                <a
                  className="page-link"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  1
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  2
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  aria-label="Next"
                  onClick={(e) => e.preventDefault()}
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
