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
  const [user, setUser] = useState(-1);
  const router = useRouter();
  const pathname = usePathname();
  const protectedRoutes = ["/pages"];
  const loginRoute = "/login";

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
      localStorage.setItem("user", JSON.stringify(newUser));
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
      setUser(googleUser);

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

      if (data.token) {
        localStorage.setItem(appKey, data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            avatar: data.user.avatar_url,
            role: "user",
            token: data.token,
          })
        );
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

  // 儲存
  const save = async (name, email, gender, birthday, phone) => {
    let token = localStorage.getItem(appKey);
    let API = `http://localhost:5000/auth/${user.id}`;
    try {
      const res = await fetch(API, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, gender, birthday, phone }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const result = await res.json();
      console.log("儲存 API 回應:", result);

      if (result.status == "success") {
        alert("儲存成功");

        // 重新取得使用者資料
      } else {
        alert("儲存失敗");
      }
    } catch (err) {
      console.log(err);
      alert(`儲存失敗: ${err.message}`);
    }
  };

  useEffect(() => {
    // console.count("useEffect00 次數");
    // 監聽 Firebase 登入狀態*
    let token = localStorage.getItem(appKey);
    if (!token) {
      setUser(null); // 確保未登入時使用是 null
      return;
    }

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
      } 
    });
    if (token) {
      const fetchData = async () => {
        let API = "http://localhost:5000/auth/status";
        try {
          const res = await fetch(API, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          });
          const result = await res.json();
          if (result.status !== "success") throw new Error(result.message);

          // 更新 token
          token = result.data.token;
          localStorage.setItem(appKey, token);

          // 解析 token 並更新 user
          const newUser = jwt.decode(token);
          setUser(newUser);
        } catch (err) {
          console.log(err);
          localStorage.removeItem(appKey);
        }
      };
      unsubscribe();
      fetchData();
    }

  
  }, []);

  useEffect(() => {
    console.log({ user, pathname });
    if (user == -1) return; // 等待 user 讀取完成
    if (!user && protectedRoutes.includes(pathname)) {
      alert("請先登入");
      router.replace(loginRoute);
    }
  }, [pathname, user]);

  return (
    <AuthContext.Provider
      value={{ user, login, googleLogin, logout, register, save }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
