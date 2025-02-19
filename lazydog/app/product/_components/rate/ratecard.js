"use client";

import React, { useState, useEffect } from "react";
import styles from "./rate.module.css";
import StarGroup from "./stargroup";

export default function RatecardRatecard(rate = {}) {
  const rateNum = rate?.rate.toString();
  const years = rate?.date.slice(0, 4);
  const months = rate?.date.slice(5, 7);
  const days = rate?.date.slice(8, 10);
  const [hover, setHover] = useState(false);
  const [good, setGood] = useState(false);
  // console.log(years, months, days);
  return (
    <div className={styles.RateCard}>
      <div className={styles.RateCardText}>
        <div className={styles.RateCardUser}>
          <button type="button">
            <img src="/product/font/self.png" alt="" />
            <h6>{rate?.user}</h6>
          </button>
          <div className={styles.StarGroup}>
            <StarGroup rate={rateNum} />
          </div>
        </div>
        <p>{rate?.comment}</p>
      </div>
      <div className={styles.RateCardBtnDate}>
        <button
          className={styles.RateCardBtn}
          type="button"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => setGood(!good)}
        >
          <img
            src={`/product/font/${good || hover ? "good-fill" : "good"}.png`}
            alt=""
          />
        </button>
        <p>
          {years} {months} {days}
        </p>
      </div>
    </div>
  );
}
