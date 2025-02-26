"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./detail.module.css";
import ProductCard from "../_components/card/card";
import RateCard from "../_components/rate/ratecard";
import StarGroup from "../_components/rate/stargroup";
import StarBar from "../_components/rate/starbar";
import Link from "next/link";

import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { FetchDetailProvider, useDetailFetch } from "@/hooks/product/use-fetch";
import {
  DetailFavoriteProvider,
  useDetailFavorite,
} from "@/hooks/product/use-favorite";

import useSWR from "swr";
import { useSearchParams, useRouter } from "next/navigation";

export default function DetailPage() {
  return (
    <FetchDetailProvider>
      <DetailFavoriteProvider>
        <DetailContent />
      </DetailFavoriteProvider>
    </FetchDetailProvider>
  );
}

function DetailContent() {
  const { user } = useAuth();
  const { onAddProduct, productItems } = useCart();
  const {
    product,
    router,
    loginRoute,
    productData,
    productName,
    productDiscount,
    img,
    picNow,
    setPicNow,
    rate,
    setRate,
    amount,
    setAmount,
    cardPic,
    setCardPic,
    rateData,
    rateAvg,
    int,
    dec,
    hotSale,
    sameBuy,
    mutate,
    isLoading,
    error,
  } = useDetailFetch();
  const {
    favorite,
    setFavorite,
    heartHover,
    setHeartHover,
    heartState,
    setHeartState,
  } = useDetailFavorite();

  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const scrollNow = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", scrollNow);
    return () => {
      window.removeEventListener("scroll", scrollNow);
    };
  }, []);
  const elementRef = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (elementRef.current) {
      setOffset(elementRef.current.offsetTop);
    }
  }, []);

  const collapseRef = useRef(null);
  const simulateClick = () => {
    if (collapseRef.current) {
      collapseRef.current.click();
    }
  };

  return (
    <div className={`${styles.Container} container`}>
      <section className={styles.Breadcrumbs}>
        <Link href="/">首頁</Link>
        <img src="/product/font/right.png" alt="" />
        <Link href="/product/list"> 商品目錄 </Link>
        <img src="/product/font/right.png" alt="" />
        <Link
          className={styles.BreadcrumbsActive}
          href={`/product/list/category?category=${productData?.category}`}
        >
          {productData?.category}
        </Link>
      </section>
      <section className={styles.ProductInfo}>
        <div className={styles.ProductInfoImgGroup}>
          <figure className={styles.ProductInfoImg}>
            <img
              src={cardPic}
              alt=""
              onError={() => setCardPic("/product/img/default.webp")}
            />
          </figure>
          <div className={styles.ProductInfoImgSmall}>
            {img.sm.length > 0 && (
              <button
                type="button"
                className={styles.ProductInfoImgSmallBtn}
                onClick={() => {
                  setPicNow((e) => {
                    const newIndex = e - 1 < 0 ? img.sm.length - 1 : e - 1;
                    const encodedImageName = encodeURIComponent(productName);
                    setCardPic(
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
                if (i < 5) {
                  return (
                    <figure
                      key={`smPic${i}`}
                      className={`${styles.ProductInfoImgSmall}  ${
                        i == picNow ? styles.ProductInfoImgSmallActive : ""
                      }`}
                    >
                      <img src={`/product/img/${productName}${v}`} alt="" />
                    </figure>
                  );
                }
              })}
            {img.sm.length > 0 && (
              <button
                type="button"
                className={styles.ProductInfoImgSmallBtn}
                onClick={() => {
                  setPicNow((e) => {
                    const newIndex = e + 1 > img.sm.length - 1 ? 0 : e + 1;
                    const encodedImageName = encodeURIComponent(productName);
                    setCardPic(
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
        <div className={styles.ProductInfoDetail}>
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
                    heartHover || heartState ? "heart-fill-big" : "heart-big"
                  }.png`}
                  alt=""
                />
              </button>
              <h6>{heartState ? "已加入收藏" : "加入收藏"}</h6>
            </div>
            <h2 className={styles.InfoProductName}>{productData?.name}</h2>
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
                        dec > 7 ? "star-fill" : dec > 2 ? "star-half" : "star"
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
              <h5>{productDiscount > 0 ? `限時促銷價格：` : `價格：`}</h5>
              <h2>NT$ {productData?.price}</h2>
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
            <p>庫存數量 : {productData?.stock}</p>
            <div className={styles.InfoBtnGroup}>
              <button
                className={styles.BtnBuynow}
                onClick={() => {
                  if (!user) {
                    alert("請先登入");
                    setTimeout(() => {
                      router.push(loginRoute);
                    }, 100);
                  } else {
                    onAddProduct(productData, amount);
                    setTimeout(() => {
                      router.push("/cart/CartList");
                    }, 100);
                  }
                }}
              >
                <h5>立即購買</h5>
              </button>
              <button
                onClick={() => {
                  if (!user) {
                    alert("請先登入");
                    setTimeout(() => {
                      router.push(loginRoute);
                    }, 100);
                  } else {
                    onAddProduct(productData, amount);
                  }
                }}
              >
                <h5>加入購物車</h5>
              </button>
            </div>
          </div>
        </div>
      </section>
      <nav
        className={`sticky-top ${
          scrollY >= offset + 250 ? styles.StickyTop : styles.StickyTopOff
        }`}
      >
        <ul>
          {productData?.full_info && (
            <li>
              <h5>
                <Link href="#collapse-heading1">商品介紹</Link>
              </h5>
            </li>
          )}
          {(img.info || productData?.info_text) && (
            <li>
              <h5>
                <Link href="#collapse-heading2">商品詳細</Link>
              </h5>
            </li>
          )}
          {productData?.spec && (
            <li>
              <h5>
                <Link href="#collapse-heading3">商品規格</Link>
              </h5>
            </li>
          )}
        </ul>
      </nav>
      <section
        ref={elementRef}
        className={`${styles.ProductDetail} accordion accordion-flush`}
        id=""
      >
        {productData?.full_info && (
          <div className={`accordion-item ${styles.AccordionItem}`}>
            <div className="accordion-header" id="collapse-heading1">
              <button
                className={`accordion-button ${styles.AccordionButton}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse1"
                aria-expanded="true"
                aria-controls="collapse1"
              >
                <h5>商品介紹</h5>
              </button>
            </div>
            <div
              id="collapse1"
              className="accordion-collapse collapse show"
              aria-labelledby="collapse-heading1"
            >
              <div
                className={`accordion-body ${styles.AccordionBody}`}
                dangerouslySetInnerHTML={{ __html: productData?.full_info }}
              ></div>
            </div>
          </div>
        )}
        {(img.info || productData?.info_text) && (
          <div
            className={`accordion-item ${styles.AccordionItem}`}
            onClick={simulateClick}
          >
            <div className="accordion-header" id="collapse-heading2">
              <button
                className={`accordion-button collapsed ${styles.AccordionButton}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse2"
                aria-expanded="false"
                aria-controls="collapse2"
                ref={collapseRef}
              >
                <h5>商品詳細</h5>
              </button>
            </div>
            <div
              id="collapse2"
              className="accordion-collapse collapse"
              aria-labelledby="collapse-heading2"
            >
              <div className={`accordion-body ${styles.AccordionBody}`}>
                <figure>
                  {img.info &&
                    img.info.map((v, i) => (
                      <img
                        key={`infoPic${i}`}
                        src={`/product/img/${productName}${v}`}
                        alt=""
                      />
                    ))}
                  <figcaption>
                    <h6
                      dangerouslySetInnerHTML={{
                        __html: productData?.info_text,
                      }}
                    ></h6>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        )}
        {productData?.spec && (
          <div className={`accordion-item ${styles.AccordionItem}`}>
            <div className="accordion-header" id="collapse-heading3">
              <button
                className={`accordion-button collapsed ${styles.AccordionButton}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse3"
                aria-expanded="false"
                aria-controls="collapse3"
              >
                <h5>商品規格</h5>
              </button>
            </div>
            <div
              id="collapse3"
              className="accordion-collapse collapse"
              aria-labelledby="collapse-heading3"
            >
              <div
                className={`accordion-body ${styles.AccordionBody}`}
                dangerouslySetInnerHTML={{
                  __html: productData?.spec,
                }}
              ></div>
            </div>
          </div>
        )}
        <div
          className={`accordion-item ${styles.AccordionItem} ${styles.ProductDetailRate}`}
        >
          <div className="accordion-header" id="collapse-heading4">
            <button
              className={`accordion-button ${styles.AccordionButton}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse4"
              aria-expanded="true"
              aria-controls="collapse4"
            >
              <h5>商品評價</h5>
            </button>
          </div>
          <div
            id="collapse4"
            className="accordion-collapse collapse show"
            aria-labelledby="collapse-heading4"
          >
            <div className={`accordion-body ${styles.AccordionBody}`}>
              <div className={styles.ScoreBar}>
                <div className={styles.Score}>
                  <h5>商品評價</h5>
                  <h2>{rateAvg}</h2>
                  <StarGroup rate={rateAvg} />
                </div>
                <div className={styles.StarBarGroup}>
                  {[...Array(5)].map((v, i) => (
                    <StarBar
                      key={`starBar${i}`}
                      index={5 - i}
                      rate={rateData["rate"]}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.RateCardGroup}>
                {rateData.rate &&
                  rateData.rate.map((v, i) => {
                    if (i < rate) {
                      return (
                        <RateCard
                          key={`rateCard${i}`}
                          rate={v}
                          users={rateData.user[i]}
                          img={rateData.img[i]}
                          comment={rateData.comment[i]}
                          date={rateData.date[i]}
                        />
                      );
                    }
                  })}
              </div>
              {rateData.rate && rateData.rate.length > rate && (
                <button
                  type="button"
                  className={styles.RateMore}
                  onClick={() => {
                    setRate(rate + 3);
                  }}
                >
                  顯示更多評價
                </button>
              )}
              {rateData.rate && rateData.rate.length <= rate && (
                <button
                  type="button"
                  className={styles.RateMore}
                  onClick={() => {
                    setRate(3);
                  }}
                >
                  隱藏額外評價
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className={styles.AlsoBuy}>
        <h4 className={styles.AlsoBuyTitle}>其他人也買了...</h4>
        <ul className={styles.AlsoBuyList}>
          {sameBuy.length > 0 &&
            sameBuy?.map((v, i) => (
              <ProductCard
                key={`ProductCard${i}`}
                productID={v}
                favorite={favorite}
                setFavorite={setFavorite}
              />
            ))}
        </ul>
      </section>
      <section className={styles.OtherLike}>
        <h4 className={styles.OtherLikeTitle}>看看其他好物...</h4>
        <ul className={styles.OtherLikeList}>
          {hotSale.length > 0 &&
            hotSale?.map((v, i) => (
              <ProductCard
                key={`ProductCard${i}`}
                productID={v}
                favorite={favorite}
                setFavorite={setFavorite}
              />
            ))}
        </ul>
      </section>
    </div>
  );
}
