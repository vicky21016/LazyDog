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

                    alt={`往左箭頭`}


                  />
                  <img
                    className={styles.arrowRight}
                    src="/course/img/arrow-right.png"

                    alt={`往右箭頭`}

                  />
                </div>
              </div>
              <div className={styles.sCards}>
              {simiCourse?.map((simi)=>(
                <Link className={styles.sCard} key={simi.courseId} href={`/course/${simi.courseId}`}>
                  <img
                    className={styles.cardImg}
                    src={`/course/img/${simi?.img_url}`}

                    alt={simi.courseName}

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
