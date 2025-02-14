"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "../../../styles/modules/toggle.module.css"

const TeacherCard = ({ imgSrc, col, name, text, link }) => {
  return (
    <div className="row mb-5 g-5">
      <div className={col}>
        <Link href={link} passHref className="text-decoration-none">
          <div className={styles.card6} >
            <img src={imgSrc} className="card-img-top" alt="..." />
            <div className={styles.card6Title} style={{}}>
              {name}
            </div>
            <p className={styles.card6Description} style={{ color: "#ff9538" }}>
              {text}
            </p>
          </div>
        </Link>
      </div>
      <div className={col}>
        <Link href={link} passHref className="text-decoration-none">
          <div className={styles.card6} >
            <img src={imgSrc} className="card-img-top" alt="..." />
            <div className={styles.card6Title} style={{}}>
              {name}
            </div>
            <p className={styles.card6Description} style={{ color: "#ff9538" }}>
              {text}
            </p>
          </div>
        </Link>
      </div>
      <div className={col}>
        <Link href={link} passHref className="text-decoration-none">
          <div className={styles.card6} >
            <img src={imgSrc} className="card-img-top" alt="..." />
            <div className={styles.card6Title} style={{}}>
              {name}
            </div>
            <p className={styles.card6Description} style={{ color: "#ff9538" }}>
              {text}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TeacherCard;
