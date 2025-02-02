"use client";

import React, { useState, useEffect } from "react";
import "../styles/globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
