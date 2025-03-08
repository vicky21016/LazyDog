"use client";

import React, { useState, useEffect } from "react";
import styles from "./card.module.css";
import Link from "next/link";

import Swal from "sweetalert2";
import { MoonLoader } from "react-spinners";
import * as motion from "motion/react-client";

import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { useCardFetch, useDetailFetch } from "@/hooks/product/use-fetch";
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
    detailPic,
    setDetailPic,
    img,
    picNow,
    setPicNow,
    amount,
    setAmount,
    productData,
    int,
    dec,
    productDiscount,
  } = useDetailFetch(productID);
  const { setFavorite, heartHover, setHeartHover, heartState, setHeartState } =
    useCardFavorite();

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
          // text: `${productName} 已成功加入收藏！`,
          showConfirmButton: false,
          timer: 1000, // 1.5 秒後自動關閉
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "取消收藏成功",
          // text: `${productName} 已成功取消收藏！`,
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

  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => setIsOn(!isOn);

  // useEffect(() => {
  //   const clickOutside = (event) => {
  //     if (isOn && !event.target.closest(`.${styles.ProductCardMotion}`)) {
  //       setIsOn(false);
  //     }
  //   };
  //   document.addEventListener("click", clickOutside);
  //   return () => document.removeEventListener("click", clickOutside);
  // }, [isOn]);
  return (
    <>
      {isLoading ? (
        <li
          className={`${styles.ProductCard} col`}
          style={{
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MoonLoader color="#f5842b" speedMultiplier={1} />
        </li>
      ) : (
        <>
          {/* 
            <div
              style={{ background: "#ffffff", maxWidth: "900px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <section className={`${styles.ProductInfo} row`}>
                <div className={`${styles.ProductInfoImgGroup} col`}>
                  <figure className={styles.ProductInfoImg}>
                    {detailPic == "/product/img/default.webp" ? (
                      <div
                        style={{
                          width: "400px",
                          height: "400px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <MoonLoader
                          width={300}
                          color="#f5842b"
                          speedMultiplier={2}
                        />
                      </div>
                    ) : (
                      <img
                        src={detailPic}
                        alt=""
                        onError={() =>
                          setDetailPic("/product/img/default.webp")
                        }
                      />
                    )}
                  </figure>
                  <div className={styles.ProductInfoImgSmall}>
                    {img.sm.length > 0 && width >= 768 && (
                      <button
                        type="button"
                        className={styles.ProductInfoImgSmallBtn}
                        onClick={() => {
                          setPicNow((e) => {
                            const newIndex =
                              e - 1 < 0 ? img.sm.length - 1 : e - 1;
                            const encodedImageName =
                              encodeURIComponent(productName);
                            setDetailPic(
                              `/product/img/${encodedImageName}${img.img[newIndex]}`
                            );
                            return newIndex;
                          });
                        }}
                      >
                        <img src="/product/font/left(orange).png" alt="" />
                      </button>
                    )}
                    {img.sm &&
                      img.sm.map((v, i) => {
                        if (i < (width < 768 ? 4 : 5)) {
                          return (
                            <figure
                              key={`smPic${i}`}
                              className={`${styles.ProductInfoImgSmall}  ${
                                i == picNow
                                  ? styles.ProductInfoImgSmallActive
                                  : ""
                              }`}
                              onClick={() => {
                                setPicNow(() => {
                                  const newIndex = i;
                                  const encodedImageName =
                                    encodeURIComponent(productName);
                                  setDetailPic(
                                    `/product/img/${encodedImageName}${img.img[newIndex]}`
                                  );
                                  return newIndex;
                                });
                              }}
                            >
                              <img
                                src={`/product/img/${productName}${v}`}
                                alt=""
                              />
                            </figure>
                          );
                        }
                      })}
                    {img.sm.length > 0 && width >= 768 && (
                      <button
                        type="button"
                        className={styles.ProductInfoImgSmallBtn}
                        onClick={() => {
                          setPicNow((e) => {
                            const newIndex =
                              e + 1 > img.sm.length - 1 ? 0 : e + 1;
                            const encodedImageName =
                              encodeURIComponent(productName);
                            setDetailPic(
                              `/product/img/${encodedImageName}${img.img[newIndex]}`
                            );
                            return newIndex;
                          });
                        }}
                      >
                        <img src="/product/font/right(orange).png" alt="" />
                      </button>
                    )}
                  </div>
                </div>
                <div className={`${styles.ProductInfoDetail} col`}>
                  <div className={styles.ProductInfoContent}>
                    <div className={styles.InfoFavoriteGroup}>
                      <button
                        type="button"
                        className={styles.FavoriteBtn}
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
                                ? [...favorite, product]
                                : favorite.filter((e) => e !== product)
                            );
                          }
                        }}
                      >
                        <img
                          src={`/product/font/${
                            heartHover || heartState
                              ? "heart-fill-big"
                              : "heart-big"
                          }.png`}
                          alt=""
                        />
                      </button>
                      <h6>{heartState ? "已加入收藏" : "加入收藏"}</h6>
                    </div>
                    <h3 className={styles.InfoProductName}>
                      {productData?.name}
                    </h3>
                    <div className={styles.InfoRateGroup}>
                      {int && (
                        <>
                          {int > 0 &&
                            int <= 5 &&
                            [...Array(Number(int))].map((v, i) => (
                              <img
                                key={`starFill${i}`}
                                src="/product/font/star-fill.png"
                                alt=""
                              />
                            ))}
                          {int < 5 && (
                            <img
                              src={`/product/font/${
                                dec > 7
                                  ? "star-fill"
                                  : dec > 2
                                  ? "star-half"
                                  : "star"
                              }.png`}
                              alt=""
                            />
                          )}
                          {int < 4 &&
                            [...Array(4 - Number(int))].map((v, i) => (
                              <img
                                key={`star${i}`}
                                src="/product/font/star.png"
                                alt=""
                              />
                            ))}
                        </>
                      )}
                    </div>
                    <div className={styles.InfoPriceGroup}>
                      <h5>
                        {productDiscount > 0 ? `限時促銷價格：` : `價格：`}
                      </h5>
                      <h4>NT$ {productData?.price}</h4>
                      {productDiscount > 0 && <h4>NT$ {productData?.price}</h4>}
                    </div>
                    <div className={styles.InfoQtyGroup}>
                      <h5>購買數量</h5>
                      <button
                        className={styles.QtyMinus}
                        onClick={() => {
                          setAmount((prevAmount) =>
                            prevAmount - 1 <= 0 ? 1 : prevAmount - 1
                          );
                        }}
                      >
                        <img src="/product/font/minus.png" alt="" />
                      </button>
                      <input
                        type="number"
                        value={amount}
                        min={1}
                        max={999}
                        onChange={(e) => {
                          setAmount(() => {
                            const value = Number(e.target.value);
                            if (value >= 999) return 999;
                            if (value <= 0) return 1;
                            return value;
                          });
                        }}
                      />
                      <button
                        className={styles.QtyPlus}
                        onClick={() => {
                          setAmount((prevAmount) =>
                            prevAmount + 1 >= 999 ? 999 : prevAmount + 1
                          );
                        }}
                      >
                        <img src="/product/font/plus.png" alt="" />
                      </button>
                    </div>
                    <div className={styles.InfoBtnGroup}>
                      <button
                        className={styles.BtnBuynow}
                        onClick={() => {
                          handleAddToCart();
                          setTimeout(() => {
                            router.push("/cart/CartList");
                          }, 100);
                        }}
                      >
                        <h5>立即購買</h5>
                      </button>
                      <button onClick={handleAddToCart}>
                        <h5>加入購物車</h5>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div> */}
          <li layout style={{}} className={`${styles.ProductCard} col`}>
            <motion.div
              layout
              style={{
                translate: isOn ? "" : !isOn && cardHover ? "0 -10px" : "",
                width: isOn ? width : "",
                height: isOn ? "100vh" : "",
                position: isOn ? "fixed" : "",
                display: isOn ? "flex" : "",
                justifyContent: isOn ? "center" : "",
                alignItems: isOn ? "center" : "",
                top: isOn ? "0%" : "",
                left: isOn ? "0%" : "",
                zIndex: isOn ? "999" : "",
              }}
              onClick={toggleSwitch}
            >
              <motion.div
                layout
                style={{
                  display: isOn ? "flex" : "",
                  justifyContent: isOn ? "center" : "",
                  flexDirection: isOn ? "column" : "",
                  background: isOn ? "#ffffff" : "",
                  boxShadow: isOn ? "0px 0px 10px rgba(0, 0, 0, 0.2)" : "",
                  borderRadius: isOn ? "15px" : "",
                  overflow: isOn ? "hidden" : "",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  layout
                  style={{
                    display: isOn ? "none" : "",
                  }}
                  className={
                    cardHover
                      ? styles.ProductCardHeartOff
                      : styles.ProductCardHeart
                  }
                >
                  <img
                    src={`/product/font/${
                      heartState ? "heart-fill" : "heart"
                    }.png`}
                    alt=""
                  />
                </motion.div>
                <motion.div
                  layout
                  style={{
                    display: isOn ? "none" : "",
                  }}
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
                </motion.div>
                <motion.figure
                  layout
                  style={{
                    width: isOn && width >= 768 ? "300px" : isOn ? "250px" : "",
                    position: isOn ? "relative" : "",
                  }}
                  className={styles.ProductCardImg}
                >
                  {!isOn && productName && (
                    <img
                      src={cardPic}
                      alt=""
                      onError={() => setCardPic("/product/img/default.webp")}
                    />
                  )}
                  {isOn && (
                    <div className={`${styles.ProductInfoImgGroup} col`}>
                      <motion.figure
                        layout
                        style={{
                          marginLeft: isOn ? "0px" : "",
                        }}
                        className={styles.ProductInfoImg}
                      >
                        {detailPic == "/product/img/default.webp" ? (
                          <div
                            style={{
                              width: "300px",
                              height: "300px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <MoonLoader
                              width={300}
                              color="#f5842b"
                              speedMultiplier={2}
                            />
                          </div>
                        ) : (
                          <img
                            src={detailPic}
                            alt=""
                            onError={() =>
                              setDetailPic("/product/img/default.webp")
                            }
                          />
                        )}
                      </motion.figure>
                      <div className={styles.ProductInfoImgSmall}>
                        {img.sm &&
                          img.sm.map((v, i) => {
                            if (i < (width < 768 ? 4 : 5)) {
                              return (
                                <figure
                                  key={`smPic${i}`}
                                  className={`${styles.ProductInfoImgSmall}  ${
                                    i == picNow
                                      ? styles.ProductInfoImgSmallActive
                                      : ""
                                  }`}
                                  onClick={() => {
                                    setPicNow(() => {
                                      const newIndex = i;
                                      const encodedImageName =
                                        encodeURIComponent(productName);
                                      setDetailPic(
                                        `/product/img/${encodedImageName}${img.img[newIndex]}`
                                      );
                                      return newIndex;
                                    });
                                  }}
                                >
                                  <img
                                    src={`/product/img/${productName}${v}`}
                                    alt=""
                                  />
                                </figure>
                              );
                            }
                          })}
                      </div>
                    </div>
                  )}
                  {isOn && (
                    <motion.div
                      layout
                      style={{
                        display: isOn ? "flex" : "none",
                        flexDirection: isOn ? "column" : "",
                        position: isOn ? "absolute" : "",
                        top: isOn ? "0" : "",
                        right: isOn ? "0" : "",
                        padding: isOn ? "10px 5px" : "",
                        gap: isOn ? "7px" : "",
                      }}
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
                            heartHover || heartState
                              ? "heart-fill-big"
                              : "heart-big"
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
                          src={`/product/font/${
                            cartHover ? "cart-add" : "cart"
                          }.png`}
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
                          }, 2000);
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
                          src={`/product/font/${
                            eyeHover ? "listOff2" : "list"
                          }.png`}
                          alt=""
                        />
                      </Link>
                    </motion.div>
                  )}
                </motion.figure>
                <motion.div
                  layout
                  style={{
                    background: isOn ? "black" : "",
                    paddingTop: isOn ? "14px" : "",
                  }}
                  className={styles.ProductCardInfo}
                >
                  <motion.p
                    layout
                    style={{
                      maxWidth: isOn ? "260px" : "",
                      height: isOn ? "auto" : "",
                      color: isOn ? "white" : "",
                    }}
                    className={`${styles.ProductCardName} d-none d-xxl-flex`}
                  >
                    {productName}
                  </motion.p>
                  <motion.p
                    layout
                    style={{
                      maxWidth:
                        isOn && width >= 768 ? "260px" : isOn ? "210px" : "",
                      height: isOn ? "auto" : "",
                      color: isOn ? "white" : "",
                    }}
                    className={`${styles.ProductCardNameSm} d-xxl-none`}
                  >
                    {productName}
                  </motion.p>
                  <motion.h5
                    className={`${styles.ProductCardPrice} d-none d-xl-block`}
                  >
                    NT$ {products?.price}
                  </motion.h5>
                  <motion.h5
                    className={`${styles.ProductCardPriceSm} d-xl-none`}
                  >
                    NT$ {products?.price}
                  </motion.h5>
                </motion.div>
                <motion.div
                  layout
                  style={{
                    display: isOn ? "none" : "",
                  }}
                  className={`${
                    width > 1024
                      ? styles.ProductCardHover
                      : cardHover
                      ? styles.ProductCardClickOn
                      : styles.ProductCardClickOff
                  }`}
                  onClick={toggleSwitch}
                  onMouseEnter={() => setCardHover(true)}
                  onMouseLeave={() => setCardHover(false)}
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
                        heartHover || heartState
                          ? "heart-fill-big"
                          : "heart-big"
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
                      src={`/product/font/${
                        cartHover ? "cart-add" : "cart"
                      }.png`}
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
                      }, 2000);
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
                      src={`/product/font/${
                        eyeHover ? "listOff2" : "list"
                      }.png`}
                      alt=""
                    />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              layout
              style={{
                width: isOn ? width : "",
                height: isOn ? "100vh" : "",
                position: isOn ? "fixed" : "",
                top: isOn ? "0%" : "",
                left: isOn ? "0%" : "",
                zIndex: isOn ? "998" : "",
                background: isOn ? "rgba(0, 0, 0, 0.8)" : "",
                transition: "all 0.4s",
              }}
            ></motion.div>
          </li>
        </>
      )}
    </>
  );
}
