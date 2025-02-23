'use client'

import React, { useState, useEffect } from 'react'
import styles from "../css/teacherSignAdd.module.css";

export default function TeacherAddC() {
    const [selectedCategory, setSelectedCategory] = useState(""); // 用來存儲當前選擇的值

    const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value); // 更新選中的值
    };
  return (
    <>
      <div className={`col-lg-9 col-md-12 col-12`}>
              <div className={`p-5 ${styles.right}`}>
                <h3 className={`mb-4 ${styles.tTitle}`}>新增課程</h3>
                <form>
                    <section className={`row g-4 mb-4 ${styles.section1}`}>
                      <div className={`col-md-12`}>
                        <label className={`form-label ${styles.labels}`}>課程名稱<span className={styles.must}>*</span></label>
                        <input type="text" className={`form-control  ${styles.controls}`} defaultValue={""}  />
                      </div>
                      <div className={`col-md-6 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>課程類別<span className={styles.must}>*</span></label>
                        <select className={`form-select  ${styles.controls}`} value={selectedCategory} onChange={handleCategoryChange}>
                          <option className={styles.pleaseChoose} value="" disabled>請選擇</option>
                          <option value="寵物美容">寵物美容</option>
                          <option value="寵膳食育">寵膳食育</option>
                          <option value="寵物訓練">寵物訓練</option>
                          <option value="寵物照護">寵物照護</option>
                          <option>商業思維與專業培訓</option>
                        </select>
                      </div>
                      <div className={`col-md-6 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>課程金額<span className={styles.must}>*</span></label>
                        <input type="text" className={`form-control  ${styles.controls}`} defaultValue={""} placeholder />
                      </div>
                      <div className={`col-md-6 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>總時數<span className={styles.must}>*</span></label>
                        <input type="text" className={`form-control  ${styles.controls}`} defaultValue={""} placeholder />
                      </div>
                      <div className={`col-md-6 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>報名人數限制<span className={styles.must}>*</span></label>
                        <input type="text" className={`form-control  ${styles.controls}`} defaultValue={""} placeholder />
                      </div>
                    </section>
                    <section className={`row g-4 mb-5 ${styles.section2}`}>
                      <div className={`col-md-12`}>
                        <label className={`form-label ${styles.labels}`}>該梯每堂課日期<span className={styles.must}>*</span></label>
                        <input type="text" className={`form-control  ${styles.controls}`} placeholder={`範例 :  2025 【台北】 08/17、08/24、08/31、09/07、09/14 、09/21、09/28`} />
                      </div>
                      <div className={`col-md-6 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>開課日期<span className={styles.must}>*</span></label>
                        <input type="text" className={`form-control  ${styles.controls}`} defaultValue={""} placeholder />
                      </div>
                      <div className={`col-md-6 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>開課地點<span className={styles.must}>*</span></label>
                        <select className={`form-select  ${styles.controls}`} value={selectedCategory} onChange={handleCategoryChange}>
                          <option className={styles.optionDisabled} value="" disabled>請選擇</option>
                          <option value="台北">台北</option>
                          <option value="台中">台中</option>
                          <option value="高雄">高雄</option>
                          <option value="線上直播">線上直播</option>
                          <option value="線上預錄">線上預錄</option>
                        </select>
                      </div>
                      <div className={`col-md-12 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>上課時間<span className={styles.must}>*</span></label>
                        <div className={`d-flex`}>
                          <input type="text" className={`form-control  ${styles.controls}`} defaultValue={""} placeholder />
                          <span className={`align-self-center p-2`}>~</span>
                          <input type="text" className={`form-control  ${styles.controls}`} defaultValue={""} placeholder />
                        </div>
                        
                      </div>
                    </section> 
                    <section className={`row g-4 mb-5  ${styles.section3}`}>
                      <div className={`col-md-12 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>課程介紹<span className={styles.must}>*</span></label>
                        <textarea className={`form-control  ${styles.controls} ${styles.scrollOrg}`} style={{resize: 'none'}} id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
                      </div>
                      <div className={`col-md-12 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>注意事項</label>
                        <textarea className={`form-control  ${styles.controls} ${styles.scrollOrg}`} style={{resize: 'none'}} id="exampleFormControlTextarea1" rows={4} defaultValue={""} />
                      </div>
                      <div className={`col-md-12 mt-3`}>
                        <label className={`form-label ${styles.labels}`}>Q&amp;A</label>
                        <textarea className={`form-control  ${styles.controls} ${styles.scrollOrg}`} style={{resize: 'none'}} id="exampleFormControlTextarea1" rows={4} defaultValue={""} />
                      </div>
                    </section>
                    <section className={`row g-4 mb-5 ${styles.section4}`}>
                      {/* 圖片 */}
                      <label className={`form-label`}>課程圖片
                          <span className={styles.must}>* </span>
                      </label>
                      <div className={`gap-3 ${styles.pics}`}>
                        <div className={`col-md-4 mt-4 mb-5 ${styles.mainPic}`}>
                          <button type="button" className={`btn btn-primary btn-sm ${styles.addPicBtn}`} onclick="document.getElementById('imageUpload').click();">
                            新增
                          </button>
                          <input type="file" id="imageUpload" className={`form-control d-none add`} accept="image/*" multiple />
                        </div>
                        <div className={`col-md-7 mt-4 mb-5 ${styles.otherPic}`}>
                          <div id="imagePreviewContainer" className={`d-flex flex-wrap gap-3 mb-2`}>
                            {/* <div class="imageCard">
                            <img
                              class="imgCr"
                              src=""
                              alt=""
                            />
                            <button type="button" class="deleteBtn deletPic">&times;</button>
                          </div>                          */}
                          </div>
                          <button type="button" className={`btn btn-primary btn-sm ${styles.addPicBtn}`} onclick="document.getElementById('imageUpload').click();">
                            新增
                          </button>
                          <input type="file" id="imageUpload" className={`form-control d-none add`} accept="image/*" multiple />
                        </div>
                      </div>
                     
                    </section>
                    {/* 按鈕區 */}
                    <div className={`d-flex justify-content-end gap-3 border-top mt-5`}>
                      <button type="button" className={`btn btn-sm px-4 mt-4 ${styles.cancleBtn}`} onclick="location.href='opCourseList.html'">
                        <a className={styles.cancleBtnA} href="./opCourseList.html">取消</a>
                      </button>
                      <button type="submit" className={`btn btn-primary btn-sm px-4 mt-4 ${styles.submitBtn}`}>
                        <a className={styles.submitBtnA} href="./opCourseList.html">儲存</a>
                      </button>
                    </div>
                </form>
              </div>
      </div>
    </>
  )
}
