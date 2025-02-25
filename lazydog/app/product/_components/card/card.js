"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./card.module.css";
import Link from "next/link";
import useSWR from "swr";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { useRouter, usePathname } from "next/navigation";

export default function CardCard({
  productID = "",
  favorite = [],
  setFavorite = () => {},
}) {
  const { user } = useAuth();
  const { onAddProduct } = useCart();
  const router = useRouter();
  const loginRoute = "/login";
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

  const favoriteAPI = "http://localhost:5000/api/products/favorite";
  const {
    data: favoriteData,
    isLoading: favoriteLoading,
    error: favoriteError,
    mutate: favoriteMutate,
  } = useSWR(favoriteAPI, fetcher);

  const [favoriteList, setFavoriteList] = useState([]);
  useEffect(() => {
    if (favoriteData?.data) {
      const userFavorite = favoriteData?.data.find(
        (v) => v.user_id == user?.id
      );
      if (userFavorite?.productID_list.length > 0) {
        setFavoriteList(userFavorite?.productID_list.split(","));
      }
    }
  }, [favoriteData]);
  useEffect(() => {
    if (favoriteList.length > 0 && productID) {
      if (favoriteList.includes(productID)) setHeartState(true);
      setFavorite((favoriteNow) => {
        if (JSON.stringify(favoriteNow) !== JSON.stringify(favoriteList)) {
          return favoriteList;
        }
        return favoriteNow;
      });
    }
  }, [favoriteList]);
  // console.log(favoriteList);
  const [cardHover, setCardHover] = useState(false);
  const [heartHover, setHeartHover] = useState(false);
  const [heartState, setHeartState] = useState(false);
  const [cartHover, setCartHover] = useState(false);
  const [cartRate, setCartRate] = useState(0);
  const products = data?.data[0];
  const productName = products?.name;
  const [cardPic, setCardPic] = useState("/product/img/default.webp");
  const cardRef = useRef(null);
  const simulateClick = (e) => {
    if (e.target.dataset.clickable) {
      if (cardRef.current) {
        cardRef.current.click();
      }
    }
  };
  useEffect(() => {
    if (productName) {
      const img = new Image();
      const encodedImageName = encodeURIComponent(productName);
      img.src = `/product/img/${encodedImageName}_title.webp`;
      img.onload = () => setCardPic(img.src);
      img.onerror = () =>
        setCardPic(`/product/img/${encodedImageName}_(1).webp`);
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
      {/* {productDiscount > 0 && (
        <div className={styles.ProductCardOnsale}>-{productDiscount} %</div>
      )} */}
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
          {/* <h6>{cartRate}</h6> */}
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
