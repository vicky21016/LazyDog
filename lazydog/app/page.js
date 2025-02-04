"use client";

import React from "react";
import Link from "next/link";
import Header from "./components/layout/header";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="home-content">
        <h1>歡迎來到首頁</h1>
        <br />
        <div className="auth-links">
          <p>
            還沒有帳號？{" "}
            <Link className="register" href="/register">
              註冊
            </Link>
          </p>
          <p>
            已經有帳號了嗎？{" "}
            <Link className="login" href="/login">
              登入
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
