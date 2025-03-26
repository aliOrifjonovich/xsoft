"use client";
import React, { useEffect } from 'react';

declare global {
  interface Window {
    ymaps: any;
  }
}

const YandexMapScript: React.FC = () => {
  useEffect(() => {
    // Load Yandex Maps API script
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=8b09f7d0-30c2-4d55-a486-607e2139e456&lang=en_US';
    script.async = true;
    
    script.onload = () => {
      console.log('Yandex Maps API loaded');
    };
    
    document.head.appendChild(script);
    
    return () => {
      // Clean up if needed
      document.head.removeChild(script);
    };
  }, []);
  
  return null;
};

export default YandexMapScript;