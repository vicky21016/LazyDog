"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./list.module.css";
import Aside from "../_components/aside/aside";
import Link from "next/link";
import Card from "../_components/card/card";
import useSWR from "swr";
import { usePathname, useSearchParams } from "next/navigation";

export default function ListPage(props) {
  const url = "http://localhost:5000/api/products";
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
  const query = useSearchParams();
  const products = data?.data;
  const productID = "";

  const pageStart = 1;
  let pageNow = Number(query.get("page")) || Number(pageStart);
  let pages = "";
  if (products) pages = Math.ceil(products.length / 24);
  const product = products?.slice((pageNow - 1) * 24, pageNow * 24);

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
            <Link href="http://localhost:3000">首頁</Link>
            <img src="/product/font/right.png" alt="" />
            <Link
              className={styles.BreadcrumbsActive}
              href="http://localhost:3000/product/list"
            >
              商品目錄
            </Link>
          </div>
          <div className={styles.Title}>
            <h5>商品目錄</h5>
            <div className={styles.TitleFilter}>
              <img src="/product/font/filter.png" alt="" />
              <h6>依熱門排序</h6>
            </div>
          </div>
        </section>
        <section className={styles.PdArea}>
          <Aside />
          <main className={styles.PdList}>
            {[...Array(6)].map((value, index) => {
              return (
                <ul className={styles.ProductCardGroup} key={index}>
                  {product?.map((v, i) => {
                    if (index * 4 <= i && i < (index + 1) * 4)
                      return <Card key={v.productID} productID={v.productID} />;
                  })}
                </ul>
              );
            })}
            <nav>
              <ul className={styles.ProductListPagination}>
                <li className={`${styles.PageArrow}`}>
                  <Link
                    href={`http://localhost:3000/product/list?page=${
                      pageNow - 1
                    }`}
                  >
                    <img src="/product/font/left(orange).png" alt="" />
                  </Link>
                </li>
                {[...Array(pages)].map((v, i) => {
                  if (
                    i == 0 ||
                    i == pageNow - 3 ||
                    i == pageNow - 2 ||
                    i == pageNow - 1 ||
                    i == pageNow ||
                    i == pageNow + 1 ||
                    i == pages - 1
                  ) {
                    return (
                      <>
                        <li
                          key={`li${i}`}
                          className={`${styles.PageItem} page-item ${
                            i + 1 == pageNow ? styles.PageItemActive : ""
                          }`}
                        >
                          <Link
                            className={`${styles.PageLink} page-link `}
                            href={`http://localhost:3000/product/list?page=${
                              i + 1
                            }`}
                          >
                            {i + 1}
                          </Link>
                        </li>
                      </>
                    );
                  }
                })}
                <li className={`${styles.PageArrow}`}>
                  <Link
                    href={`http://localhost:3000/product/list?page=${
                      pageNow + 1
                    }`}
                  >
                    <img src="/product/font/right(orange).png" alt="" />
                  </Link>
                </li>
              </ul>
            </nav>
          </main>
        </section>
      </div>
    </>
  );
}
