// src/MapComponent.js

import React, { useEffect } from 'react';

const MapComponent = ({ pathCoordinates }) => {
  useEffect(() => {
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC77tl0dd9ratCrzRxArUENNE0liW_aSUQ&callback=initMap&v=weekly&libraries=geometry`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    window.initMap = initMap;
    document.head.appendChild(googleMapsScript);

    function initMap() {
      const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.5665, lng: 126.978 }, // 서울 위치
        zoom: 12,
      });

      if (pathCoordinates && pathCoordinates.length > 0) {
        const path = new window.google.maps.Polyline({
          path: pathCoordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });
        path.setMap(mapInstance);

        const bounds = new window.google.maps.LatLngBounds();
        pathCoordinates.forEach(coord => bounds.extend(new window.google.maps.LatLng(coord.lat, coord.lng)));
        mapInstance.fitBounds(bounds);
      }
    }

    return () => {
      document.head.removeChild(googleMapsScript);
    };
  }, [pathCoordinates]);

  return <div id="map" style={{ width: '100%', height: '500px' }}></div>;
};

export default MapComponent;
