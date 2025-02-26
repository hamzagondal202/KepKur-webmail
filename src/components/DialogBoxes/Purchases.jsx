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
  const Purchases = ({ open, handleClose }) => {
  
    const transactions = Array(7).fill({
        transDate: "3.10.2024 14:22",
        prodName: "GonderAI",
        subscriptCode: "[ilayda.kuran@hs06.kep.tr] Gonder AI",
      });
    
  
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <strong>Purchases</strong>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
  
        <DialogContent dividers>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-100">
                  <TableCell><strong>Transaction Date</strong></TableCell>
                  <TableCell><strong>Payment Confirmation Code</strong></TableCell>
                  <TableCell><strong>Product Name</strong></TableCell>
                  <TableCell><strong>Subscription Code</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {transactions.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.transDate}</TableCell>
                  <TableCell></TableCell>
                  <TableCell>{item.prodName}</TableCell>
                  <TableCell>{item.subscriptCode}</TableCell>
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
  
  export default Purchases;
  