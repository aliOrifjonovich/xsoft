"use client";
import React, { useEffect, useRef, useState } from 'react';

interface YandexMapProps {
  onLocationSelect: (latitude: string, longitude: string, mapLink: string) => void;
  initialLatitude?: string;
  initialLongitude?: string;
}

const YandexMap: React.FC<YandexMapProps> = ({ 
  onLocationSelect,
  initialLatitude = "41.311081", // Default to Tashkent, Uzbekistan
  initialLongitude = "69.240562" 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [placemarkInstance, setPlacemarkInstance] = useState<any>(null);

  useEffect(() => {
    // Initialize map once Yandex Maps API is loaded
    if (window.ymaps && mapRef.current && !mapInstance) {
      window.ymaps.ready(() => {
        // Create map instance
        const map = new window.ymaps.Map(mapRef.current, {
          center: [initialLatitude, initialLongitude],
          zoom: 13,
          controls: ['zoomControl', 'searchControl']
        });

        // Create initial placemark
        const placemark = new window.ymaps.Placemark([initialLatitude, initialLongitude], {
          hintContent: 'Branch location'
        }, {
          draggable: true
        });

        // Add placemark to map
        map.geoObjects.add(placemark);
        setMapInstance(map);
        setPlacemarkInstance(placemark);

        // Event for clicking on the map
        map.events.add('click', (e: any) => {
          const coords = e.get('coords');
          placemark.geometry.setCoordinates(coords);
          updateLocation(coords);
        });

        // Event for dragging the placemark
        placemark.events.add('dragend', () => {
          const coords = placemark.geometry.getCoordinates();
          updateLocation(coords);
        });

        // Initialize with default coordinates
        updateLocation([initialLatitude, initialLongitude]);
      });
    }
  }, [initialLatitude, initialLongitude, mapInstance]);

  const updateLocation = (coords: [string, string]) => {
    const latitude = coords[0].toString();
    const longitude = coords[1].toString();
    const mapLink = `https://yandex.com/maps/?ll=${longitude},${latitude}&z=17`;
    
    onLocationSelect(latitude, longitude, mapLink);
  };

  return (
    <div className="w-full h-96 rounded-md overflow-hidden border border-gray-300">
      <div ref={mapRef} className="w-full h-full"></div>
    </div>
  );
};

export default YandexMap;
