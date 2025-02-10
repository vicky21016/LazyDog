"use client";

import React, { useState } from "react";
import Link from "next/link";

const TeacherCard = ({ imgSrc, col, name, text, link }) => {
  return (
    <div className="row mb-5">
      <div className={col}>
        <Link href={link} passHref className="text-decoration-none">
          <div className="card" style={{ width: "18.75rem" }}>
            <img src={imgSrc} className="card-img-top" alt="..." />
            <div className="card-body fw-medium" style={{ fontsize: "20px" }}>
              {name}
              <p className="card-text" style={{fontsize: "14px" , color: "#ff9538" }}>
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
            <div className="card-body">
              {name}
              <p className="card-text">{text}</p>
            </div>
          </div>
        </Link>
      </div>
      <div className={col}>
        <Link href={link} passHref className="text-decoration-none">
          <div className="card" style={{ width: "18.75rem" }}>
            <img src={imgSrc} className="card-img-top" alt="..." />
            <div className="card-body">
              {name}
              <p className="card-text">{text}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TeacherCard;
