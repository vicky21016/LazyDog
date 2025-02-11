"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "../../../styles/modules/teacherCard.module.css"

const TeacherCard = ({ imgSrc, col, name, text, link }) => {
  return (
    <div className="row mb-5">
      <div className={col}>
        <Link href={link} passHref className="text-decoration-none">
          <div className={styles.card6} style={{ width: "18.75rem" }}>
            <img src={imgSrc} className="card-img-top" alt="..." />
            <div className={styles.card6-title} style={{}}>
              {name}
              <p
                className={styles.card6-description} 
                style={{  color: "#ff9538" }}
              >
                {text}
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className={col}>
        <Link href={link} passHref className="text-decoration-none">
          <div className="card" style={{ width: "18.75rem" }}>
            <img src={imgSrc} className="card-img-top" alt="..." />
            <div className="card-body fw-medium" style={{}}>
              {name}
              <p
                className="card-text mt-2 "
                style={{ fontSize: "12px", color: "#ff9538" }}
              >
                {text}
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className={col}>
        <Link href={link} passHref className="text-decoration-none">
          <div className="card" style={{ width: "18.75rem" }}>
            <img src={imgSrc} className="card-img-top" alt="..." />
            <div className="card-body fw-medium" style={{}}>
              {name}
              <p
                className="card-text mt-2 "
                style={{ fontSize: "12px", color: "#ff9538" }}
              >
                {text}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TeacherCard;
