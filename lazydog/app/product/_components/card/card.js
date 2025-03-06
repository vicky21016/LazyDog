"use client";

import React, { useState, useEffect } from "react";
import styles from "./card.module.css";
import Link from "next/link";
import Swal from "sweetalert2";

import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { useCardFetch } from "@/hooks/product/use-fetch";
import {
  CardFavoriteProvider,
  useCardFavorite,
} from "@/hooks/product/use-favorite";

export default function CardPage({
  productID = "",
  favorite = [],
  setFavorite = () => {},
}) {
  return (
    <CardFavoriteProvider
      productID={productID}
      favorite={favorite}
      setFavorite={setFavorite}
    >
      <CardContent productID={productID} />
    </CardFavoriteProvider>
  );
}

function CardContent({ productID = "" }) {
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
    width,
    router,
    loginRoute,
    products,
    productName,
    cardHover,
    setCardHover,
    cartHover,
    setCartHover,
    eyeHover,
    setEyeHover,
    cartRate,
    setCartRate,
    cardPic,
    setCardPic,
    cardRef,
    simulateClick,
    mutate,
    isLoading,
    error,
  } = useCardFetch({ productID });
  const {
    favorite,
    setFavorite,
    heartHover,
    setHeartHover,
    heartState,
    setHeartState,
  } = useCardFavorite();

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    // 檢查用戶是否登入
    if (!user) {
      Swal.fire({
        icon: "info",
        title: "請先登入",
        text: "您需要登入才能加入購物車！",
        showConfirmButton: true,
        confirmButtonText: "前往登入",
        confirmButtonColor: "#66c5bd", // 設定按鈕顏色
        showCancelButton: true, // 顯示取消按鈕
        cancelButtonText: "繼續逛街", // 設定取消按鈕文字
        cancelButtonColor: "#bcbcbc", // 設定取消按鈕顏色
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(loginRoute); // 跳轉到登入頁面
        }
      });
      return;
    }
    try {
      setCartRate(cartRate + 1);
      onAddProduct(products, 1);
      // 顯示成功訊息
      Swal.fire({
        icon: "success",
        title: "加入購物車成功",
        text: `${productName} 已成功加入購物車！`,
        showConfirmButton: false,
        timer: 1000, // 1.5 秒後自動關閉
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "加入購物車失敗",
        text: "請稍後重試！",
      });
    }
  };

  const handleAddFavorite = async (e) => {
    e.stopPropagation();
    // 檢查用戶是否登入
    if (!user) {
      Swal.fire({
        icon: "info",
        title: "請先登入",
        text: "您需要登入才能點擊收藏！",
        showConfirmButton: true,
        confirmButtonText: "前往登入",
        confirmButtonColor: "#66c5bd", // 設定按鈕顏色
        showCancelButton: true, // 顯示取消按鈕
        cancelButtonText: "繼續逛街", // 設定取消按鈕文字
        cancelButtonColor: "#bcbcbc", // 設定取消按鈕顏色
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(loginRoute); // 跳轉到登入頁面
        }
      });
      return;
    }
    try {
      const newState = !heartState;
      setHeartState(newState);
      setFavorite((favorite) =>
        newState
          ? [...favorite, productID]
          : favorite.filter((e) => e !== productID)
      );
      if (!heartState) {
        Swal.fire({
          icon: "success",
          title: "加入收藏成功",
          text: `${productName} 已成功加入收藏！`,
          showConfirmButton: false,
          timer: 1000, // 1.5 秒後自動關閉
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "取消收藏成功",
          text: `${productName} 已成功取消收藏！`,
          showConfirmButton: false,
          timer: 1000, // 1.5 秒後自動關閉
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "加入收藏失敗",
        text: "請稍後重試！",
      });
    }
  };
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    // 在組件卸載時清除 interval
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);
  return (
    <li
      className={`${styles.ProductCard} col`}
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
        <p className={`${styles.ProductCardName} d-none d-xxl-flex`}>
          {productName}
        </p>
        <p className={`${styles.ProductCardNameSm} d-xxl-none`}>
          {productName}
        </p>
        <h5 className={`${styles.ProductCardPrice} d-none d-xl-block`}>
          NT$ {products?.price}
        </h5>
        <h5 className={`${styles.ProductCardPriceSm} d-xl-none`}>
          NT$ {products?.price}
        </h5>
      </div>
      <div
        className={`${
          width > 1024
            ? styles.ProductCardHover
            : cardHover
            ? styles.ProductCardClickOn
            : styles.ProductCardClickOff
        }`}
        onClick={(e) => {
          width > 1024 ? simulateClick(e) : setCardHover(!cardHover);
        }}
        data-clickable="true"
      >
        <button
          type="button"
          className={`${styles.HoverIcon} `}
          onMouseEnter={() => setHeartHover(true)}
          onMouseLeave={() => setHeartHover(false)}
          onClick={(e) => {
            handleAddFavorite(e);
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
          onClick={(e) => {
            handleAddToCart(e);
          }}
        >
          <img
            src={`/product/font/${cartHover ? "cart-add" : "cart"}.png`}
            alt=""
          />
        </button>
        <Link
          onMouseEnter={() => {
            const id = setInterval(() => {
              setTimeout(() => {
                setEyeHover((prev) => !prev);
              }, 200);
              setTimeout(() => {
                setEyeHover((prev) => !prev);
              }, 900);
            }, 2500);
            setIntervalId(id);
          }}
          onMouseLeave={() => {
            if (intervalId) {
              clearInterval(intervalId);
              setIntervalId(null);
            }
          }}
          href={`/product/detail?productID=${productID}`}
          className={styles.HoverIcon}
          ref={cardRef}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <img
            src={`/product/font/${eyeHover ? "listOff2" : "list"}.png`}
            alt=""
          />
        </Link>
      </div>
    </li>
  );
}
