"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/layout/header"; 
import SocialLogin from "../components/auth/SocialLogin";
import InputFiled from "../components/forms/InputField";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
export default function Register() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
    const { user, register} = useAuth();
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
try {
      await register(email, password, confirmPassword);
      router.push("/login"); 
    } catch (error) {
      alert("註冊失敗！");
      console.error(error);
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
