"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

const GoogleMap = ({
  latitude,
  longitude,
  shopName,
}: {
  latitude: number | null;
  longitude: number | null;
  shopName: string;
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markerInstance = useRef<google.maps.Marker | null>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (!window.google || !window.google.maps) return;

    isLoaded.current = true;
    if (!mapRef.current || !latitude || !longitude) return;

    const lat = parseFloat(latitude.toString());
    const lng = parseFloat(longitude.toString());

    if (isNaN(lat) || isNaN(lng)) {
      console.error("Google Maps: Invalid latitude or longitude", { latitude, longitude });
      return;
    }

    if (!mapInstance.current) {
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 15,
      });
    } else {
      mapInstance.current.setCenter({ lat, lng });
    }

    if (!markerInstance.current) {
      markerInstance.current = new google.maps.Marker({
        position: { lat, lng },
        map: mapInstance.current,
        title: shopName,
      });
    } else {
      markerInstance.current.setPosition({ lat, lng });
      markerInstance.current.setTitle(shopName);
    }
  }, [latitude, longitude, shopName]);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
        strategy="lazyOnload"
        onLoad={() => (isLoaded.current = true)}
      />
      <div ref={mapRef} className="w-full h-96 mt-2 bg-gray-200"></div>
    </>
  );
};

export default GoogleMap;
