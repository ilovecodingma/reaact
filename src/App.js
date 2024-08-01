import React from 'react';
import ChartComponent from './Component/ChartComponent';
import MapComponent from './Component/MapComponent';
import useGpxFileHandler from './hooks/useGpxFileHandler';

const App = () => {
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

export default App;
