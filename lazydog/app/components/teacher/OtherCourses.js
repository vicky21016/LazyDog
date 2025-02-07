"use client";

import React, { useState } from "react";
import TeacherCard from "./teacherCard";

const OtherCourses = ({ name }) => {
  return (
    <>
      <h6 className="mb-4">看看其他{name}</h6>
      <div className="row">
        <TeacherCard imgSrc="..." text="Some quick example text to build on the card title and make up the bulk of the card's content."  link="" />
        
      </div>
    </>
  );
};

export default OtherCourses;