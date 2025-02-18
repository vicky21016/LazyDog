'use client'

import React, { useState, useEffect } from 'react'
import styles from "../courseId.module.css";


export default function SimilarCourseCard(props) {
  return (
    <>
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
    </>
  )
}
