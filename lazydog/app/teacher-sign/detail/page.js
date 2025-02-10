"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "../css/teacherSignDetail.module.css"

export default function OpTeacherDetailPage(props) {
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
      
      <div className="container mt-5 mb-5">
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
            <div className={`p-5 ${styles.right}`}>
              <h3 className={`mb-4 ${styles.tTitle}`}>課程資訊</h3>
              <form>
                  <section className={`row g-4 mb-5 ${styles.section1}`}>
                      <div className={`col-md-12`}>
                        <label className={`form-label ${styles.labels}`}>課程名稱</label>
                        <input type="text" className={`form-control  ${styles.controls}`} defaultValue={"一對一寵物美容教學實作"} disabled readOnly  />
                      </div>
                      <div className={`col-md-6 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>課程類別</label>
                        <select className={`form-select  ${styles.controls}`} disabled readOnly>
                          <option selected>請選擇</option>
                          <option>寵物美容</option>
                          <option>寵膳食育</option>
                          <option>寵物訓練</option>
                          <option>寵物照護</option>
                          <option>商業思維與專業培訓</option>
                        </select>
                      </div>
                      <div className={`col-md-6 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>課程金額</label>
                        <input type="text" className={`form-control  ${styles.controls}`} defaultValue={"4,200"} disabled readOnly  />
                      </div>
                      <div className={`col-md-6 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>總時數</label>
                        <input type="text" className={`form-control  ${styles.controls}`} defaultValue={"3"} disabled readOnly />
                      </div>
                      <div className={`col-md-6 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>報名人數限制</label>
                        <input type="text" className={`form-control  ${styles.controls}`} defaultValue={"1"} disabled readOnly/>
                      </div>
                    </section>
                    <section className={`row g-4 mb-5 ${styles.section2}`}>
                      <div className={`col-md-12`}>
                        <label className={`form-label ${styles.labels}`}>該梯每堂課日期</label>
                        <input type="text" className={`form-control  ${styles.controls}`} defaultValue={"第二梯   08/17、08/24、08/31、09/07、09/14 、09/21、09/28"} disabled readOnly  />
                      </div>
                      <div className={`col-md-6 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>開課日期</label>
                        <input type="text" className={`form-control  ${styles.controls}`} defaultValue={"2025/12/20"} disabled readOnly />
                      </div>
                      <div className={`col-md-6 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>開課地點</label>
                        <select className={`form-select  ${styles.controls}`} disabled readOnly>
                          <option selected>請選擇</option>
                          <option>台北</option>
                          <option>台中</option>
                          <option>高雄</option>
                          <option>線上直播</option>
                          <option>線上預錄</option>
                        </select>
                      </div>
                      <div className={`col-md-12 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>上課時間</label>
                        <div className={`d-flex`}>
                          <input type="text" className={`form-control  ${styles.controls}`} defaultValue={"9:00"} disabled readOnly />
                          <span className={`align-self-center p-2`}>~</span>
                          <input type="text" className={`form-control  ${styles.controls}`} defaultValue="12:00" disabled readOnly />
                        </div>
                        
                      </div>
                    </section> 
                    <section className={`row g-4 mb-5  ${styles.section3}`}>
                      <div className={`col-md-12 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>課程介紹</label>
                        <textarea className={`form-control  ${styles.controls} ${styles.scrollOrg}`} style={{resize: 'none'}} id="exampleFormControlTextarea1" rows={3} defaultValue={"課程時間為3小時(包含觀念、溝通、保定及實際操作)，，學員需自行攜帶毛孩（犬貓、各種品種皆可，一堂課以一位毛孩-限中小型19公斤以下），完成報名及繳費後請加入官方Line@：@lazydog，以利後續相關通知"} disabled readOnly/>
                      </div>
                      <div className={`col-md-12 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>注意事項</label>
                        <textarea className={`form-control  ${styles.controls} ${styles.scrollOrg}`} style={{resize: 'none'}} id="exampleFormControlTextarea1" rows={4} defaultValue={"本單位保留權益：因應疫情、天候或突發、身體因素等狀況變化，本單位保留可隨時改採直播授課方式上課，或做講師異動等必要安排，學員一樣可做線上或學生群等提問及互動，不便之處敬請見諒。\n\n                開課通知：完成實體課程報名繳費後，將於開課前7-10工作天，以E-mail或簡訊寄發開課通知，故請同學務必留意填寫正確的E-Mail及手機號碼；報名線上預錄課程，則可直接使用報名電郵登入後台即可觀看。\n                \n                請假補課：學員報名各項課程，因故辦理請假，可選擇後面開辦之線上或線下梯次申請補課，唯考慮實體梯次可能會有座位有限、人數不足等因素取消開課，故將優先安排線上補課。請填寫補課申請單，等候助教通知安排出席或觀看。(若原課程出席率請假超過80%，即使補課也無法領取結業證書)\n                \n                結業證書資格：當梯課程出席率需達80%並如期繳交老師指派作業或練習 （所有課程結業時數證書響應環保已全面改為電子檔方式發送致電郵）。\n                \n                報名考試說明：只要領有課程結業證書，無論是參加線上預錄或線下課程學員，均可自由報考，參與台北現場考試。"} disabled readOnly />
                      </div>
                      <div className={`col-md-12 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>Q&amp;A</label>
                        <textarea className={`form-control  ${styles.controls} ${styles.scrollOrg}`} style={{resize: 'none'}} id="exampleFormControlTextarea1" rows={4} defaultValue={"Q1：什麼是一對一寵物美容課程？ 👉答：一對一寵物美容課程與市面上寵物美容課程最大不同在 老師上課學生只有你一個人，而非傳統一對多人方式，無法針對個別化程度及學習需求做加強指導。 一對一寵物美容有分是針對飼主，還是想報考寵物美容丙級的初級美容師，課程內容大不相同。 針對飼主的一對一寵物美容課程，主要是教授在家DIY技巧，及基礎問題皮毛調理；針對應考的一對一寵物美容課程，則是針對考試重點與術科實作處理技巧做考前複習。 Q2：課程結束是否有結業完課時數證書？ 👉答：完整參與陪跑計劃，並繳交作業，即可領取結業時數證明 Q3：是否有報名課程的優惠？ 👉答：報名一對一課程屬客製化服務，因此無再享有報名優惠，敬請見諒。 Q4：繳費方式有哪些？ 👉答：目前繳費方式有線上刷卡、匯款、超商條碼繳費及中租零卡分期4種。 【匯款】 可使用平台下單匯款或是臨櫃、ATM等方式，臨櫃或ATM請繳費後至官方Line@告知匯款末五碼，方便核對回報。 ★臨櫃ATM使用帳號 戶名：寵愛國際股份有限公司 銀行：永豐銀行(807)內湖分行 帳號：134-018-0006552-1 【刷卡】線上報名連結使用藍新第三方金流。如需信用卡分期，請自行洽詢使用金融卡銀行。 【中租零卡分期】分期期數及利率分別為 3期：2.3% 6期：3.3% 9期：5.0% 12期：6.5% 18期：8.5% 24期：11.5% 再請加入官方LINE@：@padore 告訴我們想要報名的課程及預計分期期數 並提供個人中文姓名／電話／Email 我們會協助提供給中租協助零卡分期審核~謝謝"} disabled readOnly/>
                      </div>
                      {/* 圖片 */}
                      <div className={`col-md-12 mt-4 mb-5`}>
                        <label className={`form-label ${styles.labels}`}>課程圖片</label>
                          <div id="imagePreviewContainer" className={`d-flex flex-wrap gap-3 mb-2`}>
                            <div className={styles.imageCard}>
                              <img className={styles.imgCr} src="/course/img/25 (1).jpeg" alt="課程圖片1" />
                            </div>
                            <div className={styles.imageCard}>
                              <img className={styles.imgCr} src="/course/img/25 (1).jpeg" alt="課程圖片1" />
                            </div>
                            <div className={styles.imageCard}>
                              <img className={styles.imgCr} src="/course/img/25 (1).jpeg" alt="課程圖片1" />
                            </div>
                            <div className={styles.imageCard}>
                              <img className={styles.imgCr} src="/course/img/25 (1).jpeg" alt="課程圖片1" />
                            </div>
                          </div>
                          <input type="file" id="imageUpload" className={`form-control ${styles.control} d-none ${styles.add}`} accept="image/*" multiple />
                      </div>
                    </section>
  
                {/* 按鈕區 */}
                <div className={`d-flex justify-content-end gap-3`}>
                  <button type="submit" className={`btn btn-primary btn-sm px-4 ${styles.submitBtn}`}>
                    <a className={styles.submitBtnA} href="./opCourseEdit.html">編輯</a>
                  </button>
                </div>
              </form>
            </div>
          </div>


        </div>
      </div>
    

    </>
  );
}
