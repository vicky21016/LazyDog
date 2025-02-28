"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import useSWR from "swr";

const ListFetchContext = createContext(null);
ListFetchContext.displayName = "ListFetchContext";
const CategoryFetchContext = createContext(null);
CategoryFetchContext.displayName = "CategoryFetchContext";
const DetailFetchContext = createContext(null);
DetailFetchContext.displayName = "DetailFetchContext";
const CardFetchContext = createContext(null);
CardFetchContext.displayName = "CardFetchContext";
const AsideFetchContext = createContext(null);
AsideFetchContext.displayName = "AsideFetchContext";

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
  const emptyMessage = data?.message;

  let pages = "";
  if (products) pages = Math.ceil(products.length / 24);
  const product = products?.slice((pageNow - 1) * 24, pageNow * 24);
  return (
    <ListFetchContext.Provider
      value={{
        products,
        emptyMessage,
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
  const query = useSearchParams();
  const category = query.get("category");
  const [sortName, setSortName] = useState("依商品名稱排序");
  const [newUrl, setNewUrl] = useState(
    `http://localhost:5000/api/products/category?category=${category}${
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
  const [keyword, setKeyword] = useState({
    主分類: [],
    種類: [],
    適用年齡: [],
    功能: [],
    口味: [],
    穀類: [],
    適用體型: [],
  });
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [pageNow, setPageNow] = useState(1);
  const changeUrl = (newUrl) => {
    setNewUrl(newUrl);
    if (pageNow !== 1) {
      setPageNow(1);
    }
  };

  useEffect(() => {
    if (
      keyword?.主分類.length == 0 &&
      keyword?.種類.length == 0 &&
      keyword?.適用年齡.length == 0 &&
      keyword?.功能.length == 0 &&
      keyword?.口味.length == 0 &&
      keyword?.穀類.length == 0 &&
      keyword?.適用體型.length == 0
    ) {
      changeUrl(
        `http://localhost:5000/api/products/category?category=${category}&min=${minPrice}&max=${maxPrice}${
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

      return;
    } else {
      changeUrl(
        `http://localhost:5000/api/products/search?category=${category}&main=${keyword?.主分類.join(
          ","
        )}&type=${keyword?.種類.join(",")}&age=${keyword?.適用年齡.join(
          ","
        )}&feature=${keyword?.功能.join(",")}&flavor=${keyword?.口味.join(
          ","
        )}&cereal=${keyword?.穀類.join(",")}&size=${keyword?.適用體型.join(
          ","
        )}&min=${minPrice}&max=${maxPrice}${
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
    }
  }, [keyword, minPrice, maxPrice]);

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
  const emptyMessage = data?.message;

  let pages = "";
  if (products) pages = Math.ceil(products.length / 24);
  const product = products?.slice((pageNow - 1) * 24, pageNow * 24);
  return (
    <CategoryFetchContext.Provider
      value={{
        products,
        emptyMessage,
        category,
        keyword,
        setKeyword,
        newUrl,
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
  const query = useSearchParams();
  const product = query.get("productID");
  const router = useRouter();
  const loginRoute = "/login";
  const [picNow, setPicNow] = useState(0);
  const [rate, setRate] = useState(3);
  const [amount, setAmount] = useState(1);
  const [cardPic, setCardPic] = useState("/product/img/default.webp");

  const url = `http://localhost:5000/api/products/${product}`;
  const url2 = "http://localhost:5000/api/products/order";
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
  const { data, isLoading, error, mutate } = useSWR(url, fetcher);
  const {
    data: orderData,
    isLoading: orderLoading,
    error: orderError,
    mutate: orderMutate,
  } = useSWR(url2, fetcher);
  const productData = data?.data[0];
  const productName = productData?.name;
  const img = {
    list: [],
    img: [],
    sm: [],
    info: [],
  };
  if (productData) {
    img["list"].push(productData?.listImg);
    img["img"] = (productData?.img).split(",");
    if (productData?.smImg) img["sm"] = (productData?.smImg).split(",");
    if (productData?.infoImg) img["info"] = (productData?.infoImg).split(",");
  }
  const productDiscount = 0;

  const rateData = {
    rate: [],
    comment: [],
    user: [],
    img: [],
    date: [],
  };
  let rateAvg = 0;
  if (data?.data) {
    data?.data.map((v, i) => {
      rateData["rate"].push(v.rate);
      rateData["user"].push(v.user);
      rateData["img"].push(v.userImg);
      rateData["comment"].push(v.comment);
      rateData["date"].push(v.commentTime);
    });
    let rateSum = 0;
    for (let i = 0; i < rateData["rate"].length; i++) {
      rateSum += rateData["rate"][i];
    }
    rateAvg = (rateSum / rateData["rate"].length).toFixed(1);
  }
  let int, dec;
  if (rateAvg) {
    [int, dec] = rateAvg.toString().split(".");
    if (!dec) dec = 0;
  }
  const orders = orderData?.data;
  const hotSale = [];
  const sameBuy = [];
  const sameCategory = data?.data[0].productID.slice(0, 6);
  orders?.map((v, i) => {
    if (i < 10) hotSale.push(v.productID);
    if (sameBuy.length < 10 && v.productID.includes(sameCategory))
      sameBuy.push(v.productID);
  });

  useEffect(() => {
    if (productName) {
      const newImage = new Image();
      const encodedImageName = encodeURIComponent(productName);
      newImage.src = `/product/img/${encodedImageName}${img.img[picNow]}`;
      newImage.onload = () => setCardPic(newImage.src);
      newImage.onerror = () => setCardPic("/product/img/default.webp");
    }
  }, [productName]);
  return (
    <DetailFetchContext.Provider
      value={{
        product,
        router,
        loginRoute,
        productData,
        productName,
        productDiscount,
        img,
        picNow,
        setPicNow,
        rate,
        setRate,
        amount,
        setAmount,
        cardPic,
        setCardPic,
        rateData,
        rateAvg,
        int,
        dec,
        hotSale,
        sameBuy,
        mutate,
        isLoading,
        error,
      }}
    >
      {children}
    </DetailFetchContext.Provider>
  );
}

export function FetchCardProvider({ children, productID = "" }) {
  const router = useRouter();
  const loginRoute = "/login";

  const url = productID
    ? `http://localhost:5000/api/products/${productID}`
    : null;
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
  const { data, isLoading, error, mutate } = useSWR(url, fetcher);

  const products = data?.data[0];
  const productName = products?.name;

  const [cardHover, setCardHover] = useState(false);
  const [cartHover, setCartHover] = useState(false);
  const [cartRate, setCartRate] = useState(0);

  const [cardPic, setCardPic] = useState("/product/img/default.webp");
  const cardRef = useRef(null);
  const simulateClick = (e) => {
    if (e.target.dataset.clickable) {
      if (cardRef.current) {
        cardRef.current.click();
      }
    }
  };
  useEffect(() => {
    if (productName) {
      const img = new Image();
      const encodedImageName = encodeURIComponent(productName);
      img.src = `/product/img/${encodedImageName}_title.webp`;
      img.onload = () => setCardPic(img.src);
      img.onerror = () =>
        setCardPic(`/product/img/${encodedImageName}_(1).webp`);
    }
  }, [productName]);

  return (
    <CardFetchContext.Provider
      value={{
        productID,
        router,
        loginRoute,
        products,
        productName,
        cardHover,
        setCardHover,
        cartHover,
        setCartHover,
        cartRate,
        setCartRate,
        cardPic,
        setCardPic,
        cardRef,
        simulateClick,
        mutate,
        isLoading,
        error,
      }}
    >
      {children}
    </CardFetchContext.Provider>
  );
}

export function FetchAsideProvider({
  children,
  changeUrl = () => {},
  keyword = {},
  setKeyword = () => {},
  minPrice = 0,
  maxPrice = 0,
  setMaxPrice = () => {},
  setMinPrice = () => {},
  sortName = "",
}) {
  const pathname = usePathname();
  const query = useSearchParams();
  const url = "http://localhost:5000/api/products/categoryName";
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
  const { data, isLoading, error, mutate } = useSWR(url, fetcher);
  const categorys = data?.data;
  const categoryName = [];
  const category = {};
  const categoryClass = [];
  if (categorys) {
    categorys.map((v, i) => {
      if (!categoryName.includes(v.category)) {
        categoryName.push(v.category);
        category[v.category] = [];
      }
      category[v.category].push(v);
    });
  }
  if (category) {
    categoryName.forEach((v, i) => {
      categoryClass[i] = [];
      category[v].map((v) => {
        if (!categoryClass[i].find((e) => e == v.class)) {
          categoryClass[i].push(v.class);
        }
      });
    });
  }
  const i = categoryName.findIndex((v) => v == query.get("category"));
  useEffect(() => {}, [pathname, query]);

  return (
    <AsideFetchContext.Provider
      value={{
        changeUrl,
        keyword,
        setKeyword,
        minPrice,
        maxPrice,
        setMaxPrice,
        setMinPrice,
        sortName,
        category,
        categoryName,
        categoryClass,
        i,
        pathname,
        query,
        mutate,
        isLoading,
        error,
      }}
    >
      {children}
    </AsideFetchContext.Provider>
  );
}

export const useListFetch = () => useContext(ListFetchContext);
export const useCategoryFetch = () => useContext(CategoryFetchContext);
export const useDetailFetch = () => useContext(DetailFetchContext);
export const useCardFetch = () => useContext(CardFetchContext);
export const useAsideFetch = () => useContext(AsideFetchContext);
