'use client'

import React, {useState} from 'react'
import { useFetch } from '@/hooks/product/use-fetch';
import styles from "../courseList.module.css";
import Card from './card';
import Pagination from './pagination';


export default function CourseCard() {
  const url = "http://localhost:5000/api/course"
  const { data, loading, error } = useFetch(url) 
  const course =data?.data?.courses;

  // 分頁
  const [currPage, setCurrPage] = useState(1);
  const perPage = 9;
  const totalPages =  Math.max(1, Math.ceil((course?.length || 0) / perPage));

  const startIndex = (currPage - 1) * perPage;
  const currentCourses = course?.slice(startIndex, startIndex + perPage);

  return (
    <>
       <div className={`col-lg-9 ${styles.right}`}>
            <div className={styles.top}>
            <h2 className={styles.sTitle}>所有課程</h2>
            <div className={styles.sbar} />
            </div>
            <div className={styles.medium}>
            <div className={styles.count}>
                共計 <span className={styles.countNum}>{course?.length}</span> 堂課
            </div>
            <div className={styles.hot}>

                <img src="/course/img/sort.png" alt={`依熱門程度排序`} />

                依熱門程度排序
            </div>
            </div>
            <div className={styles.courseGroup}>
                {currentCourses?.map((course) => {
                    return(
                    <Card key={course.id} course={course}/>
                    )
                })}
            </div>
            <Pagination totalPages={totalPages} currPage={currPage} setCurrPage={setCurrPage}/>
        </div> 
    </>
  )
}

