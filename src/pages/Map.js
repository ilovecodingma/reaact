import React, { useState } from 'react';
import ChartComponent from '../components/ChartComponent';
import MapComponent from '../components/MapComponent';
import '../CSS/Map.css';
import useGpxFileHandler from '../hook/useGpxFileHandler';

const Map = () => {
  const { pathCoordinates, data, handleFileChange } = useGpxFileHandler();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="map-container">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
        <ul onClick={(e) => e.stopPropagation()}>
          <li>Menu Item 1</li>
          <li>Menu Item 2</li>
          <li>Menu Item 3</li>
        </ul>
      </div>
      <div className="main-content">
        <h1>GPX File with Google Maps and Chart</h1>
        <input type="file" accept=".gpx" onChange={handleFileChange} />
        <MapComponent pathCoordinates={pathCoordinates} />
        <ChartComponent data={data} />
      </div>
    </div>
  );
};

export default Map;
