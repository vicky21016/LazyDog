'use client'

import React, { useState, useEffect } from 'react'
import "../css/CartListPayFinsh.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // 引入 Bootstrap 样式
import 'bootstrap/dist/js/bootstrap.bundle.min'; // 引入 Bootstrap 的 JS 及其依赖


export default function CartListPayFinshPage(props) {
  return (
    <>
      <div>
        <div className="cart-img pb-5">
          <img src="cart/Group6.png" alt="Cart Image" />
        </div>
        <div className="container">
          <p className="gobacktext pt-5">3秒後回到購物畫面</p>
          <div className="row">
            <main
              className="col-lg-4 col-md-8 col-12"
              style={{ margin: 'auto' }}
            >
              <div className="row mb-2">
                <button
                  className="btn col w-auto"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#membership-level"
                  aria-expanded="false"
                  aria-controls="membership-level"
                >
                  會員等級與購物金說明
                </button>
              </div>
              <div className="collapse" id="membership-level">
                <div className="card card-body w-auto">
                  <p>銅卡會員 - 購物金 5%</p>
                  <p>銀卡會員 - 購物金 10%</p>
                  <p>金卡會員 - 購物金 15%</p>
                  <p>白金會員 - 購物金 20%</p>
                </div>
              </div>
              {/* 付款與運送說明 */}
              <div className="row mb-2">
                <button
                  className="btn col w-auto"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#payment-shipping"
                  aria-expanded="false"
                  aria-controls="payment-shipping"
                >
                  付款與運送說明
                </button>
              </div>
              <div className="collapse" id="payment-shipping">
                <div className="card card-body w-auto">
                  <p>信用卡付款 - 運送至指定地址</p>
                  <p>LINE Pay - 快速支付，運送至指定地址</p>
                  <p>貨到付款 - 當面支付，運送至指定地址</p>
                  <p>銀行轉帳 - 請先匯款，再安排運送</p>
                </div>
              </div>
              {/* 退換貨政策 */}
              <div className="row mb-2">
                <button
                  className="btn col w-auto"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#return-policy"
                  aria-expanded="false"
                  aria-controls="return-policy"
                >
                  退換貨政策
                </button>
              </div>
              <div className="collapse" id="return-policy">
                <div className="card card-body w-auto">
                  <p>7天內可退換貨</p>
                  <p>不可退換貨，除非商品有瑕疵</p>
                  <p>可換商品，或選擇購物金折抵</p>
                  <p>自定義退換貨政策</p>
                </div>
              </div>
              {/* 常見問題 Q&A */}
              <div className="row mb-2">
                <button
                  className="btn col w-auto"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq"
                  aria-expanded="false"
                  aria-controls="faq"
                >
                  常見問題 Q&amp;A
                </button>
              </div>
              <div className="collapse" id="faq">
                <div className="card card-body w-auto">
                  <p>運送資訊 - 訂單處理與配送時效</p>
                  <p>付款選項 - 支援的付款方式與流程</p>
                  <p>訂單追蹤 - 如何查詢我的訂單進度</p>
                  <p>商品退換 - 退換貨政策與流程</p>
                </div>
              </div>
            </main>
            <aside
              className="col-lg-4 col-md-8 col-8"
              style={{ margin: 'auto' }}
            >
              <div className="cart-img pb-5">
                <img src="/image 24.png" alt="Cart Image" />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
