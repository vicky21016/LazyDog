"use client";

import React, { useState, useEffect } from "react";
import styles from "../../../styles/modules/courseId.module.css";

export default function CourseIdPage() {
  return (
    <>
      <div>
        <nav className={styles.breadcrumbs}>
          <ul>
            <li>
              <a href>課程</a>
            </li>
            <img src="/course/img/right.svg" alt />
            <li>
              <a href>一對一寵物美容教學實作</a>
            </li>
          </ul>
        </nav>
        <div className={styles.section1}>
          <div className={styles.left}>
            <div className={styles.pics}>
              <img src="/course/img/3 (2).jpeg" alt />
              <img src="/course/img/3 (3).jpeg" alt />
              <img src="/course/img/3 (4).jpeg" alt />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.courseIntro}>
              <img
                className={styles.mainPic}
                src="/course/img/3 (1).jpeg"
                alt
              />
              <div className={styles.courseName}>
                <h2 className={styles.name}>一對一寵物美容教學實作</h2>
                <img
                  className={styles.heartIcon}
                  src="/course/img/heartIcon.svg"
                  alt
                />
              </div>
              <h2 className={styles.price}>NT$ 4,200</h2>
              <p className={styles.description}>
                課程時間為3小時(包含觀念、溝通、保定及實際操作)
                學員需自行攜帶毛孩（犬貓、各種品種皆可，一堂課以一位毛孩-限中小型19公斤以下）
                完成報名及繳費後請加入官方Line@：@lazydog，以利後續相關通知
              </p>
              <div className={styles.teacher}>
                <h2 className={styles.teachTitle}>關於講師</h2>
                <a href="#" className={`d-flex gap-3 ${styles.tConnect}`}>
                  <img
                    className={styles.teachPic}
                    src="/course/img/1 (2).png"
                    alt
                  />
                  <h5 className={styles.teachName}>馬克</h5>
                  </a>
              </div>
              <div className={styles.info}>
                <h2 className={styles.infoTitle}>課程資訊</h2>
              </div>
              <div className={styles.startDate}>
                <img src="/course/img/flagIcon.svg" alt />
                <h5 className={styles.dateTitle}>近期開課</h5>
                <p className={styles.date}>2025/12/20 </p>
              </div>
              <div className={styles.duration}>
                <img src="/course/img/timeIcon.svg" alt />
                <h5 className={styles.durTitle}>課堂時數</h5>
                <p className={styles.hours}>3小時</p>
              </div>
              <div className={styles.area}>
                <img src="/course/img/flagIcon.svg" alt />
                <h5 className={styles.areaTitle}>上課地點</h5>
                <p className={styles.place}>台北 / 台中 / 高雄 / 線上直播</p>
              </div>
              {/* <div className={styles.area}>
                <img src="/course/img/flagIcon.svg" alt />
                <h5 className={styles.areaTitle}>講師資訊</h5>
                <img
                    className={styles.teachPic}
                    src="/course/img/1 (2).png"
                    alt
                  />
                <p className={styles.place}>馬克</p>
              </div> */}

              <select
                id="classdate"
                className={`form-select ${styles.selects}`}
                aria-label="Default select example"
                // onChange={()=>{}}
              >
                <option selected readOnly>
                 請選擇梯次
                </option>
                <option value>
                  【線上直播】第一梯 03/23
                  、03/30、04/20、04/13、04/27、05/04、05/11
                </option>
                <option value>
                  【台北】第一梯 03/09、03/16、03/23、03/30、04/13、04/20、04/27
                </option>
                <option value>
                  【台北】第二梯 06/29、07/06、07/13、07/20、07/27、08/03、08/10
                </option>
                <option value>
                  【台北】第三梯 11/16、11/23、11/30、12/07、12/14、12/21、12/28
                </option>
                <option value>
                  【台中】第二梯 10/19、10/26、11/02、11/23、11/16、11/09、11/30
                </option>
                <option value>
                  【高雄】第一梯 02/09、02/16、02/23、03/09、03/16、03/23、03/30
                </option>
                <option value>
                  【高雄】第二梯 08/17、08/24、08/31、09/07、09/14
                  、09/21、09/28
                </option>
              </select>
              <select
                id="classtime"
                className={`form-select ${styles.selects}`}
                aria-label="Default select example"
                // onChange={()=>{}}
              >
                <option selected readOnly>
                 請選擇日期
                </option>
                <option value>9:00~12:00</option>
                <option value>14:00~17:00</option>
              </select>

              <button className={styles.cartBtn}>加入購物車</button>
              <div className={styles.ps}>
                <div
                  type="button"
                  className={styles.notice}
                  data-bs-toggle="modal"
                  data-bs-target="#noticeModal"
                >
                  <h5 className={styles.noticeTitle}>注意事項</h5>
                  <img src="/course/img/rightBlack.svg" alt />
                  {/* Modal */}
                  <div
                    className={`modal ${styles.fade}`}
                    id="noticeModal"
                    tabIndex={-1}
                    aria-labelledby="noticeModalLabel"
                    aria-hidden="true"
                  >
                    <div
                      className={`modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable`}
                    >
                      <div className={`modal-content`}>
                        <div className={`modal-header`}>
                          <h5 className={`modal-title`} id="noticeModalLabel">
                            注意事項
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          />
                        </div>
                        <div className={`modal-body`}>
                          本單位保留權益：因應疫情、天候或突發、身體因素等狀況變化，本單位保留可隨時改採直播授課方式上課，或做講師異動等必要安排，學員一樣可做線上或學生群等提問及互動，不便之處敬請見諒。
                          開課通知：完成實體課程報名繳費後，將於開課前7-10工作天，以E-mail或簡訊寄發開課通知，故請同學務必留意填寫正確的E-Mail及手機號碼；報名線上預錄課程，則可直接使用報名電郵登入後台即可觀看。
                          請假補課：學員報名各項課程，因故辦理請假，可選擇後面開辦之線上或線下梯次申請補課，唯考慮實體梯次可能會有座位有限、人數不足等因素取消開課，故將優先安排線上補課。請填寫補課申請單，等候助教通知安排出席或觀看。(若原課程出席率請假超過80%，即使補課也無法領取結業證書)
                          結業證書資格：當梯課程出席率需達80%並如期繳交老師指派作業或練習
                          （所有課程結業時數證書響應環保已全面改為電子檔方式發送致電郵）。
                          報名考試說明：只要領有課程結業證書，無論是參加線上預錄或線下課程學員，均可自由報考，參與台北現場考試。
                          特寵時數說明：
                          凡計畫從事寵物繁殖、買賣與寄養者，可參加本單位開辦具特寵時數認證課程作200小時時數累積。
                          所有特寵時數以實際有出席，並完成每堂課簽到簽退為審核條件，如線上直播課程，則需使用真實中文姓名登入顯示，並於聊天室中作每堂課簽到及簽退各一次，方符合申請資格。
                          由本單位於結業後協助向農業部或縣市政府，出示各項如簽到資料、上課照片等作為期約20-30天申請核發。
                          未開班處理：各開辦課程如有未達最低開班人數，學員可選擇延梯、轉報其他課程或是辦理全額退費。
                          退費辦法：學員因故無法如期參加課程，可優先辦理延梯或轉班，如需退費則我們參考依據「職業訓練機構設立及管理辦法
                          第十六條」等並考慮學員權益再優化後如下：
                          於實際開課日前三天(含)以上提出退費申請者：將扣除實際繳交學費之平台手續費15%(含平台與行政)及轉帳手續費30元，其餘全額退還。
                          於實際開課前二天，或開課後未達全期或總課程時數之三分之一(一天課)期間內申請退費者：將退還實際繳交學費50%。
                          於實際開課且超過總課程時數三分之一以上者：無法辦理退費申請，但可協助申請轉班或延梯。
                          智財權說明：參加所有課程之學員需遵守商標與著作權法所列的各項法規，絕不使用任何方法拷貝、錄影錄音、或編輯使用教授課程之教材內容與講師示範操作，作為對外公開及各種使用。
                          授權使用說明：學員報名參加所有課程，即同意無償授權主辦單位使用期間拍攝學員與其作品之照片與影片，並運用發布於主辦單位所發行之包括，但不限於平面刊物、網站、部落格、Facebook
                          粉絲頁、電子報、EDM、媒體廣告等相關之行銷活動各種使用。
                          學員福利：
                          凡報名雙證照課程(寵物教養、寵膳食育)學員，可享該證照課程終身複習旁聽福利，每堂課只需繳交$200元行政講義費即可申請線上預錄課程複習旁聽。
                          如欲申請食育課程之料理實作複習旁聽費另計，詳細可參考「學員請假旁聽申請表」說明。
                          學員結業後如有各種問題或創業開業需求，均可隨時在學生群中向駐站服務老師提議諮詢及交流。
                          參加寵物業職業講師培訓，如表現優異且與簽署長期栽培合作，將全力提供各項資源與投資，協助發展任教順利
                        </div>
                        <div className={`modal-footer`}>
                          <button
                            type="button"
                            className={`btn btn-secondary`}
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  type="button"
                  className={styles.qa}
                  data-bs-toggle="modal"
                  data-bs-target="#qaModal"
                >
                  <h5 className={styles.qaTitle}>Q&amp;A</h5>
                  <img src="/course/img/rightBlack.svg" alt />
                  {/* Modal */}
                  <div
                    className={`modal ${styles.fade}`}
                    id="qaModal"
                    tabIndex={-1}
                    aria-labelledby="qaModalLabel"
                    aria-hidden="true"
                  >
                    <div
                      className={`modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable`}
                    >
                      <div className={`modal-content`}>
                        <div className={`modal-header`}>
                          <h5 className={`modal-title`} id="qaModalLabel">
                            Q&amp;A
                          </h5>
                          <button
                            type="button"
                            className={`btn-close`}
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          />
                        </div>
                        <div className={`modal-body`}>
                          Q1：什麼是一對一寵物美容課程？
                          👉答：一對一寵物美容課程與市面上寵物美容課程最大不同在
                          老師上課學生只有你一個人，而非傳統一對多人方式，無法針對個別化程度及學習需求做加強指導。
                          一對一寵物美容有分是針對飼主，還是想報考寵物美容丙級的初級美容師，課程內容大不相同。
                          針對飼主的一對一寵物美容課程，主要是教授在家DIY技巧，及基礎問題皮毛調理；針對應考的一對一寵物美容課程，則是針對考試重點與術科實作處理技巧做考前複習。
                          Q2：課程結束是否有結業完課時數證書？
                          👉答：完整參與陪跑計劃，並繳交作業，即可領取結業時數證明
                          Q3：是否有報名課程的優惠？
                          👉答：報名一對一課程屬客製化服務，因此無再享有報名優惠，敬請見諒。
                          Q4：繳費方式有哪些？
                          👉答：目前繳費方式有線上刷卡、匯款、超商條碼繳費及中租零卡分期4種。
                          【匯款】
                          可使用平台下單匯款或是臨櫃、ATM等方式，臨櫃或ATM請繳費後至官方Line@告知匯款末五碼，方便核對回報。
                          ★臨櫃ATM使用帳號 戶名：寵愛國際股份有限公司
                          銀行：永豐銀行(807)內湖分行 帳號：134-018-0006552-1
                          【刷卡】線上報名連結使用藍新第三方金流。如需信用卡分期，請自行洽詢使用金融卡銀行。
                          【中租零卡分期】分期期數及利率分別為 3期：2.3%
                          6期：3.3% 9期：5.0% 12期：6.5% 18期：8.5% 24期：11.5%
                          再請加入官方LINE@：@padore
                          告訴我們想要報名的課程及預計分期期數
                          並提供個人中文姓名／電話／Email
                          我們會協助提供給中租協助零卡分期審核~謝謝
                        </div>
                        <div className={`modal-footer`}>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  type="button"
                  className={styles.other}
                  data-bs-toggle="modal"
                  data-bs-target="#otherModal"
                >
                  <h5 className={styles.otherTitle}>其他</h5>
                  <img src="/course/img/rightBlack.svg" alt />
                  {/* Modal */}
                  <div
                    className={`modal ${styles.fade}`}
                    id="otherModal"
                    tabIndex={-1}
                    aria-labelledby="otherModalLabel"
                    aria-hidden="true"
                  >
                    <div
                      className={`modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable`}
                    >
                      <div className={`modal-content`}>
                        <div className={`modal-header`}>
                          <h5 className={`modal-title`} id="otherModalLabel">
                            其他
                          </h5>
                          <button
                            type="button"
                            className={`btn-close`}
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          />
                        </div>
                        <div className={`modal-body`}>
                          <div className={`container-fluid`}>
                            <h5>上課地點</h5>
                            <div className={`row`}>
                              <div className={`col-5 col-md-2`}>台北</div>
                              <div className={`col-7 col-md-4`}>
                                台北市內湖區環山路二段141號一樓
                              </div>
                            </div>
                            <div className={styles.row}>
                              <div className={`col-5 col-md-2`}>台中</div>
                              <div className={`col-7 col-md-4`}>
                                台中市烏日區大同九街73號
                              </div>
                            </div>
                            <div className={styles.row}>
                              <div className={`col-5 col-md-2`}>高雄</div>
                              <div className={`col-7 col-md-4`}>
                                高雄市前金區中正四路215號
                              </div>
                            </div>
                            <div className={styles.row}>
                              <div className={`col-5 col-md-2`}>線上直播</div>
                              <div className={`col-7 col-md-4`}>
                                <a href>ZOOM線上直播</a>
                              </div>
                            </div>
                            <div className={styles.row}>
                              <div className={`col-5 col-md-2`}>線上預錄</div>
                              <div className={`col-7 col-md-4`}>
                                <a href>ZOOM線上影片</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={`modal-footer`}>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div
      className={styles.notice}
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasRight"
      aria-controls="offcanvasRight"
    >
      <h5>注意事項</h5>
      <img src="./img/rightBlack.svg" alt="" />
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div class="offcanvas-header">
          <h5 id="offcanvasRightLabel">Offcanvas right</h5>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">...</div>
      </div>
    </div> */}
        </div>
        <div className={styles.section2}>
          <img
            className={styles.brownWave}
            src="/course/img/brownWave.png"
            alt
          />
          <div className={styles.similarCourses}>
            <div className={`container ${styles.similarCourse}`}>
              <h2 className={styles.sTitle}>相關課程</h2>
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
                <div className={styles.sCard}>
                  <img
                    className={styles.cardImg}
                    src="/course/img/7 (1).jpeg"
                    alt
                  />
                  <h5 className={styles.cardName}>我家也有狗醫生</h5>
                </div>
                <div className={styles.sCard}>
                  <img
                    className={styles.cardImg}
                    src="/course/img/7 (1).jpeg"
                    alt
                  />
                  <h5 className={styles.cardName}>我家也有狗醫生</h5>
                </div>
                <div className={styles.sCard}>
                  <img
                    className={styles.cardImg}
                    src="/course/img/7 (1).jpeg"
                    alt
                  />
                  <h5 className={styles.cardName}>我家也有狗醫生</h5>
                </div>
                <div className={styles.sCard}>
                  <img
                    className={styles.cardImg}
                    src="/course/img/7 (1).jpeg"
                    alt
                  />
                  <h5 className={styles.cardName}>我家也有狗醫生</h5>
                </div>
                <div className={styles.sCard}>
                  <img
                    className={styles.cardImg}
                    src="/course/img/7 (1).jpeg"
                    alt
                  />
                  <h5 className={styles.cardName}>我家也有狗醫生</h5>
                </div>
                <div className={styles.sCard}>
                  <img
                    className={styles.cardImg}
                    src="/course/img/7 (1).jpeg"
                    alt
                  />
                  <h5 className={styles.cardName}>我家也有狗醫生</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
