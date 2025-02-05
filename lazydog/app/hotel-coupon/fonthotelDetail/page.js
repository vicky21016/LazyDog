"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HotelDetailPage() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div className="container mt-4">
      {/* 搜尋欄 */}
      <div className="search-bar d-flex justify-content-center align-items-center bg-warning p-3 rounded">
        <div className="d-flex align-items-center bg-white p-2 rounded me-2">
          <img className="icon me-2" src="/images/hotel/hotel-images/page-image/icon-search.png" alt="search" />
          <input type="text" className="form-control border-0" placeholder="搜尋關鍵字、地區..." />
        </div>
        <div className="d-flex align-items-center bg-white p-2 rounded me-2">
          <img className="icon me-2" src="/images/hotel/hotel-images/page-image/icon-Calendar.png" alt="calendar" />
          <input type="text" className="form-control border-0" placeholder="入住日期 → 退房日期" />
        </div>
        <div className="d-flex align-items-center bg-white p-2 rounded">
          <img className="icon me-2" src="/images/hotel/hotel-images/page-image/Icon-mimi.png" alt="dog" />
          <span className="me-2">數量</span>
          <button className="btn btn-sm" onClick={() => setQuantity(quantity - 1)}>-</button>
          <span className="mx-2">{quantity}</span>
          <button className="btn btn-sm" onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
        <button className="btn btn-primary ms-2">搜尋</button>
      </div>

      {/* 旅館簡介 */}
      <div className="row mt-5 align-items-center">
        <div className="col-md-6">
          <img src="/images/hotel/hotel-uploads/1-outside.png" alt="旅館主圖" className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <h2>旅館簡介</h2>
          <p>專為寵物打造的舒適旅宿，讓您的毛孩安心入住。我們提供完善的照顧環境，確保您的毛孩入住期間，擁有最安全健康的體驗。</p>
        </div>
      </div>

      {/* 房型選擇 */}
      <h2 className="mt-5">房型選擇</h2>
      <div className="row">
        {[
          { name: "豪華大房", price: 1000, image: "1-l-room.webp" },
          { name: "普通房", price: 900, image: "1-m-room.webp" },
          { name: "精緻小房", price: 750, image: "1-s-room.webp" },
        ].map((room, index) => (
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
            <div className="card">
              <img src={`/images/hotel/hotel-uploads/${room.image}`} className="card-img-top" alt={room.name} />
              <div className="card-body text-center">
                <h3>{room.name}</h3>
                <p className="text-danger fw-bold">價格: {room.price}元</p>
                <select className="form-select mb-2">
                  <option>選擇數量</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
                <button className="btn btn-warning w-100">BOOK</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 我們的努力 */}
      <div className="effort-section text-center bg-light p-5 rounded mt-5">
        <h2 className="text-warning">我們的努力，看的見</h2>
        <p>每一次陪伴、每一小時的付出，都為毛孩創造更快樂、更健康的生活！</p>
        <div className="row justify-content-center">
          {[
            { text: "總服務時數：8,520+ 小時", image: "Dog2.png" },
            { text: "服務狗狗：1,200+ 隻", image: "Dog5.png" },
            { text: "滿意度：98.7%", image: "Mask group.png" },
          ].map((stat, index) => (
            <div className="col-md-3 text-center" key={index}>
              <img src={`/images/hotel/hotel-images/page-image/${stat.image}`} className="rounded-circle mb-2" width="70" height="70" alt="stat" />
              <p>{stat.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button className="btn btn-warning me-2">立即預約</button>
          <button className="btn btn-outline-dark">了解更多</button>
        </div>
      </div>

      {/* 地圖 */}
      <div className="mt-5">
        <div id="map" className="w-100" style={{ height: "500px" }}></div>
      </div>
    </div>
  );
}
