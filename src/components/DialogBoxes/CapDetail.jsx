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
        {/* <TableContainer component={Paper} sx={{ mb: 2, p: 2, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ backgroundColor: "#f5f5f5", p: 1, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>MESSAGE INFORMATION</Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>From whom:</TableCell>
                <TableCell align="left">kepservisi@hs06.kep.tr</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Team:</TableCell>
                <TableCell align="left">ilayda.kuran@hs06.kep.tr</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Subject:</TableCell>
                <TableCell align="left">[KEP Evidence: Delivered]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>History:</TableCell>
                <TableCell align="left">2025-02-11 14:53:36</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer> */}
        <div className="my-4">
          <div className="border rounded-md relative">
            <div className="text-lg bg-white font-semibold px-4 py-2 absolute -top-6 left-4">Message Information</div>
            <div className="flex flex-row p-8">
              <div className="flex flex-col mr-10">
                <div className="my-2">From whom</div>
                <div className="my-2">Team</div>
                <div className="my-2">Subject</div>
                <div className="my-2">History</div>
              </div>
              <div className="flex flex-col">
                <div className="my-2">kepservisi@hs06.kep.tr</div>
                <div className="my-2">ilayda.kuran@hs06.kep.tr</div>
                <div className="my-2">[KEP Evidence: Delivered to çigdem.yilmaz@hs06.kep.tr] [KEP Message] ahhahah</div>
                <div className="my-2">2025-02-11 14:53:36</div>
              </div>
            </div>
          </div>
        </div>

        {/* <TableContainer component={Paper} sx={{ mb: 2, p: 2, borderRadius: 2 }}>
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
        </TableContainer> */}

        <div className="my-6">
          <div className="border rounded-md relative">
            <div className="text-lg bg-white font-semibold px-4 py-2 absolute -top-6 left-4">Contents</div>
            <div className="flex flex-row p-8">
              <div className="flex flex-col mr-16">
                <div className="my-2">Content</div>
              </div>
              <div className="flex flex-col">
                <div className="my-2">
                  Proof of Delivery to the Recipient: <b>ILAYDA KURAN</b> by the user
                  ilayda.kuran@hs06.kep.tr on
                </div>
                <div className="my-1">
                  <b>2025-02-11T14:53:36+03:00</b>
                </div>
                <div className="my-1">• cigdem.yilmaz@hs06.kep.tr</div>
                <div className="my-2">
                  The message with the number <b>cekpur.remmd.8be1da12...</b> was delivered.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <Typography variant="h6">DETAILS</Typography>
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
        </TableContainer> */}
        <div className="my-4">
          <div className="border rounded-md relative">
            {/* Title with absolute positioning */}
            <div className="text-lg bg-white font-semibold px-4 py-2 absolute -top-6 left-4">
              Details
            </div>

            <div className="p-8 flex flex-col">
              {/* Attachments section with limited-width border */}
              <div className="relative mb-4">
                <div className="font-semibold inline-block border-b-4 border-blue-600">Attachments</div>
              </div>

              {/* File info row */}
              <div className="flex flex-col border">
                <div className="border p-2">File name</div>
                <div className="border p-2 flex items-center justify-between">
                  <div className="mt-1">DeliveryNonDeliveryToRecipient.xml</div>
                  <Button variant="contained" color="success" sx={{ marginRight: 20 }} startIcon={<Download />}>
                    Download
                  </Button>
                </div>
              </div>

              {/* Right-aligned Download Button */}
              <div className="flex justify-end mt-4">
                <Button variant="contained" color="primary" startIcon={<Download />}>
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default CapDetailModal;

