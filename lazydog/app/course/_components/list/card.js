'use client'

import React, { useState, useEffect } from 'react'
import styles from "../courseList.module.css";


export default function Card({course}) {
  return (
    <>
      <div className={styles.courseCard}>
          <img
          className={styles.img}
          src="/course/img/18 (1).jpeg"
          alt
          />
          <h5 className={styles.tag}>{type}</h5>
          <h2 className={styles.name}>犬貓營養與動物中醫</h2>
          <p className={styles.intro}>
          了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提
          </p>
      </div>   
    </>
  )
}
