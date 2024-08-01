// src/pages/Map.js
import React from 'react';
// src/App.js
import ChartComponent from '../components/ChartComponent'; // 'Component'가 아니라 'components'
import MapComponent from '../components/MapComponent'; // 'Component'가 아니라 'components'

import useGpxFileHandler from '../hook/useGpxFileHandler';

const Map = () => {
  const { pathCoordinates, data, handleFileChange } = useGpxFileHandler();

  return (
    <div>
      <h1>GPX File with Google Maps and Chart</h1>
      <input type="file" accept=".gpx" onChange={handleFileChange} />
      <MapComponent pathCoordinates={pathCoordinates} />
      <ChartComponent data={data} />
    </div>
  );
};

export default Map;
