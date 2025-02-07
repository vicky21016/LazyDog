import React from 'react';
import Header from '../components/layout/header';
import TeacherSection from '../components/teacher/teacherSection';
import CourseSection from '../components/teacher/courseSection';
// import './App.css'; // 引入 CSS 文件

function App() {
  return (
    <div>
      <Header />
      <div className="mt-5">
        <section className="text-center">
          <h2>師資 & 課程服務</h2>
        </section>
        <TeacherSection />
        <CourseSection />
      </div>
    </div>
  );
}

export default App;
