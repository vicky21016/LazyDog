'use client'

import React, { useState, useEffect } from 'react'
import styles from "../courseList.module.css";


export default function News() {
  return (
    <>
      <div className={styles.new}>
          <img className={styles.newImg} src="/course/img/18 (1).jpeg"  alt="" />
          <div className={styles.bottom}>
            <div className={styles.date}>01 / 08</div>
            <div className={styles.arrows}>
              <img
                className={styles.arrowLW}
                src="/course/img/arrow-left-white.png"
                  alt=""
              />
              <img
                className={styles.arrowRW}
                src="/course/img/arrow-right-white.png"
                  alt=""
              />
            </div>
          </div>
        </div>
    </>
  )
}
