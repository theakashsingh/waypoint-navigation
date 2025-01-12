import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box
} from '@mui/material';
import CoordinatesTable from './CoordinateTable';

const CoordinatesModal = ({
  open,
  onClose,
  drawingMode,
  coordinates,
  polygonCoordinates,
  onMenuClick,
  onImportPoints
}) => {
  console.log('Modal props:', { open, drawingMode, coordinates, polygonCoordinates });
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>
        {drawingMode === 'LineString' ? 'Mission Planner' : 'Polygon Creation'}
      </DialogTitle>
      <DialogContent>
        <CoordinatesTable 
          points={drawingMode === 'LineString' ? coordinates : polygonCoordinates}
          isLineString={drawingMode === 'LineString'}
          onMenuClick={onMenuClick}
        />
        
        {drawingMode === 'Polygon' && polygonCoordinates.length > 0 && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant="contained" 
              onClick={onImportPoints}
            >
              Import Points
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CoordinatesModal;