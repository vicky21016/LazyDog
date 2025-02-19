'use client'

import React, { useState, useEffect } from 'react'
import styles from "../courseId.module.css";

export default function CourseIntro({data}) {
  const course = data?.[0]
  // console.log(data?.[0].
  //   description
  //   );
  console.log(course);
  

  return (
    <>
      <div className={styles.courseIntro}>
              <img
                className={styles.mainPic}
                src="/course/img/3 (1).jpeg"
                alt
              />
              <div className={styles.courseName}>
                <h2 className={styles.name}>{course?.name}</h2>
                <img
                  className={styles.heartIcon}
                  src="/course/img/heartIcon.svg"
                  alt
                />
              </div>
              <h2 className={styles.price}>NT$ {course?.price}</h2>
              <p className={styles.description}>{course?.description}</p>
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
                <p className={styles.hours}>{course?.duration}小時</p>
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
                        <div className={`modal-body`}>{course?.notice}</div>
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
                        <div className={`modal-body`}>{course?.qa}</div>
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
