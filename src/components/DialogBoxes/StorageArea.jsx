import {
    Dialog,
    DialogTitle,
    DialogContent,
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
import { useTranslation } from "react-i18next";
  
  // eslint-disable-next-line react/prop-types
  const StorageArea = ({ open, handleClose }) => {
  
    const {t} = useTranslation()
    const transactions = Array(7).fill({
        explanation: "[KEP Evidence: Accepted by HS06] [KEP Message] evidence ...   ",
        transfer: "20",
        history: "3.10.2024 14:22",
      });
    
  
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <strong>{t("storage-area")}</strong>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
  
        <DialogContent dividers>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-100">
                  <TableCell><strong>{t("explanation")}</strong></TableCell>
                  <TableCell><strong>{t("alan")}(MB)</strong></TableCell>
                  <TableCell><strong>{t("history")}</strong></TableCell>
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

      </Dialog>
    );
  };
  
  export default StorageArea;
  