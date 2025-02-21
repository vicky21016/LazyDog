import { useEffect, useRef, useState } from "react";

export function useGoogleMap(address) {
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!address) return;

    const codeAd = async () => {
      const apiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // 🔥 替換成你的 Google Maps API Key
      const endAddress = encodeURIComponent(address);
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${endAddress}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setLocation({ lat, lng });
        } else {
          console.error("地址無法轉換為經緯度");
        }
      } catch (error) {
        console.error("Geocoding API 錯誤:", error);
      }
    };

    codeAd();
  }, [address]);

  useEffect(() => {
    if (location && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: location,
        zoom: 15,
      });

      new window.google.maps.Marker({
        position: location,
        map,
        title: "旅館位置",
      });
    }
  }, [location]);

  return mapRef;
}
