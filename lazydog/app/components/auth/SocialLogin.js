/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, provider } from "@/app/components/utils/firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

export default function SocialLogin() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  // 監聽 Firebase 登入狀態
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log("Firebase 用戶狀態變更:", currentUser);
        setUser(currentUser);
        
        // ✅ 確保 `localStorage` 沒有重複存入
        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName,
            avatar: currentUser.photoURL,
          })
        );

        await toBackend(currentUser);
      } else {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    });

    return unsubscribe;
  }, []);

  // Google 登入
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;
      console.log("Google 登入成功", googleUser);
      setUser(googleUser);

      // ✅ 確保 `localStorage` 存入 Google 使用者資料
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: googleUser.uid,
          email: googleUser.email,
          name: googleUser.displayName,
          avatar: googleUser.photoURL,
        })
      );

      // ✅ 傳送 Google 使用者資料到後端
      await toBackend(googleUser);

      router.push("/pages"); // ✅ 轉跳會員中心
    } catch (error) {
      setError("Google 登入失敗，請稍後再試");
      console.error("Google 登入錯誤:", error);
      setTimeout(() => setError(""), 5000);
    }
  };

  // 傳送 Google 使用者資訊到後端
  const toBackend = async (googleUser) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/google/google-login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            google_id: googleUser.uid,
            email: googleUser.email,
            name: googleUser.displayName,
            avatar_url: googleUser.photoURL,
          }),
        }
      );

      const data = await response.json();
      console.log("伺服器回應：", data);

      // ✅ 後端回傳 Token，存入 localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      } else {
        console.warn("後端未回傳 Token");
      }
    } catch (error) {
      console.error("傳送資料到後端失敗:", error);
    }
  };

  // **登出**
  const handleLogout = async () => {
    try {
      console.log("正在登出...");
      await signOut(auth);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      console.log("已登出");

      // **確保清除後才跳轉**
      setTimeout(() => {
        router.push("/login");
      }, 500);
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
          {/* LINE 登入按鈕 */}
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
