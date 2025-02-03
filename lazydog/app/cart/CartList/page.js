'use client'

import React, { useState, useEffect } from 'react'

import '../css/CartList.css';

export default function CartListPage(props) {
  return (
    <>
      <div>
        <div className="cart-img">
          <img src="../public/cattlist.png" alt="Cart Image" />
        </div>
        <div className="container">
          <div className="custom-table row ">
            <table
              className="col-lg-8 col-md-auto col-auto me-5 mb-5"
              style={{ margin: 'auto' }}
            >
              <thead>
                <tr>
                  <th style={{ width: 110 }} />
                  <th>商品品項</th>
                  <th>單價</th>
                  <th>數量</th>
                  <th>總價</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img src="../public/favicon.ico" alt />
                  </td>
                  <td>行 1, 欄 2</td>
                  <td>行 1, 欄 3</td>
                  <td>行 1, 欄 4</td>
                  <td>行 1, 欄 5</td>
                  <td style={{ width: 64, height: 29 }}>
                    <button
                      style={{
                        border: 'transparent',
                        backgroundColor: 'white',
                      }}
                    >
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: '#f2662b' }}
                      />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src="../public/favicon.ico" alt />
                  </td>
                  <td>行 2, 欄 2</td>
                  <td>行 2, 欄 3</td>
                  <td>行 2, 欄 4</td>
                  <td>行 2, 欄 5</td>
                  <td>
                    <button
                      style={{
                        border: 'transparent',
                        backgroundColor: 'white',
                      }}
                    >
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: '#f2662b' }}
                      />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <aside
              className="col-lg-3 col-md-auto col-auto"
              style={{ margin: 'auto' }}
            >
              <div className="aside-card ">
                <div className="summary-item d-flex justify-content-between">
                  <span>商品小計</span>
                  <span>Rs. 250,000.00</span>
                </div>
                <div className="summary-item d-flex justify-content-between">
                  <span>課程小計</span>
                  <span>Rs. 250,000.00</span>
                </div>
                <div className="summary-item d-flex justify-content-between">
                  <span>旅館小計</span>
                  <span>Rs. 250,000.00</span>
                </div>
                <div className="summary-item d-flex justify-content-between mt-3">
                  <span>總金額</span>
                  <span className="totalmoney">NT$9,000</span>
                </div>
              </div>
              <div className="mb-3 d-flex justify-content-center">
                <select
                  name="coupon"
                  id="couponSelect"
                  className="form-select w-auto ms-2"
                >
                  <option value>請選擇優惠捲</option>
                  <option value="discount10">10% 折扣</option>
                  <option value="discount20">20% 折扣</option>
                  <option value="freeShipping">免運費</option>
                </select>
              </div>
              <div className="summary-item summary-item2 d-flex justify-content-between">
                <span>折扣金額</span>
                <span />
              </div>
              <div className="summary-item summary-item2 d-flex justify-content-between">
                <span>總金額:</span>
                <span className="totalmoney" />
              </div>
              <div className="d-flex justify-content-center pt-5 pb-5">
                <button
                  type="submit"
                  style={{ backgroundColor: '#f2662b', color: '#fff' }}
                  className="btn w-50"
                >
                  結帳
                </button>
              </div>
            </aside>
          </div>
          <div className="main2">
            <div className>
              <h2>加購其他優惠商品</h2>
            </div>
            <div className="card"></div>
            <div className>
              <h2>看看其他精選商品 </h2>
            </div>
          </div>
          <div className="card"></div>
        </div>
      </div>
    </>
  )
}
