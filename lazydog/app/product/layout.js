"use client";

import "./product.css";
import Header from "../components/layout/header";
import { FetchListProvider } from "@/hooks/product/use-fetch";
import { FavoriteProvider } from "@/hooks/product/use-favorite";

export default function AppLayout({ children }) {
  return (
    <FetchListProvider>
      <FavoriteProvider>
        <div className="PDLayout" suppressHydrationWarning>
          <Header />
          {children}
        </div>
      </FavoriteProvider>
    </FetchListProvider>
  );
}
