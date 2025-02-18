'use client'

import React, { useState, useEffect } from 'react'
import styles from "../courseId.module.css";


export default function CoursePics(props) {
  return (
    <>
      <div className={styles.left}>
            <div className={styles.pics}>
              <img src="/course/img/3 (2).jpeg" alt />
              <img src="/course/img/3 (3).jpeg" alt />
              <img src="/course/img/3 (4).jpeg" alt />
            </div>
          </div>
    </>
  )
}
