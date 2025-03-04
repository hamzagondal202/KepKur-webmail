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
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import env from "../../env.json";

// eslint-disable-next-line react/prop-types
const Purchases = ({ open, handleClose }) => {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const fetchTransactions = async (page, size) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${env.url}/api/account/purchases?page=${page}&size=${size}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTransactions(response.data.transactions || []);
      setTotalPages(response.data.pageable.totalPages || 1);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
    const handlePageChange = useCallback((newPage) => {
      if (newPage >= 0 && newPage < totalPages) {
        setCurrentPage(newPage);
      }
    }, [totalPages]);

  useEffect(() => {
    if (open) {
      fetchTransactions(currentPage, pageSize);
    }
  }, [open, currentPage]);

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
                <TableCell>
                  <strong>{t("transaction-date")}</strong>
                </TableCell>
                <TableCell>
                  <strong>{t("payment-confirmation-code")}</strong>
                </TableCell>
                <TableCell>
                  <strong>{t("product-name")}</strong>
                </TableCell>
                <TableCell>
                  <strong>{t("subscription-code")}</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((item, index) => (
                  <TableRow key={item.id || index}>
                    <TableCell>{new Date(item.transaction_date).toLocaleString()}</TableCell>
                    <TableCell>{item.payment_confirmation_code}</TableCell>
                    <TableCell>{item.product_name}</TableCell>
                    <TableCell>{item.subscription_code}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    {t("no-record-found")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex justify-between mt-4 items-center p-2">
          <button
            disabled={currentPage === 0}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === 0 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {t("previous")}
          </button>

          <span className="text-sm text-gray-700">
            {t("page")} {currentPage + 1} {t("of")} {totalPages}
          </span>

          <button
            disabled={currentPage >= totalPages - 1}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage >= totalPages - 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {t("next")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Purchases;
