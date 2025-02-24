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

  const teacherData = [
    {
      imgSrc: "/teacher-img/Zoe.png",
      col: "col-6 col-md-3",
      name: "Zoe",
      text: "寵物訓練",
      link: "/teacher/info",
    },
    {
      imgSrc: "/teacher-img/Zoe.png",
      col: "col-6 col-md-3",
      name: "Zoe",
      text: "寵物訓練",
      link: "/teacher/info",
    },
    {
      imgSrc: "/teacher-img/Zoe.png",
      col: "col-6 col-md-3",
      name: "Zoe",
      text: "寵物訓練",
      link: "/teacher/info",
    },
    {
      imgSrc: "/teacher-img/Zoe.png",
      col: "col-6 col-md-3",
      name: "Zoe",
      text: "寵物訓練",
      link: "/teacher/info",
    },
  ];

  return (
    <>
      <Header />
      <div>
        <div className="cart-img">
          <img src="/cart/cattlist.png" />
        </div>

        <div className="container">
          <Breadcrumb
            links={[
              { label: "首頁 ", href: "/" },
              {
                label: " 購物車",
                href: "/cart/CartList",
                active: true,
              },
            ]}
          />
          <div className="custom-table row">
            <table
              className="col-lg-8 col-md-auto col-auto me-5 mb-5"
              style={{ marginLeft: "auto" }}
            >
              <Thead />
              {/* 顯示商品 */}
              <tbody>
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
              <Thead />

              {/* 顯示課程 */}
              <tbody>
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
              <Thead />
              <tbody>
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

            {/* 顯示摘要區 */}
            <aside
              className="col-lg-3 col-md-auto col-auto mb-5"
              style={{ margin: "auto" }}
            >
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
                  onClick={() => props.history.push("/checkout/product")}
                >
                  商品結帳
                </button>
              </div>
            </aside>
          </div>

          {/* 推薦商品區 */}
          <div className="main2">
            <div>
              <h2>加購其他優惠商品</h2>
              <Other cards={teacherData} />
            </div>
            <div className="card"></div>
            <div>
              <h2>看看其他精選商品 </h2>
              <Other cards={teacherData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
