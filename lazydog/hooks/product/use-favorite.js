"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import useSWR from "swr";

const FavoriteContext = createContext(null);
FavoriteContext.displayName = "FavoriteContext";
const DetailFavoriteContext = createContext(null);
DetailFavoriteContext.displayName = "DetailFavoriteContext";
const CardFavoriteContext = createContext(null);
CardFavoriteContext.displayName = "CardFavoriteContext";

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

export function DetailFavoriteProvider({ children }) {
  const query = useSearchParams();
  const product = query.get("productID");
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
      let methodType = "POST";
      favoriteData?.data.find((v) => v.user_id === user?.id);
      methodType = "PATCH";
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

  const [heartHover, setHeartHover] = useState(false);
  const [heartState, setHeartState] = useState(false);
  useEffect(() => {
    if (favorite?.includes(product)) setHeartState(true);
  }, [favorite]);
  return (
    <DetailFavoriteContext.Provider
      value={{
        favorite,
        setFavorite,
        heartHover,
        setHeartHover,
        heartState,
        setHeartState,
      }}
    >
      {children}
    </DetailFavoriteContext.Provider>
  );
}

export function CardFavoriteProvider({
  children,
  productID = "",
  favorite = [],
  setFavorite = () => {},
}) {
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
  useEffect(() => {
    if (favoriteData?.data) {
      const userFavorite = favoriteData?.data.find(
        (v) => v.user_id == user?.id
      );
      if (userFavorite?.productID_list) {
        setFavorite(userFavorite?.productID_list.split(","));
      }
    }
  }, [favoriteData]);

  const [heartHover, setHeartHover] = useState(false);
  const [heartState, setHeartState] = useState(false);

  useEffect(() => {
    if (favorite?.includes(productID)) setHeartState(true);
  }, [favorite]);
  return (
    <CardFavoriteContext.Provider
      value={{
        favorite,
        setFavorite,
        heartHover,
        setHeartHover,
        heartState,
        setHeartState,
        productID,
      }}
    >
      {children}
    </CardFavoriteContext.Provider>
  );
}

export const useFavorite = () => useContext(FavoriteContext);
export const useDetailFavorite = () => useContext(DetailFavoriteContext);
export const useCardFavorite = () => useContext(CardFavoriteContext);
