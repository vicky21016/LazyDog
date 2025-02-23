"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import "../css/CartList.css";
import { useCart } from "@/hooks/use-cart";

export default function CartListPage(props) {
  const { productItems, courseItems, hotelItems, totalProductAmount, totalProductQty, totalCourseAmount, totalCourseQty, totalHotelAmount, totalHotelQty, onIncrease, onDecrease, onRemove } = useCart();

  const totalAmount = totalProductAmount + totalCourseAmount + totalHotelAmount; // 計算所有類別的總金額
  const totalQty = totalProductQty + totalCourseQty + totalHotelQty; // 計算總數量

  return (
    <>
      <div>
        <div className="cart-img">
          <img src="/cart/cattlist.png" />
        </div>
        <div className="container">
          <div className="custom-table row">
            <table className="col-lg-8 col-md-auto col-auto me-5 mb-5" style={{ marginLeft: "auto" }}>
              <thead>
                <tr>
                  <th style={{ width: 110 }} />
                  <th>商品品項</th>
                  <th>單價</th>
                  <th>數量</th>
                  <th>總價</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {/* 顯示商品 */}
                {productItems.map((cartItem) => (
                  <tr key={cartItem.id}>
                    <td>
                      <img src={cartItem.img} alt={cartItem.name} />
                    </td>
                    <td>{cartItem.name}</td>
                    <td>{cartItem.price}</td>
                    <td>
                      <button onClick={() => onIncrease(cartItem.id)}>+</button>
                      {cartItem.count}
                      <button onClick={() => onDecrease(cartItem.id)}>-</button>
                    </td>
                    <td>{cartItem.count * cartItem.price}</td>
                    <td>
                      <button
                        style={{ border: "transparent", backgroundColor: "white" }}
                        onClick={() => onRemove(cartItem.id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} style={{ color: "#f2662b" }} />
                      </button>
                    </td>
                  </tr>
                ))}

                {/* 顯示課程 */}
                {courseItems.map((cartItem) => (
                  <tr key={cartItem.id}>
                    <td>
                      <img src={cartItem.img} alt={cartItem.name} />
                    </td>
                    <td>{cartItem.name}</td>
                    <td>{cartItem.price}</td>
                    <td>
                      <button onClick={() => onIncrease(cartItem.id)}>+</button>
                      {cartItem.count}
                      <button onClick={() => onDecrease(cartItem.id)}>-</button>
                    </td>
                    <td>{cartItem.count * cartItem.price}</td>
                    <td>
                      <button
                        style={{ border: "transparent", backgroundColor: "white" }}
                        onClick={() => onRemove(cartItem.id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} style={{ color: "#f2662b" }} />
                      </button>
                    </td>
                  </tr>
                ))}

                {/* 顯示旅館 */}
                {hotelItems.map((cartItem) => (
                  <tr key={cartItem.id}>
                    <td>
                      <img src={cartItem.img} alt={cartItem.name} />
                    </td>
                    <td>{cartItem.name}</td>
                    <td>{cartItem.price}</td>
                    <td>
                      <button onClick={() => onIncrease(cartItem.id)}>+</button>
                      {cartItem.count}
                      <button onClick={() => onDecrease(cartItem.id)}>-</button>
                    </td>
                    <td>{cartItem.count * cartItem.price}</td>
                    <td>
                      <button
                        style={{ border: "transparent", backgroundColor: "white" }}
                        onClick={() => onRemove(cartItem.id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} style={{ color: "#f2662b" }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 顯示摘要區 */}
            <aside className="col-lg-3 col-md-auto col-auto mb-5" style={{ margin: "auto" }}>
              <div className="aside-card">
                <div className="summary-item d-flex justify-content-between">
                  <span>商品小計</span>
                  <span>{`Rs. ${totalProductAmount}`}</span>
                </div>
                <div className="summary-item d-flex justify-content-between">
                  <span>課程小計</span>
                  <span>{`Rs. ${totalCourseAmount}`}</span>
                </div>
                <div className="summary-item d-flex justify-content-between">
                  <span>旅館小計</span>
                  <span>{`Rs. ${totalHotelAmount}`}</span>
                </div>
                <div className="summary-item d-flex justify-content-between mt-3">
                  <span>總金額</span>
                  <span className="totalmoney">{`NT$ ${totalAmount}`}</span>
                </div>
              </div>

              {/* 折扣區 */}
              <div className="summary-item summary-item2 d-flex justify-content-between">
                <span>折扣金額</span>
                <span>-</span>
              </div>
              <div className="summary-item summary-item2 d-flex justify-content-between">
                <span>總金額:</span>
                <span className="totalmoney">{`NT$ ${totalAmount}`}</span>
              </div>

              {/* 結帳按鈕 */}
              <div className="d-flex justify-content-center pt-5 pb-5">
                <button
                  type="submit"
                  style={{ backgroundColor: "#f2662b", color: "#fff" }}
                  className="btn w-50"
                >
                  結帳
                </button>
              </div>
            </aside>
          </div>

          {/* 推薦商品區 */}
          <div className="main2">
            <div>
              <h2>加購其他優惠商品</h2>
            </div>
            <div className="card"></div>
            <div>
              <h2>看看其他精選商品 </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
