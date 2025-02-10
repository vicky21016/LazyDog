"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "../css/teacherSignInfo.module.css";

export default function OpTeacherInfoPage(props) {
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

      <main>
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
              <form action>
                <div className={`${styles.right} p-5`}>
                  <h3 className={`mb-4 ${styles.tTitle}`}>師資內容</h3>
                  <div className={`mb-4`}>
                    <div className={`row`}>
                      <div className={`col-md-6`}>
                        <label className={`form-label ${styles.labels}`}>姓名<span className={styles.must}>*</span></label>
                        <input type="text" className={`form-control ${styles.controls}`} defaultValue="馬克" placeholder />
                      </div>
                      <div className={`col-md-6`}>
                        <label className={`form-label ${styles.labels}`}>教學類別<span className={styles.must}>*</span></label>
                        <select className={`form-select ${styles.controls}`}>
                          <option selected>請選擇</option>
                          <option>寵物美容</option>
                          <option>寵膳食育</option>
                          <option>寵物訓練</option>
                          <option>寵物照護</option>
                          <option>商業思維與專業培訓</option>
                        </select>
                      </div>
                      <div className={`col-md-12 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>個人介紹<span className={styles.must}>*</span></label>
                        <textarea className={`form-control ${styles.controls} ${styles.scrollOrg}`} style={{resize: 'none'}} id="exampleFormControlTextarea1" rows={6} defaultValue={"「在我們的生命中，有一隻無條件愛著自己的狗是何等的幸福。如果可以，我希望牠一生都快樂又逍遙。」10年前，有點像是命運的洪流，把我推向動物表演訓練，讓我愛上了訓練師這份工作，也時常在思考，怎麼樣才能成為一位更好的訓練師？怎麼樣才能透過教學，讓動物過上更好的生活？離開動物表演後投身導盲犬的訓練，對我影響最深的莫過於導盲犬的幼犬教育，了解到導盲犬的成功養成並非偶然，是透過完整的教育來成就出一隻生理及心理都健康的狗狗。那我們自己的狗狗也能做得到嗎？當然可以！而這訓練成功的關鍵，會建立在我們人與狗的能力水準都共同成長的時候。很榮幸有機會加入犬研室，一起為狗狗與飼主的共同美好生活來做努力。"} />
                      </div>
                      <div className={`col-md-12 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>經歷<span className={styles.must}>*</span></label>
                        <textarea className={`form-control ${styles.controls} ${styles.scrollOrg}`} style={{resize: 'none'}} id="exampleFormControlTextarea1" rows={6} defaultValue={"綠世界生態農場 鸚鵡表演訓練師六福村主題遊樂園 鸚鵡表演訓練師臺灣導盲犬協會 儲備導盲犬訓練師/寄養家庭輔導員"} />
                      </div>
                      <div className={`col-md-12 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>出版<span className={styles.must}>*</span></label>
                        <textarea className={`form-control ${styles.controls} ${styles.scrollOrg}`} style={{resize: 'none'}} id="exampleFormControlTextarea1" rows={6} defaultValue={"「馬克先生的鸚鵡教室」「馬克先生的狗狗幼兒園」"} />
                      </div>
                    </div>
                  </div>
                  <div className={`col-md-12 mt-3`}>
                    <label className={`form-label ${styles.labels}`}>師資照片
                      <span className={styles.must}>* </span>
                      <button type="button" className={`btn btn-primary btn-sm ${styles.addPicBtn}`} onclick="document.getElementById('imageUpload').click();">
                        更換
                      </button>
                    </label>
                    <div id="imagePreviewContainer" className={`d-flex flex-wrap gap-3 my-2`}>
                      <div className={styles.imageCard}>
                        <img className={styles.imgCr} src="/course/img/25 (1).jpeg" alt="課程圖片1" />
                        <button type="button" className={`${styles.deleteBtn} ${styles.deletPic}`}>×</button>
                      </div>                  
                    </div>
                    <input type="file" id="imageUpload" className={`form-control d-none ${styles.add}`} accept="image/*" multiple />

                    {/* <button type="button" className={`btn btn-primary btn-sm mt-2 ${styles.addPicBtn}`} onclick="document.getElementById('imageUpload').click();">
                      + 新增
                    </button> */}
                  </div>
                  {/* 圖片 */}
                  {/* 按鈕區 */}
                  <div className={`d-flex justify-content-end border-top mt-5`}>
                    <button type="submit" className={`btn btn-primary btn-sm px-4 mt-4 ${styles.submitBtn}`}>
                      儲存
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

    </>
  );
}
