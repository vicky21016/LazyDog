"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/use-auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firebase } from "../utils/firebase";
import styles from "../../../styles/modules/header.module.css";

export default function Header(props) {
  const [usernow, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // 控制選單展開
  const { user, logout } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  return (
    <header className={styles["lumi-header"]}>
      <Link href="/" className={styles["lumi-logo"]}>
        <img src="/images/logo.png" alt="Logo" />
        <div className={styles.lumiLogo1}>LAZYDOG</div>
      </Link>
      <nav>
        <ul className={styles["lumi-ul"]}>
          <div className={styles["dropdown"]}>
            <li>
              <Link href="/home">關於我們</Link>
            </li>
            <div className={styles["dropdown-content"]}>
              <Link
                href="/pages/about/member"
                className={`${styles["dropdown-link"]} ${styles["dropdown-link-top"]}`}
              >
                會員條款條款與細則
              </Link>
              <Link
                href="/pages/about/customer"
                className={`${styles["dropdown-link"]} ${styles["dropdown-link-bottom"]}`}
              >
                客戶隱私權條款
              </Link>
            </div>
          </div>
          <div className={styles["dropdown"]}>
            <li>
              <Link href="/product/list" className={styles["dropbtn"]}>
                寵物用品
              </Link>
            </li>
            <div className={styles["dropdown-content"]}>
              <a
                href={`/product/list/category?category=乾糧`}
                className={`${styles["dropdown-link"]} ${styles["dropdown-link-top"]}`}
              >
                乾糧
              </a>
              <a
                href={`/product/list/category?category=罐頭`}
                className={styles["dropdown-link"]}
              >
                罐頭
              </a>
              <a
                href={`/product/list/category?category=零食`}
                className={styles["dropdown-link"]}
              >
                零食
              </a>
              <a
                href={`/product/list/category?category=保健食品`}
                className={styles["dropdown-link"]}
              >
                保健食品
              </a>
              <a
                href={`/product/list/category?category=美容用品`}
                className={styles["dropdown-link"]}
              >
                美容用品
              </a>
              <a
                href={`/product/list/category?category=清潔用品`}
                className={styles["dropdown-link"]}
              >
                清潔用品
              </a>
              <a
                href={`/product/list/category?category=外出用品`}
                className={styles["dropdown-link"]}
              >
                外出用品
              </a>
              <a
                href={`/product/list/category?category=居家用品`}
                className={styles["dropdown-link"]}
              >
                居家用品
              </a>
              <a
                href={`/product/list/category?category=玩具`}
                className={`${styles["dropdown-link"]} ${styles["dropdown-link-bottom"]}`}
              >
                玩具
              </a>
            </div>
          </div>
          <li>
            <Link href="/hotel-coupon/fonthotelHome">寵物旅館</Link>
          </li>
          <div className={styles["dropdown"]}>
            <li>
              <Link href="/teacher" className={styles["dropbtn"]}>
                寵物課程
              </Link>
            </li>
            <div className={styles["dropdown-content"]}>
              <Link
                href="/course/list"
                className={`${styles["dropdown-link"]} ${styles["dropdown-link-top"]}`}
              >
                課程
              </Link>
              <Link
                href="/teacher/list"
                className={`${styles["dropdown-link"]} ${styles["dropdown-link-bottom"]}`}
              >
                師資
              </Link>
            </div>
          </div>
          <li>
            <Link href="/article/list">毛孩文章</Link>
          </li>
        </ul>
      </nav>
      {/* {!user ? (
        <> */}
      {/* 右上角的會員與購物車 */}
      <div className={styles["lumi-user-actions"]}>
        <div className={styles["dropdown"]}>
          <Link href="/pages" className={styles["lumi-user-icon"]}>
            <i className="bi bi-person" />
          </Link>

          {user ? (
            <div className={styles["dropdown-content"]}>
              <Link
                href="/pages"
                className={`${styles["dropdown-link"]} ${styles["dropdown-link-top"]}`}
              >
                個人資料
              </Link>
              <Link href="/favorite" className={styles["dropdown-link"]}>
                我的收藏
              </Link>
              <div
                onClick={logout}
                className={`${styles["dropdown-link"]} ${styles["dropdown-link-bottom"]}`}
              >
                登出
              </div>
            </div>
          ) : null}
        </div>

        <div className={styles["lumi-cart-icon"]}>
          <Link href="/cart/CartList" className={styles["lumi-cart-icon"]}>
            {/* <img src="/images/cart.png" alt="cart" /> */}
            <i className="bi bi-cart2"></i>
          </Link>
        </div>
      </div>
      {/* 手機板 */}
      <div
        className={`${styles.mobileMenu}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <i
          className={`${styles.menu} ${menuOpen ? "bi bi-x-lg" : "bi bi-list"}`}
        ></i>
        <nav className={styles["mobileMenubar"]}>
          <ul
            className={`${styles.mobileDrop} ${styles.lumiUl} ${
              menuOpen ? styles.show : ""
            }`}
          >
            <li>
              <Link href="/home">關於我們</Link>
            </li>
            <li>
              <Link href="/product/list">寵物用品</Link>
            </li>
            <li>
              <Link href="/hotel-coupon/fonthotelHome">寵物旅館</Link>
            </li>
            <div className={styles["dropdown"]}>
              <li>
                <Link href="/teacher" className={styles["dropbtn"]}>
                  寵物課程
                </Link>
              </li>
              <div className={styles["dropdown-content"]}>
                <Link
                  href="/course/list"
                  className={`${styles["dropdown-link"]} ${styles["dropdown-link-top"]}`}
                >
                  課程
                </Link>
                <Link
                  href="/teacher/list"
                  className={`${styles["dropdown-link"]} ${styles["dropdown-link-bottom"]}`}
                >
                  師資
                </Link>
              </div>
            </div>
            <li>
              <Link href="/article/list">毛孩文章</Link>
            </li>
            <div className={styles["dropdown"]}>
              <li>
                <Link href="/pages">會員中心</Link>
              </li>
              <div className={styles["dropdown-content"]}>
                <Link
                  href="/pages"
                  className={`${styles["dropdown-link"]} ${styles["dropdown-link-top"]}`}
                >
                  個人資料
                </Link>
                <Link href="/favorite" className={styles["dropdown-link"]}>
                  我的收藏
                </Link>
                <div
                  onClick={logout}
                  className={`${styles["dropdown-link"]} ${styles["dropdown-link-bottom"]}`}
                >
                  登出
                </div>
              </div>
            </div>
            <div>
              <Link href="/cart/CartList">
                <i className="bi bi-cart2"></i>購物車
              </Link>
            </div>
          </ul>
        </nav>
      </div>

      {/* </>
      ) : (
        <div>
          <Link href="/register" className={styles["lumi-signin"]}>
            註冊
          </Link>
          <span className={styles["lumi-connect"]}>/</span>
          <Link href="/login" className={styles["lumi-signin"]}>
            登入
          </Link>
        </div>
      )} */}
    </header>
  );
}
