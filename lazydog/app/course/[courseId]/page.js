"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import styles from "../_components/courseId.module.css";
import Header from "@/app/components/layout/header";
import Breadcrumb from "../_components/Id/breadcrumb";
import CoursePics from "../_components/Id/course-pics";
import SimilarCourseCard from "../_components/Id/similar-course-card";
import CourseIntro from "../_components/Id/course-intro";

export default function CourseIdPage() {
  const params = useParams();
  const courseCode = params.courseId;

  const [course, setCourse] = useState(null);
  const [session, setSession] = useState([]);
  const [place, setPlace] = useState(null);
  const [imgs, setImgs] = useState(null);
  const [simiCourse, setSimiCourse] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/course/${courseCode}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        setCourse(data.course);
        setSession(data.session);
        setPlace(data.place);
        setImgs(data.imgs);
        setSimiCourse(data.simiCourse);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [courseCode]);

  // const { data, loading, error } = useFetch(
  //   `http://localhost:5000/api/course/${courseCode}`
  // )

  // console.log(data);
  // console.log("Course data:", course);
  // console.log("Session data:", session);

  return (
    <>
      <Header />
      <Breadcrumb course={course} />
      <div>
        <div className={styles.section1}>
          <CoursePics imgs={imgs} />
          <div className={styles.right}>
            <CourseIntro course={course} session={session} place={place} />
          </div>
        </div>
        <div className={styles.section2}>
          <img
            className={styles.brownWave}
            src="/course/img/brownWave.png"
            alt=""
          />
          <SimilarCourseCard simiCourse={simiCourse} />
        </div>
      </div>
    </>
  );
}
