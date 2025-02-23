import React from "react";
import styles from "../../../styles/modules/fontHotelHome.module.css"; 

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="container page">
      <nav aria-label="Page navigation">
        <ul
          className={`pagination justify-content-center ${styles.suPagination}`}
          id="pagination"
        >
          <li
            className={`page-item ${currentPage == 1 ? "disabled" : ""} ${
              styles.pageItem
            }`}
          >
            <a
              className={`page-link ${styles.pageLink}`}
              href="#"
              aria-label="Previous"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i}
              className={`page-item ${currentPage == i + 1 ? "active" : ""} ${
                styles.pageItem
              }`}
            >
              <a
                className={`page-link ${styles.pageLink}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(i + 1);
                }}
              >
                {i + 1}
              </a>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage == totalPages ? "disabled" : ""
            } ${styles.pageItem}`}
          >
            <a
              className={`page-link ${styles.pageLink}`}
              href="#"
              aria-label="Next"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
