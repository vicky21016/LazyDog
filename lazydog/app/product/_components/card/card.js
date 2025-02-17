"use client";

import React, { useState, useEffect } from "react";
import styles from "./card.module.css";

export default function CardCard(product = {}) {
  const [hover, setHover] = useState(false);
  const products = product?.product;
  const productName = products?.name;
  const productPrice = products?.price;
  const productDiscount = (1 - Number(products?.discount)).toFixed(2) * 100;

  console.log(products, productDiscount);

  return (
    <li
      className={styles.ProductCard}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button
        type="button"
        className={hover ? styles.ProductCardHeartOn : styles.ProductCardHeart}
      >
        <img src="/product/font/heart.png" alt="" />
      </button>
      {productDiscount > 0 && (
        <div className={styles.ProductCardOnsale}>-{productDiscount} %</div>
      )}
      <figure className={styles.ProductCardImg}>
        <img src={`/product/img/${productName}_title.webp`} alt="" />
      </figure>
      <div className={styles.ProductCardInfo}>
        <p className={styles.ProductCardName}>{productName}</p>
        <h5 className={styles.ProductCardPrice}>NT${productPrice}</h5>
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
