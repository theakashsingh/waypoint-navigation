import { fromLonLat } from 'ol/proj';
import { LineString } from 'ol/geom';
import { getLength } from 'ol/sphere';

export function calculateDistances(coords) {
  const distances = [];
  for (let i = 1; i < coords.length; i++) {
    const line = new LineString([
      fromLonLat(coords[i - 1]),
      fromLonLat(coords[i])
    ]);
    distances.push(Math.round(getLength(line)));
  }
  return distances;
}

export function formatCoordinates(coords, prefix = 'WP') {
  return coords.map((coord, index) => ({
    id: `${prefix}${String(index).padStart(2, '0')}`,
    coordinates: coord,
    distance: 0
  }));
}