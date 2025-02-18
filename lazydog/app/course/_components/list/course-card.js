'use client'

import React, { useState, useEffect } from 'react'
import styles from "../courseList.module.css";


export default function CourseCard() {
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
            <div className={styles.courseCard}>
                <img
                className={styles.img}
                src="/course/img/18 (1).jpeg"
                alt
                />
                <h5 className={styles.tag}>寵物訓練</h5>
                <h2 className={styles.name}>犬貓營養與動物中醫</h2>
                <p className={styles.intro}>
                了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提
                </p>
            </div>
            <div className={styles.courseCard}>
                <img
                className={styles.img}
                src="/course/img/18 (1).jpeg"
                alt
                />
                <h5 className={styles.tag}>寵物訓練</h5>
                <h2 className={styles.name}>犬貓營養與動物中醫</h2>
                <p className={styles.intro}>
                了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提
                </p>
            </div>
            <div className={styles.courseCard}>
                <img
                className={styles.img}
                src="/course/img/18 (1).jpeg"
                alt
                />
                <h5 className={styles.tag}>寵物訓練</h5>
                <h2 className={styles.name}>犬貓營養與動物中醫</h2>
                <p className={styles.intro}>
                了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提
                </p>
            </div>
            <div className={styles.courseCard}>
                <img
                className={styles.img}
                src="/course/img/18 (1).jpeg"
                alt
                />
                <h5 className={styles.tag}>寵物訓練</h5>
                <h2 className={styles.name}>犬貓營養與動物中醫</h2>
                <p className={styles.intro}>
                了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提
                </p>
            </div>
            <div className={styles.courseCard}>
                <img
                className={styles.img}
                src="/course/img/18 (1).jpeg"
                alt
                />
                <h5 className={styles.tag}>寵物訓練</h5>
                <h2 className={styles.name}>犬貓營養與動物中醫</h2>
                <p className={styles.intro}>
                了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提
                </p>
            </div>
            <div className={styles.courseCard}>
                <img
                className={styles.img}
                src="/course/img/18 (1).jpeg"
                alt
                />
                <h5 className={styles.tag}>寵物訓練</h5>
                <h2 className={styles.name}>犬貓營養與動物中醫</h2>
                <p className={styles.intro}>
                了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提
                </p>
            </div>
            <div className={styles.courseCard}>
                <img
                className={styles.img}
                src="/course/img/18 (1).jpeg"
                alt
                />
                <h5 className={styles.tag}>寵物訓練</h5>
                <h2 className={styles.name}>犬貓營養與動物中醫</h2>
                <p className={styles.intro}>
                了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提
                </p>
            </div>
            <div className={styles.courseCard}>
                <img
                className={styles.img}
                src="/course/img/18 (1).jpeg"
                alt
                />
                <h5 className={styles.tag}>寵物訓練</h5>
                <h2 className={styles.name}>犬貓營養與動物中醫</h2>
                <p className={styles.intro}>
                了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提
                </p>
            </div>
            <div className={styles.courseCard}>
                <img
                className={styles.img}
                src="/course/img/18 (1).jpeg"
                alt
                />
                <h5 className={styles.tag}>寵物訓練</h5>
                <h2 className={styles.name}>犬貓營養與動物中醫</h2>
                <p className={styles.intro}>
                了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提了解犬貓基礎六大營養需求，及營養不足或過多造成疾病。自製鮮食如何計算毛孩需要的熱量、營養成分、提
                </p>
            </div>
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
