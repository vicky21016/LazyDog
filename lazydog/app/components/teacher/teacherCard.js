"use client";

import React, { useState } from "react";
import Link from "next/link";

const TeacherCard = ({ imgSrc, text, link }) => {
  return (
    <div className="row mb-5">
      <div className="col-3">
        <Link href={link} passHref>
          <div className="card" style={{ width: "18.75rem" }}>
            <img src={imgSrc} className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">{text}</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="col-3">
        <Link href={link} passHref>
          <div className="card" style={{ width: "18.75rem" }}>
            <img src={imgSrc} className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">{text}</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="col-3">
        <Link href={link} passHref>
          <div className="card" style={{ width: "18.75rem" }}>
            <img src={imgSrc} className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">{text}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TeacherCard;
