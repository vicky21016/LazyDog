"use client";

import { createContext, useContext, useState, useEffect } from "react";
// import { usePathname, useSearchParams } from "next/navigation";
import useSWR from "swr";

const ListFetchContext = createContext(null);
ListFetchContext.displayName = "ListFetchContext";
// const CategoryFetchContext = createContext(null);
// CategoryFetchContext.displayName = "CategoryFetchContext";
// const DetailFetchContext = createContext(null);
// DetailFetchContext.displayName = "DetailFetchContext";
// const CardFetchContext = createContext(null);
// CardFetchContext.displayName = "CardFetchContext";

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

// export function FetchCategoryProvider({ children }) {
//   const query = useSearchParams();
//   const pathname = usePathname();
//   const [category, setCategory] = useState(query.get("category"));
//   useEffect(() => {
//     setCategory(query.get("category"));
//   }, [pathname, query]);
//   const [sortName, setSortName] = useState("依商品名稱排序");
//   const [newUrl, setNewUrl] = useState(
//     `http://localhost:5000/api/products/category?category=${category}${
//       sortName == "依商品名稱排序"
//         ? "&sort=name"
//         : sortName == "依商品價格⬆排序"
//         ? "&sort=price"
//         : sortName == "依商品價格⬇排序"
//         ? "&sort=priceDown"
//         : sortName == "依上架時間⬆排序"
//         ? "&sort=update"
//         : sortName == "依上架時間⬇排序"
//         ? "&sort=updateDown"
//         : ""
//     }`
//   );
//   const [keyword, setKeyword] = useState({
//     主分類: [],
//     種類: [],
//     適用年齡: [],
//     功能: [],
//     口味: [],
//     穀類: [],
//     適用體型: [],
//   });
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(5000);
//   const [pageNow, setPageNow] = useState(1);
//   const changeUrl = (newUrl) => {
//     setNewUrl(newUrl);
//     if (pageNow !== 1) {
//       setPageNow(1);
//     }
//   };

//   useEffect(() => {
//     if (
//       keyword?.主分類.length == 0 &&
//       keyword?.種類.length == 0 &&
//       keyword?.適用年齡.length == 0 &&
//       keyword?.功能.length == 0 &&
//       keyword?.口味.length == 0 &&
//       keyword?.穀類.length == 0 &&
//       keyword?.適用體型.length == 0
//     ) {
//       changeUrl(
//         `http://localhost:5000/api/products/category?category=${category}&min=${minPrice}&max=${maxPrice}${
//           sortName == "依商品名稱排序"
//             ? "&sort=name"
//             : sortName == "依商品價格⬆排序"
//             ? "&sort=price"
//             : sortName == "依商品價格⬇排序"
//             ? "&sort=priceDown"
//             : sortName == "依上架時間⬆排序"
//             ? "&sort=update"
//             : sortName == "依上架時間⬇排序"
//             ? "&sort=updateDown"
//             : ""
//         }`
//       );

//       return;
//     } else {
//       changeUrl(
//         `http://localhost:5000/api/products/search?category=${category}&main=${keyword?.主分類.join(
//           ","
//         )}&type=${keyword?.種類.join(",")}&age=${keyword?.適用年齡.join(
//           ","
//         )}&feature=${keyword?.功能.join(",")}&flavor=${keyword?.口味.join(
//           ","
//         )}&cereal=${keyword?.穀類.join(",")}&size=${keyword?.適用體型.join(
//           ","
//         )}&min=${minPrice}&max=${maxPrice}${
//           sortName == "依商品名稱排序"
//             ? "&sort=name"
//             : sortName == "依商品價格⬆排序"
//             ? "&sort=price"
//             : sortName == "依商品價格⬇排序"
//             ? "&sort=priceDown"
//             : sortName == "依上架時間⬆排序"
//             ? "&sort=update"
//             : sortName == "依上架時間⬇排序"
//             ? "&sort=updateDown"
//             : ""
//         }`
//       );
//     }
//   }, [keyword, minPrice, maxPrice]);

//   const fetcher = async (newUrl) => {
//     try {
//       const res = await fetch(newUrl);
//       if (!res.ok) throw new Error("資料要求失敗");
//       return res.json();
//     } catch (err) {
//       console.error("資料要求失敗:", err);
//       throw err;
//     }
//   };
//   const { data, isLoading, error, mutate } = useSWR(newUrl, fetcher);
//   const products = data?.data;

//   let pages = "";
//   if (products) pages = Math.ceil(products.length / 24);
//   const product = products?.slice((pageNow - 1) * 24, pageNow * 24);
//   return (
//     <CategoryFetchContext.Provider
//       value={{
//         category,
//         keyword,
//         setKeyword,
//         changeUrl,
//         minPrice,
//         setMinPrice,
//         maxPrice,
//         setMaxPrice,
//         sortName,
//         setSortName,
//         pages,
//         pageNow,
//         setPageNow,
//         product,
//         mutate,
//         isLoading,
//         error,
//       }}
//     >
//       {children}
//     </CategoryFetchContext.Provider>
//   );
// }

// export function FetchDetailProvider({ children }) {
//   const [newUrl, setNewUrl] = useState("http://localhost:5000/api/products");
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(30000);
//   const [sortName, setSortName] = useState("依商品名稱排序");
//   const [pageNow, setPageNow] = useState(1);

//   const changeUrl = (newUrl) => {
//     setNewUrl(newUrl);
//     if (pageNow !== 1) {
//       setPageNow(1);
//     }
//   };

//   useEffect(() => {
//     changeUrl(
//       `http://localhost:5000/api/products?&min=${minPrice}&max=${maxPrice}${
//         sortName == "依商品名稱排序"
//           ? "&sort=name"
//           : sortName == "依商品價格⬆排序"
//           ? "&sort=price"
//           : sortName == "依商品價格⬇排序"
//           ? "&sort=priceDown"
//           : sortName == "依上架時間⬆排序"
//           ? "&sort=update"
//           : sortName == "依上架時間⬇排序"
//           ? "&sort=updateDown"
//           : ""
//       }`
//     );
//   }, [minPrice, maxPrice]);

//   const fetcher = async (newUrl) => {
//     try {
//       const res = await fetch(newUrl);
//       if (!res.ok) throw new Error("資料要求失敗");
//       return res.json();
//     } catch (err) {
//       console.error("資料要求失敗:", err);
//       throw err;
//     }
//   };
//   const { data, isLoading, error, mutate } = useSWR(newUrl, fetcher);
//   const products = data?.data;

//   let pages = "";
//   if (products) pages = Math.ceil(products.length / 24);
//   const product = products?.slice((pageNow - 1) * 24, pageNow * 24);
//   return (
//     <DetailFetchContext.Provider
//       value={{
//         products,
//         changeUrl,
//         minPrice,
//         setMinPrice,
//         maxPrice,
//         setMaxPrice,
//         sortName,
//         setSortName,
//         pages,
//         pageNow,
//         setPageNow,
//         product,
//         mutate,
//         isLoading,
//         error,
//       }}
//     >
//       {children}
//     </DetailFetchContext.Provider>
//   );
// }

// export function FetchCardProvider({ children }) {
//   const [newUrl, setNewUrl] = useState("http://localhost:5000/api/products");
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(30000);
//   const [sortName, setSortName] = useState("依商品名稱排序");
//   const [pageNow, setPageNow] = useState(1);

//   const changeUrl = (newUrl) => {
//     setNewUrl(newUrl);
//     if (pageNow !== 1) {
//       setPageNow(1);
//     }
//   };

//   useEffect(() => {
//     changeUrl(
//       `http://localhost:5000/api/products?&min=${minPrice}&max=${maxPrice}${
//         sortName == "依商品名稱排序"
//           ? "&sort=name"
//           : sortName == "依商品價格⬆排序"
//           ? "&sort=price"
//           : sortName == "依商品價格⬇排序"
//           ? "&sort=priceDown"
//           : sortName == "依上架時間⬆排序"
//           ? "&sort=update"
//           : sortName == "依上架時間⬇排序"
//           ? "&sort=updateDown"
//           : ""
//       }`
//     );
//   }, [minPrice, maxPrice]);

//   const fetcher = async (newUrl) => {
//     try {
//       const res = await fetch(newUrl);
//       if (!res.ok) throw new Error("資料要求失敗");
//       return res.json();
//     } catch (err) {
//       console.error("資料要求失敗:", err);
//       throw err;
//     }
//   };
//   const { data, isLoading, error, mutate } = useSWR(newUrl, fetcher);
//   const products = data?.data;

//   let pages = "";
//   if (products) pages = Math.ceil(products.length / 24);
//   const product = products?.slice((pageNow - 1) * 24, pageNow * 24);
//   return (
//     <CardFetchContext.Provider
//       value={{
//         products,
//         changeUrl,
//         minPrice,
//         setMinPrice,
//         maxPrice,
//         setMaxPrice,
//         sortName,
//         setSortName,
//         pages,
//         pageNow,
//         setPageNow,
//         product,
//         mutate,
//         isLoading,
//         error,
//       }}
//     >
//       {children}
//     </CardFetchContext.Provider>
//   );
// }

export const useListFetch = () => useContext(ListFetchContext);
// export const useCategoryFetch = () => useContext(CategoryFetchContext);
// export const useDetailFetch = () => useContext(DetailFetchContext);
// export const useCardFetch = () => useContext(CardFetchContext);
