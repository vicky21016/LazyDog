"use client";

import React, { useState, useEffect } from "react";
import styles from "./list.module.css";

export default function ListPage(props) {
  return (
    <>
      <div className={`${styles.Container} container`}>
        <section className={styles.DmArea}>
          <a href="">
            <figure>
              <img src="/product/DM/DM_7.png" alt="" />
            </figure>
          </a>
        </section>
        <section className={styles.BreadcrumbsTitle}>
          <div className={styles.Breadcrumbs}>
            <a href="">目錄</a>
            <img src="/product/font/right.png" alt="" />
            <a href="">罐頭</a>
            <img src="/product/font/right.png" alt="" />
            <h4 className={styles.BreadcrumbsActive}>主食/餐包</h4>
          </div>
          <div className={styles.Title}>
            <h2>主食/餐包</h2>
            <div className={styles.TitleFilter}>
              <img src="/product/font/filter.png" alt="" />
              <h4>依熱門排序</h4>
            </div>
          </div>
        </section>
        <section className={styles.PdArea}>
          <aside className={styles.PdFilter}>
            <table className={styles.PdFilterTable}>
              <tbody>
                <tr>
                  <td className={styles.SearchTable}>
                    <img src="/product/font/search.png" alt="" />
                    <input type="text" placeholder="搜尋商品" />
                  </td>
                </tr>
                <tr>
                  <td className={styles.MenuTable}>
                    <h3>本月主打</h3>
                    <img src="/product/font/down.png" alt="" />
                  </td>
                </tr>
                <tr>
                  <td className={styles.MenuTable}>
                    <h3>口味</h3>
                    <button>
                      <img src="/product/font/down.png" alt="" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className={styles.CheckboxTable}>
                    <input id="chicken" type="checkbox" />
                    <label htmlFor="chicken">雞</label>
                  </td>
                </tr>
                <tr>
                  <td className={styles.CheckboxTable}>
                    <input id="duck" type="checkbox" />
                    <label htmlFor="duck">鴨</label>
                  </td>
                </tr>
                <tr>
                  <td className={styles.CheckboxTable}>
                    <input id="fish" type="checkbox" />
                    <label htmlFor="fish">魚</label>
                  </td>
                </tr>
                <tr>
                  <td className={styles.CheckboxTable}>
                    <input id="beef" type="checkbox" />
                    <label htmlFor="beef">牛</label>
                  </td>
                </tr>
                <tr>
                  <td className={styles.MenuTable}>
                    <h3>特殊配方</h3>
                    <button>
                      <img src="/product/font/down.png" alt="" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className={styles.MenuTable}>
                    <h3>品牌</h3>
                    <button>
                      <img src="/product/font/down.png" alt="" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className={styles.PriceFilterTable}>
                    <h3>價格篩選</h3>
                    <div className={styles.FilterGroup}>
                      <div className={styles.PriceFilter}>
                        <label htmlFor="filterMin">$</label>
                        <input
                          id="filterMin"
                          type="number"
                          placeholder="最少"
                          min={0}
                        />
                        <label htmlFor="filterMin">元</label>
                      </div>
                      <div className={styles.PriceFilter}>
                        <label htmlFor="filterMax">$</label>
                        <input
                          id="filterMax"
                          type="number"
                          placeholder="最多"
                        />
                        <label htmlFor="filterMax">元</label>
                      </div>
                    </div>
                    <div className={styles.RangeFilter}>
                      <label className={styles.PriceLabel} htmlFor="rangeMax">
                        <h5>$500</h5>
                      </label>
                      <label className={styles.PriceLabel} htmlFor="rangeMin">
                        <h5>$1500</h5>
                      </label>
                      <input
                        className={styles.rangeMax}
                        id="rangeMax"
                        type="range"
                        min={0}
                        max={10000}
                        defaultValue={6000}
                      />
                      <input
                        className={styles.rangeMin}
                        id="rangeMin"
                        type="range"
                        min={0}
                        max={10000}
                        defaultValue={3000}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <a href="">
              <figure>
                <img src="/product/DM/DM_aside.png" alt="" />
              </figure>
            </a>
          </aside>
          <main className={styles.PdList}>
            <ul className={styles.ProductCardGroup}>
              {/* 用這個商品卡片 */}
              <li className={styles.ProductCard}>
                <div
                  className={styles.ProductCardHeart}
                  style={{ display: "none" }}
                >
                  <img src="/product/font/heart.png" alt="" />
                </div>
                <div className={styles.ProductCardOnsale}>-30%</div>
                <figure className={styles.ProductCardImg}>
                  <img
                    src="/product/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_title.webp"
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
                  <a href="" className={styles.HoverIcon}>
                    <img src="/product/font/heart.png" alt="" />
                  </a>
                  <a href="" className={styles.HoverIcon}>
                    <img src="/product/font/cart.png" alt="" />
                  </a>
                  <a href="" className={styles.HoverIcon}>
                    <img src="/product/font/list.png" alt="" />
                  </a>
                </div>
              </li>
              {/* 用這個商品卡片 */}
              <li className={styles.ProductCard}>
                <div
                  className={styles.ProductCardHeart}
                  style={{ display: "none" }}
                >
                  <img src="/product/font/heart.png" alt="" />
                </div>
                <div className={styles.ProductCardOnsale}>-30%</div>
                <figure className={styles.ProductCardImg}>
                  <img
                    src="/product/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_title.webp"
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
                  <a href="" className={styles.HoverIcon}>
                    <img src="/product/font/heart.png" alt="" />
                  </a>
                  <a href="" className={styles.HoverIcon}>
                    <img src="/product/font/cart.png" alt="" />
                  </a>
                  <a href="" className={styles.HoverIcon}>
                    <img src="/product/font/list.png" alt="" />
                  </a>
                </div>
              </li>
              <li className={styles.ProductCard}>
                <div
                  className={styles.ProductCardHeart}
                  style={{ display: "none" }}
                >
                  <img src="/product/font/heart.png" alt="" />
                </div>
                <div className={styles.ProductCardOnsale}>-30%</div>
                <figure className={styles.ProductCardImg}>
                  <img
                    src="/product/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_title.webp"
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
                  <a href="" className={styles.HoverIcon}>
                    <img src="/product/font/heart.png" alt="" />
                  </a>
                  <a href="" className={styles.HoverIcon}>
                    <img src="/product/font/cart.png" alt="" />
                  </a>
                  <a href="" className={styles.HoverIcon}>
                    <img src="/product/font/list.png" alt="" />
                  </a>
                </div>
              </li>
              <li className={styles.ProductCard}>
                <div
                  className={styles.ProductCardHeart}
                  style={{ display: "none" }}
                >
                  <img src="/product/font/heart.png" alt="" />
                </div>
                <div className={styles.ProductCardOnsale}>-30%</div>
                <figure className={styles.ProductCardImg}>
                  <img
                    src="/product/temp/GOMO PET FOOD 狗罐160公克【秘制茄紅牛蛋鮮】(1入)(狗主食罐頭)_title.webp"
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
                  <a href="" className={styles.HoverIcon}>
                    <img src="/product/font/heart.png" alt="" />
                  </a>
                  <a href="" className={styles.HoverIcon}>
                    <img src="/product/font/cart.png" alt="" />
                  </a>
                  <a href="" className={styles.HoverIcon}>
                    <img src="/product/font/list.png" alt="" />
                  </a>
                </div>
              </li>
            </ul>
            <nav>
              <ul className={styles.ProductListPagination}>
                <li className={`${styles.PageItem} page-item`}>
                  <a className={`${styles.PageLink} page-link`} href="">
                    1
                  </a>
                </li>
                <li className={`${styles.PageItem} page-item`}>
                  <a className={`${styles.PageLink} page-link`} href="">
                    2
                  </a>
                </li>
                <li className={`${styles.PageItem} page-item`}>
                  <a className={`${styles.PageLink} page-link`} href="">
                    3
                  </a>
                </li>
              </ul>
            </nav>
          </main>
        </section>
      </div>
    </>
  );
}
