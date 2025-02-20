'use client'

import React from 'react'
import { useFetch } from '@/hooks/product/use-fetch';
import styles from "../courseList.module.css";
import Card from './card';
import Pagination from './pagination';


export default function CourseCard() {
  const url = "http://localhost:5000/api/course"
  const { data, loading, error } = useFetch(url) 
//   console.log(data?.data);

  return (
    <>
       <div className={`col-lg-9 ${styles.right}`}>
            <div className={styles.top}>
            <h2 className={styles.sTitle}>所有課程</h2>
            <div className={styles.sbar} />
            </div>
            <div className={styles.medium}>
            <div className={styles.count}>
                共計 <span className={styles.countNum}>{data?.data?.length}</span> 堂課
            </div>
            <div className={styles.hot}>
                <img src="/course/img/sort.png" alt />
                依熱門程度排序
            </div>
            </div>
            <div className={styles.courseGroup}>
                { data?.data?.map((course) => {
                    return(
                    <Card key={course.id} course={course}/>
                    )
                })}
            </div>
            <Pagination/>
        </div> 
    </>
  )
}

