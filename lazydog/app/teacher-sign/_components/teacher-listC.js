"use client";

import React, { useState, useEffect } from "react";
import styles from "../css/teacherSignList.module.css";
import Link from "next/link";
import Pagination from "@/app/course/_components/list/page";

export default function TeacherListC() {
  const [mycourse, setMycourse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(4); // 每頁顯示的課程數量

  useEffect(() => {
    fetch(`http://localhost:5000/teacher/mycourse`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("loginWithToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setMycourse(data.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);
  // console.log(data?);
  // console.log(mycourse);

  // 計算總頁數
  const totalPages = Math.ceil(mycourse.length / coursesPerPage);

  // 根據目前頁面來選擇顯示的課程
  const lastIdx = currentPage * coursesPerPage;
  const firstIdx = lastIdx - coursesPerPage;
  const currentCourses = mycourse.slice(firstIdx, lastIdx);

  // 處理頁碼變更
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <div className={`col-lg-9 col-md-12 col-12`}>
        <div className={`p-5 pb-3 ${styles.right}`}>
          <div className={styles.top}>
            <h3 className={`mb-4 ${styles.tTitle}`}>我的課程</h3>
            <button
              type="button"
              className={`btn btn-primary btn-sm ${styles.addCourseBtn}`}
            >
              <a className={styles.addCourse} href={`/teacher-sign/add`}>
                + 新增
              </a>
            </button>
          </div>
          <div className={`${styles.bottom}`}>
            <div className={styles.cThead}>
              <div className={styles.cTh1} />
              <div className={styles.cTh2}>課程名稱</div>
              <div className={styles.cTh3}>上課日期</div>
              <div className={styles.cTh4}>地點</div>
            </div>
            <div className={`${styles.cTbodys}`}>
              {currentCourses.map((m) => (
                <Link
                  key={m.session_id}
                  className={styles.cTbody}
                  href={`/teacher-sign/update/${m.session_id}`}
                >
                  <div className={styles.cTd1}>
                    <img
                      className={styles.courseImg}
                      src={`/course/img/${m?.img_url}`}
                      alt={m?.course_name}
                    />
                  </div>
                  <div className={styles.cTd2}>{m.course_name}</div>
                  <div className={`d-none`}>上課日期</div>
                  <div className={styles.cTd3}>{m.class_dates}</div>
                  <div className={styles.cTd4}>{m.region}</div>
                </Link>
              ))}
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          {/* <nav aria-label="Page navigation">
            <ul
              className={`pagination justify-content-center ${styles.pagination}`}
            >
              <li className={`page-item ${styles.pageItem}`}>
                <a
                  className={`page-link ${styles.pageLink}`}
                  href="#"
                  aria-label="Previous"
                >
                  <span aria-hidden="true">
                    <i className="bi bi-chevron-left"></i>
                  </span>
                </a>
              </li>
              <li className={`page-item ${styles.pageItem}`}>
                <a className={`page-link ${styles.pageLink}`} href="#">
                  1
                </a>
              </li>
              <li className={`page-item ${styles.pageItem}`}>
                <a className={`page-link ${styles.pageLink}`} href="#">
                  2
                </a>
              </li>
              <li className={`page-item ${styles.pageItem} ${styles.next}`}>
                <a
                  className={`page-link ${styles.pageLink}`}
                  href="#"
                  aria-label="Next"
                >
                  <span aria-hidden="true">
                    <i className="bi bi-chevron-right"></i>
                  </span>
                </a>
              </li>
            </ul>
          </nav> */}
        </div>
      </div>
    </>
  );
}
