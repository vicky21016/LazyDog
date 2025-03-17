"use client";

import React, { useState, useEffect } from "react";
import styles from "../../cart/css/CartList.module.css";
export default function Thead(props) {
  return (
    <>
      <thead>
        <tr>
          <th style={{ width: 110 }} className={styles.imgth} />
          <th>品項</th>
          <th>單價</th>
          <th>數量</th>
          <th>總價</th>
          <th />
        </tr>
      </thead>
    </>
  );
}
