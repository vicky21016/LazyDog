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
    <header className="lumi-header2">
      <Link href="/" className="lumi-logo2 text-decoration-none">
        <img src="/images/logo.png" alt="Logo" className="lumi-lumi-logo1" />
        LAZYDOG
      </Link>
      <nav>
        <ul className="lumi-ul2">
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
          <div className="lumi-user-actions">
            <Link href="/pages" className="lumi-user-icon2 text-decoration-none">
              <FontAwesomeIcon icon={faUser} />
            </Link>
            <div href="#" className="lumi-cart-icon2">
              <a href="" className="">
                <img src="/images/cart.png" alt="" className="" />
              </a>
            </div>
          </div>
        </>
      ) : (
        <div>
          <Link href="/register" className="lumi-signin2 text-decoration-none">
            註冊
          </Link>
          <span className="lumi-connect2">/</span>
          <Link href="/login" className="lumi-signin2 text-decoration-none">
            登入
          </Link>
        </div>
      )}
    </header>
  );
}
