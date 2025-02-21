"use client";

import React, { useState, useEffect } from "react";
import styles from "./aside.module.css";

export default function FilterGroup({
  category = {},
  name = {},
  keyword = {},
  setKeyword = () => {},
}) {
  const [showMore, setShowMore] = useState(false);
  const categorys = category;
  const categoryName = {};
  if (categorys) {
    categorys.forEach((v) => {
      if (!categoryName[v.class]) {
        categoryName[v.class] = [];
      }
      categoryName[v.class].push(v.name);
    });
  }

  return (
    <>
      <div className={styles.FilterGroup}>
        <h5 className={styles.FilterTitle}>{name}</h5>
        {categoryName[name].map((v, i) => {
          if (i < 3) {
            return (
              <div
                key={`Filter${i}`}
                className={`form-check ${styles.FormCheck}`}
              >
                <input
                  className={`form-check-input ${styles.FormCheckInput}`}
                  type="checkbox"
                  id={v}
                  onChange={() => {
                    const newKeyword = { ...keyword };
                    if (!newKeyword[name].includes(v)) {
                      newKeyword[name].push(v);
                    } else {
                      newKeyword[name] = newKeyword[name].filter(
                        (e) => e !== v
                      );
                    }
                    setKeyword(newKeyword);
                  }}
                />
                <label className="form-check-label" htmlFor={v}>
                  {v}
                </label>
              </div>
            );
          }
        })}
        {showMore && (
          <>
            {categoryName[name].map((v, i) => {
              if (i >= 3) {
                return (
                  <div
                    key={`Filter${i}`}
                    className={`form-check ${styles.FormCheck}`}
                  >
                    <input
                      className={`form-check-input ${styles.FormCheckInput}`}
                      type="checkbox"
                      id={v}
                    />
                    <label className="form-check-label" htmlFor={v}>
                      {v}
                    </label>
                  </div>
                );
              }
            })}
          </>
        )}
        {categoryName[name].length > 3 && (
          <span
            className={styles.ShowMore}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "收起 ▲" : "顯示全部 ▼"}
          </span>
        )}
      </div>
    </>
  );
}
