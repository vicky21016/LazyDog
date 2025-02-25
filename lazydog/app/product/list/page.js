"use client";

import React, { useState, useEffect, useRef, use } from "react";
import styles from "./list.module.css";
import Aside from "../_components/aside/aside";
import Link from "next/link";
import Card from "../_components/card/card";
import useSWR from "swr";
import { useAuth } from "@/hooks/use-auth";

export default function ListPage(props) {
  const { user } = useAuth();
  const [favorite, setFavorite] = useState([]);
  const [sortName, setSortName] = useState("依商品名稱排序");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [newUrl, setNewUrl] = useState("http://localhost:5000/api/products");
  const [pageNow, setPageNow] = useState(1);
  const changeUrl = (newUrl) => {
    setNewUrl(newUrl);
    if (pageNow !== 1) {
      setPageNow(1);
    }
  };
  const url = newUrl;
  useEffect(() => {
    changeUrl(
      `http://localhost:5000/api/products?&min=${minPrice}&max=${maxPrice}${
        sortName == "依商品名稱排序"
          ? "&sort=name"
          : sortName == "依商品價格⬆排序"
          ? "&sort=price"
          : sortName == "依商品價格⬇排序"
          ? "&sort=priceDown"
          : sortName == "依上架時間⬆排序"
          ? "&sort=update"
          : sortName == "依上架時間⬇排序"
          ? "&sort=updateDown"
          : ""
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
  const products = data?.data;

  let pages = "";
  if (products) pages = Math.ceil(products.length / 24);
  const product = products?.slice((pageNow - 1) * 24, pageNow * 24);

  const favoriteAPI = "http://localhost:5000/api/products/favorite";
  const {
    data: favoriteData,
    isLoading: favoriteLoading,
    error: favoriteError,
    mutate: favoriteMutate,
  } = useSWR(favoriteAPI, fetcher);

  useEffect(() => {
    // console.log(favorite);
    favoriteData?.data.map(async (v, i) => {
      if (user?.id > 0) {
        const formData = new FormData();
        formData.append("userID", user?.id);
        formData.append("productIDlist", favorite.join(","));
        let API = "http://localhost:5000/api/products/favorite";
        let methodType = "POST";
        if (v.user_id == user?.id) methodType = "PATCH";
        try {
          const res = await fetch(API, {
            method: methodType,
            body: formData,
          });
          const result = await res.json();
          if (result.status != "success") throw new Error(result.message);
          // console.log(result);
        } catch (error) {
          console.log(error);
          alert(error.message);
        }
      }
    });
  }, [favorite]);
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
                      setSortName("依商品價格⬆排序");
                    }}
                  >
                    依商品價格⬆排序
                  </h6>
                  <h6
                    className={styles["dropdown-link"]}
                    onClick={() => {
                      changeUrl(
                        `http://localhost:5000/api/products?&min=${minPrice}&max=${maxPrice}&sort=priceDown`
                      );
                      setSortName("依商品價格⬇排序");
                    }}
                  >
                    依商品價格⬇排序
                  </h6>
                  <h6
                    className={`${styles["dropdown-link"]} ${styles["dropdown-link-bottom"]}`}
                    onClick={() => {
                      changeUrl(
                        `http://localhost:5000/api/products?&min=${minPrice}&max=${maxPrice}&sort=update`
                      );
                      setSortName("依上架時間⬆排序");
                    }}
                  >
                    依上架時間⬆排序
                  </h6>
                  <h6
                    className={`${styles["dropdown-link"]} ${styles["dropdown-link-bottom"]}`}
                    onClick={() => {
                      changeUrl(
                        `http://localhost:5000/api/products?&min=${minPrice}&max=${maxPrice}&sort=updateDown`
                      );
                      setSortName("依上架時間⬇排序");
                    }}
                  >
                    依上架時間⬇排序
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
            sortName={sortName}
          />
          <main className={styles.PdList}>
            {[...Array(6)].map((value, index) => {
              return (
                <ul className={styles.ProductCardGroup} key={index}>
                  {product?.map((v, i) => {
                    if (index * 4 <= i && i < (index + 1) * 4)
                      return (
                        <Card
                          key={v.productID}
                          productID={v.productID}
                          favorite={favorite}
                          setFavorite={setFavorite}
                        />
                      );
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
