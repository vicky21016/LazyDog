"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HotelHomePage() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [minPrice, setMinPrice] = useState(200);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const changepage = (path) => {
    if (path) {
      router.push(`/hotel-coupon/${path}`);
    }
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const openMap = () => {
    alert("地圖功能尚未啟用");
  };

  return (
    <>
      <div className="suBody">
        <div className="suSearch-bg">
          <div className="container mt-4">
            <div className="suSearch-bar">
              <div className="suSearch-group">
                <img
                  className="suIcon"
                  src="/images/hotel/hotel-images/page-image/icon-search.png"
                  alt=""
                />
                <input
                  type="text"
                  className="suSearch-input"
                  id="locationInput"
                  placeholder="搜尋關鍵字、地區..."
                  data-bs-toggle="modal"
                  data-bs-target="#locationModal"
                />
              </div>
              <div className="suSearch-group">
                <img
                  className="suIcon"
                  src="/images/hotel/hotel-images/page-image/icon-Calendar.png"
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
                  src="/images/hotel/hotel-images/page-image/Icon-mimi.png"
                  alt=""
                />
                <span className="text">數量</span>
                <button className="suQuantity-btn" onClick={decreaseQuantity}>
                  <img
                    src="/images/hotel/hotel-images/page-image/Minus.png"
                    alt="減少"
                  />
                </button>
                <span id="suQuantity-number">{quantity}</span>
                <button className="suQuantity-btn" onClick={increaseQuantity}>
                  <img
                    src="/images/hotel/hotel-images/page-image/Plus.png"
                    alt="增加"
                  />
                </button>
              </div>
              <button className="suSearch-btn">搜尋</button>
            </div>
          </div>
        </div>
        {/* Modal */}
        <div
          className="modal fade"
          id="locationModal"
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
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div id="twzipcode">
                  <select className="county"></select>
                  <select className="district"></select>
                </div>
              </div>
              <div className="modal-footer">
                <button id="confirmLocation" className="btn btn-primary">
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
              <div className="suMap-card">
                <button className="btn suMap-btn btn-primary" onClick={openMap}>
                  📍 於地圖上顯示
                </button>
                <img
                  src="https://maps.googleapis.com/maps/api/staticmap?center=台北,台灣&zoom=13&size=300x200&maptype=roadmap
                &markers=color:blue%7Clabel:台北%7C25.0330,121.5654
                &key="
                  alt="地圖縮圖"
                  className="suMap-image"
                />
              </div>

              <div className="suFilter-group mt-4">
                <h6 className="suFilter-title">優質住宿</h6>
                <select className="form-select">
                  <option>選擇類型</option>
                  <option>五星級</option>
                  <option>四星級</option>
                </select>
              </div>

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
                {/* 顯示全部按鈕 */}
                <span className="suShow-more" id="toggleBtn">
                  顯示全部 ▼
                </span>

                {/* 折疊項目 (顯示全部按鈕下方) */}
                <div className="collapse-items hidden suHidden mt-2">
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
              </div>

              {/* 價格篩選區  */}
              <div className="suFilter-group suPrice-filter-container">
                <h6 className="suFilter-title">價格篩選</h6>

                {/* 價格輸入框  */}
                <div className="suPrice-input-group">
                  <div className="suPrice-input">
                    <label htmlFor="filterMin">最少</label>
                    <input
                      id="filterMin"
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <span>元</span>
                  </div>
                  <div className="suPrice-input">
                    <label htmlFor="filterMax">最多</label>
                    <input
                      id="filterMax"
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <span>元</span>
                  </div>
                </div>

                {/* Bootstrap Slider */}
                <input
                  id="priceRange"
                  type="text"
                  data-slider-min="0"
                  data-slider-max="10000"
                  data-slider-step="100"
                  data-slider-value="[200,1000]"
                />

                {/* 清除按鈕  */}
                <button id="resetFilter" className="suClear-filter-btn">
                  清除搜尋
                </button>
              </div>
              <a href="">
                <figure>
                  <img
                    src="/images/hotel/hotel-images/page-image/hotelad2.png"
                    alt=""
                    className="mx-4"
                  />
                </figure>
              </a>
            </aside>

            <section className="col-lg-9">
              <div className="suHotel-card">
                <img
                  src="/images/hotel/hotel-uploads/1-outside.png"
                  alt="飯店圖片"
                />
                <div className="suHotel-info">
                  <h5>烏來Spring Spa溫泉山莊</h5>
                  <p>
                    烏來溫泉山莊位於烏來，設有水療中心和溫泉浴池，舒適的客房均以不同風格裝潢...
                  </p>
                </div>
                <div className="price-box suPrice-box">
                  <div className="suReview">很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className="suBook-btn">查看價格</button>
                </div>
              </div>

              <div className="suHotel-card">
                <img
                  src="/images/hotel/hotel-uploads/11-outside.webp"
                  alt="飯店圖片"
                />
                <div className="suHotel-info">
                  <h5>Grupotel Mayorazgo</h5>
                  <p>
                    Una de las principales ventajas del Hotel Mayorazgo es su
                    magnífica ubicación en el centro de Madrid...
                  </p>
                </div>
                <div className="price-box suPrice-box">
                  <div className="suReview">很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className="suBook-btn">查看價格</button>
                </div>
              </div>
              <div className="suHotel-card">
                <img
                  src="/images/hotel/hotel-uploads/11-outside.webp"
                  alt="飯店圖片"
                />
                <div className="suHotel-info">
                  <h5>Grupotel Mayorazgo</h5>
                  <p>
                    Una de las principales ventajas del Hotel Mayorazgo es su
                    magnífica ubicación en el centro de Madrid...
                  </p>
                </div>
                <div className="price-box suPrice-box">
                  <div className="suReview">很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className="suBook-btn">查看價格</button>
                </div>
              </div>
              <div className="suHotel-card">
                <img
                  src="/images/hotel/hotel-uploads/11-outside.webp"
                  alt="飯店圖片"
                />
                <div className="suHotel-info">
                  <h5>Grupotel Mayorazgo</h5>
                  <p>
                    Una de las principales ventajas del Hotel Mayorazgo es su
                    magnífica ubicación en el centro de Madrid...
                  </p>
                </div>
                <div className="price-box suPrice-box">
                  <div className="suReview">很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className="suBook-btn">查看價格</button>
                </div>
              </div>
              <div className="suHotel-card">
                <img
                  src="/images/hotel/hotel-uploads/11-outside.webp"
                  alt="飯店圖片"
                />
                <div className="suHotel-info">
                  <h5>Grupotel Mayorazgo</h5>
                  <p>
                    Una de las principales ventajas del Hotel Mayorazgo es su
                    magnífica ubicación en el centro de Madrid...
                  </p>
                </div>
                <div className="price-box suPrice-box">
                  <div className="suReview">很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className="suBook-btn">查看價格</button>
                </div>
              </div>
              <div className="suHotel-card">
                <img
                  src="/images/hotel/hotel-uploads/11-outside.webp"
                  alt="飯店圖片"
                />
                <div className="suHotel-info">
                  <h5>Grupotel Mayorazgo</h5>
                  <p>
                    Una de las principales ventajas del Hotel Mayorazgo es su
                    magnífica ubicación en el centro de Madrid...
                  </p>
                </div>
                <div className="price-box suPrice-box">
                  <div className="suReview">很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className="suBook-btn">查看價格</button>
                </div>
              </div>
              <div className="suHotel-card">
                <img
                  src="/images/hotel/hotel-uploads/11-outside.webp"
                  alt="飯店圖片"
                />
                <div className="suHotel-info">
                  <h5>Grupotel Mayorazgo</h5>
                  <p>
                    Una de las principales ventajas del Hotel Mayorazgo es su
                    magnífica ubicación en el centro de Madrid...
                  </p>
                </div>
                <div className="price-box suPrice-box">
                  <div className="suReview">很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className="suBook-btn">查看價格</button>
                </div>
              </div>
              <div className="suHotel-card">
                <img
                  src="/images/hotel/hotel-uploads/11-outside.webp"
                  alt="飯店圖片"
                />
                <div className="suHotel-info">
                  <h5>Grupotel Mayorazgo</h5>
                  <p>
                    Una de las principales ventajas del Hotel Mayorazgo es su
                    magnífica ubicación en el centro de Madrid...
                  </p>
                </div>
                <div className="price-box suPrice-box">
                  <div className="suReview">很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className="suBook-btn">查看價格</button>
                </div>
              </div>
              <div className="suHotel-card">
                <img
                  src="/images/hotel/hotel-uploads/11-outside.webp"
                  alt="飯店圖片"
                />
                <div className="suHotel-info">
                  <h5>Grupotel Mayorazgo</h5>
                  <p>
                    Una de las principales ventajas del Hotel Mayorazgo es su
                    magnífica ubicación en el centro de Madrid...
                  </p>
                </div>
                <div className="price-box suPrice-box">
                  <div className="suReview">很棒 ⭐ 8</div>
                  1,258 則評論
                  <button className="suBook-btn">查看價格</button>
                </div>
              </div>
              <div className="suHotel-card">
                <img
                  src="/images/hotel/hotel-uploads/11-outside.webp"
                  alt="飯店圖片"
                />
                <div className="suHotel-info">
                  <h5>Grupotel Mayorazgo</h5>
                  <p>
                    Una de las principales ventajas del Hotel Mayorazgo es su
                    magnífica ubicación en el centro de Madrid...
                  </p>
                </div>
                <div className="price-box suPrice-box">
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
