"use client";

import React, { useState, useEffect } from "react";
import styles from "./aside.module.css";
import { useFetch } from "@/hooks/product/use-fetch";

export default function FilterGroup(props) {
  const [showMore, setShowMore] = useState(false);

  const url = "http://localhost:5000/api/products/category?category=乾糧";
  const { data, loading, error } = useFetch(url);
  console.log(data);
  return (
    <>
      <div className={styles.FilterGroup}>
        <h5 className={styles.FilterTitle}>設施</h5>
        <div className={`form-check ${styles.FormCheck}`}>
          <input
            className={`form-check-input ${styles.FormCheckInput}`}
            type="checkbox"
            id="walk"
          />
          <label className="form-check-label" htmlFor="walk">
            免費散步
          </label>
        </div>
        <div className={`form-check ${styles.FormCheck}`}>
          <input
            className={`form-check-input ${styles.FormCheckInput}`}
            type="checkbox"
            id="pool"
          />
          <label className="form-check-label" htmlFor="pool">
            游泳池
          </label>
        </div>
        <div className={`form-check ${styles.FormCheck}`}>
          <input
            className={`form-check-input ${styles.FormCheckInput}`}
            type="checkbox"
            id="pets"
          />
          <label className="form-check-label" htmlFor="pets">
            戶外運動
          </label>
        </div>
        {showMore && (
          <>
            <div className={`form-check ${styles.FormCheck}`}>
              <input
                className={`form-check-input ${styles.FormCheckInput}`}
                type="checkbox"
                id="wifi"
              />
              <label className="form-check-label" htmlFor="wifi">
                免費 Wi-Fi
              </label>
            </div>
            <div className={`form-check ${styles.FormCheck}`}>
              <input
                className={`form-check-input ${styles.FormCheckInput}`}
                type="checkbox"
                id="spa"
              />
              <label className="form-check-label" htmlFor="spa">
                SPA 按摩
              </label>
            </div>
            <div className={`form-check ${styles.FormCheck}`}>
              <input
                className={`form-check-input ${styles.FormCheckInput}`}
                type="checkbox"
                id="gym"
              />
              <label className="form-check-label" htmlFor="gym">
                健身房
              </label>
            </div>
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
