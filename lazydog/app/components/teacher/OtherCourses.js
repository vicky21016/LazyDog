"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "../../../styles/modules/toggle.module.css";
const OtherCourses = ({ imgSrc, name, link }) => {
  return (
    <>
      <div className="col-4">
        <Link href={link} passHref className="text-decoration-none">
          <div className={styles.card7} style={{ width: "25rem" }}>
            <img src={imgSrc} className="card-img-top" alt="..." />
            <div className={styles.card7Title}>{name}</div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default OtherCourses;