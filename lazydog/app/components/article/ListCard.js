"use client";

import { useEffect,useState } from "react";
import Link from "next/link";
import styles from "./listCard.module.css";

export default function ListCard() {


  <>
    <div className={styles.card}>
      <img
        src="/article_img/02c0a9ae-33e0-4004-bae4-557aa330b090.webp"
        alt="文章封面"
      />

      <div className={styles.cardDetail} style={{ color: '#9F9F9F' }}>
        <div className={styles.author}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>{' '}
          Tom
        </div>
        <div className={styles.time}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-calendar"
            viewBox="0 0 16 16"
          >
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
          </svg>{' '}
          2025-01-01
        </div>
        <div className={styles.category}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-tag-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          </svg>{' '}
          保健與營養
        </div>
      </div>

      <p>為什麼你該幫家裡的貓狗梳毛？——為毛孩梳毛的 6 大好處</p>
      <a href="#">
        <p>Read more</p>
      </a>
    </div>
  </>
}