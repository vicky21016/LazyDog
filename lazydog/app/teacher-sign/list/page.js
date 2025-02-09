"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "../css/teacherSignList.module.css";

export default function OpTeacherListPage(props) {
  return (
    <>
      {/* 點擊圖片 Bs Modal (彈出視窗)  */}
      <div className={`modal ${styles.fade}`} id="imageModal" tabIndex={-1} aria-hidden="true">
        <div className={`modal-dialog modal-dialog-centered`}>
          <div className={`modal-content`}>
            <div className={`modal-body text-center`}>
              <img id="modalImage" className={`img-fluid`} src="" alt="放大圖片" />
            </div>
          </div>
        </div>
      </div>

      <div className={`container mt-5 mb-5`}>
        <div className={`row`}>
         {/* 左邊sidebar */}
         <div className={`col-lg-3 col-md-12 col-12`}>
              <div className={`border ${styles.left}`}>
                  <div className={`text-center p-5 ${styles.top}`}>
                    <div className={`position-relative d-inline-block ${styles.camera}`}>
                      <img src="/course/img/25 (1).jpeg" className={`rounded-circle ${styles.avatarImg}`} alt="User Avatar" />
                      {/* 相機按鈕Dropdown) */}
                      <div className={styles.dropdown}>
                        <button className={`btn btn-light  p-0 ${styles.cameraIcon}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <img src="/course/img/camera.png" alt="相機" className={styles.cameraIconImg} />
                        </button>
                        <ul className={`dropdown-menu`}>
                          <li>
                            <button className={`dropdown-item text-danger`} id="deletePhoto">
                              刪除照片
                            </button>
                          </li>
                          <li>
                            <label htmlFor="uploadPhoto" className={`dropdown-item`}>上傳照片</label>
                            <input type="file" id="uploadPhoto" accept="image/*" className={`d-none`} />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <h5 className={`m-3 ${styles.tName}`}>陳大方</h5>
                    <p className={`text-muted ${styles.tGmail}`}>165846hote@gmail.com</p>
                    <button className={`btn btn-outline btn-sm ${styles.outline}`}>已認證</button>
                  </div>
                  <ul className={`list-unstyled text-start m-0`}>
                  <li className={` ${styles.lis}`}>
                      <a href="opTeacherInfo.html" className={`text-decoration-none ${styles.liText}`}>
                      <i className={`bi bi-book-fill fs-6  ${styles.icons}`}></i>我的師資
                      </a>
                    </li>
                    <li className={`${styles.lis}`}>
                      <a href="opCourseList.html" className={`text-decoration-none ${styles.liText}`}>
                      <i className={`bi bi-calendar-week fs-6  ${styles.icons}`}></i>我的課程
                      </a>
                    </li>
                    <li className={`${styles.lis}`}>
                      <a href="opCourseList.html" className={`text-decoration-none ${styles.liText}`}>
                      <i className={`bi bi bi-chat-left-heart fs-6  ${styles.icons}`}></i>課程評論
                      </a>
                    </li>
                    <li className={`${styles.lis}`}>
                      <a href="opCoursePlace.html" className={`text-decoration-none ${styles.liText}`}>
                      <i className={`bi bi-building-fill fs-6  ${styles.icons}`}></i>開課地點
                      </a>
                    </li>
                    <li className={`${styles.lis}`}>
                      <a href="opCoursePlace.html" className={`text-decoration-none ${styles.liText}`}>
                      <i className={`bi bi-person-fill fs-5  ${styles.icons}`}></i>會員資料
                      </a>
                    </li>
                    <li className={`${styles.lis}`}>
                      <a href="opCoursePlace.html" className={`text-decoration-none ${styles.liText}`}>
                      <i className={`bi bi-box-arrow-right fs-5  ${styles.icons}`}></i>登出
                      </a>
                    </li>
                  </ul>
                </div>
            </div>

          {/* 右邊 */}
          <div className={`col-lg-9 col-md-12 col-12`}>            
            <div className={`p-5 pb-3 ${styles.right}`}>
              <div className={styles.top}>
                <h3 className={`mb-4 ${styles.tTitle}`}>我的課程</h3>
                <button type="button" className={`btn btn-primary btn-sm ${styles.addCourseBtn}`}><a className={styles.addCourse} href="./opCourseCreate.html">+ 新增</a>
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
                    <div className={styles.cTd1}><img className={styles.courseImg} src="/course/img/3 (1).jpeg" alt /></div>
                    <div className={styles.cTd2}>一對一寵物美容教學實作</div>
                    <div className={`d-none`}>上課日期</div>
                    <div className={styles.cTd3}>【台北】第一梯 11/02、11/09、11/16、11/23、11/30、12/07</div>
                    <div className={styles.cTd4}>台北</div>
                  </div>
                  <div className={styles.cTbody}>
                    <div className={styles.cTd1}><img className={styles.courseImg} src="/course/img/7 (1).jpeg" alt /></div>
                    <div className={styles.cTd2}>一對一寵物美容教學實作</div>
                    <div className={styles.cTd3}>【台北】第一梯 11/02、11/09、11/16、11/23、11/30、12/07</div>
                    <div className={styles.cTd4}>高雄</div>
                  </div>
                  <div className={styles.cTbody}>
                    <div className={styles.cTd1}><img className={styles.courseImg} src="/course/img/18 (1).jpeg" alt /></div>
                    <div className={styles.cTd2}>一對一寵物美容教學實作</div>
                    <div className={styles.cTd3}>【台北】第一梯 11/02、11/09、11/16、11/23、11/30、12/07</div>
                    <div className={styles.cTd4}>線上預錄</div>
                  </div>
                  <div className={styles.cTbody}>
                    <div className={styles.cTd1}><img className={styles.courseImg} src="/course/img/25 (1).jpeg" alt /></div>
                    <div className={styles.cTd2}>一對一寵物美容教學實作</div>
                    <div className={styles.cTd3}>【台北】第一梯 11/02、11/09、11/16、11/23、11/30、12/07</div>
                    <div className={styles.cTd4}>線上直播</div>
                  </div>
                </div>
              </div>
              <nav aria-label="Page navigation">
                <ul className={`pagination justify-content-center ${styles.pagination}`}>
                  <li className={`page-item ${styles.pageItem}`}>
                    <a className={`page-link ${styles.pageLink}`} href="#" aria-label="Previous">
                      <span aria-hidden="true"><i class="bi bi-chevron-left"></i></span>
                    </a>
                  </li>
                  <li className={`page-item ${styles.pageItem}`}>
                    <a className={`page-link ${styles.pageLink}`} href="#">1</a>
                  </li>
                  <li className={`page-item ${styles.pageItem}`}>
                    <a className={`page-link ${styles.pageLink}`} href="#">2</a>
                  </li>
                  <li className={`page-item ${styles.pageItem} ${styles.next}`}>
                    <a className={`page-link ${styles.pageLink}`} href="#" aria-label="Next">
                      <span aria-hidden="true"><i class="bi bi-chevron-right"></i></span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div> 
          </div>
        </div>
      </div>


    </>
    
  );
}
