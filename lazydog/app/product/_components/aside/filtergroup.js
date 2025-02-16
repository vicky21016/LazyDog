"use client";

import React, { useState, useEffect } from "react";
import styles from "./aside.module.css";

export default function FilterGroup(category = {}) {
  const [showMore, setShowMore] = useState(false);
  const categorys = category?.category;
  const categoryClass = [];
  const categoryName = {};
  if (categorys) {
    categorys.map((v, i) => {
      if (!categoryClass.includes(v.class)) {
        categoryClass.push(v.class);
        categoryName[v.class] = [];
      }
      categoryName[v.class].push(v.name);
    });
  }
  // console.log(categoryClass, categoryName);
  return (
    <>
      <div className={styles.FilterGroup}>
        <h5 className={styles.FilterTitle}>{category?.name}</h5>
        {categoryClass.map((v, i) => {
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
            {categoryClass.map((v, i) => {
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

        <span
          className={styles.ShowMore}
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "收起 ▲" : "顯示全部 ▼"}
        </span>
      </div>
    </>
  );
}
