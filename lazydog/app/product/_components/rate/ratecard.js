"use client";

import React, { useState, useEffect } from "react";
import styles from "./rate.module.css";
import StarGroup from "./stargroup";

export default function RatecardRatecard(rate = {}) {
  // console.log(rate);
  return (
    <div className={styles.RateCard}>
      <div className={styles.RateCardText}>
        <div className={styles.RateCardUser}>
          <button type="button">
            <img src="/product/font/self.png" alt="" />
            <h6>毛小孩</h6>
          </button>
          <div className={styles.StarGroup}>
            <StarGroup />
          </div>
        </div>
        <p>
          我們精選全球優質狗狗用品，從營養健康的天然飼料到讓狗狗樂在其中的趣味玩具，每一款商品都經過嚴格挑選，確保您的毛孩得到最好的照顧。
        </p>
      </div>
      <div className={styles.RateCardBtnDate}>
        <button className={styles.RateCardBtn}>
          <img src="/product/font/good.png" alt="" />
        </button>
        <p>Aug 30 ,2024</p>
      </div>
    </div>
  );
}
