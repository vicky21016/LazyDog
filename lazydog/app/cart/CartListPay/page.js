'use client'

import React, { useState, useEffect } from 'react'

export default function CartListPayPage(props) {
  return (
    <>
      <div>
        <div className="cart-img">
          <img src="../public/Frame 35909.png" alt="Cart Image" />
        </div>
        <div className="container">
          <h1>購買資訊</h1>
          <form action>
            <div className="row">
              <main
                className="col-lg-auto col-md-auto col-auto"
                style={{ margin: 'auto' }}
              >
                <div className="mb-3 row">
                  <div className="col-md-6">
                    <label htmlFor="first-name" className="form-label">
                      姓氏
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      name="first-name"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="last-name" className="form-label">
                      名字
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      name="last-name"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                {/* 地址 */}
                <div className="mb-3">
                  <label htmlFor="adress" className="form-label">
                    地址
                  </label>
                  <input
                    type="text"
                    id="adress"
                    name="adress"
                    className="form-control"
                    required
                  />
                </div>
                {/* 城市 */}
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    城市
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-control"
                    required
                  />
                </div>
                {/* 公司名稱 */}
                <div className="mb-3">
                  <label htmlFor="company-name" className="form-label">
                    公司名稱
                  </label>
                  <input
                    type="text"
                    id="company-name"
                    name="company-name"
                    className="form-control"
                  />
                </div>
                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    required
                  />
                </div>
                {/* 電話 */}
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    電話
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    required
                  />
                </div>
              </main>
              <aside
                className="col-lg-4 col-md-7 col-10"
                style={{ margin: 'auto' }}
              >
                <div className="aside1 ">
                  <div className="d-flex justify-content-between">
                    <span>產品</span>
                    <span>Subtotal</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>
                      <span>Asgaard sofa</span>x<span>1</span>
                    </span>
                    <span>Rs. 250,000.00</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Subtotal</span>
                    <span>Rs. 250,000.00</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>總價</span>
                    <span>Rs. 250,000.00</span>
                  </div>
                </div>
                <div className="aside2">
                  <h1>付款</h1>
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      defaultValue="信用卡"
                      defaultChecked
                    />{' '}
                    信用卡
                  </label>
                  <label>
                    <input type="radio" name="payment" /> LINE Pay
                  </label>
                  <label>
                    <input type="radio" name="payment" />
                    貨到付款
                  </label>
                  <label>
                    <input type="radio" name="payment" /> 轉帳
                  </label>
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder=" "
                    required
                  />
                  <span>姓名</span>
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    id="card-number"
                    name="card-number"
                    placeholder=" "
                    maxLength={16}
                    required
                  />
                  <span>信用卡號</span>
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    id="expiry-date"
                    name="expiry-date"
                    placeholder=" "
                    required
                  />
                  <span>到期日</span>
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    id="cvv"
                    name="cvv"
                    placeholder=" "
                    maxLength={3}
                    required
                  />
                  <span>安全碼</span>
                </div>
              </aside>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
