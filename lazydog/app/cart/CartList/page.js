"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import "../css/CartList.css";
import { useCart } from "@/hooks/use-cart";

export default function CartListPage(props) {
  const {
    productItems,
    courseItems,
    hotelItems,
    totalProductAmount,
    totalProductQty,
    totalCourseAmount,
    totalCourseQty,
    totalHotelAmount,
    totalHotelQty,
    onIncrease,
    onDecrease,
    onRemove,
  } = useCart();

  const totalAmount = totalProductAmount + totalCourseAmount + totalHotelAmount;

  return (
    <>
      <div>
        <div className="cart-img">
          <img src="/cart/cattlist.png" />
        </div>
        <div className="container">
          <div className="custom-table row">
            {/* 商品表格 */}
            <div className="table-container">
              <table className="col-lg-12 mb-5">
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
                  {productItems.map((cartItem) => (
                    <tr key={cartItem.id}>
                      <td>
                        <img src={cartItem.img} alt={cartItem.name} />
                      </td>
                      <td>{cartItem.name}</td>
                      <td>{cartItem.price}</td>
                      <td>
                        <button onClick={() => onIncrease(cartItem.id)}>
                          +
                        </button>
                        {cartItem.count}
                        <button onClick={() => onDecrease(cartItem.id)}>
                          -
                        </button>
                      </td>
                      <td>{cartItem.count * cartItem.price}</td>
                      <td>
                        <button
                          style={{
                            border: "transparent",
                            backgroundColor: "white",
                          }}
                          onClick={() => onRemove(cartItem.id)}
                        >
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            style={{ color: "#f2662b" }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="checkout-btn">
                <button
                  type="submit"
                  style={{ backgroundColor: "#f2662b", color: "#fff" }}
                  className="btn w-50"
                  onClick={() => props.history.push("/checkout/product")}
                >
                  商品結帳
                </button>
              </div>
            </div>

            {/* 課程表格 */}
            <div className="table-container">
              <table className="col-lg-12 mb-5">
                <thead>
                  <tr>
                    <th style={{ width: 110 }} />
                    <th>課程品項</th>
                    <th>單價</th>
                    <th>數量</th>
                    <th>總價</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {courseItems.map((cartItem) => (
                    <tr key={cartItem.id}>
                      <td>
                        <img src={cartItem.img} alt={cartItem.name} />
                      </td>
                      <td>{cartItem.name}</td>
                      <td>{cartItem.price}</td>
                      <td>
                        <button onClick={() => onIncrease(cartItem.id)}>
                          +
                        </button>
                        {cartItem.count}
                        <button onClick={() => onDecrease(cartItem.id)}>
                          -
                        </button>
                      </td>
                      <td>{cartItem.count * cartItem.price}</td>
                      <td>
                        <button
                          style={{
                            border: "transparent",
                            backgroundColor: "white",
                          }}
                          onClick={() => onRemove(cartItem.id)}
                        >
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            style={{ color: "#f2662b" }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="checkout-btn">
                <button
                  type="submit"
                  style={{ backgroundColor: "#f2662b", color: "#fff" }}
                  className="btn w-50"
                  onClick={() => props.history.push("/checkout/course")}
                >
                  課程結帳
                </button>
              </div>
            </div>

            {/* 旅館表格 */}
            <div className="table-container">
              <table className="col-lg-12 mb-5">
                <thead>
                  <tr>
                    <th style={{ width: 110 }} />
                    <th>旅館品項</th>
                    <th>單價</th>
                    <th>數量</th>
                    <th>總價</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {hotelItems.map((cartItem) => (
                    <tr key={cartItem.id}>
                      <td>
                        <img src={cartItem.img} alt={cartItem.name} />
                      </td>
                      <td>{cartItem.name}</td>
                      <td>{cartItem.price}</td>
                      <td>
                        <button onClick={() => onIncrease(cartItem.id)}>
                          +
                        </button>
                        {cartItem.count}
                        <button onClick={() => onDecrease(cartItem.id)}>
                          -
                        </button>
                      </td>
                      <td>{cartItem.count * cartItem.price}</td>
                      <td>
                        <button
                          style={{
                            border: "transparent",
                            backgroundColor: "white",
                          }}
                          onClick={() => onRemove(cartItem.id)}
                        >
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            style={{ color: "#f2662b" }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="checkout-btn">
                <button
                  type="submit"
                  style={{ backgroundColor: "#f2662b", color: "#fff" }}
                  className="btn w-50"
                  onClick={() => props.history.push("/checkout/hotel")}
                >
                  旅館結帳
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
