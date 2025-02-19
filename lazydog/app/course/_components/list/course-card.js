'use client'

import React from 'react'
import useCourse from '@/hooks/useCourse';
import styles from "../courseList.module.css";
import Card from './card';


export default function CourseCard() {
  const { courses=[], loading, error } = useCourse() 
  
  if (loading) {
    return <div>Loading...</div>; // 顯示載入中的提示
  }

  if (error) {
    return <div>Error: {error}</div>; // 顯示錯誤訊息
  }

  return (
    <>
       <div className={`col-lg-9 ${styles.right}`}>
            <div className={styles.top}>
            <h2 className={styles.sTitle}>所有課程</h2>
            <div className={styles.sbar} />
            </div>
            <div className={styles.medium}>
            <div className={styles.count}>
                共計 <span className={styles.countNum}>42</span> 堂課
            </div>
            <div className={styles.hot}>
                <img src="/course/img/sort.png" alt />
                依熱門程度排序
            </div>
            </div>
            <div className={styles.courseGroup}>
                { courses.map((course) => {
                    <Card key={course.id} course={course}/>
                })}
            </div>
            <nav className={styles.navigation} aria-label="Page navigation">
            <ul className={`pagination justify-content-center ${styles.pagination}`}>
                <li className={`page-item ${styles.pageItem} `}>
                <a className={`page-link ${styles.pageLink}`} href="#" aria-label="Previous">
                    <span aria-hidden="true">
                    <img src="/course/img/pageArrowleft;png.png" alt />
                    </span>
                </a>
                </li>
                <li className={`page-item ${styles.pageItem}`}>
                <a className={`page-link ${styles.pageLink}`} href="#">
                    1
                </a>
                </li>
                <li className={`page-item ${styles.pageItem}`}>
                <a className={`page-link ${styles.pageLink}`} href="#">
                    2
                </a>
                </li>
                <li className={`page-item ${styles.pageItem}`}>
                <a className={`page-link ${styles.pageLink}`} href="#" aria-label="Next">
                    <span aria-hidden="true">
                    <img src="/course/img/pageArrowright.png" alt />
                    </span>
                </a>
                </li>
            </ul>
            </nav>
        </div> 
    </>
  )
}

