'use client'

import React, { useState, useEffect } from 'react'
import styles from "../courseId.module.css";

export default function CourseIntro({course, session, place}) {
  const c = course?.[0]
  const s = session?.[0]

  // const defaultTeachImg = "/course/img/user.jpg"

  // console.log(s);
  // console.log("CourseIntro - Course:", course);
  // console.log("CourseIntro - Session:", session);
  // console.log("CourseIntro - Place:", place);
  

  
  const [selectDate, setSelectDate] = useState(""); // 選擇的日期
  const [filterSession, setFilterSession] = useState([]); // 過濾後的時段

  // 過濾出唯一的 class_dates 作為日期選單
  const uniqueDates = [...new Set(session.map((ss) => ss.class_dates))];

  // 當選擇日期時，過濾對應的時段
  const dateChange = (e) => {
    const selected = e.target.value;
    setSelectDate(selected);
    
    // 過濾出該日期的所有時段
    const times = session
      .filter((ss) => ss.class_dates === selected)
      .map((ss) => {
        const start = ss.start_time.split(":").slice(0, 2).join(":");
        const end = ss.end_time.split(":").slice(0, 2).join(":");
        return `${start}~${end}`
      });
    
      setFilterSession(times);
  };
  
  

  return (
    <>
      <div className={styles.courseIntro}>
              <img
                className={styles.mainPic}
                src={`/course/img/${c?.img_url}`}
                alt
              />
              <div className={styles.courseName}>
                <h2 className={styles.name}>{c?.name}</h2>
                <img
                  className={styles.heartIcon}
                  src="/course/img/heartIcon.svg"
                  alt
                />
              </div>
              <p className={styles.description}>{c?.description}</p>
              <h2 className={styles.price}>NT$ <span className={styles.number}>{Number(c?.price).toLocaleString("zh-Tw")}</span></h2>
              <div className={styles.teacher}>
                <h2 className={styles.teachTitle}>關於講師</h2>
                <a href="#" className={`d-flex gap-3 ${styles.tConnect}`}>
                  <img
                    className={styles.teachPic}
                    src={`/teacher-img/${s?.teacher_img}`}
                    alt={s?.teacher_name}
                  />
                  <h5 className={styles.teachName}>{s?.teacher_name}</h5>
                  </a>
              </div>
              <div className={styles.info}>
                <h2 className={styles.infoTitle}>課程資訊</h2>
              </div>
              <div className={styles.startDate}>
                <img src="/course/img/flagIcon.svg" alt />
                <h5 className={styles.dateTitle}>近期開課</h5>
                <p className={styles.date}>{s?.start_date  ? new Date(s.start_date).toISOString().split('T')[0] : ''}</p>
              </div>
              <div className={styles.duration}>
                <img src="/course/img/timeIcon.svg" alt />
                <h5 className={styles.durTitle}>課堂時數</h5>
                <p className={styles.hours}>{c?.duration}小時</p>
              </div>
              <div className={styles.area}>
                <img src="/course/img/flagIcon.svg" alt />
                <h5 className={styles.areaTitle}>上課地點</h5>
                {[...new Set(session.map((ss) => ss.region))].map((region, index, array) => (
                  <>
                    <p className={styles.place} key={index}>{region}</p>
                    {index < array.length - 1 && '/'}
                  </>
                ))}
                
              </div>
              
              
              {/* 日期 */}
              <select
                id="classdate"
                value={selectDate}
                className={`form-select ${styles.selects}`}
                aria-label="Default select example"
                onChange={dateChange}
              >
                <option value="" selected disabled>
                請選擇梯次
                </option>
                {uniqueDates.map((date, index) => (
                  <option className={`${styles.options}`} key={index} value={date}>{date}</option>
                ))}
              </select>
              
              {/* 時間 */}
              <select
                id="classtime"
                className={`form-select ${styles.selects}`}
                aria-label="Default select example"
                
              >
                <option value="" selected disabled>
                請選擇時間
                </option>
                {filterSession.map((time, index) => (
                  <option key={index} value={time}>{time}</option>
                ))}
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
                        <div className={`modal-body`}>{c?.notice}</div>
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
                        <div className={`modal-body`}>{c?.qa}</div>
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
                            {place?.map((p)=>(
                              <div className={`row`}>
                              <div className={`col-5 col-md-2`}>{p.region}</div>
                              <div className={`col-7 col-md-4`}>{p.address}</div>
                            </div>
                            ))}
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
    </>
  )
}
