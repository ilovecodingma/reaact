import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

// Chart.js 플러그인 등록
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement);

const App = () => {
  const [map, setMap] = useState(null);
  const [pathCoordinates, setPathCoordinates] = useState([]);
  const [data, setData] = useState({
    labels: [], // X축 레이블
    datasets: [
      {
        label: 'Elevation', // 데이터 레이블
        data: [], // Y축 데이터
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  });

  // Google Maps API 로드
  useEffect(() => {
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC77tl0dd9ratCrzRxArUENNE0liW_aSUQ&callback=initMap&v=weekly&libraries=geometry`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    window.initMap = initMap;
    document.head.appendChild(googleMapsScript);
  }, []);

  const initMap = () => {
    const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 37.5665, lng: 126.978 }, // 서울 위치
      zoom: 12,
    });
    setMap(mapInstance);
  };

  // GPX 파일에서 elevation과 경로 데이터를 파싱하는 함수
  const parseGpx = (gpxText) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(gpxText, 'application/xml');
    const trkpts = xmlDoc.getElementsByTagName('trkpt');

    const elevationData = Array.from(trkpts).map(trkpt => {
      const ele = trkpt.getElementsByTagName('ele')[0]?.textContent;
      return ele ? parseFloat(ele) : null;
    }).filter(ele => ele !== null);

    const coordinates = Array.from(trkpts).map(trkpt => ({
      lat: parseFloat(trkpt.getAttribute('lat')),
      lng: parseFloat(trkpt.getAttribute('lon')),
    }));

    return { elevationData, coordinates };
  };

  // GPX 파일 업로드 후 데이터 처리
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const gpxText = reader.result;
        const { elevationData, coordinates } = parseGpx(gpxText);

        // Update chart data
        setData({
          labels: elevationData.map((_, index) => `Point ${index + 1}`), // X축 레이블
          datasets: [
            {
              label: 'Elevation', // 데이터 레이블
              data: elevationData, // Y축 데이터
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }
          ]
        });

        // Update map path
        setPathCoordinates(coordinates);
      };
      reader.readAsText(file);
    }
  };

  // Update map with path and fit bounds
  useEffect(() => {
    if (map && pathCoordinates.length > 0) {
      // Add path to the map
      const path = new window.google.maps.Polyline({
        path: pathCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      path.setMap(map);

      // Fit map bounds to the path
      const bounds = new window.google.maps.LatLngBounds();
      pathCoordinates.forEach(coord => bounds.extend(new window.google.maps.LatLng(coord.lat, coord.lng)));
      map.fitBounds(bounds);
    }
  }, [map, pathCoordinates]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Elevation: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Point Index'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Elevation (meters)'
        }
      }
    }
  };

  return (
    <div>
      <h1>GPX File with Google Maps and Chart</h1>
      <input type="file" accept=".gpx" onChange={handleFileUpload} />
      <div id="map" style={{ width: '100%', height: '500px' }}></div>
      <div style={{ width: '80%', margin: '0 auto' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default App;
