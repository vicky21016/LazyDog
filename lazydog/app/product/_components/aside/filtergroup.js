"use client";

import React, { useState, useEffect } from "react";
import styles from "./aside.module.css";

export default function FilterGroup(category = {}) {
  const [showMore, setShowMore] = useState(false);
  const categorys = category?.category;
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
        <h5 className={styles.FilterTitle}>{category?.name}</h5>
        {categoryName[category?.name].map((v, i) => {
          if (i < 3) {
            return (
              <div key={i} className={`form-check ${styles.FormCheck}`}>
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
        {showMore && (
          <>
            {categoryName[category?.name].map((v, i) => {
              if (i >= 3) {
                return (
                  <div key={i} className={`form-check ${styles.FormCheck}`}>
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
        {categoryName[category?.name].length > 3 && (
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
