"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth, provider } from "@/app/components/utils/firebase"; // 確保路徑正確
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import jwt from "jsonwebtoken";

const appKey = "loginWithToken";

const AuthContext = createContext(null);
AuthContext.displayName = "AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const protectedRoutes = ["/pages"];
  const loginRoute = "/login";

  // 監聽 Firebase 登入狀態*
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName,
            avatar: currentUser.photoURL,
          })
        );
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  // 登入
  const login = async (email, password) => {
    let API = "http://localhost:5000/auth/login";
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const res = await fetch(API, { method: "POST", body: formData });
      const result = await res.json();
      if (result.status !== "success") throw new Error(result.message);

      const token = result.data.token;
      const newUser = jwt.decode(token);

      setUser(newUser);
      localStorage.setItem(appKey, token);
      switch (newUser.role) {
        case "operator":
          router.push("/hotel-coupon/operatorDetail"); // 轉入operator
          break;
        case "teacher":
          router.push("/"); // 轉入 teacher
          break;
        case "user":
          router.push("/pages");
          break;
        default:
          alert("出現錯誤，請通知管理員");
          break;
      }
    } catch (err) {
      console.log(err);
      alert(`登入失敗: ${err.message}`);
    }
  };

  // Google 登入
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;
      console.log("Google 登入成功", googleUser);

      setUser(googleUser);

      // 傳送 Google 使用者資訊到後端
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

      // 後端回傳 token，存 localStorage
      if (data.token) {
        localStorage.setItem(appKey, data.token);
        // 存入 localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            avatar: data.user.avatar_url,
            role: "user",
          })
        );
        // 導向會員中心
        router.push("/pages");
      } else {
        console.warn("後端未回傳 Token");
      }
    } catch (error) {
      console.error("Google 登入錯誤:", error);
    }
  };

  // 登出
  const logout = async () => {
    let API = "http://localhost:5000/auth/logout";
    let token = localStorage.getItem(appKey);

    try {
      // Google 登入的使用者不需要 JWT Token，直接執行 Firebase 登出
      if (!token) {
        console.warn("沒有 JWT Token，執行 Google 登出");
        await signOut(auth);
      } else {
        const res = await fetch(API, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });

        const result = await res.json();
        console.log("登出 API 回應:", result);

        if (result.status !== "success") throw new Error(result.message);
      }

      // 清除 localStorage
      localStorage.removeItem(appKey);
      localStorage.removeItem("user");

      setUser(null);

      window.location.href = "/login";
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  // 註冊
  const register = async (email, password, confirmPassword) => {
    let API = "http://localhost:5000/auth/register";

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    try {
      const res = await fetch(API, { method: "POST", body: formData });
      const result = await res.json();
      if (result.status !== "success") throw new Error(result.message);

      alert("註冊成功");
      router.push("/login");
    } catch (err) {
      console.log(err);
      alert(`註冊失敗: ${err.message}`);
    }
  };

  useEffect(() => {
    let token = localStorage.getItem(appKey);
    if (!token) return;

    const fetchData = async () => {
      let API = "http://localhost:5000/auth/status";
      try {
        const res = await fetch(API, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();
        if (result.status !== "success") throw new Error(result.message);

        localStorage.setItem(appKey, result.data.token);
        setUser(jwt.decode(result.data.token));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!user && protectedRoutes.includes(pathname)) {
      alert("請先登入");
      router.replace(loginRoute);
    }
  }, [pathname, user]);

  return (
    <AuthContext.Provider
      value={{ user, login, googleLogin, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
