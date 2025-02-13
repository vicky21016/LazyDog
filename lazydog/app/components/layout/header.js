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
  const [user, setUser] = React.useState(null);
  const { logout } = useAuth();
  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <header className={styles["lumi-header"]}>
      <Link href="/" className={styles["lumi-logo"]}>
        <img src="/images/logo.png" alt="Logo" />
        <div className={styles.lumiLogo1}>LAZYDOG</div>
      </Link>
      <nav>
        <ul className={styles["lumi-ul"]}>
          <li>
            <Link href="#">關於我們</Link>
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
      {!user ? (
        <>
          <div className={styles["lumi-user-actions"]}>
            <div className={styles["dropdown"]}>
              <Link href="/pages" className={styles["lumi-user-icon"]}>
                {/* <FontAwesomeIcon icon={faUser} /> */}
                <i className="bi bi-person" />
              </Link>
              <div className={styles["dropdown-content"]}>
                <Link href="/pages" className={styles["dropdown-link"]}>
                  個人資料
                </Link>
                <div onClick={logout} className={styles["dropdown-link"]}>
                  登出
                </div>
              </div>
            </div>
            <div className={styles["lumi-cart-icon"]}>
              <Link href="" className={styles["lumi-cart-icon"]}>
                {/* <img src="/images/cart.png" alt="cart" /> */}
                <i className="bi bi-cart2"></i>
              </Link>
            </div>
          </div>
        </>
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
      )}
    </header>
  );
}
