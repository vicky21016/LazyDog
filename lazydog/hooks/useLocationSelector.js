import { useState, useEffect, useRef } from "react";
import { getHotelById } from "@/services/hotelService";

export function useLocationSelector(hotelId) {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [hotels, setHotels] = useState([]); 
  const locationModalRef = useRef(null);
  const twCityRef = useRef(null);
  let modalInstance = useRef(null);

  useEffect(() => {
    import("bootstrap").then((bootstrap) => {
      if (locationModalRef.current) {
        modalInstance.current = new bootstrap.Modal(locationModalRef.current);
      }
    });

    import("tw-city-selector").then((module) => {
      if (!twCityRef.current) {
        twCityRef.current = new module.default({
          el: "#twzipcode",
          elCounty: ".county",
          elDistrict: ".district",
          hasZipcode: false,
        });
      }
    });

    if (!hotelId) {
      fetchAllHotels();
    } else {
      fetchHotelLocation(hotelId);
    }
  }, [hotelId]);
  const fetchHotelLocation = async (hotelId) => {
    try {
      const hotelData = await getHotelById(hotelId);
      if (hotelData) {
        if (hotelData.latitude && hotelData.longitude) {
          setLocation({ lat: hotelData.latitude, lng: hotelData.longitude });
        }
        if (hotelData.address) {
          setAddress(hotelData.address);
        }
      } else {
        console.warn("無法獲取hotel資訊");
      }
    } catch (error) {
      console.error("獲取hotel資訊失敗:", error);
    }
  };
  const fetchAllHotels = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/hotels");
      const data = await res.json();
      setHotels(data || []);
    } catch (error) {
      console.error("獲取所有飯店失敗:", error);
    }
  };

  const openModal = () => {
    if (modalInstance.current) {
      modalInstance.current.show();
    }
  };

  const closeModal = () => {
    if (modalInstance.current) {
      modalInstance.current.hide();
    }
  };

  const confirmLocation = () => {
    const county = document.querySelector(".county")?.value || "";
    const district = document.querySelector(".district")?.value || "";
    if (county && district) {
      setAddress(`${county} ${district}`);
    }
    closeModal();
  };

  const openMap = () => {
    if (hotelId && location) {
      window.open(`https://www.google.com/maps?q=${location.lat},${location.lng}`, "_blank");
    } else {
      if (hotels.length === 0) {
        alert("目前沒有飯店資料，請稍後再試");
        return;
      }

      const markers = hotels
        .map((hotel) =>
          hotel.latitude && hotel.longitude
            ? `${hotel.latitude},${hotel.longitude}`
            : ""
        )
        .filter(Boolean)
        .join("/");

      const googleMapsUrl = `https://www.google.com/maps/dir/${markers}`;

      window.open(googleMapsUrl, "_blank");
    }
  };

  return {
    location,
    address,
    locationModalRef,
    closeModal,
    openModal,
    confirmLocation,
    openMap,
  };
}
