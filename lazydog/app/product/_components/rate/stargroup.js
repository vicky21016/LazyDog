"use client";

import React, { useState, useEffect } from "react";
import styles from "./rate.module.css";

export default function RatecardStarbar(rate = {}) {
  const rateNum = rate?.rate;
  let int, dec;
  if (rateNum) {
    [int, dec] = rateNum.split(".");
  }
  // console.log(int, dec);
  return (
    <>
      {int > 0 && (
        <>
          <div className={styles.StarGroup}>
            {[...Array(Number(int))].map((v, i) => (
              <img
                key={`starFill${i}`}
                src="/product/font/star-fill.png"
                alt=""
              />
            ))}
            <img
              src={`/product/font/${
                dec > 7 ? "star-fill" : dec > 2 ? "star-half" : "star"
              }.png`}
              alt=""
            />
            {[...Array(4 - Number(int))].map((v, i) => (
              <img key={`star${i}`} src="/product/font/star.png" alt="" />
            ))}
          </div>
        </>
      )}
    </>
  );
}
