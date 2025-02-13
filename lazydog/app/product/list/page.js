"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./list.module.css";
import Aside from "../_components/aside/aside";

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
            <h5 className={styles.BreadcrumbsActive}>主食/餐包</h5>
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
          <Aside />
          <main className={styles.PdList} style={{ display: "none" }}>
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
