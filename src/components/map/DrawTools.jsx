import { Box, Button } from '@mui/material';

const DrawTools = ({ onStartDrawing }) => (
  <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
    <Button 
      variant="contained" 
      onClick={() => onStartDrawing('LineString')}
    >
      Draw
    </Button>
  </Box>
);

export default DrawTools;