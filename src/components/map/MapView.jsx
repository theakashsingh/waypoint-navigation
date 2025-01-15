import { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Paper } from '@mui/material';

function MapView({ onMapInit }) {
  const mapRef = useRef();

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2
      })
    });

    onMapInit(map);

    return () => map.setTarget(undefined);
  }, []);

  return (
    <Paper 
      ref={mapRef} 
      elevation={3} 
      sx={{ width: '100%', height: '500px' }} 
    />
  );
}

export default MapView