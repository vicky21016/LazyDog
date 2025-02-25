'use client'

import React, { useState, useEffect } from 'react'
import styles from "../../../styles/modules/form.module.css"
export default function ComponentsInputFiled({ type, placeholder, icon, value, onChange }) {
  return (
    <>
      <div className={`${styles.inputWrapper}`}>
        <input
          type={type}
          placeholder={placeholder}
          className={`${styles.inputfiled}`}
          required
          value={value} // 綁定 value 到狀態
          onChange={onChange}
        />
        <i>{icon}</i>
        {/* {type === "password" && <i>visibility_off</i>} */}
      </div>
    </>
  );
}

