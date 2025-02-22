"use client";

import React, { useEffect, useRef, useState } from "react";

const GoogleMapComponent = ({ hotels }) => {
  const mapRef = useRef(null);
  const [isApiLoaded, setIsApiLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => {
        setIsApiLoaded(true);
      };
      document.head.appendChild(script);
    } else {
      setIsApiLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isApiLoaded || !hotels.length || !mapRef.current) return;


    const google = window.google;
    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 23.6978, lng: 120.9605 }, // 台灣中心點
      zoom: 7,
    });

    const infoWindow = new google.maps.InfoWindow(); // 🔥 新增 InfoWindow

    hotels.forEach((hotel, index) => {
      if (hotel.latitude && hotel.longitude) {
        const lat = Number(hotel.latitude);
        const lng = Number(hotel.longitude);

        const marker = new google.maps.Marker({
          position: { lat, lng },
          map,
          title: hotel.name,
          icon: {
            url: "/hotel/localtion.png", // 標記圖示
            scaledSize: new google.maps.Size(40, 40),
          },
        });

        // 帶入飯店縮圖 (假設 hotel.image_url 是 API 傳回的圖片)
        const imageUrl = hotel.image_url
          ? hotel.image_url
          : "/hotel/loding.jpg"; // 預設圖片

        // 設置 InfoWindow 的 HTML 內容
        const contentString = `
          <div style="max-width: 200px">
            <img src="${imageUrl}" alt="${hotel.name}" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 5px;">
            <span>${hotel.name}</span>
            </div>
        `;

        marker.addListener("click", () => {
          infoWindow.setContent(contentString);
          infoWindow.open(map, marker);
        });
      }
    });
  }, [isApiLoaded, hotels]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default GoogleMapComponent;
