/* eslint-disable @next/next/no-img-element */
"use client";

/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { auth, provider } from "@/app/components/utils/firebase"; // 確保路徑正確
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function ComponentsSocialLogin() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  // 監聽使用者登入狀態
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  // Google 登入
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google 登入成功", user);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      await sendUserDataToBackend(user);
      router.push("/pages"); // 登入成功後導向 pages
    } catch (error) {
      setError(`登入失敗：${error.message}`);
      console.log(error);
    }
  };

  // 傳送 Google 使用者資訊到後端
  const sendUserDataToBackend = async (user) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/google/google-login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            google_id: user.uid,
            email: user.email,
            name: user.displayName,
            avatar_url: user.photoURL,
          }),
        }
      );

      const data = await response.json();
      console.log("伺服器回應：", data);
    } catch (error) {
      console.error("傳送資料到後端失敗:", error);
    }
  };

  // 登出功能
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("user");
      console.log("已登出");
      router.push("/login"); // 登出後導向登入頁
    } catch (error) {
      console.error("登出失敗", error);
    }
  };

  return (
    <div className="lumi-social-login">
      {user ? (
        <div>
          <p>歡迎, {user.displayName}</p>
          <img src={user.photoURL} alt="User Avatar" width="50" />
          <button onClick={handleLogout}>登出</button>
        </div>
      ) : (
        <>
          {/* Google 登入按鈕 */}
          <button onClick={googleLogin} className="lumi-social-button">
            <img
              src="/images/Google.png"
              alt="google"
              className="lumi-google-icon"
            />
          </button>

          {/* LINE 登入按鈕（目前只是連結，還未實作登入邏輯） */}
          <Link href="/line/google-login" className="lumi-social-button">
            <img
              src="/images/line.webp"
              alt="line"
              className="lumi-line-icon"
            />
          </Link>
        </>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}
