"use client";

import { useState } from "react";
import styles from "../courseList.module.css";

export default function Pagination({ totalPages, currPage, setCurrPage }) {
  return (
    <>
      <nav className={styles.navigation} aria-label="Page navigation">
        <ul
          className={`pagination justify-content-center ${styles.pagination}`}
        >
          <li
            className={`page-item ${styles.pageItem} ${
              currPage === 1 ? "disabled" : ""
            }`}
          >
            <button
              className={`page-link ${styles.pageLink}`}
              onClick={() => setCurrPage(currPage - 1)}
              disabled={currPage === 1}
              aria-label="Previous"
            >
              <span aria-hidden="true">
                <img src="/course/img/pageArrowleft;png.png" alt="上一頁" />
              </span>
            </button>
          </li>

          {/* 頁碼（最多顯示兩頁） */}
          {/* {[...Array(Math.min(totalPages, 3))].map((_, index) => {
                const pageNumber = index + 1;
                return (
                    <li key={pageNumber} className={`page-item ${styles.pageItem} ${currPage === pageNumber ? "active" : ""}`}>
                    <button 
                        className={`page-link ${styles.pageLink}`} 
                        onClick={() => setCurrPage(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                    </li>
                );
                })} */}

          {[...Array(2)].map((_, index) => {
            // 根據當前頁數動態設定要顯示的頁碼
            const pageNumber = currPage + index - 1; // 顯示當前頁數前後的頁數

            // 確保頁數在有效範圍內
            if (pageNumber > 0 && pageNumber <= totalPages) {
              return (
                <li
                  key={pageNumber}
                  className={`page-item ${styles.pageItem} ${
                    currPage === pageNumber ? "active" : ""
                  }`}
                >
                  <button
                    className={`page-link ${styles.pageLink}`}
                    onClick={() => setCurrPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                </li>
              );
            }
            return null; // 如果頁數超出範圍，則不渲染
          })}

          {/* <li className={`page-item ${styles.pageItem}`}>
                <a className={`page-link ${styles.pageLink}`} href="#">
                    1
                </a>
                </li>
                <li className={`page-item ${styles.pageItem}`}>
                <a className={`page-link ${styles.pageLink}`} href="#">
                    2
                </a>
                </li> */}
          <li
            className={`page-item ${styles.pageItem} ${
              currPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className={`page-link ${styles.pageLink}`}
              onClick={() => setCurrPage(currPage + 1)}
              disabled={currPage === totalPages}
              href="#"
              aria-label="Next"
            >
              <span aria-hidden="true">
                <img src="/course/img/pageArrowright.png" alt="下一頁" />
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
