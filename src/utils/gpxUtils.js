export const parseGpx = (gpxText) => {
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
  
  export const handleFileUpload = (file, setData, setPathCoordinates) => {
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
  