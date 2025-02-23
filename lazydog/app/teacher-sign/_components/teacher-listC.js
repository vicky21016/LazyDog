'use client'

import React, { useState, useEffect } from 'react'
import styles from "../css/teacherSignList.module.css"

export default function TeacherListC() {
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
                  <a className={styles.addCourse} href="./opCourseCreate.html">
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
                  <div className={styles.cTbody}>
                    <div className={styles.cTd1}>
                      <img
                        className={styles.courseImg}
                        src="/course/img/3 (1).jpeg"
                          alt=""
                      />
                    </div>
                    <div className={styles.cTd2}>一對一寵物美容教學實作</div>
                    <div className={`d-none`}>上課日期</div>
                    <div className={styles.cTd3}>
                      【台北】第一梯 11/02、11/09、11/16、11/23、11/30、12/07
                    </div>
                    <div className={styles.cTd4}>台北</div>
                  </div>
                  <div className={styles.cTbody}>
                    <div className={styles.cTd1}>
                      <img
                        className={styles.courseImg}
                        src="/course/img/7 (1).jpeg"
                         alt=""
                      />
                    </div>
                    <div className={styles.cTd2}>一對一寵物美容教學實作</div>
                    <div className={styles.cTd3}>
                      【台北】第一梯 11/02、11/09、11/16、11/23、11/30、12/07
                    </div>
                    <div className={styles.cTd4}>高雄</div>
                  </div>
                  <div className={styles.cTbody}>
                    <div className={styles.cTd1}>
                      <img
                        className={styles.courseImg}
                        src="/course/img/18 (1).jpeg"
                          alt=""
                      />
                    </div>
                    <div className={styles.cTd2}>一對一寵物美容教學實作</div>
                    <div className={styles.cTd3}>
                      【台北】第一梯 11/02、11/09、11/16、11/23、11/30、12/07
                    </div>
                    <div className={styles.cTd4}>線上預錄</div>
                  </div>
                  <div className={styles.cTbody}>
                    <div className={styles.cTd1}>
                      <img
                        className={styles.courseImg}
                        src="/course/img/25 (1).jpeg"
                          alt=""
                      />
                    </div>
                    <div className={styles.cTd2}>一對一寵物美容教學實作</div>
                    <div className={styles.cTd3}>
                      【台北】第一梯 11/02、11/09、11/16、11/23、11/30、12/07
                    </div>
                    <div className={styles.cTd4}>線上直播</div>
                  </div>
                </div>
              </div>
              <nav aria-label="Page navigation">
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
              </nav>
            </div>
          </div>
    </>
  )
}
