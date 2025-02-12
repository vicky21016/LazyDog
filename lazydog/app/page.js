"use client";

import React from "react";
import Link from "next/link";
import Header from "./components/layout/header";
import { useAuth } from "@/hooks/use-auth";

export default function HomePage() {
  const { user } = useAuth();
  return (
    <>
      <Header />
      <div className="lumi-login-wrapper">
        <div className="lumi-home-content">
          <h1>歡迎來到首頁</h1>
          <br />
          <div className="lumi-auth-links">
            <p>
              還沒有帳號？{" "}
              <Link className="lumi-register" href="/register">
                註冊
              </Link>
            </p>
            <p>
              已經有帳號了嗎？{" "}
              <Link className="lumi-login" href="/login">
                登入
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
