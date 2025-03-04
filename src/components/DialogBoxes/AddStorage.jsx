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
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import env from "../../env.json";

// eslint-disable-next-line react/prop-types
const AddStorageDialog = ({ open, handleClose }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const [creditPackages, setCreditPackages] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  }, [totalPages]);

  const fetchStoragePackages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${env.url}/api/storage/packages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      
      setCreditPackages(response.data.packages || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTransactions = async (page, size) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${env.url}/api/storage/history?page=${page}&size=${size}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);

      setTransactions(response.data.transactions);
      setTotalPages(response.data.pageable?.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchStoragePackages();
      fetchTransactions(currentPage, pageSize);
    }
  }, [open, currentPage]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle className="flex justify-between items-center">
        <strong>{t("add-storage")}</strong>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <TableContainer component={Paper} className="mb-4">
          <Table>
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell><strong>{t("product")}</strong></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {creditPackages.length > 0 ? (
                creditPackages.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.size_gb} ({item.credits} credits / {item.validity_period})</TableCell>
                    <TableCell>
                      <Button variant="contained" color="success" startIcon={<AddIcon />}>
                        {t("add")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">{t("no-record-found")}</TableCell>
                </TableRow>
              )}
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
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>{transaction.explanation}</TableCell>
                    <TableCell>{transaction.storage_area}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">{t("no-record-found")}</TableCell>
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

export default AddStorageDialog;
