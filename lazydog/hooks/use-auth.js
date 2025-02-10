'use client'

import { useContext, createContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthGet } from '@/services/rest-client/use-user'
// 登入頁路由與隱私頁面路由，未登入時會檢查後跳轉至登入頁路由
import { loginRoute, protectedRoutes } from '@/config'
import jwt from "jsonwebtoken";

const appKey = "loginWithToken";

// 建立Context
const AuthContext = createContext(null)
const secretKey = process.env.JWT_SECRET_KET;

// 提供在全域綁定的context狀態
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // 控制didMount
  const [didAuthMount, setDidAuthMount] = useState(false)

  // 從useAuthGet()取得user, favorites
  const { user:fetchedUser, favorites, isLoading } = useAuthGet()

  useEffect(() => {
    // 當 `fetchedUser` 變更時，更新 `user` 狀態
    if (fetchedUser) {
      setUser(fetchedUser);
    }
  }, [fetchedUser]);

  // isAuth是用來判斷是否已登入
  const isAuth = !!user?.id

  // #region 隱私保護路由處理
  const router = useRouter()
  const pathname = usePathname()

  const logout = async () => {
    let API = "http://localhost:3005/api/logout";
    let token = localStorage.getItem(appKey);
    try{
      if(!token) throw new Error("身分認證訊息不存在, 請重新登入");
      const res = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const result = await res.json();
      if(result.status != "success") throw new Error(result.message);
      token = result.data.token;
      localStorage.setItem(appKey, token);
      setUser(null);
    }catch(err){
      console.log(err);
      alert(err.message)
    }
  };

  // 控制didMount
  useEffect(() => {
    setDidAuthMount(true)
  }, [])

  // didMount(初次渲染)後，檢查是否有登入
  // 如果會員未登入，有比對到是隱私路由，就跳轉到登入頁面
  useEffect(() => {
    if (!isAuth && didAuthMount) {
      if (protectedRoutes.includes(pathname)) {
        router.push(loginRoute)
      }
    }
    // eslint-disable-next-line
  }, [pathname])
  // #endregion

  return (
    <AuthContext.Provider
      value={{
        isLoading, // 載入動畫指示用(會撥放1秒)
        didAuthMount,
        isAuth,
        user, // 個人資料在user.profile
        favorites,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)