"use client";

import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import Link from "next/link"; // 使用 Next.js 的 Link 元件
import { usePathname, useSearchParams } from "next/navigation";
import Header from "./header"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping, faTicket, faHeart, faPen, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
// import { useAuth } from "@/hooks/use-auth"

export default function MyMenu() {
  const pathname = usePathname();
  // const {logout} = useAuth()
  const [userName, setUserName] = useState(""); // 儲存會員名字的狀態
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlUserName = searchParams.get("userName"); // 取得 URL 中的用戶名
    if (urlUserName) {
      setUserName(urlUserName); // 如果有傳遞用戶名，直接使用
    } else {
      // 從 API 獲取會員資料
      async function userData() {
        try {
          const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: "test@example.com", password: "123456" }), // 這裡需要傳入 email 和 password
          });
          const data = await response.json();
          setUserName(data.name);
        } catch (error) {
          console.log(error);
        }
      }
      userData();
    }
  }, [searchParams]);

  const menuItems = [
    { name: "會員資料", path: "/pages", icon: <FontAwesomeIcon icon={faUser} /> },
  { name: "訂單紀錄", path: "/my/orders", icon: <FontAwesomeIcon icon={faCartShopping} /> },
  { name: "我的優惠", path: "/my/coupons", icon: <FontAwesomeIcon icon={faTicket} /> },
  { name: "我的收藏", path: "/my/favorite", icon: <FontAwesomeIcon icon={faHeart} /> },
  { name: "我的文章", path: "/my/posts", icon: <FontAwesomeIcon icon={faPen} /> },
  { name: "修改密碼", path: "/pages/forgot-password", icon: <FontAwesomeIcon icon={faCirclePlus} /> },
  { name: "登出", path: "/logout/"}
    // { name: "登出", onClick:{logout} },
  ];

  return (
    <>
      <Header />
      <div className="lumi-menu-container">
        <h5 className="lumi-welcome">歡迎，{userName || "會員"}！</h5>
        <List animated selection>
          {menuItems.map((menuItem) => (
            <List.Item
              key={menuItem.path}
              active={menuItem.path === pathname}
              className="lumi-item"
            >
              <Link className="lumi-menu-link" href={menuItem.path}>
                <span>{menuItem.icon}</span>
                {menuItem.name}
              </Link>
            </List.Item>
          ))}
        </List>
      </div>
    </>
  );
}
