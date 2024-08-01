import { useState } from 'react';
import { handleFileUpload } from '../utils/gpxUtils';

const useGpxFileHandler = () => {
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileUpload(file, setData, setPathCoordinates);
    }
  };

  return {
    pathCoordinates,
    data,
    handleFileChange,
  };
};

export default useGpxFileHandler;
