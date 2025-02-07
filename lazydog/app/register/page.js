"use client";

import React, { useState } from "react";
import Link from "next/link";
import { apiURL } from "@/config";
// import axios from "axios";
import Header from "../components/layout/header"; 
import SocialLogin from "../components/auth/SocialLogin";
import InputFiled from "../components/forms/InputField";
import { useRouter } from "next/navigation";

export default function Register() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const router = useRouter();
   const dateForm = () => {
//     const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// if (!isValidEmail(email)) {
//   return res.status(400).json({ status: "fail", message: "電子郵件格式無效" });
// }
    if (password.length < 8) {
      alert("密碼需至少包含 8 個字符");
      return false;
    }
    return true;
  };
   const handleRegister = async (e) => {
     e.preventDefault();
     if (!dateForm()) return;
     if (password !== confirmPassword) {
       alert("密碼和確認密碼不一致");
       return;
     }

     const url = `${apiURL}/auth/register`
     try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmPassword }),
      })

      const resData = await res.json()

     if (resData.status === "success") {
       alert("註冊成功");
       router.push("/pages"); // 成功後跳轉
     } else {
       alert("註冊失敗");
     }
    } catch (error) {
      alert('發生錯誤，請稍後再試！')
      console.error(error)
    }
     
   };
  
  return (
    <>
      <Header />
      <div className="lumi-login-wrapper">
        <div className="lumi-login-container">
          <h4 className="lumi-form-title">註冊</h4>

          <form
            action="#"
            className="lumi-login-form"
            onSubmit={handleRegister}
          >
            <InputFiled
              type="email"
              placeholder="電子信箱"
              icon=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputFiled
              type="password"
              placeholder="密碼"
              icon=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputFiled
              type="password"
              placeholder="再次確認密碼"
              icon=""
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <p className="lumi-agree">
              點擊註冊，即表示您已閱讀並同意
              <Link href="pages/about/member" className="lumi-terms">
                會員條款
              </Link>
              與
              <Link href="pages/about/customer" className="lumi-terms">
                客戶隱私權條款
              </Link>
            </p>
            <button className="lumi-login-button">註冊會員</button>
            <p className="lumi-separator">
              <span>或使用社群帳號註冊</span>
            </p>
            <SocialLogin />
          </form>
          <p className="lumi-login-text">
            已經有帳號了嗎？{" "}
            <Link href="/login" className="lumi-login">
              登入
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
