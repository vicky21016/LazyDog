'use client'

import React, { useState, useEffect } from 'react'
import styles from "../css/teacherSignPlace.module.css"

export default function TeacherPlace() {
  return (
    <>
      <div className={`col-md-9`}>            
            <div className={`border rounded p-5 ${styles.right}`}>
              <h3 className={`mb-4 ${styles.tTitle}`}>開課地點</h3>
              <div className={`${styles.cTable} ${styles.bottom}`}>
                <div className={styles.cTbody}>
                  <div className={styles.cTd1}>台北</div>
                  <div className={styles.cTd2}>台北市內湖區環山路二段141號一樓</div>
                </div>
                <div className={styles.cTbody}>
                  <div className={styles.cTd1}>台中</div>
                  <div className={styles.cTd2}>台中市烏日區大同九街73號</div>
                </div>
                <div className={styles.cTbody}>
                  <div className={styles.cTd1}>高雄</div>
                  <div className={styles.cTd2}>高雄市前金區中正四路215號</div>
                </div>
                <div className={styles.cTbody}>
                  <div className={styles.cTd1}>線上直播</div>
                  <div className={styles.cTd2}>ZOOM線上直播</div>
                </div>
                <div className={styles.cTbody}>
                  <div className={styles.cTd1}>線上預錄</div>
                  <div className={styles.cTd2}>ZOOM線上影片</div>
                </div>
              </div>
            </div> 
          </div>
    </>
  )
}
