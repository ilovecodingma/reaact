// src/App.js

import React, { useState } from 'react';
import ChartComponent from './ChartComponent';
import MapComponent from './MapComponent';

const App = () => {
  const [pathCoordinates, setPathCoordinates] = useState([]);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Elevation',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });

  const parseGpx = (gpxText) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(gpxText, 'application/xml');
    const trkpts = xmlDoc.getElementsByTagName('trkpt');

    const elevationData = Array.from(trkpts).map((trkpt) => {
      const ele = trkpt.getElementsByTagName('ele')[0]?.textContent;
      return ele ? parseFloat(ele) : null;
    }).filter((ele) => ele !== null);

    const coordinates = Array.from(trkpts).map((trkpt) => ({
      lat: parseFloat(trkpt.getAttribute('lat')),
      lng: parseFloat(trkpt.getAttribute('lon')),
    }));

    return { elevationData, coordinates };
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const gpxText = reader.result;
        const { elevationData, coordinates } = parseGpx(gpxText);

        setData({
          labels: elevationData.map((_, index) => `Point ${index + 1}`),
          datasets: [
            {
              label: 'Elevation',
              data: elevationData,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        });

        setPathCoordinates(coordinates);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <h1>GPX File with Google Maps and Chart</h1>
      <input type="file" accept=".gpx" onChange={handleFileUpload} />
      <MapComponent pathCoordinates={pathCoordinates} />
      <ChartComponent data={data} />
    </div>
  );
};

export default App;
