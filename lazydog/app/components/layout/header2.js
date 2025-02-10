"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firebase } from "../utils/firebase";
import styles from "../../../styles/modules/header2.module.css"; // 引入 CSS 模組

export default function Header(props) {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <header className={styles["lumi-header2"]}>
      <Link href="/" className={styles["lumi-logo2"]}>
        <img src="/images/logo.png" alt="Logo" />
        <div className={styles["lumi-logo1"]}>LAZYDOG</div>
      </Link>
      <nav>
        <ul className={styles["lumi-ul2"]}>
          <li>
            <Link href="#">關於我們</Link>
          </li>
          <li>
            <Link href="#">寵物用品</Link>
          </li>
          <li>
            <Link href="#">寵物旅館</Link>
          </li>
          <div className={styles["dropdown"]}>
            <li>
              <Link href="/teacher" className={styles["dropbtn"]}>
                寵物課程
              </Link>
            </li>
            <div className={styles["dropdown-content"]}>
              <Link href="#" className={styles["dropdown-link"]}>
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
      {!user ? (
        <>
          <div className={styles["lumi-user-actions"]}>
            <div className={styles["dropdown"]}>
              <Link href="/pages" className={styles["lumi-user-icon2"]}>
                <FontAwesomeIcon icon={faUser} />
              </Link>
              <div className={styles["dropdown-content"]}>
                <Link href="/pages" className={styles["dropdown-link"]}>
                  個人資料
                </Link>
                <Link href="#" className={styles["dropdown-link"]}>
                  登出
                </Link>
              </div>
            </div>
            <div className={styles["lumi-cart-icon2"]}>
              <a href="">
                <img src="/images/cart.png" alt="cart" />
              </a>
            </div>
          </div>
        </>
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
      )}
    </header>
  );
}
