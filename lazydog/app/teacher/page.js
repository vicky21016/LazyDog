import React from 'react';
import Header from '../components/layout/header';
import TeacherSection from '../components/teacher/teacherSection';
import CourseSection from '../components/teacher/courseSection';
import styles from "../../styles/modules/toggle.module.css";

export default function App() {
  return (
    <div>
      <Header />
      <div className="">
        <section className="text-center">
          <h2 className={`${styles["server"]}`}>師資 & 課程服務</h2>
        </section>
        <TeacherSection />
        <CourseSection />
      </div>
    </div>
  );
}

