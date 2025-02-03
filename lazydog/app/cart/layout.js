"use client";

import "@/styles/globals.css";
import React, { useState, useEffect } from "react";

export default function AppLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body>{children}</body>
      </html>
    </>
  );
}
