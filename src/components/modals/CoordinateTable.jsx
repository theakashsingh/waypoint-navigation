import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const CoordinatesTable = ({ points, isLineString, onMenuClick }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Waypoint</TableCell>
        <TableCell>Coordinates</TableCell>
        <TableCell>Distance (m)</TableCell>
        {isLineString && <TableCell>Actions</TableCell>}
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
          {isLineString && (
            <TableCell>
              <IconButton onClick={(e) => onMenuClick(e, index)}>
                <MoreVertIcon />
              </IconButton>
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default CoordinatesTable;