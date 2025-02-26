"use client";

import React, { useState, useEffect, useRef, use } from "react";
import styles from "./category.module.css";
import Aside from "../../_components/aside/aside";
import Link from "next/link";
// import { useSearchParams, redirect } from "next/navigation";
import Card from "../../_components/card/card";
// import useSWR from "swr";
import { useAuth } from "@/hooks/use-auth";
import { useCategoryFetch } from "@/hooks/product/use-fetch-category";
import { useFavorite } from "@/hooks/product/use-favorite";

export default function ListPage({}) {
  const { user } = useAuth();
  const {
    category,
    keyword,
    setKeyword,
    changeUrl,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    sortName,
    setSortName,
    pages,
    pageNow,
    setPageNow,
    product,
    mutate,
    isLoading,
    error,
  } = useCategoryFetch();
  const { favorite, setFavorite } = useFavorite();

  // const [sortName, setSortName] = useState("依商品名稱排序");
  // const [keyword, setKeyword] = useState({
  //   主分類: [],
  //   種類: [],
  //   適用年齡: [],
  //   功能: [],
  //   口味: [],
  //   穀類: [],
  //   適用體型: [],
  // });
  // const queryPath = useSearchParams();
  // const category = queryPath.get("category");
  // const [newUrl, setNewUrl] = useState(
  //   `http://localhost:5000/api/products/category?category=${category}${
  //     sortName == "依商品名稱排序"
  //       ? "&sort=name"
  //       : sortName == "依商品價格⬆排序"
  //       ? "&sort=price"
  //       : sortName == "依商品價格⬇排序"
  //       ? "&sort=priceDown"
  //       : sortName == "依上架時間⬆排序"
  //       ? "&sort=update"
  //       : sortName == "依上架時間⬇排序"
  //       ? "&sort=updateDown"
  //       : ""
  //   }`
  // );
  // const [page, setPage] = useState(
  //   `http://localhost:3000/product/list/category?category=${category}${
  //     sortName == "依商品名稱排序"
  //       ? "&sort=name"
  //       : sortName == "依商品價格⬆排序"
  //       ? "&sort=price"
  //       : sortName == "依商品價格⬇排序"
  //       ? "&sort=priceDown"
  //       : sortName == "依上架時間⬆排序"
  //       ? "&sort=update"
  //       : sortName == "依上架時間⬇排序"
  //       ? "&sort=updateDown"
  //       : ""
  //   }&page=1`
  // );

  // const fetcher = async (url) => {
  //   try {
  //     const res = await fetch(url);
  //     if (!res.ok) throw new Error("資料要求失敗");
  //     return res.json();
  //   } catch (err) {
  //     console.error("資料要求失敗:", err);
  //     throw err;
  //   }
  // };
  // const { data, isLoading, error, mutate } = useSWR(newUrl, fetcher);
  // const products = data?.data;
  // const prices = (products || []).map((e) => e.price);

  // const max = Math.max(...prices);
  // const [minPrice, setMinPrice] = useState(0);
  // const [maxPrice, setMaxPrice] = useState(5000);
  // const [pageNow, setPageNow] = useState(1);
  // let pages = "";
  // if (products) pages = Math.ceil(products.length / 24);
  // const product = products?.slice((pageNow - 1) * 24, pageNow * 24);
  // const changeUrl = (newUrl) => {
  //   setNewUrl(newUrl);
  //   if (pageNow !== 1) {
  //     setPageNow(1);
  //   }
  // };
  // useEffect(() => {
  //   if (
  //     keyword?.主分類.length == 0 &&
  //     keyword?.種類.length == 0 &&
  //     keyword?.適用年齡.length == 0 &&
  //     keyword?.功能.length == 0 &&
  //     keyword?.口味.length == 0 &&
  //     keyword?.穀類.length == 0 &&
  //     keyword?.適用體型.length == 0
  //   ) {
  //     changeUrl(
  //       `http://localhost:5000/api/products/category?category=${category}&min=${minPrice}&max=${maxPrice}${
  //         sortName == "依商品名稱排序"
  //           ? "&sort=name"
  //           : sortName == "依商品價格⬆排序"
  //           ? "&sort=price"
  //           : sortName == "依商品價格⬇排序"
  //           ? "&sort=priceDown"
  //           : sortName == "依上架時間⬆排序"
  //           ? "&sort=update"
  //           : sortName == "依上架時間⬇排序"
  //           ? "&sort=updateDown"
  //           : ""
  //       }`
  //     );

  //     return;
  //   } else {
  //     changeUrl(
  //       `http://localhost:5000/api/products/search?category=${category}&main=${keyword?.主分類.join(
  //         ","
  //       )}&type=${keyword?.種類.join(",")}&age=${keyword?.適用年齡.join(
  //         ","
  //       )}&feature=${keyword?.功能.join(",")}&flavor=${keyword?.口味.join(
  //         ","
  //       )}&cereal=${keyword?.穀類.join(",")}&size=${keyword?.適用體型.join(
  //         ","
  //       )}&min=${minPrice}&max=${maxPrice}${
  //         sortName == "依商品名稱排序"
  //           ? "&sort=name"
  //           : sortName == "依商品價格⬆排序"
  //           ? "&sort=price"
  //           : sortName == "依商品價格⬇排序"
  //           ? "&sort=priceDown"
  //           : sortName == "依上架時間⬆排序"
  //           ? "&sort=update"
  //           : sortName == "依上架時間⬇排序"
  //           ? "&sort=updateDown"
  //           : ""
  //       }`
  //     );
  //   }
  // }, [keyword, minPrice, maxPrice]);

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
            <Link href="/product/list">商品目錄</Link>
            <img src="/product/font/right.png" alt="" />
            <Link
              className={styles.BreadcrumbsActive}
              href={`/product/list/category?category=${category}`}
            >
              {category}
            </Link>
          </div>
          <div className={styles.Title}>
            <h5>{category}</h5>
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
                        `http://localhost:5000/api/products/category?category=${category}&min=${minPrice}&max=${maxPrice}&sort=name`
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
                        `http://localhost:5000/api/products/category?category=${category}&min=${minPrice}&max=${maxPrice}&sort=price`
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
                        `http://localhost:5000/api/products/category?category=${category}&min=${minPrice}&max=${maxPrice}&sort=priceDown`
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
                        `http://localhost:5000/api/products/category?category=${category}&min=${minPrice}&max=${maxPrice}&sort=update`
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
                        `http://localhost:5000/api/products/category?category=${category}&min=${minPrice}&max=${maxPrice}&sort=updateDown`
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
            keyword={keyword}
            setKeyword={setKeyword}
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
                    href={`/product/list/category?category=${category}&page=${
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
                          href={`/product/list/category?category=${category}&page=${
                            i + 1
                          }`}
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
                    href={`/product/list/category?category=${category}&page=${
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
