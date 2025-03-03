import { useState, useEffect, useCallback, useMemo } from "react";
import { FaSearch, FaPlus, FaSyncAlt } from "react-icons/fa";
import { Button } from "@mui/material";
import NewCapMessageDialog from "../components/DialogBoxes/NewCapMessage";
import { useTranslation } from "react-i18next";
import { getInboxItems, searchInboxItems } from "../services/InboxService";
import { LoaderCircle } from "lucide-react";

const Inbox = () => {
  const { t } = useTranslation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [rowChecked, setRowChecked] = useState({});
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const [searchParams, setSearchParams] = useState({
    readStatus: "",
    subject: "",
    sender: "",
    startDate: "",
    endDate: "",
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleHeaderCheckboxChange = useCallback((e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    const newRowChecked = data.reduce((acc, item) => {
      acc[item.id] = checked;
      return acc;
    }, {});
    setRowChecked(newRowChecked);
  }, [data]);

  const handleRowCheckboxChange = useCallback((e, id) => {
    const checked = e.target.checked;
    setRowChecked((prev) => ({
      ...prev,
      [id]: checked,
    }));
  }, []);

  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  }, [totalPages]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getInboxItems(currentPage, pageSize);
      setData(response?.emails || []);
      setTotalPages(response?.pageable?.totalPages || 0);
    } catch (error) {
      console.error("Error fetching inbox items:", error);
      setData([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize]);

  const searchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await searchInboxItems(
        currentPage,
        pageSize,
        searchParams.readStatus,
        searchParams.subject,
        searchParams.sender,
        searchParams.startDate,
        searchParams.endDate
      );
      setData(response?.emails || []);
      setTotalPages(response?.pageable?.totalPages || 0);
    } catch (error) {
      console.error("Error fetching inbox items:", error);
      setData([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, searchParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData, reloadTrigger]);

  const tableBody = useMemo(() => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan={6} className="p-4">
            <div className="flex justify-center items-center">
              <LoaderCircle color="#2563eb" className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          </td>
        </tr>
      );
    } else if (!data || data.length === 0) {
      return (
        <tr>
          <td colSpan={6} className="text-center p-4 text-gray-500">
            {t("noRecordFound")}
          </td>
        </tr>
      );
    } else {
      return data.map((item) => (
        <tr key={item.id} className="border">
          <td className="p-3 w-0">
            <input
              type="checkbox"
              className="w-6 h-6"
              checked={rowChecked[item.id] || false}
              onChange={(e) => handleRowCheckboxChange(e, item.id)}
            />
          </td>
          <td className="p-3">{item.status}</td>
          <td className="p-3">{item.subject}</td>
          <td className="p-3">{item.sender}</td>
          <td className="p-3">{item.received_date}</td>
        </tr>
      ));
    }
  }, [data, isLoading, rowChecked, t, handleRowCheckboxChange]);


  return (
    <div className="transition-all duration-300 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">{t("inbox")}</h1>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <select
          name="readStatus"
          value={searchParams.readStatus}
          onChange={handleChange}
          className="border p-2 rounded h-11 mt-6"
        >
          <option value="">{t("readStatus")}</option>
          <option value="read">{t("read")}</option>
          <option value="unread">{t("unread")}</option>
        </select>

        <input
          type="text"
          name="subject"
          value={searchParams.subject}
          onChange={handleChange}
          placeholder={t("subject")}
          className="border p-2 rounded h-11 mt-6"
        />
        <input
          type="text"
          name="sender"
          value={searchParams.sender}
          onChange={handleChange}
          placeholder={t("sender")}
          className="border p-2 rounded h-11 mt-6"
        />
        <input
          type="text"
          name="startDate"
          value={searchParams.startDate}
          onChange={handleChange}
          placeholder={t("startDate")}
          className="border p-2 rounded h-11 mt-6"
          onFocus={(e) => e.target.type = "date"}
          onBlur={(e) => e.target.type = "text"}
        />
        <input
          type="text"
          name="endDate"
          value={searchParams.endDate}
          onChange={handleChange}
          placeholder={t("endDate")}
          className="border p-2 rounded h-11 mt-6"
          onFocus={(e) => e.target.type = "date"}
          onBlur={(e) => e.target.type = "text"}
        />
      </div>

      <div className="flex items-center justify-between mb-4 me-6">
        <button onClick={() => { searchData() }} className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md shadow-md">
          <FaSearch />
          <span>{t("weBuy")}</span>
        </button>

        <Button
          className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md"
          variant="contained"
          color="success"
          onClick={() => setDialogOpen(true)}
        >
          <FaPlus />
          <span>{t("newCapMessage")}</span>
        </Button>
      </div>
      <div className="flex flex-row items-end justify-end mb-2">
        <button onClick={() => setReloadTrigger((prev) => prev + 1)} className="bg-green-500 text-white p-2 rounded-md shadow-md">
          <FaSyncAlt />
        </button>
      </div>

      <div className="border rounded-md shadow-md overflow-hidden bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-3 w-0">
                <input
                  type="checkbox"
                  className="w-6 h-6"
                  checked={isChecked}
                  onChange={handleHeaderCheckboxChange}
                />
              </th>
              <th className="p-3">{t("readStatus")}</th>
              <th className="p-3">{t("subject")}</th>
              <th className="p-3">{t("sender")}</th>
              <th className="p-3">{t("postDate")}</th>
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

      <NewCapMessageDialog open={dialogOpen} handleClose={handleClose} />
    </div>
  );
};

export default Inbox;
