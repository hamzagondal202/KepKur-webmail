import { useState, useEffect, useCallback, useMemo } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Button } from "@mui/material";
import AddAddressDialog from "../components/DialogBoxes/AddAddress";
import { useTranslation } from "react-i18next";
import { LoaderCircle } from "lucide-react";
import { getAddressBookItems } from "../services/AddressBookService";

const MyAddressBook = () => {
  const { t } = useTranslation();

  const [dialogOpen, setDialogOpen] = useState(false);

  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [rowChecked, setRowChecked] = useState({});

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  const handleClose = () => setDialogOpen(false);

  const handleHeaderCheckboxChange = useCallback((e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    const newRowChecked = data.reduce((acc, item) => { acc[item.id] = checked; return acc; }, {});
    setRowChecked(newRowChecked);
  }, [data]);

  const handleRowCheckboxChange = useCallback((e, id) => {
    setRowChecked((prev) => ({ ...prev, [id]: e.target.checked }));
  },);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAddressBookItems(currentPage, pageSize);
      setData(response?.contacts || []);
      setTotalPages(response?.pageable?.totalPages || 0);
    } catch (error) {
      console.error("Error fetching address book items:", error);
      setData([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  },);

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 0 && newPage < totalPages) setCurrentPage(newPage);
  }, [totalPages]);

  const tableBody = useMemo(() => {
    if (isLoading) return (<tr><td colSpan={6} className="p-4"><div className="flex justify-center items-center"><LoaderCircle color="#2563eb" className="w-8 h-8 animate-spin text-blue-600" /></div></td></tr>);
    if (!data || data.length === 0) return (<tr><td colSpan={6} className="text-center p-4 text-gray-500">{t("noRecordFound")}</td></tr>);
    return data.map((item) => (
      <tr key={item.id} className="border">
        <td className="p-2 w-0"><input type="checkbox" className="w-5 h-5" checked={rowChecked[item.id] || false} onChange={(e) => handleRowCheckboxChange(e, item.id)} /></td>
        <td className="p-2">{item.kepAddress}</td>
        <td className="p-2">{item.delivery}</td>
        <td className="p-2">{item.lastName}</td>
        <td className="p-2">{item.email}</td>
        <td className="p-2">{item.telephone}</td>
        <td className="p-2">{item.address}</td>
        <td className="p-2"><button style={{ color: 'red', fontSize: '20px' }}><FaTrash /></button></td>
      </tr>
    ));
  }, [data, isLoading, rowChecked, t, handleRowCheckboxChange]);

  return (
    <div className={`transition-all duration-300 p-6 bg-gray-100 min-h-screen`}>
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">{t("my-address-book")}</h1>

      {/* Search Filters */}

      <Button
        className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
        variant="contained"
        color="success"
        onClick={() => setDialogOpen(true)}
      >
        <FaPlus />
        <span>{t("add")}</span>
      </Button>

      {/* Table */}
      <div className="border rounded-md shadow-md overflow-hidden mt-4 bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="">
            <tr>
              <th className="p-2 w-0">
                <input type="checkbox" className="w-5 h-5"
                  checked={isChecked}  // Bind header checkbox to isChecked state
                  onChange={handleHeaderCheckboxChange} />
              </th>
              <th className="p-3 ">{t("kepAddress")}</th>
              <th className="p-3 ">{t("delivery")}</th>
              <th className="p-3 ">{t("lastName")}</th>
              <th className="p-3 ">{t("email")}</th>
              <th className="p-3 ">{t("telephone")}</th>
              <th className="p-3 ">{t("address")}</th>
            </tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4 items-center">
        <button
          disabled={currentPage === 0 || currentPage < 0 || isLoading}
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-4 py-2 rounded-md ${currentPage === 0 || currentPage < 0 || isLoading
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
        >
          {t("previous")}
        </button>

        <span className="text-sm text-gray-700">
          {t("page")} {currentPage + 1} {t("of")} {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages - 1 || currentPage > totalPages - 1 || isLoading}
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-4 py-2 rounded-md ${currentPage === totalPages - 1 || currentPage > totalPages - 1 || isLoading
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
        >
          {t("next")}
        </button>
      </div>

      {/* New Message Dialog */}
      <AddAddressDialog
        open={dialogOpen}
        handleClose={handleClose}
      />
    </div>
  );
}

export default MyAddressBook;