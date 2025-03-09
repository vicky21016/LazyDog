"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./list.module.css";
import Aside from "../_components/aside/aside";
import Link from "next/link";
import Card from "../_components/card/card";
import { useListFetch } from "@/hooks/product/use-fetch";
import { useFavorite } from "@/hooks/product/use-favorite";

import { Carousel } from "react-bootstrap";
import { MoonLoader } from "react-spinners";
import * as motion from "motion/react-client";

export default function ListPage(props) {
  const {
    width,
    products,
    int,
    productLine,
    emptyMessage,
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
  } = useListFetch();
  const { favorite, setFavorite } = useFavorite();
  const [dropDown, setDropDown] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [pageInput, setPageInput] = useState("選擇分頁");
  const [collapseBtn, setCollapseBtn] = useState(false);
  const collapseRef = useRef(null);

  useEffect(() => {
    const clickOutside = (event) => {
      if (listOpen && !event.target.closest(`.${styles.dropdown}`)) {
        setListOpen(false);
      }
      if (dropDown && !event.target.closest(`.${styles.TitleFilter}`)) {
        setDropDown(false);
      }
      if (collapseBtn && !event.target.closest(`.${styles.collapseAside}`)) {
        collapseRef.current.click();
      }
    };
    document.addEventListener("click", clickOutside);
    return () => document.removeEventListener("click", clickOutside);
  }, [listOpen, dropDown, collapseBtn]);

  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => setIsOn(!isOn);

  const dogRef = useRef(null);
  const containerRef = useRef(null);

  const animations = [
    { class: styles.dogWalk, duration: 1000 },
    { class: styles.dogRun, duration: 400 },
    { class: styles.dogSit, duration: 600 },
    { class: styles.dogWoof, duration: 1000 },
  ];

  const getRandomPosition = () => {
    return Math.floor(Math.random() * (window.innerWidth - 60));
  };

  const getRandomAnimation = () => {
    return animations[Math.floor(Math.random() * animations.length)];
  };

  const moveDog = () => {
    if (!dogRef.current || !containerRef.current) return;

    // 移除所有動畫類別
    dogRef.current.className = styles.dog;

    // 隨機選擇新動畫
    const newAnimation = getRandomAnimation();
    dogRef.current.classList.add(newAnimation.class);

    // 隨機新位置
    const newPosition = getRandomPosition();
    const currentPosition = parseInt(containerRef.current.style.left) || 0;

    // 根據移動方向翻轉圖片
    if (newPosition < currentPosition) {
      dogRef.current.classList.add(styles.flip);
    } else {
      dogRef.current.classList.remove(styles.flip);
    }

    // 計算移動時間
    const distance = Math.abs(newPosition - currentPosition);
    const moveDuration = distance * 5;

    // 設置新位置
    containerRef.current.style.transition = `left ${moveDuration}ms linear`;
    containerRef.current.style.left = `${newPosition}px`;

    // 在動畫完成後繼續下一次移動
    setTimeout(moveDog, Math.max(moveDuration, newAnimation.duration));
  };

  useEffect(() => {
    moveDog();
    // 清理函數
    return () => {};
  }, []);

  if (error) {
    return (
      <div className="container">
        <img style={{ width: "100%" }} src="/product/404.png" />
      </div>
    );
  }
  return (
    <>
      <div className={`${styles.collapseAside} d-lg-none`}>
        <div className={`${styles.collapseAsideContent}`}>
          <div
            className={`${styles.collapseHorizontal} collapse collapse-horizontal`}
            id="collapseWidthExample"
          >
            <Aside
              changeUrl={changeUrl}
              setPageNow={setPageNow}
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              setMinPrice={setMinPrice}
              sortName={sortName}
            />
            <button
              ref={collapseRef}
              className={`${styles.collapseAsideBtn} btn`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseWidthExample"
              aria-expanded="false"
              aria-controls="collapseWidthExample"
              onClick={() => setTimeout(() => setCollapseBtn(false), 50)}
            >
              <img src={`/product/font/left(orange).png`} alt="" />
            </button>
          </div>
          {collapseBtn == false && (
            <button
              className={`${styles.collapseAsideBtn} btn`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseWidthExample"
              aria-expanded="false"
              aria-controls="collapseWidthExample"
              onClick={() => setCollapseBtn(true)}
            >
              <img src={`/product/font/right(orange).png`} alt="" />
            </button>
          )}
        </div>
      </div>
      <div className={`${styles.Container} container`}>
        <section className={styles.DmArea}>
          <Carousel
            interval={3000}
            controls={true}
            indicators={true}
            pause="hover"
          >
            <Carousel.Item className={styles.carouselItem}>
              <img className="d-block w-100" src="/product/DM/DM_1.webp" />
            </Carousel.Item>
            <Carousel.Item className={styles.carouselItem}>
              <img className="d-block w-100" src="/product/DM/DM_2.webp" />
            </Carousel.Item>
            <Carousel.Item className={styles.carouselItem}>
              <img className="d-block w-100" src="/product/DM/DM_3.webp" />
            </Carousel.Item>
            <Carousel.Item className={styles.carouselItem}>
              <img className="d-block w-100" src="/product/DM/DM_4.webp" />
            </Carousel.Item>
            <Carousel.Item className={styles.carouselItem}>
              <img className="d-block w-100" src="/product/DM/DM_5.webp" />
            </Carousel.Item>
            <Carousel.Item className={styles.carouselItem}>
              <img className="d-block w-100" src="/product/DM/DM_6.webp" />
            </Carousel.Item>
          </Carousel>
        </section>
        <section className={styles.BreadcrumbsTitle}>
          <div className={`${styles.Breadcrumbs} d-none d-lg-flex`}>
            <Link href="/">首頁</Link>
            <img src="/product/font/right.png" alt="" />
            <Link className={styles.BreadcrumbsActive} href="/product/list">
              商品目錄
            </Link>
          </div>
          {products && (
            <div className={styles.Title}>
              <div className="d-none d-lg-flex">
                {/* <h5>目前共{products.length}項商品</h5> */}
              </div>
              <div className={`${styles.Breadcrumbs} d-lg-none`}>
                <Link href="/">首頁</Link>
                <img src="/product/font/right.png" alt="" />
                <Link className={styles.BreadcrumbsActive} href="/product/list">
                  商品目錄
                </Link>
              </div>
              <div
                className={styles.TitleFilter}
                onMouseEnter={() => {
                  setDropDown(true);
                }}
                onMouseLeave={() => {
                  setDropDown(false);
                }}
              >
                <img
                  onClick={() => {
                    setDropDown(!dropDown);
                  }}
                  src={`/product/font/${
                    sortName.includes("名稱")
                      ? "filter-a"
                      : sortName.includes("價格")
                      ? "filter-m"
                      : sortName.includes("時間")
                      ? "filter-d"
                      : "filter"
                  }.png`}
                  alt=""
                />
                <div className={styles["dropdown"]}>
                  <li
                    onClick={() => {
                      setDropDown(!dropDown);
                    }}
                  >
                    <h6 className={styles["dropbtn"]}>{sortName}</h6>
                  </li>
                  <div
                    className={`${
                      width <= 1024 && dropDown
                        ? styles["dropdown-contentOn"]
                        : width <= 1024
                        ? styles["dropdown-contentOff"]
                        : styles["dropdown-content"]
                    }`}
                  >
                    <h6
                      className={`${styles["dropdown-link"]} ${styles["dropdown-link-top"]}`}
                      onClick={() => {
                        changeUrl(
                          `http://localhost:5000/api/products?&min=${minPrice}&max=${maxPrice}&sort=name`
                        );
                        setSortName("↓商品名稱");
                        setDropDown(false);
                      }}
                    >
                      ↓商品名稱
                    </h6>
                    <h6
                      className={styles["dropdown-link"]}
                      onClick={() => {
                        changeUrl(
                          `http://localhost:5000/api/products?&min=${minPrice}&max=${maxPrice}&sort=price`
                        );
                        setSortName("↑商品價格");
                        setDropDown(false);
                      }}
                    >
                      ↑商品價格
                    </h6>
                    <h6
                      className={styles["dropdown-link"]}
                      onClick={() => {
                        changeUrl(
                          `http://localhost:5000/api/products?&min=${minPrice}&max=${maxPrice}&sort=priceDown`
                        );
                        setSortName("↓商品價格");
                        setDropDown(false);
                      }}
                    >
                      ↓商品價格
                    </h6>
                    <h6
                      className={`${styles["dropdown-link"]}`}
                      onClick={() => {
                        changeUrl(
                          `http://localhost:5000/api/products?&min=${minPrice}&max=${maxPrice}&sort=update`
                        );
                        setSortName("↑上架時間");
                        setDropDown(false);
                      }}
                    >
                      ↑上架時間
                    </h6>
                    <h6
                      className={`${styles["dropdown-link"]} ${styles["dropdown-link-bottom"]}`}
                      onClick={() => {
                        changeUrl(
                          `http://localhost:5000/api/products?&min=${minPrice}&max=${maxPrice}&sort=updateDown`
                        );
                        setSortName("↓上架時間");
                        setDropDown(false);
                      }}
                    >
                      ↓上架時間
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
        <section className={styles.PdArea}>
          <div className="d-none d-lg-flex">
            <Aside
              changeUrl={changeUrl}
              setPageNow={setPageNow}
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              setMinPrice={setMinPrice}
              sortName={sortName}
            />
          </div>
          {isLoading ? (
            <div
              style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MoonLoader
                color="#f5842b"
                loading
                size={300}
                speedMultiplier={1}
              />
            </div>
          ) : !products ? (
            <h2>{emptyMessage}</h2>
          ) : (
            <main className={styles.PdList}>
              {[...Array(productLine)].map((value, index) => {
                return (
                  <ul className={styles.ProductCardGroup} key={index}>
                    {product?.map((v, i) => {
                      if (index * int <= i && i < (index + 1) * int)
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
                  {products.length > 24 && (
                    <li className={`${styles.PageArrow}`}>
                      <Link
                        onClick={() => {
                          setPageNow(pageNow - 1 == 0 ? 1 : pageNow - 1);
                          pageNow - 1 > 1
                            ? setPageInput(`第 ${pageNow - 1} 頁`)
                            : setPageInput("選擇分頁");
                        }}
                        href={`/product/list?page=${
                          pageNow - 1 == 0 ? 1 : pageNow - 1
                        }`}
                      >
                        <img src="/product/font/left(orange).png" alt="" />
                      </Link>
                    </li>
                  )}
                  <li
                    className={`${styles.PageItem} page-item ${
                      pageNow == 1 ? styles.PageItemActive : ""
                    }`}
                  >
                    <Link
                      onClick={() => {
                        setPageNow(1);
                        setPageInput("選擇分頁");
                      }}
                      className={`${styles.PageLink} page-link `}
                      href={`/product/list?page=${1}`}
                    >
                      1
                    </Link>
                  </li>
                  {pages >= 3 && (
                    <div
                      className={`${styles.dropdown}`}
                      onMouseEnter={() => {
                        setListOpen(true);
                      }}
                      onMouseLeave={() => {
                        setListOpen(false);
                      }}
                    >
                      <button
                        className={`btn dropdown-toggle ${
                          styles.dropdownToggle
                        } ${
                          pageInput !== "選擇分頁" ? styles.PageItemActive : ""
                        }`}
                        type="button"
                        onClick={() =>
                          width > 1024 ? "" : setListOpen(!listOpen)
                        }
                      >
                        {pageInput}
                      </button>
                      <ul
                        className={`${
                          listOpen
                            ? styles.dropdownMenu
                            : styles.dropdownMenuOff
                        } dropdown-menu`}
                      >
                        {[...Array(pages)].map((v, i) => {
                          if (i > 0 && i < pages - 1) {
                            return (
                              <li
                                key={`li${i}`}
                                className={`dropdown-item ${
                                  styles.dropdownItem
                                } ${
                                  pageNow == i + 1 ? styles.PageItemActive : ""
                                }`}
                              >
                                <Link
                                  onClick={() => {
                                    setPageNow(i + 1);
                                    setPageInput(`第 ${i + 1} 頁`);
                                    setListOpen(false);
                                  }}
                                  className={`${styles.PageLink} page-link`}
                                  href={`/product/list?page=${i + 1}`}
                                >
                                  {i + 1}
                                </Link>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </div>
                  )}
                  {products.length > 24 && (
                    <li
                      className={`${styles.PageItem} page-item ${
                        pageNow == pages ? styles.PageItemActive : ""
                      }`}
                    >
                      <Link
                        onClick={() => {
                          setPageNow(pages);
                          setPageInput("選擇分頁");
                        }}
                        className={`${styles.PageLink} page-link `}
                        href={`/product/list?page=${pages}`}
                      >
                        {pages}
                      </Link>
                    </li>
                  )}
                  {products.length > 24 && (
                    <li className={`${styles.PageArrow}`}>
                      <Link
                        onClick={() => {
                          setPageNow(
                            pageNow + 1 > pages ? pageNow : pageNow + 1
                          );
                          pageNow + 1 >= pages
                            ? setPageInput("選擇分頁")
                            : setPageInput(`第 ${pageNow + 1} 頁`);
                        }}
                        href={`/product/list?page=${
                          pageNow + 1 > pages ? pageNow : pageNow + 1
                        }`}
                      >
                        <img src="/product/font/right(orange).png" alt="" />
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            </main>
          )}
        </section>
      </div>
      <div className={styles.dogApp} onClick={toggleSwitch} ref={containerRef}>
        {/* <motion.div
          layout
          style={{}}
          className={`${styles.dogWalk} ${
            isOn ? styles.toLeft : styles.toRight
          }`}
          onAnimationEnd={(e) => {
            const style = window.getComputedStyle(e.target);
            const bgPosition = style.getPropertyValue("background-position");
            console.log(bgPosition);
          }}
        ></motion.div> */}
        <div ref={dogRef} className={styles.dog}></div>
      </div>
    </>
  );
}
