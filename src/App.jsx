import  { useState } from 'react';
import { formatCoordinates } from './utils/mapUtils';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Draw from 'ol/interaction/Draw';
import { toLonLat } from 'ol/proj';
import DrawTools from './components/map/DrawTools';
import CoordinateModal from './components/modals/CoordinateModal';
import MapView from './components/map/MapView';

function App() {
  const [map, setMap] = useState(null);
  const [vectorSource] = useState(new VectorSource());
  const [modalOpen, setModalOpen] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [drawingMode, setDrawingMode] = useState(null);
  const [selectedInsertIndex, setSelectedInsertIndex] = useState(null);

  const handleMapInit = (mapInstance) => {
    const vectorLayer = new VectorLayer({ source: vectorSource });
    mapInstance.addLayer(vectorLayer);
    setMap(mapInstance);
  };

  const startDrawing = (type) => {
    if (!map) return;

    const drawInteraction = new Draw({
      source: vectorSource,
      type: type
    });

    // Handle drawing events
    drawInteraction.on('drawstart', (event) => {
      const feature = event.feature;
      
      feature.getGeometry().on('change', (e) => {
        const coords = e.target.getCoordinates();
        const transformedCoords = type === 'LineString' 
          ? coords.map(coord => toLonLat(coord))
          : coords[0].map(coord => toLonLat(coord));

        if (type === 'LineString') {
          setCoordinates(formatCoordinates(transformedCoords));
        } else {
          setPolygonCoordinates(formatCoordinates(transformedCoords, 'PW'));
        }
      });
    });

    // Handle Enter key to finish drawing
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        drawInteraction.finishDrawing();
        document.removeEventListener('keydown', handleKeyPress);
      }
    };
    document.addEventListener('keydown', handleKeyPress);

    map.addInteraction(drawInteraction);
    setDrawingMode(type);
    setModalOpen(true);
  };

  const handleInsertPolygon = (index, position) => {
    setSelectedInsertIndex(position === 'before' ? index : index + 1);
    startDrawing('Polygon');
  };

  const handleImportPolygon = () => {
    if (selectedInsertIndex !== null) {
      const newCoordinates = [...coordinates];
      newCoordinates.splice(selectedInsertIndex, 0, ...polygonCoordinates);
      setCoordinates(newCoordinates);
      setPolygonCoordinates([]);
      setSelectedInsertIndex(null);
      setDrawingMode('LineString');
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <DrawTools onStartDrawing={startDrawing} />
      <MapView onMapInit={handleMapInit} />
      <CoordinateModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        coordinates={coordinates}
        polygonCoordinates={polygonCoordinates}
        drawingMode={drawingMode}
        onInsertPolygon={handleInsertPolygon}
        onImportPolygon={handleImportPolygon}
      />
    </div>
  );
}

export default App;