import { useEffect, useRef, useState } from "react";

export function useGoogleMap(lat, lng, mapRef) {
  const [isLoaded, setIsLoaded] = useState(false);
  const scriptRef = useRef(null); // 避免重複加載 script

  useEffect(() => {
    if (!lat || !lng || !mapRef.current) {
      return;
    }

    if (typeof window !== "undefined" && window.google && window.google.maps) {
      setIsLoaded(true);
    } else if (!scriptRef.current) {
      scriptRef.current = document.createElement("script");
      scriptRef.current.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDfCdeVzmet4r4U6iU5M1C54K9ooF3WrV4&libraries=places`;
      scriptRef.current.async = true;
      scriptRef.current.defer = true;
      scriptRef.current.onload = () => {
        console.log(" Google Maps API 加載成功！");
        setIsLoaded(true);
      };
      document.head.appendChild(scriptRef.current);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (!isLoaded || !lat || !lng || !mapRef.current) return;
    
    console.log("📍 初始化 Google 地圖，位置:", { lat, lng });

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat, lng },
      zoom: 15,
    });

    new window.google.maps.Marker({
      position: { lat, lng },
      map,
      title: "旅館位置",
    });
  }, [isLoaded, lat, lng]);
}
