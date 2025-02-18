"use client";

import React, { useState, useEffect } from "react";
// import { useCourse } from "@/hooks/useCourse";
import styles from "../_components/courseId.module.css";
import Header from "@/app/components/layout/header";
import Footer from "@/app/components/layout/footer";
import Breadcrumb from "../_components/Id/breadcrumb";
import CoursePics from "../_components/Id/course-pics";
import SimilarCourseCard from "../_components/Id/similar-course-card";
import CourseIntro from "../_components/Id/course-intro";

export default function CourseIdPage() {

  // const App = () => {
  //   const { teachers = [] } = useCourse();
  
  // useEffect(() => {
    
  // }, [teachers]); 
  
  // }


  return (
    <>
      <Header/>
      <Breadcrumb/>
      <div>
        <div className={styles.section1}>
          <CoursePics/>
          <div className={styles.right}>
            <CourseIntro/>
          </div>
        </div>
        <div className={styles.section2}>
          <img
            className={styles.brownWave}
            src="/course/img/brownWave.png"
            alt
          />
          <SimilarCourseCard/>
        </div>
      </div>
      <Footer/>
    </>
  );
}
