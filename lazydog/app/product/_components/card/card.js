"use client";

import React, { useState, useEffect } from "react";
import styles from "./card.module.css";
import Link from "next/link";

import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { FetchCardProvider, useCardFetch } from "@/hooks/product/use-fetch";
import {
  CardFavoriteProvider,
  useCardFavorite,
} from "@/hooks/product/use-favorite";

export default function Card({
  productID = "",
  favorite = [],
  setFavorite = () => {},
}) {
  return (
    <FetchCardProvider productID={productID}>
      <CardFavoriteProvider
        productID={productID}
        favorite={favorite}
        setFavorite={setFavorite}
      >
        <CardContent />
      </CardFavoriteProvider>
    </FetchCardProvider>
  );
}

function CardContent() {
  const { user } = useAuth();
  const { onAddProduct, productItems } = useCart();
  const [productCount, setProductCount] = useState(0);
  useEffect(() => {
    const newCount = productItems?.filter((v) => v.productID == productID);
    if (newCount && newCount[0]?.count !== undefined) {
      if (productCount !== newCount[0].count) {
        setProductCount(newCount[0].count);
      }
    }
  }, [productItems]);
  const {
    productID,
    router,
    loginRoute,
    products,
    productName,
    cardHover,
    setCardHover,
    cartHover,
    setCartHover,
    cartRate,
    setCartRate,
    cardPic,
    setCardPic,
    cardRef,
    simulateClick,
    mutate,
    isLoading,
    error,
  } = useCardFetch();
  const { setFavorite, heartHover, setHeartHover, heartState, setHeartState } =
    useCardFavorite();

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
            : (productCount ?? 0) > 0 || (cartRate ?? 0) > 0
            ? styles.ProductCardCart
            : styles.ProductCardCartOff
        }
      >
        <img src={`/product/font/cart-fill-big.png`} alt="" />
        <p>{productCount > 0 ? productCount : cartRate}</p>
      </div>
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
        <h5 className={styles.ProductCardPrice}>NT$ {products?.price}</h5>
      </div>
      <div
        className={styles.ProductCardHover}
        onClick={simulateClick}
        data-clickable="true"
      >
        <button
          type="button"
          className={`${styles.HoverIcon} `}
          onMouseEnter={() => setHeartHover(true)}
          onMouseLeave={() => setHeartHover(false)}
          onClick={() => {
            if (!user) {
              alert("請先登入");
              setTimeout(() => {
                router.push(loginRoute);
              }, 100);
            } else {
              const newState = !heartState;
              setHeartState(newState);
              setFavorite((favorite) =>
                newState
                  ? [...favorite, productID]
                  : favorite.filter((e) => e !== productID)
              );
            }
          }}
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
          onClick={() => {
            if (!user) {
              alert("請先登入");
              router.push(loginRoute);
            } else {
              setCartRate(cartRate + 1);
              onAddProduct(products, 1);
            }
          }}
        >
          <img
            src={`/product/font/${
              cartHover ? "cart-add" : cartRate ? "cart-fill" : "cart"
            }.png`}
            alt=""
          />
        </button>
        <Link
          href={`/product/detail?productID=${productID}`}
          className={styles.HoverIcon}
          ref={cardRef}
        >
          <img src="/product/font/list.png" alt="" />
        </Link>
      </div>
    </li>
  );
}
