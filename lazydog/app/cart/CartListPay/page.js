"use client";

import React, { useState, useEffect, useRef } from "react";
// import "../css/CartListPay.css";
import { isDev, apiURL } from "@/config";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart"; // 引入useCart以便取得購物車資料
import { useOrder } from "@/hooks/use-order";
import Header from "../../components/layout/header";
import Input from "../../components/forms/Input";
import InputFiled from "../../components/forms/InputField";
import styles from "../css/CartList.module.css"
import Hotel from "../../components/cart/hotel";
import Course from "../../components/cart/course";
export default function CartListPayPage(props) {
  const { user } = useAuth();
  const [productOrder, setProductOrder] = useState({
    user_id: "",
    orderID: "",
    coupon_id: "",
    discount_amount: "",
    productID_list: [],
    price_list: [],
    amount_list: [],
    total_price: "",
    final_amount: "",
    created_at: "",
    is_deleted: "",
  });
  // 檢查是否登入
  const { isAuth } = useAuth();
  // 建立ref，用來放置form表單
  const payFormDiv = useRef(null);
  // 建立ref，用來放置金額
  const amountRef = useRef(null);
  // 建立ref，用來放置商品名稱
  const itemsRef = useRef(null);

  // 從useCart取得購物車資料
  const {
    productItems,
    courseItems,
    hotelItems,
    totalProductAmount,
    totalCourseAmount,
    totalHotelAmount,
  } = useCart();

  const { createProductOrder } = useOrder();
  // 確保商品資料正確
  const itemsValue = `
  ${productItems.map((item) => `${item.name} x ${item.count}`).join(", ")}#
  ${courseItems.map((item) => `${item.name} x ${item.count}`).join(", ")}#
  ${hotelItems.map((item) => `${item.name} x ${item.count}`).join(", ")}
`;

  // const amountValue = totalProductAmount;
  const amountValue = totalProductAmount + totalCourseAmount + totalHotelAmount;

  const productItemsValue = productItems
    .map((item) => `${item.name} x ${item.count}`)
    .join(", ");

  // 處理課程資料
  const courseItemsValue = courseItems
    .map((item) => `${item.name} x ${item.count}`)
    .join(", ");

  // 處理旅館資料
  const hotelItemsValue = hotelItems
    .map((item) => `${item.name} x ${item.count}`)
    .join(", ");

  const createEcpayForm = (params, action) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = action;
    for (const key in params) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = params[key];
      form.appendChild(input);
    }
    // 回傳form表單的物件參照
    return payFormDiv.current.appendChild(form);
  };

  const handleEcpay = async () => {
    if (!user || !user.id) {
      toast.error("請先登入後再進行結帳");
      return;
    }

    // 先連到node伺服器後端，取得LINE Pay付款網址
    const res = await fetch(
      `http://localhost:5000/ecpay-test-only?amount=${amountValue}&items=${itemsValue}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const resData = await res.json();

    if (isDev) console.log(resData);

    if (resData.status === "success") {
      // 建立表單，回傳的是表單的物件參照
      const payForm = createEcpayForm(resData.data.params, resData.data.action);

      if (isDev) console.log(payForm);

      if (window.confirm("確認要導向至ECPay(綠界金流)進行付款?")) {
        if (productItems.length > 0) {
          const newOrder = {
            user_id: user.id,
            orderID: `PD${new Date().getTime()}`,
            coupon_id: "",
            discount_amount: 0,
            productID_list: productItems.map((item) => item.id),
            price_list: productItems.map((item) => item.price),
            amount_list: productItems.map((item) => item.count),
            total_price: totalProductAmount,
            final_amount: totalProductAmount,
            created_at: new Date(),
            is_deleted: 0,
            payment_status: "Unpaid",
          };
          await setProductOrder(newOrder);
          await createProductOrder(newOrder);
        }
        if (courseItems.length > 0) {
          const newOrder = {
            user_id: user.id,
            orderID: `CR${new Date().getTime()}`,
            coupon_id: "",
            discount_amount: 0,
            productID_list: courseItems.map((item) => item.id),
            price_list: courseItems.map((item) => item.price),
            amount_list: courseItems.map((item) => item.count),
            total_price: totalCourseAmount,
            final_amount: totalCourseAmount,
            created_at: new Date(),
            is_deleted: 0,
            payment_status: "Unpaid",
          };
          await setProductOrder(newOrder);
          await createProductOrder(newOrder);
        }
        if (hotelItems.length > 0) {
          //假設我的hotelItems有更多詳細資料
          const newOrder = {
            hotel_id: hotelItems[0].hotel_id, // 假設您hotel有hotel_id
            user_id: user.id,
            dog_count: hotelItems[0].dog_count, // 假設您hotel有dog_count
            check_in: hotelItems[0].check_in, // 假設您hotel有check_in
            check_out: hotelItems[0].check_out, // 假設您hotel有check_out
            total_price: totalHotelAmount,
            payment_status: "Unpaid",
            payment_method: "credit card", // 可從表單取得
            cancellation_policy: "Flexible", // 可從表單取得
            remark: "none",
          };
          await setProductOrder(newOrder);
          await createHotelOrder(newOrder);
        }

        //送出表單
        payForm.submit();
      }
    } else {
      toast.error("付款失敗");
    }
  };

  return (
    <>
      <Header />
      <div>
        <div className="cart-img">
          <img src="/cart/Frame 35909.png" alt="Cart Image" />
        </div>
        <div className="container lumi-all-wrapper">
          <h4 className="mb-5">購買資訊</h4>
          <form action>
            <div className="row">
              <main
                className="col-lg-5 col-md-auto col-auto me-5"
               
              >
                <div className="mb-3 row">
                  <div className="col-md-6">
                    <label htmlFor="first-name" className="form-label">
                      姓氏 <span style={{ color: "red" }}>*</span>
                    </label>
                    <Input
                      type="text"
                      id="first-name"
                      name="first-name"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="last-name" className="form-label">
                      名字 <span style={{ color: "red" }}>*</span>
                    </label>
                    <Input
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
                    地址 <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
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
                  <Input
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
                  <Input
                    type="text"
                    id="company-name"
                    name="company-name"
                    className="form-control"
                  />
                </div>
                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
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
                    電話 <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    required
                  />
                </div>
              </main>
              <aside
                className={`col-lg-5 col-md-7 col-10 ${styles.list}`}
                
              >
                <div className="aside1 ">
                  <div className="d-flex justify-content-between mb-4">
                    <span className={styles.text}>產品</span>
                    <span>Subtotal</span>
                  </div>
                  {productItems.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between mb-2"
                    >
                      <span>
                        <span>{item.name}</span>x<span>{item.count}</span>
                      </span>
                      <span>{`Rs. ${item.price * item.count}`}</span>
                    </div>
                  ))}

                  {courseItems.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between mb-2"
                    >
                      <span>
                        <span>{item.name}</span>x<span>{item.count}</span>
                      </span>
                      <span>{`Rs. ${item.price * item.count}`}</span>
                    </div>
                  ))}

                  {hotelItems.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between mb-2"
                    >
                      <span>
                        <span>{item.name}</span>x<span>{item.count}</span>
                      </span>
                      <span>{`Rs. ${item.price * item.count}`}</span>
                    </div>
                  ))}

                  <div className="d-flex justify-content-between mt-5">
                    <span className={styles.subtext}>總價</span>
                    <span>{`Rs. ${amountValue}`}</span>
                  </div>
                </div>
                <hr className="mb-5"/>
                <button className={styles.btn} type="button" onClick={handleEcpay}>
              付款
            </button>
                {/* <div className="aside2">
                  <h1>付款</h1>
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      defaultValue="信用卡"
                      defaultChecked
                    />{" "}
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
                </div> */}
                {/* <div className="input-group">
                  <InputFiled
                    type="text"
                    id="name"
                    name="name"
                    placeholder=" "
                    required
                  />
                  <span>
                    姓名 <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="input-group">
                  <InputFiled
                    type="text"
                    id="card-number"
                    name="card-number"
                    placeholder=" "
                    maxLength={16}
                    required
                  />
                  <span>
                    信用卡號 <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="input-group">
                  <InputFiled
                    type="text"
                    id="expiry-date"
                    name="expiry-date"
                    placeholder=" "
                    required
                  />
                  <span>
                    到期日 <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="input-group">
                  <InputFiled
                    type=""
                    id="cvv"
                    name="cvv"
                    placeholder=" "
                    maxLength={3}
                    required
                  />
                  <span>
                    安全碼 <span style={{ color: "red" }}>*</span>
                  </span>
                </div> */}
              </aside>
            </div>

            <div ref={payFormDiv}></div>

            
          </form>
        </div>
      </div>
    </>
  );
}
