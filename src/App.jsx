import { useState, useCallback } from "react";
import VectorSource from "ol/source/Vector";
import { Alert } from "@mui/material";
import { setupDrawInteraction, updateCoordinates } from "./utils/mapUtils";
import DrawTools from "./components/map/DrawTools";
import MapView from "./components/map/MapView";
import CoordinatesModal from "./components/modals/CoordinateModal";

const App = () => {
  const [map, setMap] = useState(null);
  const [draw, setDraw] = useState(null);
  const [vectorSource] = useState(() => new VectorSource());
  const [modalOpen, setModalOpen] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [drawingMode, setDrawingMode] = useState(null);
  const [error, setError] = useState(null);

  // Map initialization handler
  const handleMapInit = useCallback(mapInstance => {
    console.log("Map initialization:", mapInstance);
    try {
      if (!mapInstance) {
        throw new Error("Map initialization failed");
      }
      setMap(mapInstance);
      setError(null);
    } catch (err) {
      setError("Failed to initialize map");
      console.error("Map initialization error:", err);
    }
  }, []);

  // Drawing interaction setup
  const startDrawing = useCallback(
    type => {
      console.log("Starting drawing mode:", type);
      console.log("Current map state:", map);

      if (!map) {
        setError("Map not initialized");
        return;
      }

      try {
        // Clear any existing draw interaction
        if (draw) {
          console.log("Removing existing draw interaction");
          map.removeInteraction(draw);
        }

        // Setup new draw interaction
        console.log("Setting up new draw interaction");
        const drawInteraction = setupDrawInteraction(
          map,
          { source: vectorSource },
          type,
          (coords, prefix) => {
            console.log("Coordinates updated:", coords);
            const points = updateCoordinates(coords, prefix);
            if (prefix === "WP") {
              setCoordinates(points);
            } else {
              setPolygonCoordinates(points);
            }
          }
        );

        if (!drawInteraction) {
          throw new Error("Failed to create draw interaction");
        }

        // Setup key press handler
        const handleKeyPress = e => {
          if (e.key === "Enter") {
            console.log("Enter key pressed, finishing drawing");
            drawInteraction.finishDrawing();
          }
        };

        document.addEventListener("keydown", handleKeyPress);

        // Add interaction to map
        console.log("Adding draw interaction to map");
        map.addInteraction(drawInteraction);
        setDraw(drawInteraction);
        setDrawingMode(type);

        // Open modal
        console.log("Opening modal");
        setModalOpen(true);
        setError(null);

        return () => {
          document.removeEventListener("keydown", handleKeyPress);
          if (map && drawInteraction) {
            map.removeInteraction(drawInteraction);
          }
        };
      } catch (err) {
        console.error("Drawing initialization error:", err);
        setError("Failed to start drawing");
      }
    },
    [map, draw, vectorSource]
  );

  // Add console logs to modal handlers
  const handleModalClose = useCallback(() => {
    console.log("Closing modal");
    try {
      setModalOpen(false);
      if (draw) {
        map.removeInteraction(draw);
        setDraw(null);
      }
    } catch (err) {
      console.error("Modal close error:", err);
      setError("Failed to close modal");
    }
  }, [draw, map]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <DrawTools onStartDrawing={startDrawing} />

      <MapView vectorSource={vectorSource} onMapInit={handleMapInit} />

      <CoordinatesModal
        open={modalOpen}
        onClose={handleModalClose}
        drawingMode={drawingMode}
        coordinates={coordinates}
        polygonCoordinates={polygonCoordinates}
        onMenuClick={() => {}} // Add handlers as needed
        onImportPoints={() => {}} // Add handlers as needed
      />
    </div>
  );
};

export default App;
