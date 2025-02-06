'use client'

import React, { useState, useEffect } from 'react'

export default function CouponPage(props) {
  return (
    <>
       <div
      className="modal fade"
      id="couponModal"
      tabindex="-1"
      aria-labelledby="couponModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content animate__bounceIn">
          <div className="modal-header bg-warning">
            <h5 className="modal-title fw-bold" id="couponModalLabel">
              🎉 領取優惠券成功！
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-center">
            <div className="success-animation">
              <div className="checkmark"></div>
            </div>

            <p className="fs-5 fw-bold text-primary" id="couponName">優惠券名稱</p>
            <p className="coupon-code text-danger" id="couponCode">
              優惠券代碼：XXXXXX
            </p>
            <p className="text-muted" id="couponExpiry">有效期限：2025/12/31</p>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              className="btn btn-success"
              data-bs-dismiss="modal"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* 第一個優惠券區塊  */}
    <div className="container-fluid coupon-container">
      <div className="container">
        <div className="row d-flex justify-content-center">
          {/* TOP 1  */}
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="coupon">
              <div className="coupon-content">
                <div className="coupon-name">🐶 狗狗專屬優惠</div>
                <div className="coupon-code">SKUDIWEK54K64L</div>
                <div className="coupon-expiry">有效期限：2025/12/31</div>
              </div>
              <button className="coupon-button" type="button">點我領取</button>
            </div>
          </div>

          {/* TOP 2  */}
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="coupon">
              <div className="coupon-content">
                <div className="coupon-name">🐶 狗狗專屬優惠</div>
                <div className="coupon-code">SKUDIWEK54K64L</div>
                <div className="coupon-expiry">有效期限：2025/12/31</div>
              </div>
              <button className="coupon-button" type="button">點我領取</button>
            </div>
          </div>
        </div>
      </div>
    </div>

   {/* 第二個區塊 (促銷圖片 + 3 張優惠券)  */}
    <div className="container-fluid second-section">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          {/* 左側圖片  */}
          <div className="col-lg-5 col-md-5 col-sm-12 text-center">
            <img
              src="./hotel-images/page-image/coupon/ADS product.png"
              alt="促銷圖片"
              style="width: 100%; max-width: 430px; height: auto"
            />
          </div>

          {/* 右側 3 張優惠券  */}
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="coupon">
              <div className="coupon-content other-section-content">
                <div className="coupon-name">🐶 狗狗專屬優惠</div>
                <div className="coupon-code">ABCD123456</div>
                <div className="coupon-expiry">有效期限：2025/12/31</div>
              </div>
              <button className="coupon-button" type="button">點我領取</button>
            </div>

            <div className="coupon">
              <div className="coupon-content other-section-content">
                <div className="coupon-name">🎁 限時折扣</div>
                <div className="coupon-code">XYZ987654</div>
                <div className="coupon-expiry">有效期限：2025/11/30</div>
              </div>
              <button className="coupon-button" type="button">點我領取</button>
            </div>

            <div className="coupon">
              <div className="coupon-content other-section-content">
                <div className="coupon-name">🛒 商店折扣券</div>
                <div className="coupon-code">QWER123456</div>
                <div className="coupon-expiry">有效期限：2025/10/15</div>
              </div>
              <button className="coupon-button" type="button">點我領取</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* 第三個區塊  */}
    <div className="container-fluid third-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-5 col-sm-12">
            <div className="coupon">
              <div className="coupon-content other-section-content">
                <div className="coupon-name">🐶 狗狗專屬優惠</div>
                <div className="coupon-code">ABCD123456</div>
                <div className="coupon-expiry">有效期限：2025/12/31</div>
              </div>
              <button className="coupon-button" type="button">點我領取</button>
            </div>

            <div className="coupon">
              <div className="coupon-content other-section-content">
                <div className="coupon-name">🎁 限時折扣</div>
                <div className="coupon-code">XYZ987654</div>
                <div className="coupon-expiry">有效期限：2025/11/30</div>
              </div>
              <button className="coupon-button" type="button">點我領取</button>
            </div>

            <div className="coupon">
              <div className="coupon-content other-section-content">
                <div className="coupon-name">🛒 商店折扣券</div>
                <div className="coupon-code">QWER123456</div>
                <div className="coupon-expiry">有效期限：2025/10/15</div>
              </div>
              <button className="coupon-button" type="button">點我領取</button>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 text-center">
            <img
              src="./hotel-images/page-image/coupon/ADS-1.png"
              alt="第二張促銷DM"
              style="width: 100%; max-width: 550px; height: auto"
            />
          </div>
        </div>
      </div>
    </div>
   {/* 第四個區塊 */}
    <div className="container-fluid forth-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-5 col-sm-12 text-center">
            <video
              className="coupon-video"
              src="./hotel-images/page-image/coupon/ADS-7.mp4"
              alt="促銷圖片"
              style="width: 100%; max-width: 550px; height: auto"
              autoplay
              loop
            ></video>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="coupon">
              <div className="coupon-content other-section-content">
                <div className="coupon-name">🐶 狗狗專屬優惠</div>
                <div className="coupon-code">ABCD123456</div>
                <div className="coupon-expiry">有效期限：2025/12/31</div>
              </div>
              <button className="coupon-button" type="button">點我領取</button>
            </div>

            <div className="coupon">
              <div className="coupon-content other-section-content">
                <div className="coupon-name">🎁 限時折扣</div>
                <div className="coupon-code">XYZ987654</div>
                <div className="coupon-expiry">有效期限：2025/11/30</div>
              </div>
              <button className="coupon-button" type="button">點我領取</button>
            </div>

            <div className="coupon">
              <div className="coupon-content other-section-content">
                <div className="coupon-name">🛒 商店折扣券</div>
                <div className="coupon-code">QWER123456</div>
                <div className="coupon-expiry">有效期限：2025/10/15</div>
              </div>
              <button className="coupon-button" type="button">點我領取</button>
            </div>
          </div>
        </div>
      </div>
    </div>
   {/* 第五個區塊  */}
    <div className="container-fluid fifth-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="event user-event">
              <h5 className="event-title text-primary mt-2">首購會員</h5>
              <h2 className="event-discount text-warning mt-2">現折50</h2>
              <p className="event-desc mt-2">單筆消費滿 $500 即可使用</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="event">
              <div className="event-icon">
                <img
                  src="./hotel-images/page-image/coupon/shipping-fast.png"
                  alt="滿額免運"
                />
              </div>
              <h5 className="event-title text-danger">滿額免運</h5>
              <p className="event-desc">超取 $1500 / 宅配 $2000</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="event">
              <div className="event-icon">
                <img
                  src="./hotel-images/page-image/coupon/coins-dollar-line.png"
                  alt="購物金回饋"
                />
              </div>
              <h5 className="event-title text-warning">購物金回饋</h5>
              <p className="event-desc">
                會員最高享 <span className="text-danger">8%</span> 回饋
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
