"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./category.module.css";
import Aside from "../../_components/aside/aside";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Card from "../../_components/card/card";
import useSWR from "swr";

export default function ListPage(props) {
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

  const query = useSearchParams();
  const category = query.get("category");
  const [newUrl, setNewUrl] = useState(
    `http://localhost:5000/api/products/category?category=${category}`
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
        `http://localhost:5000/api/products/category?category=${category}`
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
      )}&cereal=${keyword?.穀類.join(",")}&size=${keyword?.適用體型.join(",")}`
    );
    console.log(newUrl);
  }, [keyword]);
  // const url = `http://localhost:5000/api/products/category?category=${category}`;
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
                    href={`http://localhost:3000/product/list/category?category=${category}&page=${
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
                      <li
                        key={`li${i}`}
                        className={`${styles.PageItem} page-item ${
                          i + 1 == pageNow ? styles.PageItemActive : ""
                        }`}
                      >
                        <Link
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
                    href={`http://localhost:3000/product/list/category?category=${category}&page=${
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
