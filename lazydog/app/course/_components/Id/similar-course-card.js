'use client'

import React, { useState, useEffect } from 'react'
import styles from "../courseId.module.css";
import Link from 'next/link';


export default function SimilarCourseCard({simiCourse}) {
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
              {simiCourse?.map((simi)=>(
                <Link className={styles.sCard} href={`/course/${simi.courseId}`}>
                  <img
                    className={styles.cardImg}
                    src={`/course/img/${simi?.img_url}`}
                    alt
                  />
                  <h5 className={styles.cardName}>{simi.courseName}</h5>
                </Link>
              ))}
                
              </div>
            </div>
      </div>
    </>
  )
}
