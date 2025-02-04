"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firebase } from "../utils/firebase";

export default function Header(props) {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  return (
    <header>
      <Link href="/" className="logo text-decoration-none">
        <img src="/images/logo.png" alt="Logo" className="logo1" />
        LAZYDOG
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="#">關於我們</Link>
          </li>
          <li>
            <Link href="#">寵物用品</Link>
          </li>
          <li>
            <Link href="#">寵物旅館</Link>
          </li>
          <li>
            <Link href="/teacher">寵物課程</Link>
          </li>
          <li>
            <Link href="#">毛孩文章</Link>
          </li>
        </ul>
      </nav>
      {!user ? (
        <>
          <div className="user-actions">
            <Link href="/pages" className="user-icon text-decoration-none">
              <FontAwesomeIcon icon={faUser} />
            </Link>
            <div href="#" className="cart-icon">
              <a href="" className="">
                <img src="/images/cart.png" alt="" className="" />
              </a>
            </div>
          </div>
        </>
      ) : (
        <div>
          <Link href="/register" className="signin text-decoration-none">
            註冊
          </Link>
          <span className="connect">/</span>
          <Link href="/login" className="signin text-decoration-none">
            登入
          </Link>
        </div>
      )}
    </header>
  );
}
