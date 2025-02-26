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
  const Purchases = ({ open, handleClose }) => {
  
    const {t} = useTranslation()
    const transactions = Array(7).fill({
        transDate: "3.10.2024 14:22",
        prodName: "GonderAI",
        subscriptCode: "[ilayda.kuran@hs06.kep.tr] Gonder AI",
      });
    
  
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <strong>{t("purchases")}</strong>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
  
        <DialogContent dividers>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-100">
                  <TableCell><strong>{t("transaction-date")}</strong></TableCell>
                  <TableCell><strong>{t("payment-confirmation-code")}</strong></TableCell>
                  <TableCell><strong>{t("product-name")}</strong></TableCell>
                  <TableCell><strong>{t("subscription-code")}</strong></TableCell>
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

      </Dialog>
    );
  };
  
  export default Purchases;
  