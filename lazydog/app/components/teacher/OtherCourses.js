"use client";

import React, { useState } from "react";
import Link from "next/link";

const OtherCourses = ({ imgSrc, name, link }) => {
  return (
    <>
     
        <div className="col-4">
          <Link href={link} passHref className="text-decoration-none">
            <div className="card" style={{ width: "20rem" }}>
              <img src={imgSrc} className="card-img-top" alt="..." />
              <div className="card-body">{name}</div>
            </div>
          </Link>
        </div>
     
    </>
  );
};

export default OtherCourses;