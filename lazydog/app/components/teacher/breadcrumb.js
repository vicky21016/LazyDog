"use client";

import React from "react";
import Link from "next/link";
import styles from '../../teacher/list/list.module.css'; // 引入 CSS 模組

const Breadcrumb = ({ paths }) => {
  return (
    <nav
      style={{
        "--bs-breadcrumb-divider":
          "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E)",
      }}
      aria-label="breadcrumb"
      className={styles.breadcrumb} // 使用 CSS 模組
    >
      <ol
        className={`${styles.breadcrumbList} breadcrumb`}
        style={{ fontSize: "0.75rem" }}
      >
        {paths.map((path, index) => (
          <li
            key={index}
            // 最後一層會被加上 active 樣式
            className={`${styles.breadcrumbItem} ${
              index === paths.length - 1 ? "active fw-semibold" : ""
            }`}
            aria-current={index === paths.length - 1 ? "page" : undefined}
          >
            {/* 若 link 存在，會渲染為一個 <Link> */}
            {path.link ? (
              <Link
                className="text-decoration-none lumi-bread"
                href={path.link}
              >
                {path.name}
              </Link>
            ) : (
              path.name
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
