"use client";

import React, { useState } from "react";
import Link from "next/link";
import { apiURL } from "@/config";
import { useRouter } from "next/navigation";
import Header from "../components/layout/header";
import MyMenu from "../components/layout/myMenu";
import SocialLogin from "../components/auth/SocialLogin";
import InputField from "../components/forms/InputField";
import axios from "axios";
import "firebase/auth";
import firebase from "../components/utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
// import styles from "./form.module.css";

export default function AppPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // 初始化 useRouter
  const handleLogin = async (e) => {
    e.preventDefault();
   
    const url = `${apiURL}/auth/login`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const resData = await res.json();

      if (resData.status === "success") {
        alert("登入成功");
        router.push("/pages"); // 登入成功後跳轉
      } else {
        alert("登入失敗");
      }
    } catch (error) {
      alert("發生錯誤，請稍後再試！");
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      {/* <div className={styles.container}> */}
      <div className="login-container">
        <div className="other-accounts">
          <h4 className="form-title">登入</h4>
          <div className="other-accounts-links">
            <Link href="/register" className="teacher text-decoration-none">
              師資登入
            </Link>
            <Link href="/register" className="hotel text-decoration-none">
              旅館業者登入
            </Link>
          </div>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <InputField
            type="email"
            placeholder="電子信件或手機號碼"
            icon=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="密碼"
            icon=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link href="pages/forgot-password" className="fogot-pass-link">
            忘記密碼？
          </Link>
          <button className="login-button">登入</button>
          <p className="separator">
            <span>或使用社群帳號登入</span>
          </p>
          <SocialLogin />
        </form>
        <p className="signup-text">
          還不是會員？{" "}
          <Link href="/register" className="register">
            註冊
          </Link>
        </p>
      </div>
      {/* </div> */}
    </>
  );
}
