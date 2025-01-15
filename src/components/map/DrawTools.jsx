import { Button, Box } from '@mui/material';

function DrawTools({ onStartDrawing }) {
  return (
    <Box p={2} borderBottom={1} borderColor="divider">
      <Button 
        variant="contained" 
        onClick={() => onStartDrawing('LineString')}
      >
        Draw
      </Button>
    </Box>
  );
}

export default DrawTools