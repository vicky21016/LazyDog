"use client";

import React, { useState, useEffect } from "react";
import styles from "./card.module.css";

export default function CardCard(props) {
  return (
    <li className={styles.ProductCard}>
      <button type="button" className={styles.ProductCardHeart}>
        <img src="/product/font/heart.png" alt="" />
      </button>
      <div className={styles.ProductCardOnsale}>-30%</div>
      <figure className={styles.ProductCardImg}>
        <img
          src="/product/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_title.webp"
          alt=""
        />
      </figure>
      <div className={styles.ProductCardInfo}>
        <h6 className={styles.ProductCardName}>
          GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)
        </h6>
        <h5 className={styles.ProductCardPrice}>NT$1000</h5>
      </div>
      <div className={styles.ProductCardHover}>
        <button
          type="button"
          className={`${styles.HoverIcon} ${styles.FavoriteBtn}`}
        >
          <img src="/product/font/heart.png" alt="" />
        </button>
        <button
          type="button"
          className={`${styles.HoverIcon} ${styles.CartBtn}`}
        >
          <img src="/product/font/cart.png" alt="" />
          <h2>1</h2>
        </button>
        <a href="" className={styles.HoverIcon}>
          <img src="/product/font/list.png" alt="" />
        </a>
      </div>
    </li>
  );
}
