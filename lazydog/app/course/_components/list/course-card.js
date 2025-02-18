'use client'

import React, { useState, useEffect } from 'react'
import useFetch from '@/hooks/useCourse2';
import styles from "../courseList.module.css";
import Card from './card';


export default function CourseCard() {
//   const { data, loading, error } = useFetch()     
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
                <Card/>
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

