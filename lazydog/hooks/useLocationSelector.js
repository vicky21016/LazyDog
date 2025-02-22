import { useState, useEffect, useRef } from "react";
import { getHotelById } from "@/services/hotelService";

export function useLocationSelector(hotelId) {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
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

    if (hotelId) {
      fetchHotelLocation();
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

  const googleMapUrl = location
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=15&size=300x200&maptype=roadmap&markers=color:blue%7Clabel:H%7C${location.lat},${location.lng}&key=AIzaSyDfCdeVzmet4r4U6iU5M1C54K9ooF3WrV4`
    : `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
        address || "台北,台灣"
      )}&zoom=13&size=300x200&maptype=roadmap&markers=color:blue%7Clabel:H%7C${encodeURIComponent(
        address || "台北"
      )}&key=AIzaSyDfCdeVzmet4r4U6iU5M1C54K9ooF3WrV4`;

  const openMap = () => {
    const query = location
      ? `${location.lat},${location.lng}`
      : encodeURIComponent(address);
    window.open(`https://www.google.com/maps?q=${query}`, "_blank");
  };

  return {
    location,
    address,
    locationModalRef,
    googleMapUrl,
    closeModal,
    openModal,
    confirmLocation,
    openMap,
  };
}
