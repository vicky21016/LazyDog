"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import "../css/CartList.css";
import { left } from "@popperjs/core";
import CartCartlist from "@/app/components/cart/cartlist";
import { useCart } from "@/hooks/use-cart";
import Header from "../../components/layout/header"
import Other from "../../components/teacher/otherTeacher";
import Thead from "../../components/cart/thead"
import Tbody from "../../components/cart/tbody"
import Breadcrumb from "../../components/teacher/breadcrumb";

export default function CartListPage(props) {
  const { cartItems, totalAmount, totalQty, onDecrease, onIncrease, onRemove } =
    useCart();

    const Data = [
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
    <Header/>
      <div>
        <div className="cart-img">
          <img src="/cart/cattlist.png" />
        </div>
        <div className="container">
        <Breadcrumb
            links={[
              { label: "首頁 ", href: "/" },
              {
                label: " 產品列表",
                href: "/product/list",
              },
              { label: " 購物車", href: "/tcart/CartList", active: true },
            ]}
          />
          <div className="custom-table row ">
            <table
              className="col-lg-8 col-md-auto col-auto me-5 mb-5"
              style={{ marginLeft: "auto" }}
            >
             <Thead/>
             <Tbody/>
             <Thead/>
             <Tbody/>
             <Thead/>
             <Tbody/>
            </table>
            
            <aside
              className="col-lg-3 col-md-auto col-auto mb-5"
              style={{ margin: "auto" }}
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
                  style={{ backgroundColor: "#f2662b", color: "#fff" }}
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
              <Other cards={Data} />
            </div>
            <div className="card"></div>
            <div className>
              <h2>看看其他精選商品 </h2>
              <Other cards={Data} />
            </div>
          </div>
          <div className="card"></div>
        </div>
      </div>
    </>
  );
}
