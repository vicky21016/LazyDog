"use client";

import React, { useState, useEffect } from "react";
import styles from "./aside.module.css";
import Link from "next/link";

export default function FilterGroup(props) {
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      <div className={styles.FilterGroup}>
        <div className={styles.HotSaleGroup}>
          <h4 className={styles.FilterTitle}>本月主打</h4>
          <span
            className={styles.ShowMore}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "▲" : "▼"}
          </span>
        </div>
        {showMore && (
          <>
            <Link href="" className={styles.FormHot}>
              免費 Wi-Fi
            </Link>
            <Link href="" className={styles.FormHot}>
              免費 Wi-Fi
            </Link>
            <Link href="" className={styles.FormHot}>
              免費 Wi-Fi
            </Link>
          </>
        )}
      </div>
    </>
  );
}
