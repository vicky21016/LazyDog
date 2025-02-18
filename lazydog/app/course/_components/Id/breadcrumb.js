'use client'

import React, { useState, useEffect } from 'react'
import styles from "../courseId.module.css";


export default function Breadcrumb(props) {
  return (
    <>
      <nav className={styles.breadcrumbs}>
          <ul>
            <li>
              <a href>課程</a>
            </li>
            <img src="/course/img/right.svg" alt />
            <li>
              <a href>一對一寵物美容教學實作</a>
            </li>
          </ul>
        </nav>
    </>
  )
}
