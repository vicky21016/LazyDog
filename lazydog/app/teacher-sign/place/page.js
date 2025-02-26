"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import My from "../_components/my";
import TeacherPlace from "../_components/teacher-place";

export default function PlacePage() {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <My/>
          <TeacherPlace/>
        </div>
      </div>

    </>
  );
}
