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
const BuyDialog = ({ open, handleClose }) => {
        const { t } = useTranslation();

  const creditPackages = [
    { id: 1, product: "50 Credits", price: "₺420,00" },
    { id: 2, product: "100 Credits", price: "₺839,00" },
    { id: 3, product: "500 Credits", price: "₺4.159,00" },
    { id: 4, product: "1000 Credits", price: "₺8.249,00" },
    { id: 5, product: "20 Credits", price: "₺225,00" },
    { id: 6, product: "250 Credits", price: "₺2.089,00" },
  ];

  const transactions = Array(2).fill({
    explanation: "GonderAI",
    transfer: "20",
    history: "3.10.2024 14:22",
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle className="flex justify-between items-center">
        <strong>{t("add-credit")}</strong>
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
                <TableCell><strong>{t("price")}</strong></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {creditPackages.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.product}</TableCell>
                  <TableCell>{item.price}</TableCell>
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

        {/* Transaction History Table */}
        <h3 className="text-lg font-semibold mb-2">Transaction History</h3>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell>{t("explanation")}</TableCell>
                <TableCell>{t("transfer")}</TableCell>
                <TableCell>{t("history")}</TableCell>
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

export default BuyDialog;
