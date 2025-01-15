import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function CoordinateTable({ points, showActions, onInsertPolygon }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  const handleInsert = (position) => {
    onInsertPolygon(selectedIndex, position);
    handleClose();
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Waypoint</TableCell>
          <TableCell>Coordinates</TableCell>
          <TableCell>Distance (m)</TableCell>
          {showActions && <TableCell>Actions</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {points.map((point, index) => (
          <TableRow key={point.id}>
            <TableCell>{point.id}</TableCell>
            <TableCell>
              {point.coordinates[0].toFixed(8)}, {point.coordinates[1].toFixed(8)}
            </TableCell>
            <TableCell>{point.distance}</TableCell>
            {showActions && (
              <TableCell>
                <IconButton onClick={(e) => handleClick(e, index)}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleInsert('before')}>
          Insert Polygon Before
        </MenuItem>
        <MenuItem onClick={() => handleInsert('after')}>
          Insert Polygon After
        </MenuItem>
      </Menu>
    </Table>
  );
}

export default CoordinateTable