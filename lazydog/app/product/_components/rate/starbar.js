"use client";

import React, { useState, useEffect } from "react";
import styles from "./rate.module.css";

export default function RateStarbar(props) {
  return (
    <div className={styles.StarBar}>
      <div className={styles.StarGroup}>
        <img src="/product/font/star-fill.png" alt="" />
        <img src="/product/font/star-fill.png" alt="" />
        <img src="/product/font/star-fill.png" alt="" />
        <img src="/product/font/star-fill.png" alt="" />
        <img src="/product/font/star-fill.png" alt="" />
      </div>
      <div className={styles.BarArea}>
        <div className={styles.Bar} />
      </div>
      <p className={styles.Num}>85%</p>
    </div>
  );
}
