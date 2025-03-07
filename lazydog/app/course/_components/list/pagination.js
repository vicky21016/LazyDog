"use client";

import { useState } from "react";
import styles from "../courseList.module.css";

export default function Pagination({ totalPages, currPage, setCurrPage }) {
  // 計算顯示的頁碼範圍
  let startPage = Math.max(1, currPage - 1);
  let endPage = Math.min(totalPages, startPage + 2);

  // 確保顯示 3 頁（如果總頁數足夠）
  if (endPage - startPage < 2 && startPage > 1) {
    startPage = Math.max(1, endPage - 2);
  }

  return (
    <nav className={styles.navigation} aria-label="Page navigation">
      <ul className={`pagination justify-content-center ${styles.pagination}`}>
        {/* 上一頁按鈕 */}
        <li className={`page-item ${styles.pageItem} ${currPage === 1 ? "disabled" : ""}`}>
          <button
            className={`page-link ${styles.pageLink}`}
            onClick={() => setCurrPage(currPage - 1)}
            disabled={currPage === 1}
            aria-label="Previous"
          >
            <span aria-hidden="true">
              <img src="/course/img/pageArrowleft.png" alt="上一頁" />
            </span>
          </button>
        </li>

        {/* 顯示頁碼 */}
        {[...Array(endPage - startPage + 1)].map((_, index) => {
          const pageNumber = startPage + index;
          return (
            <li
              key={pageNumber}
              className={`page-item ${styles.pageItem} ${currPage === pageNumber ? "active" : ""}`}
            >
              <button
                className={`page-link ${styles.pageLink}`}
                onClick={() => setCurrPage(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        {/* 下一頁按鈕 */}
        <li className={`page-item ${styles.pageItem} ${currPage === totalPages ? "disabled" : ""}`}>
          <button
            className={`page-link ${styles.pageLink}`}
            onClick={() => setCurrPage(currPage + 1)}
            disabled={currPage === totalPages}
            aria-label="Next"
          >
            <span aria-hidden="true">
              <img src="/course/img/pageArrowright.png" alt="下一頁" />
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
}