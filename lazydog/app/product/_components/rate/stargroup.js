"use client";

import React, { useState, useEffect } from "react";
import styles from "./rate.module.css";

export default function RatecardStarbar(props) {
  return (
    <div className={styles.StarGroup}>
      <img src="/product/font/star-fill.png" alt="" />
      <img src="/product/font/star-fill.png" alt="" />
      <img src="/product/font/star-fill.png" alt="" />
      <img src="/product/font/star-fill.png" alt="" />
      <img src="/product/font/star-fill.png" alt="" />
    </div>
  );
}
