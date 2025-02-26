"use client";

import React, { useState, useEffect } from "react";
import styles from "../courseId.module.css";

export default function Breadcrumb({ course }) {
  const c = course?.[0];

  return (
    <>
      <nav className={styles.breadcrumbs}>
        <ul>
          <li>
            <a href={`/home`}>首頁</a>
          </li>
          <img src="/course/img/right.svg" alt="" />
          <li>
            <a href={`/course/list`}>課程列表</a>
          </li>
          <img src="/course/img/right.svg" alt="" />
          <li>
            <a href="">{c?.name}</a>
          </li>
        </ul>
      </nav>
    </>
  );
}
