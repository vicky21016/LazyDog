"use client";

import React, { useState, useEffect } from "react";
import styles from "./card.module.css";
import Link from "next/link";

export default function CardCard(product = {}) {
  const [cardHover, setCardHover] = useState(false);
  const [heartHover, setHeartHover] = useState(false);
  const [heartState, setHeartState] = useState(false);
  const [cartHover, setCartHover] = useState(false);
  const [cartRate, setCartRate] = useState(0);
  const products = product?.product;
  const productName = products?.name;
  const [cardPic, setCardPic] = useState(
    `/product/img/${productName}_title.webp`
  );
  const productID = products?.productID;

  const productPrice = (
    Number(products?.price) * Number(products?.discount)
  ).toFixed(0);
  const productDiscount = (1 - Number(products?.discount)).toFixed(2) * 100;
  // console.log(products);
  return (
    <li
      className={styles.ProductCard}
      onMouseEnter={() => setCardHover(true)}
      onMouseLeave={() => setCardHover(false)}
    >
      <div
        className={
          cardHover ? styles.ProductCardHeartOff : styles.ProductCardHeart
        }
      >
        <img
          src={`/product/font/${heartState ? "heart-fill" : "heart"}.png`}
          alt=""
        />
      </div>
      <div
        className={
          cardHover
            ? styles.ProductCardCartOff
            : cartRate
            ? styles.ProductCardCart
            : styles.ProductCardCartOff
        }
      >
        <img src={`/product/font/cart-fill-big.png`} alt="" />
        <p>{cartRate}</p>
      </div>
      {productDiscount > 0 && (
        <div className={styles.ProductCardOnsale}>-{productDiscount} %</div>
      )}
      <figure className={styles.ProductCardImg}>
        <img
          src={cardPic}
          alt=""
          onError={() => setCardPic("/product/img/default.png")}
        />
      </figure>
      <div className={styles.ProductCardInfo}>
        <p className={styles.ProductCardName}>{productName}</p>
        <h5 className={styles.ProductCardPrice}>NT${productPrice}</h5>
      </div>
      <div className={styles.ProductCardHover}>
        <button
          type="button"
          className={`${styles.HoverIcon} ${styles.FavoriteBtn}`}
          onMouseEnter={() => setHeartHover(true)}
          onMouseLeave={() => setHeartHover(false)}
          onClick={() => setHeartState(!heartState)}
        >
          <img
            src={`/product/font/${
              heartHover || heartState ? "heart-fill-big" : "heart-big"
            }.png`}
            alt=""
          />
        </button>
        <button
          type="button"
          className={`${styles.HoverIcon} ${
            cartRate > 0 ? styles.CartBtn : styles.CartBtnOff
          }`}
          onMouseEnter={() => setCartHover(true)}
          onMouseLeave={() => setCartHover(false)}
          onClick={() => setCartRate(cartRate + 1)}
        >
          <img
            src={`/product/font/${
              cartHover ? "cart-add" : cartRate ? "cart-fill" : "cart"
            }.png`}
            alt=""
          />
          {/* <h6>{cartRate}</h6> */}
        </button>
        <Link
          href={`/product/detail?productID=${productID}`}
          className={styles.HoverIcon}
        >
          <img src="/product/font/list.png" alt="" />
        </Link>
      </div>
    </li>
  );
}
