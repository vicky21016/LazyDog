"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./css/footer.module.css";

export default function HomePage(props) {
  return (
    <>
      <footer className="footer">
        <section className="footer-top">
          <img src="./img/footer_top.png" alt />
        </section>
        <section className="footer-middle">
          <ul>
            <li className="footer-list1">
              <a href><figure><img src="./img/logo_pic(white).png" alt /></figure></a>
              <article>
                <div className="address">
                  <p>320桃園市中壢區新生路二段421號</p>
                  <p>03-4532632</p>
                </div>
                <div className={styles.time}>
                  <p>
                    營業期間：09:30-19:30<br />
                    入住時間：15:00-19:00&nbsp;&nbsp;&nbsp;&nbsp;退房時間：11:00-14:00
                  </p>
                </div>
              </article>
            </li>
            <li className="footer-list2">
              <h1>客戶服務</h1>
              <p><a href>關於LAZYDOG</a></p>
              <p><a href>寵物週邊</a></p>
              <p><a href>線上訂房</a></p>
              <p><a href>寵物課程</a></p>
              <p><a href>毛孩新知</a></p>
            </li>
            <li className="footer-list3">
              <h1>其他服務</h1>
              <p><a href>會員集點</a></p>
              <p><a href>優惠券</a></p>
              <p><a href>常見問題</a></p>
            </li>
            <li className="footer-list4">
              <form className="footer-email" action>
                <input type="text" placeholder="Enter your email" />
                <button><img src="./img/plane.png" alt="" /></button>
              </form>
              <p>輸入 Email~首次購買即可享 15% 折扣！</p>
              <div className="footer-icon">
                <a href><img src="./img/FB.png" alt /></a>
                <a href><img src="./img/IG.png" alt /></a>
                <a href><img src="./img/YT.png" alt /></a>
              </div>
            </li>
          </ul>
        </section>
        <section className="footer-bottom">COPYRIGHT © 2024 &nbsp;LAZYDOG&nbsp;</section>
      </footer>

    </>
  );
}
