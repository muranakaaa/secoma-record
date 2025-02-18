'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

const GoogleMap = ({ latitude, longitude, shopName }: { latitude: number | null; longitude: number | null; shopName: string }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const lat = latitude !== null && !isNaN(latitude) ? parseFloat(latitude.toString()) : null;
    const lng = longitude !== null && !isNaN(longitude) ? parseFloat(longitude.toString()) : null;

    if (lat === null || lng === null) {
      console.error("Google Maps: Invalid latitude or longitude", { latitude, longitude });
      return;
    }

    const map = new google.maps.Map(mapRef.current, {
      center: { lat, lng },
      zoom: 15,
    });

    new google.maps.Marker({
      position: { lat, lng },
      map,
      title: shopName,
    });

  }, [isLoaded, latitude, longitude]);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
        strategy="lazyOnload"
        onLoad={() => setIsLoaded(true)}
      />
      <div ref={mapRef} className="w-full h-96 mt-2 bg-gray-200"></div>
    </>
  );
};

export default GoogleMap;
