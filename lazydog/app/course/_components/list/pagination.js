'use client'

import { useState } from 'react'
import styles from "../courseList.module.css";


export default function Pagination() {

  return (
    <>
      <nav className={styles.navigation} aria-label="Page navigation">
                <ul className={`pagination justify-content-center ${styles.pagination}`}>
                    <li className={`page-item ${styles.pageItem} `}>
                    <a className={`page-link ${styles.pageLink}`} aria-label="Previous">
                        <span aria-hidden="true">
                        <img src="/course/img/pageArrowleft;png.png"   alt="" />
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
                        <img src="/course/img/pageArrowright.png"   alt="" />
                        </span>
                    </a>
                    </li>
                </ul>
            </nav>
    </>
  )
}
