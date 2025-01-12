import  { useEffect } from 'react';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import { Box } from '@mui/material';

export const MapView = ({ vectorSource, onMapInit }) => {
    useEffect(() => {
      let initialMap;
      try {
        initialMap = new Map({
          target: 'map',
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
            new VectorLayer({
              source: vectorSource,
            }),
          ],
          view: new View({
            center: fromLonLat([0, 0]),
            zoom: 2,
          }),
        });
        
        onMapInit(initialMap);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
  
      return () => {
        if (initialMap) {
          initialMap.setTarget(undefined);
          // Clean up any additional map resources
          initialMap.getLayers().forEach(layer => {
            if (layer instanceof VectorLayer) {
              layer.getSource().clear();
            }
          });
        }
      };
    }, [vectorSource, onMapInit]);

    useEffect(() => {
        console.log('Initializing map');
        const initialMap = new Map({
          target: 'map',
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
            new VectorLayer({
              source: vectorSource,
            }),
          ],
          view: new View({
            center: fromLonLat([0, 0]),
            zoom: 2,
          }),
        });
        
        onMapInit(initialMap);
        
        return () => initialMap.setTarget(undefined);
      }, []);
  
    return <Box id="map" sx={{ flexGrow: 1 }} />;
  };
  

  export default MapView