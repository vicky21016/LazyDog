"use client";

import React, { useState, useEffect, useRef, use } from "react";
import styles from "./list.module.css";
import Aside from "../_components/aside/aside";
import Link from "next/link";
import Card from "../_components/card/card";
import useSWR from "swr";
import { usePathname, useSearchParams } from "next/navigation";

export default function ListPage(props) {
  const [sortName, setSortName] = useState("依商品名稱排序");
  const [categoryBtn, setCategoryBtn] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [newUrl, setNewUrl] = useState("http://localhost:5000/api/products");
  const changeUrl = (newUrl) => {
    setNewUrl(newUrl);
  };
  const url = newUrl;
  useEffect(() => {
    changeUrl(
      `http://localhost:5000/api/products?&min=${minPrice}&max=${maxPrice}${
        sortName == "依商品名稱排序"
          ? "&sort=name"
          : sortName == "依商品價格排序"
          ? "&sort=price"
          : sortName == "依上架時間排序"
          ? "&sort=update"
          : ``
      }`
    );
  }, [minPrice, maxPrice]);
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

  const [pageNow, setPageNow] = useState(1);
  let pages = "";
  if (products) pages = Math.ceil(products.length / 24);
  const product = products?.slice((pageNow - 1) * 24, pageNow * 24);
  // console.log(categoryBtn);

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
            <Link href="/">首頁</Link>
            <img src="/product/font/right.png" alt="" />
            <Link className={styles.BreadcrumbsActive} href="/product/list">
              商品目錄
            </Link>
          </div>
          <div className={styles.Title}>
            <h5>商品目錄</h5>
            <div className={styles.TitleFilter}>
              <img src="/product/font/filter.png" alt="" />
              <div className={styles["dropdown"]}>
                <li>
                  <h6 className={styles["dropbtn"]}>{sortName}</h6>
                </li>
                <div className={styles["dropdown-content"]}>
                  <h6
                    className={`${styles["dropdown-link"]} ${styles["dropdown-link-top"]}`}
                    onClick={() => {
                      changeUrl(
                        `http://localhost:5000/api/products?&min=${minPrice}&max=${maxPrice}&sort=name`
                      );
                      setSortName("依商品名稱排序");
                    }}
                  >
                    依商品名稱排序
                  </h6>
                  <h6
                    className={styles["dropdown-link"]}
                    onClick={() => {
                      changeUrl(
                        `http://localhost:5000/api/products?&min=${minPrice}&max=${maxPrice}&sort=price`
                      );
                      setSortName("依商品價格排序");
                    }}
                  >
                    依商品價格排序
                  </h6>
                  <h6
                    className={`${styles["dropdown-link"]} ${styles["dropdown-link-bottom"]}`}
                    onClick={() => {
                      changeUrl(
                        `http://localhost:5000/api/products?&min=${minPrice}&max=${maxPrice}&sort=update`
                      );
                      setSortName("依上架時間排序");
                    }}
                  >
                    依上架時間排序
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.PdArea}>
          <Aside
            changeUrl={changeUrl}
            setPageNow={setPageNow}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            setMinPrice={setMinPrice}
            categoryBtn={categoryBtn}
            setCategoryBtn={setCategoryBtn}
            sortName={sortName}
          />
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
                    onClick={() =>
                      setPageNow(pageNow - 1 == 0 ? 1 : pageNow - 1)
                    }
                    href={`/product/list?page=${
                      pageNow - 1 == 0 ? 1 : pageNow - 1
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
                            onClick={() => setPageNow(i + 1)}
                            className={`${styles.PageLink} page-link `}
                            href={`/product/list?page=${i + 1}`}
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
                    onClick={() => {
                      setPageNow(pageNow + 1 > pages ? pageNow : pageNow + 1);
                    }}
                    href={`/product/list?page=${
                      pageNow + 1 > pages ? pageNow : pageNow + 1
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
