"use client";

import { createContext, useContext, useState, useEffect } from "react";
import useSWR from "swr";

const ListFetchContext = createContext(null);
ListFetchContext.displayName = "ListFetchContext";
const CategoryFetchContext = createContext(null);
CategoryFetchContext.displayName = "CategoryFetchContext";
const DetailFetchContext = createContext(null);
DetailFetchContext.displayName = "DetailFetchContext";

export function FetchListProvider({ children }) {
  const [newUrl, setNewUrl] = useState("http://localhost:5000/api/products");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [sortName, setSortName] = useState("依商品名稱排序");
  const [pageNow, setPageNow] = useState(1);

  const changeUrl = (newUrl) => {
    setNewUrl(newUrl);
    if (pageNow !== 1) {
      setPageNow(1);
    }
  };

  useEffect(() => {
    changeUrl(
      `http://localhost:5000/api/products?&min=${minPrice}&max=${maxPrice}${
        sortName == "依商品名稱排序"
          ? "&sort=name"
          : sortName == "依商品價格⬆排序"
          ? "&sort=price"
          : sortName == "依商品價格⬇排序"
          ? "&sort=priceDown"
          : sortName == "依上架時間⬆排序"
          ? "&sort=update"
          : sortName == "依上架時間⬇排序"
          ? "&sort=updateDown"
          : ""
      }`
    );
  }, [minPrice, maxPrice]);

  const fetcher = async (newUrl) => {
    try {
      const res = await fetch(newUrl);
      if (!res.ok) throw new Error("資料要求失敗");
      return res.json();
    } catch (err) {
      console.error("資料要求失敗:", err);
      throw err;
    }
  };
  const { data, isLoading, error, mutate } = useSWR(newUrl, fetcher);
  const products = data?.data;

  let pages = "";
  if (products) pages = Math.ceil(products.length / 24);
  const product = products?.slice((pageNow - 1) * 24, pageNow * 24);
  return (
    <ListFetchContext.Provider
      value={{
        products,
        changeUrl,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        sortName,
        setSortName,
        pages,
        pageNow,
        setPageNow,
        product,
        mutate,
        isLoading,
        error,
      }}
    >
      {children}
    </ListFetchContext.Provider>
  );
}

export function FetchCategoryProvider({ children }) {
  const [newUrl, setNewUrl] = useState("http://localhost:5000/api/products");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [sortName, setSortName] = useState("依商品名稱排序");
  const [pageNow, setPageNow] = useState(1);

  const changeUrl = (newUrl) => {
    setNewUrl(newUrl);
    if (pageNow !== 1) {
      setPageNow(1);
    }
  };

  useEffect(() => {
    changeUrl(
      `http://localhost:5000/api/products?&min=${minPrice}&max=${maxPrice}${
        sortName == "依商品名稱排序"
          ? "&sort=name"
          : sortName == "依商品價格⬆排序"
          ? "&sort=price"
          : sortName == "依商品價格⬇排序"
          ? "&sort=priceDown"
          : sortName == "依上架時間⬆排序"
          ? "&sort=update"
          : sortName == "依上架時間⬇排序"
          ? "&sort=updateDown"
          : ""
      }`
    );
  }, [minPrice, maxPrice]);

  const fetcher = async (newUrl) => {
    try {
      const res = await fetch(newUrl);
      if (!res.ok) throw new Error("資料要求失敗");
      return res.json();
    } catch (err) {
      console.error("資料要求失敗:", err);
      throw err;
    }
  };
  const { data, isLoading, error, mutate } = useSWR(newUrl, fetcher);
  const products = data?.data;

  let pages = "";
  if (products) pages = Math.ceil(products.length / 24);
  const product = products?.slice((pageNow - 1) * 24, pageNow * 24);
  return (
    <CategoryFetchContext.Provider
      value={{
        products,
        changeUrl,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        sortName,
        setSortName,
        pages,
        pageNow,
        setPageNow,
        product,
        mutate,
        isLoading,
        error,
      }}
    >
      {children}
    </CategoryFetchContext.Provider>
  );
}

export function FetchDetailProvider({ children }) {
  const [newUrl, setNewUrl] = useState("http://localhost:5000/api/products");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [sortName, setSortName] = useState("依商品名稱排序");
  const [pageNow, setPageNow] = useState(1);

  const changeUrl = (newUrl) => {
    setNewUrl(newUrl);
    if (pageNow !== 1) {
      setPageNow(1);
    }
  };

  useEffect(() => {
    changeUrl(
      `http://localhost:5000/api/products?&min=${minPrice}&max=${maxPrice}${
        sortName == "依商品名稱排序"
          ? "&sort=name"
          : sortName == "依商品價格⬆排序"
          ? "&sort=price"
          : sortName == "依商品價格⬇排序"
          ? "&sort=priceDown"
          : sortName == "依上架時間⬆排序"
          ? "&sort=update"
          : sortName == "依上架時間⬇排序"
          ? "&sort=updateDown"
          : ""
      }`
    );
  }, [minPrice, maxPrice]);

  const fetcher = async (newUrl) => {
    try {
      const res = await fetch(newUrl);
      if (!res.ok) throw new Error("資料要求失敗");
      return res.json();
    } catch (err) {
      console.error("資料要求失敗:", err);
      throw err;
    }
  };
  const { data, isLoading, error, mutate } = useSWR(newUrl, fetcher);
  const products = data?.data;

  let pages = "";
  if (products) pages = Math.ceil(products.length / 24);
  const product = products?.slice((pageNow - 1) * 24, pageNow * 24);
  return (
    <DetailFetchContext.Provider
      value={{
        products,
        changeUrl,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        sortName,
        setSortName,
        pages,
        pageNow,
        setPageNow,
        product,
        mutate,
        isLoading,
        error,
      }}
    >
      {children}
    </DetailFetchContext.Provider>
  );
}

export const useListFetch = () => useContext(ListFetchContext);
export const useCategoryFetch = () => useContext(CategoryFetchContext);
export const useDetailFetch = () => useContext(DetailFetchContext);
