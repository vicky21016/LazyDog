import { useState, useEffect, useRef } from "react";

export function useLocationSelector() {
  const [location, setLocation] = useState(""); // 儲存選擇的地區
  const locationModalRef = useRef(null);
  const twCityRef = useRef(null);
  let modalInstance = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    import("bootstrap").then((bootstrap) => {
      if (locationModalRef.current) {
        modalInstance.current = new bootstrap.Modal(locationModalRef.current);
      }
    });

    import("tw-city-selector").then((module) => {
      if (twCityRef.current) return;
      twCityRef.current = new module.default({
        el: "#twzipcode",
        elCounty: ".county",
        elDistrict: ".district",
        hasZipcode: false,
      });
    });
  }, []);

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
      setLocation(`${county} ${district}`);
    }
    closeModal();
  };

  const googleMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
    location || "台北,台灣"
  }&zoom=13&size=300x200&maptype=roadmap&markers=color:blue%7Clabel:${
    location || "台北"
  }&key=YOUR_GOOGLE_MAPS_API_KEY`;

  const openMap = () => {
    if (!location) {
      alert("請先選擇地區");
      return;
    }
    window.open(`https://www.google.com/maps?q=${location}`, "_blank");
  };

  return {
    location,
    locationModalRef,
    googleMapUrl,
    openModal,
    confirmLocation,
    openMap,
  };
}
