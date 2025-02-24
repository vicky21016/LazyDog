'use client'

import React, { useState, useEffect } from 'react'
// import { useParams } from 'next/navigation'
import styles from "../css/teacherSignInfo.module.css"

export default function TeacherInfo() {
  // const params = useParams()
  // const teacherCode = params.teacherId

  const [infos, setInfos] = useState([]);
  

  useEffect(() => {
    fetch(`http://localhost:5000/teacher/info`,{
      method: "GET",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setInfos(data.infos);

      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <>
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
    </>
  )
}
