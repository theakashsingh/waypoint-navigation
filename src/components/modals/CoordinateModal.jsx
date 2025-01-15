import { 
  Dialog, 
  DialogTitle, 
  DialogContent,
  Button,
  Box
} from '@mui/material';
import CoordinateTable from './CoordinateTable';

function CoordinateModal({ 
  isOpen, 
  onClose, 
  coordinates, 
  polygonCoordinates, 
  drawingMode,
  onInsertPolygon,
  onImportPolygon 
}) {
  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>
        {drawingMode === 'LineString' ? 'Mission Planner' : 'Polygon Creation'}
      </DialogTitle>
      <DialogContent>
        {drawingMode === 'LineString' ? (
          <CoordinateTable 
            points={coordinates} 
            showActions={true} 
            onInsertPolygon={onInsertPolygon}
          />
        ) : (
          <Box>
            <CoordinateTable 
              points={polygonCoordinates} 
              showActions={false} 
            />
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button 
                variant="contained" 
                onClick={onImportPolygon}
              >
                Import Points
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CoordinateModal