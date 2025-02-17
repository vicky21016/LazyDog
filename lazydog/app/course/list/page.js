"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "../../../styles/modules/courseList.module.css";
import Header from "@/app/components/layout/header";
import Footer from "@/app/components/layout/footer";
import News from "../_components/news";
import SideBar from "../_components/sideBar";
import CourseCard from "../_components/course-card";
import OtherCourseCard from "./other-course-card";

export default function CourseListPage() {
  return (
    <>
      <Header/>
      <div className={styles.list}>
        <News/>
        <div className={`container ${styles.section1}`}>
          <div className={`row`}>
            <SideBar/>
            <div className={`col-lg-9 ${styles.right}`}>
              <div className={styles.top}>
                <h2 className={styles.sTitle}>所有課程</h2>
                <div className={styles.sbar} />
              </div>
              <div className={styles.medium}>
                <div className={styles.count}>
                  共計 <span className={styles.countNum}>42</span> 堂課
                </div>
                <div className={styles.hot}>
                  <img src="/course/img/sort.png" alt />
                  依熱門程度排序
                </div>
              </div>
              <div className={styles.courseGroup}>
                <CourseCard/>
              </div>
              <nav className={styles.navigation} aria-label="Page navigation">
                <ul className={`pagination justify-content-center ${styles.pagination}`}>
                  <li className={`page-item ${styles.pageItem} `}>
                    <a className={`page-link ${styles.pageLink}`} href="#" aria-label="Previous">
                      <span aria-hidden="true">
                        <img src="/course/img/pageArrowleft;png.png" alt />
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
                  <li className={`page-item ${styles.pageItem}`}>
                    <a className={`page-link ${styles.pageLink}`} href="#" aria-label="Next">
                      <span aria-hidden="true">
                        <img src="/course/img/pageArrowright.png" alt />
                      </span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className={`container ${styles.section2}`}>
          <div className={styles.similarCourse}>
            <h2 className={styles.sTitle}>熱門內容</h2>
            <div className={styles.sBars}>
              <div className={styles.sbar} />
              <div className={styles.btns}>
                <img
                  className={styles.arrowLeft}
                  src="/course/img/arrow-left.png"
                  alt
                />
                <img
                  className={styles.arrowRight}
                  src="/course/img/arrow-right.png"
                  alt
                />
              </div>
            </div>
            <div className={styles.sCards}>
              <OtherCourseCard/>
            </div>
            
          </div>
        </div>
      </div>
      <Footer/>          
    </>
  );
}
