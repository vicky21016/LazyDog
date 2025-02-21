"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/use-auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firebase } from "../utils/firebase";
import styles from "../../../styles/modules/header2.module.css"; 


export default function Header(props) {
  const [user, setUser] = React.useState(null);
  const { logout } = useAuth();
  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <header className={styles["lumi-header2"]}>
      <Link href="/" className={styles["lumi-logo2"]}>
        <img className={styles.logo} src="/header/img/logo.png" alt="Logo" />
        <div className={styles["lumi-logo1"]}>LAZYDOG</div>
      </Link>
      <nav>
        <ul className={styles["lumi-ul2"]}>
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
              <Link href="/course/list" className={styles["dropdown-link"]}>
                課程
              </Link>
              <Link href="/teacher/list" className={styles["dropdown-link"]}>
                師資
              </Link>
              <Link href="#" className={styles["dropdown-link"]}>
                常見 Q&A
              </Link>
            </div>
          </div>
          <li>
            <Link href="#">毛孩文章</Link>
          </li>
        </ul>
      </nav>
      {/* {!user ? (
        <> */}
      <div className={styles["lumi-user-actions"]}>
        <div className={styles["dropdown"]}>
          <Link href="/pages" className={styles["lumi-user-icon2"]}>
            {/* <FontAwesomeIcon icon={faUser} /> */}
            <i className="bi bi-person"></i>
          </Link>
          <div className={styles["dropdown-content"]}>
            <Link href="/pages" className={styles["dropdown-link"]}>
              個人資料
            </Link>
            <Link href="/favorite" className={styles["dropdown-link"]}>
              我的收藏
            </Link>
            <div onClick={logout} className={styles["dropdown-link"]}>
              登出
            </div>
          </div>
        </div>
        <div className={styles["lumi-cart-icon2"]}>
          <Link href="/cart/CartList" className={styles["lumi-cart-icon2"]}>
            {/* <img src="/images/cart.png" alt="cart" /> */}
            <i className="bi bi-cart2"></i>
          </Link>
        </div>
      </div>
      {/* </>
      ) : (
        <div>
          <Link href="/register" className={styles["lumi-signin2"]}>
            註冊
          </Link>
          <span className={styles["lumi-connect2"]}>/</span>
          <Link href="/login" className={styles["lumi-signin2"]}>
            登入
          </Link>
        </div>
      )} */}
    </header>
  );
}
