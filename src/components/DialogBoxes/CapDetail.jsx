import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
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
import { Download, Close } from "@mui/icons-material";

// eslint-disable-next-line react/prop-types
const CapDetailModal = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong className="text-3xl">Cap Detail</strong>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TableContainer component={Paper} sx={{ mb: 2, p: 2, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ backgroundColor: "#f5f5f5", p: 1, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>MESSAGE INFORMATION</Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>From whom:</TableCell>
                <TableCell align="right">kepservisi@hs06.kep.tr</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Team:</TableCell>
                <TableCell align="right">ilayda.kuran@hs06.kep.tr</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Subject:</TableCell>
                <TableCell align="right">[KEP Evidence: Delivered]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>History:</TableCell>
                <TableCell align="right">2025-02-11 14:53:36</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper} sx={{ mb: 2, p: 2, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ backgroundColor: "#f5f5f5", p: 1, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>CONTENTS</Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Content</TableCell>
                <TableCell colSpan={2}>
                  <Typography variant="body2">
                    Proof of Delivery to the Recipient: <b>ILAYDA KURAN</b> by the user
                    ilayda.kuran@hs06.kep.tr on
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    2025-02-11T14:53:36+03:00
                  </Typography>
                  <Typography variant="body2">• cigdem.yilmaz@hs06.kep.tr</Typography>
                  <Typography variant="body2">
                    The message with the number <b>cekpur.remmd.8be1da12...</b> was delivered.
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6">DETAILS</Typography>
        <Typography variant="body2" fontWeight="bold" mt={1} mb={1}>
          Attachments
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>File name</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>DeliveryNonDeliveryToRecipient.xml</TableCell>
                <TableCell>
                  <Button variant="contained" color="success" startIcon={<Download />}>
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" startIcon={<Download />}>
          Download
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CapDetailModal;

