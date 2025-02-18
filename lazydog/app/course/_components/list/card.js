'use client'

import React, { useState, useEffect } from 'react'
import styles from "../courseList.module.css";


export default function Card({course = {}}) {
  return (
    <>
      <div className={styles.courseCard}>
          <img
          className={styles.img}
          src="/course/img/18 (1).jpeg"
          alt
          />
          <h5 className={styles.tag}>{course.type_id}</h5>
          <h2 className={styles.name}>{course.name}</h2>
          <p className={styles.intro}>{course.description}</p>
      </div>   
    </>
  )
}
