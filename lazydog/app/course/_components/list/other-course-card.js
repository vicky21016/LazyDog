'use client'

import { useState, useEffect } from 'react'
import styles from "../courseList.module.css";
import Link from 'next/link';


export default function OtherCourseCard() {
  
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/course/`)
      .then((res) => res.json())
      .then((data) => {
        setLatest(data.data.latest);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);
  // console.log(latest);

  return (
    <>
       <div className={styles.similarCourse}>
            <h2 className={styles.sTitle}>近期開課</h2>
            <div className={styles.sBars}>
              <div className={styles.sbar} />
              <div className={styles.btns}>
                <img
                  className={styles.arrowLeft}
                  src="/course/img/arrow-left.png"

                  alt={`往左箭頭`}

                />
                <img
                  className={styles.arrowRight}
                  src="/course/img/arrow-right.png"

                  alt={`往右箭頭`}

                />
              </div>
            </div>
            <div className={styles.sCards}>
              {latest?.map((la)=>(
                <Link className={styles.sCard} key={la.courseId} href={`/course/${la.courseId}`}>
                  <img
                      className={styles.cardImg}
                      src={`/course/img/${la.img_url}`}

                      alt={la.courseName}

                  />
                  <h5 className={styles.cardName}>{la.courseName}</h5>
                </Link>
              ))}
            </div>
       </div>    
    </>
  )
}
