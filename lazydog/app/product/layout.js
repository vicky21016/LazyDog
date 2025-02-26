"use client";

import "./product.css";
import Header from "../components/layout/header";
import { FetchListProvider } from "@/hooks/product/use-fetch-list";
import { FetchCategoryProvider } from "@/hooks/product/use-fetch-category";
import { FavoriteProvider } from "@/hooks/product/use-favorite";

export default function AppLayout({ children }) {
  return (
    <FetchListProvider>
      <FetchCategoryProvider>
        {/* <FetchDetailProvider> */}
        {/* <FetchCardProvider> */}
        <FavoriteProvider>
          <div suppressHydrationWarning>
            <Header />
            {children}
          </div>
        </FavoriteProvider>
        {/* </FetchCardProvider> */}
        {/* </FetchDetailProvider> */}
      </FetchCategoryProvider>
    </FetchListProvider>
  );
}
