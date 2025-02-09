"use client";

import React, { useState, useEffect } from "react";
import "./globals.css";
import Script from "next/script";

export default function AppLayout({ children }) {
  return (
    <>
      <html lang="en">
        <head>
          <Script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
            strategy="afterInteractive"
          />
        </head>
        <body>{children}</body>
      </html>
    </>
  );
}
