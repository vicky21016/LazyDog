"use client";

import "./product.css";
import Header from "../components/layout/header";
import {
  FetchListProvider,
  FetchCategoryProvider,
  FetchDetailProvider,
} from "@/hooks/product/use-fetch";
import {
  FavoriteListProvider,
  FavoriteCategoryProvider,
  FavoriteDetailProvider,
} from "@/hooks/product/use-favorite";

export default function AppLayout({ children }) {
  return (
    <FetchListProvider>
      <FetchCategoryProvider>
        <FetchDetailProvider>
          <FavoriteListProvider>
            <FavoriteCategoryProvider>
              <FavoriteDetailProvider>
                <div suppressHydrationWarning>
                  <Header />
                  {children}
                </div>
              </FavoriteDetailProvider>
            </FavoriteCategoryProvider>
          </FavoriteListProvider>
        </FetchDetailProvider>
      </FetchCategoryProvider>
    </FetchListProvider>
  );
}
