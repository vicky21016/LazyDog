'use client'

import React, { useState, useEffect } from 'react'
import styles from "../courseList.module.css";
import Link from 'next/link';


export default function Card({course}) {
  
  return (
    <>
      <Link className={styles.courseCard} href={"#"}>
          <img
          className={styles.img}
          src="/course/img/18 (1).jpeg"
          alt="Course Image" 
          />
          <h5 className={styles.tag}>{course.type_name}</h5>
          <h2 className={styles.name}>{course.name}</h2>
          <p className={styles.intro}>{course.description}</p>
      </Link>   
    </>
  )
}
