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
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import env from "../../env.json";

// eslint-disable-next-line react/prop-types
const BuyDialog = ({ open, handleClose }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const [creditPackages, setCreditPackages] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const handlePageChange = useCallback(
    (newPage) => {
      if (newPage >= 0 && newPage < totalPages) {
        setCurrentPage(newPage);
      }
    },
    [totalPages]
  );

  const fetchCreditPackages = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${env.url}/api/credits/packages`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCreditPackages(response.data.packages || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTransactions = async (page, size) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${env.url}/api/credits/history?page=${page}&size=${size}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTransactions(response.data.transactions || []);
      setTotalPages(response.data.pageable.totalPages || 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchCreditPackages();
      fetchTransactions(currentPage, pageSize);
    }
  }, [open, currentPage]);

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
                <TableCell>
                  <strong>{t("product")}</strong>
                </TableCell>
                <TableCell>
                  <strong>{t("price")}</strong>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {creditPackages.length > 0 ? (
                creditPackages.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      {item.price} {item.currency}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<AddIcon />}
                      >
                        {t("add")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    {t("no-data")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Transaction History Table */}
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
              {transactions.length > 0 ? (
                transactions.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.explanation}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>{item.date}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    {t("no-transactions")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Controls for Transactions */}
        <div className="flex justify-between mt-4 items-center p-2">
          <button
            disabled={currentPage === 0}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
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
              currentPage >= totalPages - 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {t("next")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BuyDialog;
