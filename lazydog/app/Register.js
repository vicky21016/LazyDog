"use client";

import React, { useState } from "react";
import Link from "next/link";
// import axios from "axios"; 
import Header from "../layout/header"; 
import SocialLogin from "./SocialLogin";
import InputField from "../forms/InputField"; 

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("密碼和確認密碼不一致");
      return;
    }

    // 發送註冊請求到後端
    const response = await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("註冊成功");
      // 可導向到登入頁面
    } else {
      alert(data.message || "註冊失敗");
    }
  };

  return (
    <>
      <Header />

      <div className="login-container">
        <h2 className="form-title">註冊</h2>

        <form action="#" className="login-form" onSubmit={handleRegister}>
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
          <InputField
            type="password"
            placeholder="再次確認密碼"
            icon=""
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <p className="agree">
            點擊註冊，即表示您已閱讀並同意
            <a href="" className="terms">
              會員條款
            </a>
            與
            <a href="" className="terms">
              客戶隱私權條款
            </a>
          </p>
          <button className="login-button">註冊會員</button>
          <p className="separator">
            <span>或使用社群帳號註冊</span>
          </p>
          <SocialLogin />
        </form>
        <p className="login-text">
          已經有帳號了嗎？{" "}
          <Link href="/" className="login">
            登入
          </Link>
        </p>
      </div>
    </>
  );
}
