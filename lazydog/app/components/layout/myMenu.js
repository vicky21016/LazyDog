"use client";

import React from "react";
import { List } from "semantic-ui-react";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faTicket,
  faHeart,
  faPen,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

export default function MyMenu() {
  const pathname = usePathname();
  const { user, logout } = useAuth();


  const menuItems = [
    { name: "會員資料", path: "/pages", icon: faUser },
    { name: "訂單紀錄", path: "/my/orders", icon: faCartShopping },
    { name: "我的優惠", path: "/my/coupons", icon: faTicket },
    { name: "我的收藏", path: "/my/favorite", icon: faHeart },
    { name: "我的文章", path: "/my/posts", icon: faPen },
    { name: "修改密碼", path: "/pages/forgot-password", icon: faCirclePlus },
  ];

  return (
    <div className="lumi-menu-container">
      <h5 className="lumi-welcome">歡迎，{user?.name || "會員"}！</h5>
      <List animated selection>
        {menuItems.map((menuItem) => (
          <List.Item
            key={menuItem.path}
            active={menuItem.path === pathname}
            className="lumi-item"
          >
            <Link className="lumi-menu-link" href={menuItem.path}>
              <span>
                <FontAwesomeIcon icon={menuItem.icon} />
              </span>{" "}
              {menuItem.name}
            </Link>
          </List.Item>
        ))}

        <List.Item className="lumi-item" onClick={logout}>
          登出
        </List.Item>
      </List>
    </div>
  );
}
