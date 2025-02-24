"use client";

import "./product.css";
import Header from "../components/layout/header";
// import Footer from "../components/layout/footer";

export default function AppLayout({ children }) {
  return (
    <>
      <div suppressHydrationWarning>
        <Header />
        {children}
      </div>
    </>
  );
}
