"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./detail.module.css";
import ProductCard from "../_components/card/card";
import RateCard from "../_components/rate/ratecard";
import StarGroup from "../_components/rate/stargroup";
import StarBar from "../_components/rate/starbar";
import useSWR from "swr";
import Link from "next/link";

export default function DetailPage(productID = {}) {
  const [rate, setRate] = useState(3);
  const [amount, setAmount] = useState(1);
  const product = productID?.searchParams.productID;
  const url = `http://localhost:5000/api/products/${product}`;
  const url2 = "http://localhost:5000/api/products/order";
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading, error, mutate } = useSWR(url, fetcher);
  const {
    data: orderData,
    isLoading: orderLoading,
    error: orderError,
    mutate: orderMutate,
  } = useSWR(url2, fetcher);
  const productData = data?.data[0];
  const productName = productData?.name;
  const img = {
    list: [],
    img: [],
    sm: [],
    info: [],
  };
  if (productData) {
    img["list"].push(productData?.listImg);
    img["img"] = (productData?.img).split(",");
    if (productData?.smImg) img["sm"] = (productData?.smImg).split(",");
    if (productData?.infoImg) img["info"] = (productData?.infoImg).split(",");
  }
  const productPrice = (
    Number(productData?.price) * Number(productData?.discount)
  ).toFixed(0);
  const productDiscount = (1 - Number(productData?.discount)).toFixed(2) * 100;
  const deadDate = Date.parse(productData?.discount_et);
  const deadline = () => Math.max(0, deadDate - Date.now());
  const [countDown, setCountDown] = useState(deadline());
  const deadDay = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const deadHour = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const deadMin = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown(deadline());
    }, 10000);
    setCountDown(deadline());
    return () => clearInterval(timer);
  }, [deadDate]);
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

  const rateData = {
    rate: [],
    comment: [],
    user: [],
    date: [],
  };
  let rateAvg = 0;
  if (data?.data) {
    data?.data.map((v, i) => {
      rateData["rate"].push(v.rate);
      rateData["comment"].push(v.comment);
      rateData["user"].push(v.user);
      rateData["date"].push(v.commentTime);
    });
    let rateSum = 0;
    for (let i = 0; i < rateData["rate"].length; i++) {
      rateSum += rateData["rate"][i];
    }
    rateAvg = (rateSum / rateData["rate"].length).toFixed(1);
  }
  let int, dec;
  if (rateAvg) {
    [int, dec] = rateAvg.toString().split(".");
    if (!dec) dec = 0;
  }
  const orders = orderData?.data;
  const hotSale = [];
  const sameBuy = [];
  const sameCategory = data?.data[0].productID.slice(0, 6);
  orders?.map((v, i) => {
    if (i < 10) hotSale.push(v.productID);
    if (sameBuy.length <= 10 && v.productID.includes(sameCategory))
      sameBuy.push(v.productID);
  });

  return (
    <div className={`${styles.Container} container`}>
      <section className={styles.Breadcrumbs}>
        <Link href="http://localhost:3000">首頁</Link>
        <img src="/product/font/right.png" alt="" />
        <Link href="http://localhost:3000/product/list"> 商品目錄 </Link>
        <img src="/product/font/right.png" alt="" />
        <Link
          className={styles.BreadcrumbsActive}
          href={`http://localhost:3000/product/list/category?category=${productData?.category}`}
        >
          {productData?.category}
        </Link>
      </section>
      <section className={styles.ProductInfo}>
        <div className={styles.ProductInfoImgGroup}>
          <figure>
            <img src={`/product/img/${productName}${img.img[0]}`} alt="" />
          </figure>
          <div className={styles.ProductInfoImgSmall}>
            {img.sm &&
              img.sm.map((v, i) => {
                if (i < 6) {
                  return (
                    <figure
                      key={`smPic${i}`}
                      className={styles.ProductInfoImgSmallActive}
                    >
                      <img src={`/product/img/${productName}${v}`} alt="" />
                    </figure>
                  );
                }
              })}
          </div>
        </div>
        <div className={styles.ProductInfoDetail}>
          <div className={styles.ProductInfoContent}>
            <div className={styles.InfoFavoriteGroup}>
              <button type="button" className={styles.FavoriteBtn}>
                <img src="/product/font/heart-big.png" alt="" />
              </button>
              <h6>加入收藏</h6>
            </div>
            {countDown > 0 && (
              <div className={styles.InfoOnsaleGroup}>
                <div className={styles.OnsaleTag}>
                  <h5>-{productDiscount}%</h5>
                </div>
                <div className={styles.OnsaleInfo}>
                  <h5>限時促銷剩餘時間</h5>
                  <h5 className={styles.OnsaleTime}>
                    {deadDay} 天 : {deadHour} 時 : {deadMin} 分
                  </h5>
                </div>
              </div>
            )}
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
              <h2>
                NT${" "}
                {productDiscount > 0
                  ? Math.floor(productData?.price * productData?.discount)
                  : productData?.price}
              </h2>
              {productDiscount > 0 && <h4>NT$ {productData?.price}</h4>}
            </div>
            <div className={styles.InfoQtyGroup}>
              <h5>購買數量</h5>
              <button
                className={styles.QtyMinus}
                onClick={() => setAmount(amount <= 1 ? 1 : amount - 1)}
              >
                <img src="/product/font/minus.png" alt="" />
              </button>
              <input type="number" defaultValue={amount} min={1} max={999} />
              <button
                className={styles.QtyPlus}
                onClick={() =>
                  setAmount(
                    amount >= productData?.stock
                      ? productData?.stock
                      : amount + 1
                  )
                }
              >
                <img src="/product/font/plus.png" alt="" />
              </button>
            </div>
            <p>庫存數量 : {productData?.stock}</p>
            <div className={styles.InfoBtnGroup}>
              <button className={styles.BtnBuynow}>
                <h5>立即購買</h5>
              </button>
              <button>
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
          <div className={`accordion-item ${styles.AccordionItem}`}>
            <div className="accordion-header" id="collapse-heading2">
              <button
                className={`accordion-button collapsed ${styles.AccordionButton}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse2"
                aria-expanded="false"
                aria-controls="collapse2"
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
                          comment={rateData.comment[i]}
                          user={rateData.user[i]}
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
          {/* 用這個商品卡片 -------------------------------------------------------*/}
          <ProductCard />
          {/* 用這個商品卡片 ----------------------------------------------------*/}
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </ul>
      </section>
      <section className={styles.OtherLike}>
        <h4 className={styles.OtherLikeTitle}>看看其他好物...</h4>
        <ul className={styles.OtherLikeList}>
          {/* 用這個商品卡片 -------------------------------------------------------*/}
          <ProductCard />
          {/* 用這個商品卡片 ----------------------------------------------------*/}
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </ul>
      </section>
    </div>
  );
}
