import React from "react";
import styles from "../../../styles/modules/fontHotelHome.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="container page">
      <nav aria-label="Page navigation">
        <ul
          className={`pagination justify-content-center ${styles.suPagination}`}
          id="pagination"
        >
          {/* 上一頁按鈕 */}
          <li
            className={`page-item ${currentPage == 1 ? "disabled" : ""} ${
              styles.pageItem
            }`}
          >
            <button
              className={`page-link ${styles.pageLink}`}
              aria-label="Previous"
              disabled={currentPage == 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              <span aria-hidden="true">
                {/* &laquo; */}
                {/* <img src="/course/img/pageArrowleft;png.png" alt="上一頁" /> */}
                {/* <i class={`bi bi-chevron-left ${styles.bi}`}></i> */}
                <FaAngleLeft />
              </span>
            </button>
          </li>

          {/* 頁碼按鈕 */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li
              key={page}
              className={`page-item ${
                currentPage === page ? styles.pageItemActive : ""
              } ${styles.pageItem}`}
            >
              <button
                className={`page-link ${styles.pageLink}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}

          {/* 下一頁按鈕 */}
          <li
            className={`page-item ${
              currentPage == totalPages ? "disabled" : ""
            } ${styles.pageItem}`}
          >
            <button
              className={`page-link ${styles.pageLink}`}
              aria-label="Next"
              disabled={currentPage == totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              <span aria-hidden="true">
                {/* &raquo; */}
                {/* <img src="/course/img/pageArrowright.png" alt="下一頁" /> */}
                {/* <i class={`bi bi-chevron-right ${styles.biBold}`}></i> */}
                <FaAngleRight />
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
