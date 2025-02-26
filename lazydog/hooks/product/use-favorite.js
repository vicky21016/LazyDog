"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import useSWR from "swr";

const FavoriteContext = createContext(null);
FavoriteContext.displayName = "FavoriteContext";

export function FavoriteProvider({ children }) {
  const { user } = useAuth();
  const fetcher = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("資料要求失敗");
      return res.json();
    } catch (err) {
      console.error("資料要求失敗:", err);
      throw err;
    }
  };
  const favoriteAPI = "http://localhost:5000/api/products/favorite";
  const {
    data: favoriteData,
    isLoading: favoriteLoading,
    error: favoriteError,
    mutate: favoriteMutate,
  } = useSWR(favoriteAPI, fetcher);
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    const updateFavorite = async () => {
      // console.log(favorite);
      let methodType = "POST";
      if (favoriteData?.data) {
        if (favoriteData?.data.find((v) => v.user_id === user?.id))
          methodType = "PATCH";
      }
      if (user?.id > 0) {
        const formData = new FormData();
        formData.append("userID", user?.id);
        formData.append("productIDlist", favorite.join(","));
        let API = "http://localhost:5000/api/products/favorite";
        try {
          const res = await fetch(API, {
            method: methodType,
            body: formData,
          });
          const result = await res.json();
          if (result.status != "success") throw new Error(result.message);
        } catch (error) {
          console.log(error);
          alert(error.message);
        }
      }
      favoriteMutate();
    };
    updateFavorite();
  }, [favorite]);
  return (
    <FavoriteContext.Provider
      value={{
        favorite,
        setFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export const useFavorite = () => useContext(FavoriteContext);
