'use client'

import React, { useState, useEffect } from 'react'

export default function ComponentsInputFiled({ type, placeholder, icon, value, onChange }) {
  return (
    <>
      <div className="input-wrapper">
        <input
          type={type}
          placeholder={placeholder}
          className="input-filed"
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

