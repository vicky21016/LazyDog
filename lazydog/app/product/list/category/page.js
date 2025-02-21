"use client";

import React, { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/router";
import styles from "./category.module.css";
import Aside from "../../_components/aside/aside";
import Link from "next/link";
import { useSearchParams, redirect } from "next/navigation";
import Card from "../../_components/card/card";
import useSWR from "swr";

export default function ListPage(props) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(30000);
  // http://localhost:5000/api/products/search?category=乾糧&main=乾糧&type=主食&age=全年齡&feature=強效潔牙&flavor=牛肉,鴨肉&cereal=無穀&size=全適用
  const [keyword, setKeyword] = useState({
    主分類: [],
    種類: [],
    適用年齡: [],
    功能: [],
    口味: [],
    穀類: [],
    適用體型: [],
  });
  // console.log(keyword);
  const queryPath = useSearchParams();
  const category = queryPath.get("category");
  const [newUrl, setNewUrl] = useState(
    `http://localhost:5000/api/products/category?category=${category}&min=${minPrice}&max=${maxPrice}`
  );
  const [page, setPage] = useState(
    `http://localhost:3000/product/list/category?category=${category}&page=1&min=${minPrice}&max=${maxPrice}`
  );
  const changeUrl = (newUrl) => {
    setNewUrl(newUrl);
  };
  useEffect(() => {
    if (
      keyword?.主分類.length == 0 &&
      keyword?.種類.length == 0 &&
      keyword?.適用年齡.length == 0 &&
      keyword?.功能.length == 0 &&
      keyword?.口味.length == 0 &&
      keyword?.穀類.length == 0 &&
      keyword?.適用體型.length == 0
    ) {
      changeUrl(
        `http://localhost:5000/api/products/category?category=${category}&min=${minPrice}&max=${maxPrice}`
      );
      return;
    }

    changeUrl(
      `http://localhost:5000/api/products/search?category=${category}&main=${keyword?.主分類.join(
        ","
      )}&type=${keyword?.種類.join(",")}&age=${keyword?.適用年齡.join(
        ","
      )}&feature=${keyword?.功能.join(",")}&flavor=${keyword?.口味.join(
        ","
      )}&cereal=${keyword?.穀類.join(",")}&size=${keyword?.適用體型.join(
        ","
      )}&min=${minPrice}&max=${maxPrice}`
    );
    setPageNow(1);
  }, [keyword]);
  useEffect(() => {}, [minPrice, maxPrice]);

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
  const { data, isLoading, error, mutate } = useSWR(newUrl, fetcher);
  const products = data?.data;

  const [pageNow, setPageNow] = useState(1);
  let pages = "";
  if (products) pages = Math.ceil(products.length / 24);
  const product = products?.slice((pageNow - 1) * 24, pageNow * 24);

  console.log(minPrice, maxPrice);
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
            <Link href="http://localhost:3000/product/list">商品目錄</Link>
            <img src="/product/font/right.png" alt="" />
            <Link
              className={styles.BreadcrumbsActive}
              href={`http://localhost:3000/product/list/category?category=${category}`}
            >
              {category}
            </Link>
          </div>
          <div className={styles.Title}>
            <h5>{category}</h5>
            <div className={styles.TitleFilter}>
              <img src="/product/font/filter.png" alt="" />
              <h6>依熱門排序</h6>
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
                    href={`http://localhost:3000/product/list/category?category=${category}&page=${
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
                          href={`http://localhost:3000/product/list/category?category=${category}&page=${
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
                    href={`http://localhost:3000/product/list/category?category=${category}&page=${
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
