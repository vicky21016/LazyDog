"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "../../../styles/modules/toggle.module.css";
const OtherCourses = ({ imgSrc, name, link }) => {
  return (
    <>
      <div className="col-12 col-md-6 col-lg-3">
        <Link href={link} passHref className="text-decoration-none">
          <div className={styles.card7} style={{ width: "18.75rem" }}>
            <img src={imgSrc} className="card-img-top" alt="..." />
            <div className={styles.card7Title}>{name}</div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default OtherCourses;