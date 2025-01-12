import { LineString } from 'ol/geom';
import { fromLonLat, toLonLat } from 'ol/proj';
import { getLength } from 'ol/sphere';
import { Draw } from 'ol/interaction';

export const calculateDistance = (coords) => {
  try {
    if (!Array.isArray(coords) || coords.length < 2) return 0;
    const line = new LineString(coords.map(coord => fromLonLat(coord)));
    return Math.round(getLength(line));
  } catch (error) {
    console.error('Error calculating distance:', error);
    return 0;
  }
};

export const updateCoordinates = (coords, prefix) => {
  try {
    if (!Array.isArray(coords) || !prefix) {
      throw new Error('Invalid coordinates or prefix');
    }
    return coords.map((coord, index) => ({
      id: `${prefix}${String(index).padStart(2, '0')}`,
      coordinates: coord,
      distance: calculateDistance(coords.slice(0, index + 1))
    }));
  } catch (error) {
    console.error('Error updating coordinates:', error);
    return [];
  }
};

export const setupDrawInteraction = (map, draw, type, onCoordinatesUpdate) => {
  if (!map || !draw || !type || !onCoordinatesUpdate) {
    console.error('Missing required parameters for draw interaction');
    return null;
  }

  try {
    const drawInteraction = new Draw({
      source: draw.source,
      type: type,
      condition: (evt) => evt.type === 'click'
    });

    const handleGeometryChange = (e) => {
      const geometry = e.target;
      const coords = geometry.getCoordinates();
      
      if (type === 'LineString') {
        const transformedCoords = coords.map(coord => toLonLat(coord));
        onCoordinatesUpdate(transformedCoords, 'WP');
      } else if (type === 'Polygon') {
        const transformedCoords = coords[0].map(coord => toLonLat(coord));
        onCoordinatesUpdate(transformedCoords, 'PW');
      }
    };

    drawInteraction.on('drawstart', (event) => {
      const feature = event.feature;
      feature.getGeometry().on('change', handleGeometryChange);
    });

    drawInteraction.on('drawend', (event) => {
      const feature = event.feature;
      // Clean up geometry change listener when drawing ends
      feature.getGeometry().un('change', handleGeometryChange);
    });

    return drawInteraction;
  } catch (error) {
    console.error('Error setting up draw interaction:', error);
    return null;
  }
};