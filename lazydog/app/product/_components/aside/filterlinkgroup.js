"use client";

import React, { useState, useEffect } from "react";
import styles from "./aside.module.css";
import Link from "next/link";

export default function FilterLinkGroup(category = {}) {
  const [showMore, setShowMore] = useState(false);
  const categorys = category?.category;
  const categoryClass = [];
  if (categorys) {
    categorys.map((v, i) => {
      if (!categoryClass.includes(v.class)) categoryClass.push(v.class);
    });
  }
  return (
    <>
      <div className={styles.FilterGroup}>
        <Link
          href={`http://localhost:3000/product/list/category?category=${category?.name}`}
          className={styles.FilterLinkTitle}
        >
          {category?.name}
        </Link>
        {categoryClass.map((v, i) => {
          if (i < 3) {
            return (
              <Link
                href={`http://localhost:3000/product/list/category?category=${category?.name}`}
                className={styles.FormLink}
                key={`FilterLink${i}`}
              >
                {v}
              </Link>
            );
          }
        })}
        {showMore && (
          <>
            {categoryClass.map((v, i) => {
              if (i >= 3) {
                return (
                  <Link
                    href={`http://localhost:3000/product/list/category?category=${category?.name}`}
                    className={styles.FormLink}
                    key={`FilterLink${i}`}
                  >
                    {v}
                  </Link>
                );
              }
            })}
          </>
        )}
        {categoryClass.length > 3 && (
          <span
            className={styles.ShowLinkMore}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "收起 ▲" : "顯示全部 ▼"}
          </span>
        )}
      </div>
    </>
  );
}
