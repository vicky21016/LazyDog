"use client";

import React, { useState, useEffect } from "react";
import "./product.css";
import Script from "next/script";
import Header from "../components/layout/header";
// import Footer from "../components/layout/footer";

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
        <body suppressHydrationWarning>
          <Header />
          {children}
        </body>
      </html>
    </>
  );
}
