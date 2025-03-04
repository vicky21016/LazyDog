"use client";

import React, { useState, useEffect } from "react";
import styles from "./rate.module.css";
import StarGroup from "./stargroup";

export default function Ratecard({
  user = "",
  img = "",
  rate = "",
  comment = "",
  goodNum = 0,
  date = "",
}) {
  const rateNum = rate.toString();
  const years = date.slice(0, 4);
  const months = date.slice(5, 7);
  const days = date.slice(8, 10);
  const [hover, setHover] = useState(false);
  const [good, setGood] = useState(false);

  return (
    <div className={`${styles.RateCard}`}>
      <div className={styles.RateCardText}>
        <div className={styles.RateCardUser}>
          <button type="button">
            <img src={`http://localhost:5000/auth/${img}`} alt="" />
            <h6>{user}</h6>
          </button>
          <div className={styles.StarGroup}>
            <StarGroup rate={rateNum} />
          </div>
        </div>
        <p>{comment}</p>
      </div>
      <div className={styles.RateCardBtnDate}>
        <div className={styles.RateCardGood}>
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
          <p>{goodNum}</p>
        </div>
        <p>
          {years} {months} {days}
        </p>
      </div>
    </div>
  );
}
