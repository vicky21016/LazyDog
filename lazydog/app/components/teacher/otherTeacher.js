"use client";

import React from "react";
import Link from "next/link";
import styles from "../../../styles/modules/toggle.module.css";

const TeacherCard = ({ cards }) => {
  return (
    <div className="row mb-5 g-5">
      {cards.map((card, index) => (
        <div key={index} className={card.col}>
          <Link href={card.link} passHref className="text-decoration-none">
            <div className={styles.card6}>
              <img src={card.imgSrc} className="card-img-top" alt={card.name} />
              <div className={styles.card6Title}>{card.name}</div>
              <p
                className={styles.card6Description}
                style={{ }}
              >
                {card.text}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TeacherCard;
