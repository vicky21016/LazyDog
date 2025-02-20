"use client";

import React, { useState, useEffect } from "react";
import styles from "./card.module.css";
import Link from "next/link";
import useSWR from "swr";

export default function CardCard({ productID = "" }) {
  const url = productID
    ? `http://localhost:5000/api/products/${productID}`
    : null;
  const fetcher = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("資料要求失敗");
      return res.json();
    } catch (err) {
      console.error("資料要求失敗:", err);
      throw err;
    }
  };
  const { data, isLoading, error, mutate } = useSWR(url, fetcher);
  const [cardHover, setCardHover] = useState(false);
  const [heartHover, setHeartHover] = useState(false);
  const [heartState, setHeartState] = useState(false);
  const [cartHover, setCartHover] = useState(false);
  const [cartRate, setCartRate] = useState(0);
  const products = data?.data[0];
  const productName = products?.name;
  const [cardPic, setCardPic] = useState("/product/img/default.webp");
  const productPrice = (
    Number(products?.price) * Number(products?.discount)
  ).toFixed(0);
  const productDiscount = (1 - Number(products?.discount)).toFixed(2) * 100;
  useEffect(() => {
    if (productName) {
      const img = new Image();
      img.src = `/product/img/${productName}_title.webp`;
      img.onload = () => setCardPic(img.src);
      img.onerror = () => setCardPic("/product/img/default.webp");
    }
  }, [productName]);
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
        {productName && (
          <img
            src={cardPic}
            alt=""
            onError={() => setCardPic("/product/img/default.webp")}
          />
        )}
      </figure>
      <div className={styles.ProductCardInfo}>
        <p className={styles.ProductCardName}>{productName}</p>
        <h5 className={styles.ProductCardPrice}>NT${productPrice}</h5>
      </div>
      <div className={styles.ProductCardHover}>
        <button
          type="button"
          className={`${styles.HoverIcon} `}
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
