import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
  } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";
  
  // eslint-disable-next-line react/prop-types
  const StorageArea = ({ open, handleClose }) => {
  
    const transactions = Array(7).fill({
        explanation: "[KEP Evidence: Accepted by HS06] [KEP Message] evidence ...   ",
        transfer: "20",
        history: "3.10.2024 14:22",
      });
    
  
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <strong>Storage Area</strong>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
  
        <DialogContent dividers>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-100">
                  <TableCell><strong>Explanation</strong></TableCell>
                  <TableCell><strong>Alan(MB)</strong></TableCell>
                  <TableCell><strong>History</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {transactions.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.explanation}</TableCell>
                  <TableCell>{item.transfer}</TableCell>
                  <TableCell>{item.history}</TableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
  
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default StorageArea;
  