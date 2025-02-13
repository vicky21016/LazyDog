"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
// import jwtDecode from "jwt-decode";
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

  // 登入
  const login = async (email, password) => {
    let API = "http://localhost:5000/auth/login";

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    try {
      const res = await fetch(API, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      console.log(result);
      if (result.status != "success") throw new Error(result.message);

      const token = result.data.token;
      const newUser = jwt.decode(token);
      // const newUser = jwtDecode(token);
      setUser(newUser);
      localStorage.setItem(appKey, token);
    } catch (err) {
      console.log(err);
      alert(`登入失敗: ${err.message}`);
    }
  };

 // 登出
  const logout = async () => {
    let API = "http://localhost:5000/auth/logout";
    let token = localStorage.getItem(appKey);
    try {
      if (!token) throw new Error("身分認證訊息不存在， 請重新登入");
      
      const res = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      console.log("登出 API 回應:", result);
      if (result.status != "success") throw new Error(result.message);
      // token = result.data.token;
      localStorage.setItem(appKey, token);
      setUser(null);
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
    const res = await fetch(API, {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    console.log(result);

    if (result.status !== "success") throw new Error(result.message);

    alert("註冊成功");
    router.push("/login"); 
  } catch (err) {
    console.log(err);
    alert(`註冊失敗`,err.message);
  }
};

  useEffect(() => {
    if (!user && protectedRoutes.includes(pathname)) {
      alert("請先登入");
      router.replace(loginRoute);
    }
  }, [pathname, user]);

  useEffect(() => {
    let token = localStorage.getItem(appKey);
    if (!token) return;
    const fatchData = async () => {
      let API = "http://localhost:5000/auth/status";
      try {
        const res = await fetch(API, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },[]);
        const result = await res.json();
        if (result.status != "success") throw new Error(result.message);
        token = result.data.token;
        localStorage.setItem(appKey, token);
        console.log(user?.email ?? "No Email");
        setUser(newUser);
      } catch (err) {
        console.log(err);
      }
    };
    fatchData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
