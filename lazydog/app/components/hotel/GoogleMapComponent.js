import React, { useEffect, useRef, useState } from "react";

const GoogleMapComponent = ({ hotels }) => {
  const mapRef = useRef(null);
  const [isApiLoaded, setIsApiLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=marker`;
      script.async = true;
      script.onload = () => setIsApiLoaded(true);
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

    hotels.forEach((hotel) => {
      if (hotel.latitude && hotel.longitude) {
        const lat = Number(hotel.latitude);
        const lng = Number(hotel.longitude);

        // **改用 AdvancedMarkerElement**
        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: { lat, lng },
          map,
          title: hotel.name,
          content: (() => {
            const div = document.createElement("div");
            div.innerHTML = `
              <div style="display: flex; align-items: center; gap: 5px;">
                <img src="/hotel/localtion.png" style="width: 30px; height: 30px;">
                <span>${hotel.name}</span>
              </div>
            `;
            return div;
          })(),
        });

        // 帶入飯店縮圖
        const imageUrl = hotel.image_url ? hotel.image_url : "/hotel/loding.jpg";

        // **設置 InfoWindow 內容**
        const contentString = `
          <div style="max-width: 200px">
            <img src="${imageUrl}" alt="${hotel.name}" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 5px;">
            <span>${hotel.name}</span>
          </div>
        `;

        // **添加點擊事件**
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
