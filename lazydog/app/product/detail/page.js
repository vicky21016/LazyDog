"use client";

import React, { useState, useEffect } from "react";
import styles from "./detail.module.css";

export default function DetailPage(props) {
  return (
    <>
      <script></script>
      <div className={`${styles.container} container`}>
        <section className={styles.Breadcrumbs}>
          <a href="">目錄</a>
          <img src="/img/font/right.png" alt="" />
          <a href="">罐頭</a>
          <img src="/img/font/right.png" alt="" />
          <a href="" className={styles.BreadcrumbsActive}>
            主食/餐包
          </a>
        </section>
        <section className={styles.ProductInfo}>
          <div className={styles.ProductInfoImgGroup}>
            <figure>
              <img
                src="/img/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_(1).webp"
                alt=""
              />
            </figure>
            <div className={styles.ProductInfoImgSmall}>
              <figure className={styles.ProductInfoImgSmallActive}>
                <img
                  src="/img/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_sm(1).webp"
                  alt=""
                />
              </figure>
              <figure>
                <img
                  src="/img/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_sm(2).webp"
                  alt=""
                />
              </figure>
              <figure>
                <img
                  src="/img/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_sm(1).webp"
                  alt=""
                />
              </figure>
              <figure>
                <img
                  src="/img/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_sm(2).webp"
                  alt=""
                />
              </figure>
            </div>
          </div>
          <div className={styles.ProductInfoDetail}>
            <div className={styles.ProductInfoContent}>
              <div className={styles.InfoFavoriteGroup}>
                <button type="button" className={styles.FavoriteBtn}>
                  <img src="/img/font/heart.png" alt="" />
                </button>
                <h4>加入收藏</h4>
              </div>
              <div className={styles.InfoOnsaleGroup}>
                <div className={styles.OnsaleTag}>
                  <h4>-30%</h4>
                </div>
                <div className={styles.OnsaleInfo}>
                  <h4>限時促銷剩餘時間</h4>
                  <h4 className={styles.OnsaleTime}>00天:08時:00分</h4>
                </div>
              </div>
              <h1 className={styles.InfoProductName}>
                法國皇家 SHNW 皇家小型幼犬濕糧MNPW 85克(1入)(狗主食餐包)
              </h1>
              <div className={styles.InfoRateGroup}>
                <img src="/img/font/star-fill.png" alt="" />
                <img src="/img/font/star-fill.png" alt="" />
                <img src="/img/font/star-fill.png" alt="" />
                <img src="/img/font/star-fill.png" alt="" />
                <img src="/img/font/star.png" alt="" />
              </div>
              <div className={styles.InfoPriceGroup}>
                <h3>限時促銷價格.................................</h3>
                <h1>NT$ 62</h1>
                <h2>NT$ 69</h2>
              </div>
              <div className={styles.InfoQtyGroup}>
                <h4>購買數量</h4>
                <button className={styles.QtyMinus}>
                  <img src="/img/font/minus.png" alt="" />
                </button>
                <input type="number" defaultValue={1} min={1} max={999} />
                <button className={styles.QtyPlus}>
                  <img src="/img/font/plus.png" alt="" />
                </button>
              </div>
              <div className={styles.InfoBtnGroup}>
                <button className={styles.BtnBuynow}>
                  <h3>立即購買</h3>
                </button>
                <button>
                  <h3>加入購物車</h3>
                </button>
              </div>
            </div>
          </div>
        </section>
        <nav className={styles.StickyTop}>
          <ul>
            <li>
              <h3>
                <a href="#collapse-heading1">商品詳情</a>
              </h3>
            </li>
            <li>
              <h3>
                <a href="#collapse-heading2">商品介紹圖</a>
              </h3>
            </li>
            <li>
              <h3>
                <a href="#collapse-heading3">商品規格</a>
              </h3>
            </li>
          </ul>
        </nav>
        <section
          className={`${styles.ProductDetail} accordion accordion-flush`}
          id=""
        >
          <article className={styles.AccordionItem}>
            <div className="accordion-header" id="collapse-heading1">
              <button
                className={`accordion-button ${styles.AccordionButton}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse1"
                aria-expanded="true"
                aria-controls="collapse1"
              >
                <h3>商品詳情</h3>
              </button>
            </div>
            <div
              id="collapse1"
              className="accordion-collapse collapse show"
              aria-labelledby="collapse-heading1"
            >
              <div className={`accordion-body ${styles.AccordionBody}`}>
                <h4>
                  商品特色
                  <br />
                  為熟齡室內/絕育貓量身打造營養配方
                  <br />
                  熟齡元氣&amp;腎臟健康符合貓咪天生偏好
                  <br />
                  備受飼主及室內貓喜愛
                </h4>
              </div>
            </div>
          </article>
          <div className={styles.AccordionItem}>
            <div className="accordion-header" id="collapse-heading2">
              <button
                className={`accordion-button collapsed ${styles.AccordionButton}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse2"
                aria-expanded="false"
                aria-controls="collapse2"
              >
                <h3>商品介紹圖</h3>
              </button>
            </div>
            <div
              id="collapse2"
              className="accordion-collapse collapse"
              aria-labelledby="collapse-heading2"
            >
              <div className={`accordion-body ${styles.AccordionBody}`}>
                <figure>
                  <img
                    src="/img/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_info(1).jpg"
                    alt=""
                  />
                  <img
                    src="/img/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_info(2).jpg"
                    alt=""
                  />
                  <img
                    src="/img/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_info(3).jpg"
                    alt=""
                  />
                  <img
                    src="/img/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_info(4).jpg"
                    alt=""
                  />
                  <img
                    src="/img/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_info(5).jpg"
                    alt=""
                  />
                  <figcaption>
                    <h4>
                      商品成分
                      <br />
                      肉及相關產品、穀物、蔬菜纖維、礦物質、油脂、多
                      <br />
                      醣類聚合物。營養添加劑:維他命D3、鐵、碘、
                      <br />
                      銅、鎂、鋅、沸石等。
                      <br />
                      營養分析
                      <br />
                      蛋白質8%、脂肪6%、纖維素1%
                      <br />
                      灰份2%、無氮浸出物4%
                      <br />
                      胺基酸
                      <br />
                      牛磺酸(%)0.12、精氨酸(%)0.45、離胺酸(%)0.5
                      <br />
                      、甲硫胺酸(%)0.15、甲硫胺酸+胱胺酸(%)0.3
                      <br />
                      鈣(%)0.32、磷(%)0.25、鈉(%)0.21、氯(%)0.2
                      <br />
                      鉀(%)0.15、鎂(%)0.02
                      <br />
                      礦物質
                      <br />
                      銅(mg/kg)3.4、鐵(mg/kg)34、
                      <br />
                      錳(mg/kg)3.4、鋅(mg/kg)25、
                      <br />
                      硒(mg/kg)0.2碘(mg/kg)0.4
                      <br />
                      維生素
                      <br />
                      維生素A IU/kg)8500、維生素D3 [IU/kg)140
                      <br />
                      維生素E [mg/kg]150、維生素C(mg/kg)100、
                      <br />
                      維生素B1(硫胺)(mg/kg)2、維生素B2[核黄素](mg/kg)2、
                      <br />
                      維生素B5(泛酸](mg/kg)10、維生素B6 [此哆醇)(mg/kg)1、
                      <br />
                      維生素B12(氯鈷胺)(mg/kg)0.02、維生素B3 [菸鹼酸)(mg/kg)14、
                      <br />
                      生物素(mg/kg)0.05、葉酸(mg/kg)0.3、膽鹼(mg/kg)440
                      <br />
                      其他營養素
                      <br />
                      澱粉(%)3.2、膳食纖維(%)1.8、亞麻油酸(%)1.7
                      <br />
                      花生四烯酸(%)0.06、ω-6脂肪酸(%)1.9、ω-3脂肪酸(%)0.15
                      <br />
                      EPA+DHA(%)0.07、左旋肉鹼-、葉黃素[mg/kg]1.2
                      <br />
                      β胡蘿蔔素 (mg/kg) 1.25
                      <br />
                      熱量[NRC85](kcal/kg)930、熱量[NRC2006](CF)(kcal/kg)951
                    </h4>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
          <article className={styles.AccordionItem}>
            <div className="accordion-header" id="collapse-heading3">
              <button
                className={`accordion-button collapsed ${styles.AccordionButton}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse3"
                aria-expanded="false"
                aria-controls="collapse3"
              >
                <h3>商品規格</h3>
              </button>
            </div>
            <div
              id="collapse3"
              className="accordion-collapse collapse"
              aria-labelledby="collapse-heading3"
            >
              <div className={`accordion-body ${styles.AccordionBody}`}>
                <p>適用體型：全適用</p>
                <p>商品適用年齡：幼齡</p>
                <p>產地：奧地利</p>
                <p>口味：其他</p>
                <p>容量：51-150ml</p>
              </div>
            </div>
          </article>
          <div
            className={`${styles.AccordionItem} ${styles.ProductDetailRate}`}
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
                <h3>商品評價</h3>
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
                    <h3>商品評價</h3>
                    <h2>4.9</h2>
                    <div className={styles.StarGroup}>
                      <img src="/img/font/star-fill.png" alt="" />
                      <img src="/img/font/star-fill.png" alt="" />
                      <img src="/img/font/star-fill.png" alt="" />
                      <img src="/img/font/star-fill.png" alt="" />
                      <img src="/img/font/star-fill.png" alt="" />
                    </div>
                  </div>
                  <div className={styles.StarBarGroup}>
                    <div className={styles.StarBar}>
                      <div className={styles.StarGroup}>
                        <img src="/img/font/star-fill.png" alt="" />
                        <img src="/img/font/star-fill.png" alt="" />
                        <img src="/img/font/star-fill.png" alt="" />
                        <img src="/img/font/star-fill.png" alt="" />
                        <img src="/img/font/star-fill.png" alt="" />
                      </div>
                      <div className={styles.BarArea}>
                        <div className={styles.Bar} />
                      </div>
                      <p className={styles.Num}>85%</p>
                    </div>
                    <div className={styles.StarBar}>
                      <div className={styles.StarGroup}>
                        <img src="/img/font/star.png" alt="" />
                        <img src="/img/font/star-fill.png" alt="" />
                        <img src="/img/font/star-fill.png" alt="" />
                        <img src="/img/font/star-fill.png" alt="" />
                        <img src="/img/font/star-fill.png" alt="" />
                      </div>
                      <div className={styles.BarArea}>
                        <div className={styles.Bar} />
                      </div>
                      <p className={styles.Num}>10%</p>
                    </div>
                    <div className={styles.StarBar}>
                      <div className={styles.StarGroup}>
                        <img src="/img/font/star.png" alt="" />
                        <img src="/img/font/star.png" alt="" />
                        <img src="/img/font/star-fill.png" alt="" />
                        <img src="/img/font/star-fill.png" alt="" />
                        <img src="/img/font/star-fill.png" alt="" />
                      </div>
                      <div className={styles.BarArea}>
                        <div className={styles.Bar} />
                      </div>
                      <p className={styles.Num}>3%</p>
                    </div>
                    <div className={styles.StarBar}>
                      <div className={styles.StarGroup}>
                        <img src="/img/font/star.png" alt="" />
                        <img src="/img/font/star.png" alt="" />
                        <img src="/img/font/star.png" alt="" />
                        <img src="/img/font/star-fill.png" alt="" />
                        <img src="/img/font/star-fill.png" alt="" />
                      </div>
                      <div className={styles.BarArea}>
                        <div className={styles.Bar} />
                      </div>
                      <p className={styles.Num}>2%</p>
                    </div>
                    <div className={styles.StarBar}>
                      <div className={styles.StarGroup}>
                        <img src="/img/font/star.png" alt="" />
                        <img src="/img/font/star.png" alt="" />
                        <img src="/img/font/star.png" alt="" />
                        <img src="/img/font/star.png" alt="" />
                        <img src="/img/font/star-fill.png" alt="" />
                      </div>
                      <div className={styles.BarArea}>
                        <div className={styles.Bar} />
                      </div>
                      <p className={styles.Num}>0%</p>
                    </div>
                  </div>
                </div>
                <div className={styles.RateCardGroup}>
                  <div className={styles.RateCard}>
                    <div className={styles.RateCardText}>
                      <div className={styles.RateCardUser}>
                        <button type="button">
                          <img src="/img/font/self.png" alt="" />
                          <h6>毛小孩</h6>
                        </button>
                        <div className={styles.StarGroup}>
                          <img src="/img/font/star-fill.png" alt="" />
                          <img src="/img/font/star-fill.png" alt="" />
                          <img src="/img/font/star-fill.png" alt="" />
                          <img src="/img/font/star-fill.png" alt="" />
                          <img src="/img/font/star-fill.png" alt="" />
                        </div>
                      </div>
                      <h6>
                        我們精選全球優質狗狗用品，從營養健康的天然飼料到讓狗狗樂在其中的趣味玩具，每一款商品都經過嚴格挑選，確保您的毛孩得到最好的照顧。
                      </h6>
                    </div>
                    <div className={styles.RateCardBtnDate}>
                      <button className={styles.RateCardBtn}>
                        <img src="/img/font/good.png" alt="" />
                      </button>
                      <h5>Aug 30 ,2024</h5>
                    </div>
                  </div>
                  <div className={styles.RateCard}>
                    <div className={styles.RateCardText}>
                      <div className={styles.RateCardUser}>
                        <button type="button">
                          <img src="/img/font/self.png" alt="" />
                          <h6>毛小孩</h6>
                        </button>
                        <div className={styles.StarGroup}>
                          <img src="/img/font/star-fill.png" alt="" />
                          <img src="/img/font/star-fill.png" alt="" />
                          <img src="/img/font/star-fill.png" alt="" />
                          <img src="/img/font/star-fill.png" alt="" />
                          <img src="/img/font/star-fill.png" alt="" />
                        </div>
                      </div>
                      <h6>
                        我們精選全球優質狗狗用品，從營養健康的天然飼料到讓狗狗樂在其中的趣味玩具，每一款商品都經過嚴格挑選，確保您的毛孩得到最好的照顧。
                      </h6>
                    </div>
                    <div className={styles.RateCardBtnDate}>
                      <button className={styles.RateCardBtn}>
                        <img src="/img/font/good.png" alt="" />
                      </button>
                      <h5>Aug 30 ,2024</h5>
                    </div>
                  </div>
                  <div className={styles.RateCard}>
                    <div className={styles.RateCardText}>
                      <div className={styles.RateCardUser}>
                        <button type="button">
                          <img src="/img/font/self.png" alt="" />
                          <h6>毛小孩</h6>
                        </button>
                        <div className={styles.StarGroup}>
                          <img src="/img/font/star-fill.png" alt="" />
                          <img src="/img/font/star-fill.png" alt="" />
                          <img src="/img/font/star-fill.png" alt="" />
                          <img src="/img/font/star-fill.png" alt="" />
                          <img src="/img/font/star-fill.png" alt="" />
                        </div>
                      </div>
                      <h6>
                        我們精選全球優質狗狗用品，從營養健康的天然飼料到讓狗狗樂在其中的趣味玩具，每一款商品都經過嚴格挑選，確保您的毛孩得到最好的照顧。
                      </h6>
                    </div>
                    <div className={styles.RateCardBtnDate}>
                      <button className={styles.RateCardBtn}>
                        <img src="/img/font/good.png" alt="" />
                      </button>
                      <h5>Aug 30 ,2024</h5>
                    </div>
                  </div>
                </div>
                <button type="button" className={styles.RateMore}>
                  顯示更多評價
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.AlsoBuy}>
          <h3 className={styles.AlsoBuyTitle}>其他人也買了...</h3>
          <ul className={styles.AlsoBuyList}>
            {/* 用這個商品卡片 -------------------------------------------------------*/}
            <li className={styles.ProductCard}>
              <div
                className={styles.ProductCardHeart}
                style={{ display: "none" }}
              >
                <img src="/img/font/heart.png" alt="" />
              </div>
              <div className={styles.ProductCardOnsale}>-30%</div>
              <figure className={styles.ProductCardImg}>
                <img
                  src="/img/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_title.webp"
                  alt=""
                />
              </figure>
              <div className={styles.ProductCardInfo}>
                <h4 className={styles.ProductCardName}>
                  我們相信，毛小孩不僅是寵物，更是家人。
                </h4>
                <h4 className={styles.ProductCardPrice}>NT$1000</h4>
              </div>
              <div className={styles.ProductCardHover}>
                <button
                  type="button"
                  className={`${styles.HoverIcon} ${styles.FavoriteBtn}`}
                >
                  <img src="/img/font/heart.png" alt="" />
                </button>
                <button
                  type="button"
                  className={`${styles.HoverIcon} ${styles.CartBtn}`}
                >
                  <img src="/img/font/cart.png" alt="" />
                  <h2>1</h2>
                </button>
                <a href="" className={styles.HoverIcon}>
                  <img src="/img/font/list.png" alt="" />
                </a>
              </div>
            </li>
            {/* 用這個商品卡片 ----------------------------------------------------*/}
            <li className={styles.ProductCard}>
              <div
                className={styles.ProductCardHeart}
                style={{ display: "none" }}
              >
                <img src="/img/font/heart.png" alt="" />
              </div>
              <div className={styles.ProductCardOnsale}>-30%</div>
              <figure className={styles.ProductCardImg}>
                <img
                  src="/img/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_title.webp"
                  alt=""
                />
              </figure>
              <div className={styles.ProductCardInfo}>
                <h4 className={styles.ProductCardName}>
                  我們相信，毛小孩不僅是寵物，更是家人。
                </h4>
                <h4 className={styles.ProductCardPrice}>NT$1000</h4>
              </div>
              <div className={styles.ProductCardHover}>
                <button
                  type="button"
                  className={`${styles.HoverIcon} ${styles.FavoriteBtn}`}
                >
                  <img src="/img/font/heart.png" alt="" />
                </button>
                <button
                  type="button"
                  className={`${styles.HoverIcon} ${styles.CartBtn}`}
                >
                  <img src="/img/font/cart.png" alt="" />
                  <h2>1</h2>
                </button>
                <a href="" className={styles.HoverIcon}>
                  <img src="/img/font/list.png" alt="" />
                </a>
              </div>
            </li>{" "}
            <li className={styles.ProductCard}>
              <div
                className={styles.ProductCardHeart}
                style={{ display: "none" }}
              >
                <img src="/img/font/heart.png" alt="" />
              </div>
              <div className={styles.ProductCardOnsale}>-30%</div>
              <figure className={styles.ProductCardImg}>
                <img
                  src="/img/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_title.webp"
                  alt=""
                />
              </figure>
              <div className={styles.ProductCardInfo}>
                <h4 className={styles.ProductCardName}>
                  我們相信，毛小孩不僅是寵物，更是家人。
                </h4>
                <h4 className={styles.ProductCardPrice}>NT$1000</h4>
              </div>
              <div className={styles.ProductCardHover}>
                <button
                  type="button"
                  className={`${styles.HoverIcon} ${styles.FavoriteBtn}`}
                >
                  <img src="/img/font/heart.png" alt="" />
                </button>
                <button
                  type="button"
                  className={`${styles.HoverIcon} ${styles.CartBtn}`}
                >
                  <img src="/img/font/cart.png" alt="" />
                  <h2>1</h2>
                </button>
                <a href="" className={styles.HoverIcon}>
                  <img src="/img/font/list.png" alt="" />
                </a>
              </div>
            </li>{" "}
            <li className={styles.ProductCard}>
              <div
                className={styles.ProductCardHeart}
                style={{ display: "none" }}
              >
                <img src="/img/font/heart.png" alt="" />
              </div>
              <div className={styles.ProductCardOnsale}>-30%</div>
              <figure className={styles.ProductCardImg}>
                <img
                  src="/img/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_title.webp"
                  alt=""
                />
              </figure>
              <div className={styles.ProductCardInfo}>
                <h4 className={styles.ProductCardName}>
                  我們相信，毛小孩不僅是寵物，更是家人。
                </h4>
                <h4 className={styles.ProductCardPrice}>NT$1000</h4>
              </div>
              <div className={styles.ProductCardHover}>
                <button
                  type="button"
                  className={`${styles.HoverIcon} ${styles.FavoriteBtn}`}
                >
                  <img src="/img/font/heart.png" alt="" />
                </button>
                <button
                  type="button"
                  className={`${styles.HoverIcon} ${styles.CartBtn}`}
                >
                  <img src="/img/font/cart.png" alt="" />
                  <h2>1</h2>
                </button>
                <a href="" className={styles.HoverIcon}>
                  <img src="/img/font/list.png" alt="" />
                </a>
              </div>
            </li>{" "}
            <li className={styles.ProductCard}>
              <div
                className={styles.ProductCardHeart}
                style={{ display: "none" }}
              >
                <img src="/img/font/heart.png" alt="" />
              </div>
              <div className={styles.ProductCardOnsale}>-30%</div>
              <figure className={styles.ProductCardImg}>
                <img
                  src="/img/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_title.webp"
                  alt=""
                />
              </figure>
              <div className={styles.ProductCardInfo}>
                <h4 className={styles.ProductCardName}>
                  我們相信，毛小孩不僅是寵物，更是家人。
                </h4>
                <h4 className={styles.ProductCardPrice}>NT$1000</h4>
              </div>
              <div className={styles.ProductCardHover}>
                <button
                  type="button"
                  className={`${styles.HoverIcon} ${styles.FavoriteBtn}`}
                >
                  <img src="/img/font/heart.png" alt="" />
                </button>
                <button
                  type="button"
                  className={`${styles.HoverIcon} ${styles.CartBtn}`}
                >
                  <img src="/img/font/cart.png" alt="" />
                  <h2>1</h2>
                </button>
                <a href="" className={styles.HoverIcon}>
                  <img src="/img/font/list.png" alt="" />
                </a>
              </div>
            </li>
          </ul>
        </section>
        <section className={styles.OtherLike}>
          <h3 className={styles.OtherLikeTitle}>看看其他好物...</h3>
          <ul className={styles.OtherLikeList}>
            {/* 用這個商品卡片 -------------------------------------------------------*/}
            <li className={styles.ProductCard}>
              <div
                className={styles.ProductCardHeart}
                style={{ display: "none" }}
              >
                <img src="/img/font/heart.png" alt="" />
              </div>
              <div className={styles.ProductCardOnsale}>-30%</div>
              <figure className={styles.ProductCardImg}>
                <img
                  src="/img/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_title.webp"
                  alt=""
                />
              </figure>
              <div className={styles.ProductCardInfo}>
                <h4 className={styles.ProductCardName}>
                  我們相信，毛小孩不僅是寵物，更是家人。
                </h4>
                <h4 className={styles.ProductCardPrice}>NT$1000</h4>
              </div>
              <div className={styles.ProductCardHover}>
                <button
                  type="button"
                  className={`${styles.HoverIcon} ${styles.FavoriteBtn}`}
                >
                  <img src="/img/font/heart.png" alt="" />
                </button>
                <button
                  type="button"
                  className={`${styles.HoverIcon} ${styles.CartBtn}`}
                >
                  <img src="/img/font/cart.png" alt="" />
                  <h2>1</h2>
                </button>
                <a href="" className={styles.HoverIcon}>
                  <img src="/img/font/list.png" alt="" />
                </a>
              </div>
            </li>
            {/* 用這個商品卡片 ----------------------------------------------------*/}
            <li className={styles.ProductCard}>
              <div
                className={styles.ProductCardHeart}
                style={{ display: "none" }}
              >
                <img src="/img/font/heart.png" alt="" />
              </div>
              <div className={styles.ProductCardOnsale}>-30%</div>
              <figure className={styles.ProductCardImg}>
                <img
                  src="/img/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_title.webp"
                  alt=""
                />
              </figure>
              <div className={styles.ProductCardInfo}>
                <h4 className={styles.ProductCardName}>
                  我們相信，毛小孩不僅是寵物，更是家人。
                </h4>
                <h4 className={styles.ProductCardPrice}>NT$1000</h4>
              </div>
              <div className={styles.ProductCardHover}>
                <button
                  type="button"
                  className={`${styles.HoverIcon} ${styles.FavoriteBtn}`}
                >
                  <img src="/img/font/heart.png" alt="" />
                </button>
                <button
                  type="button"
                  className={`${styles.HoverIcon} ${styles.CartBtn}`}
                >
                  <img src="/img/font/cart.png" alt="" />
                  <h2>1</h2>
                </button>
                <a href="" className={styles.HoverIcon}>
                  <img src="/img/font/list.png" alt="" />
                </a>
              </div>
            </li>{" "}
            <li className={styles.ProductCard}>
              <div
                className={styles.ProductCardHeart}
                style={{ display: "none" }}
              >
                <img src="/img/font/heart.png" alt="" />
              </div>
              <div className={styles.ProductCardOnsale}>-30%</div>
              <figure className={styles.ProductCardImg}>
                <img
                  src="/img/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_title.webp"
                  alt=""
                />
              </figure>
              <div className={styles.ProductCardInfo}>
                <h4 className={styles.ProductCardName}>
                  我們相信，毛小孩不僅是寵物，更是家人。
                </h4>
                <h4 className={styles.ProductCardPrice}>NT$1000</h4>
              </div>
              <div className={styles.ProductCardHover}>
                <button
                  type="button"
                  className={`${styles.HoverIcon} ${styles.FavoriteBtn}`}
                >
                  <img src="/img/font/heart.png" alt="" />
                </button>
                <button
                  type="button"
                  className={`${styles.HoverIcon} ${styles.CartBtn}`}
                >
                  <img src="/img/font/cart.png" alt="" />
                  <h2>1</h2>
                </button>
                <a href="" className={styles.HoverIcon}>
                  <img src="/img/font/list.png" alt="" />
                </a>
              </div>
            </li>{" "}
            <li className={styles.ProductCard}>
              <div
                className={styles.ProductCardHeart}
                style={{ display: "none" }}
              >
                <img src="/img/font/heart.png" alt="" />
              </div>
              <div className={styles.ProductCardOnsale}>-30%</div>
              <figure className={styles.ProductCardImg}>
                <img
                  src="/img/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_title.webp"
                  alt=""
                />
              </figure>
              <div className={styles.ProductCardInfo}>
                <h4 className={styles.ProductCardName}>
                  我們相信，毛小孩不僅是寵物，更是家人。
                </h4>
                <h4 className={styles.ProductCardPrice}>NT$1000</h4>
              </div>
              <div className={styles.ProductCardHover}>
                <button
                  type="button"
                  className={`${styles.HoverIcon} ${styles.FavoriteBtn}`}
                >
                  <img src="/img/font/heart.png" alt="" />
                </button>
                <button
                  type="button"
                  className={`${styles.HoverIcon} ${styles.CartBtn}`}
                >
                  <img src="/img/font/cart.png" alt="" />
                  <h2>1</h2>
                </button>
                <a href="" className={styles.HoverIcon}>
                  <img src="/img/font/list.png" alt="" />
                </a>
              </div>
            </li>{" "}
            <li className={styles.ProductCard}>
              <div
                className={styles.ProductCardHeart}
                style={{ display: "none" }}
              >
                <img src="/img/font/heart.png" alt="" />
              </div>
              <div className={styles.ProductCardOnsale}>-30%</div>
              <figure className={styles.ProductCardImg}>
                <img
                  src="/img/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_title.webp"
                  alt=""
                />
              </figure>
              <div className={styles.ProductCardInfo}>
                <h4 className={styles.ProductCardName}>
                  我們相信，毛小孩不僅是寵物，更是家人。
                </h4>
                <h4 className={styles.ProductCardPrice}>NT$1000</h4>
              </div>
              <div className={styles.ProductCardHover}>
                <button
                  type="button"
                  className={`${styles.HoverIcon} ${styles.FavoriteBtn}`}
                >
                  <img src="/img/font/heart.png" alt="" />
                </button>
                <button
                  type="button"
                  className={`${styles.HoverIcon} ${styles.CartBtn}`}
                >
                  <img src="/img/font/cart.png" alt="" />
                  <h2>1</h2>
                </button>
                <a href="" className={styles.HoverIcon}>
                  <img src="/img/font/list.png" alt="" />
                </a>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
