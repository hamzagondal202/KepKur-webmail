import {
    Dialog,
    DialogTitle,
    DialogContent,
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
  import AddIcon from "@mui/icons-material/Add";
  import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
  
  // eslint-disable-next-line react/prop-types
  const AddStorageDialog = ({ open, handleClose }) => {
    const {t} = useTranslation()

    const creditPackages = [
      { id: 1, product: "250MB ( 4 Credits / month )"},
      { id: 3, product: "500MB ( 7 Credits / week )"},
      { id: 4, product: "1GB ( 12 Credits / month )"},
      { id: 5, product: "50GB ( 50 Credits / month )"},
      { id: 6, product: "10GB ( 80 Credits / month )"},
    ];
  
  
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <strong>{t("add-storage")}</strong>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
  
        <DialogContent dividers>
          {/* Credit Packages Table */}
          <TableContainer component={Paper} className="mb-4">
            <Table>
              <TableHead>
                <TableRow className="bg-gray-100">
                  <TableCell><strong>{t("product")}</strong></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {creditPackages.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="success" startIcon={<AddIcon />}>
                        {t("add")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
  
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-100">
                  <TableCell><strong>{t("explanation")}</strong></TableCell>
                  <TableCell><strong>{t("storage-area")}</strong></TableCell>
                  <TableCell><strong>{t("history")}</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              <TableRow>
                    <TableCell>{("no-record-found")}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
  
      </Dialog>
    );
  };
  
  export default AddStorageDialog;
  