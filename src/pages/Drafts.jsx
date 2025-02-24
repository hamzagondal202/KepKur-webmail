import { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaSyncAlt } from "react-icons/fa";
import { Button } from "@mui/material";
import NewCapMessageDialog from "../components/DialogBoxes/NewCapMessage";
import { useTranslation } from "react-i18next";
import { getDraftItems } from "../services/DraftService";
import { LoaderCircle } from "lucide-react";

const Drafts = () => {
  const { t } = useTranslation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    readStatus: "",
    subject: "",
    sender: "",
    buyers: "",
    startDate: "",
    endDate: "",
  });

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [rowChecked, setRowChecked] = useState({});
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setDialogOpen(false);
  };


  // Handle change of the header checkbox
  const handleHeaderCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);  // Set header checkbox state
    const newRowChecked = data.reduce((acc, item) => {
      acc[item.id] = checked;  // Set all rows' checkbox state to match header
      return acc;
    }, {});
    setRowChecked(newRowChecked); // Update the row checkboxes
  };

  // Handle change of individual row checkboxes
  const handleRowCheckboxChange = (e, id) => {
    const checked = e.target.checked;
    setRowChecked((prev) => ({
      ...prev,
      [id]: checked,  // Update the specific row's checkbox state
    }));
  };


  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getDraftItems(); // Fetch data
      if (response && response.emails) {
        setData(response.emails);
      } else {
        setData([]); // Default to empty array
      }
    } catch (error) {
      console.error("Error fetching inbox items:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts or when reloadTrigger changes
  useEffect(() => {
    fetchData();
  }, [reloadTrigger]);


  return (
    <div className={`transition-all duration-300 p-6 bg-gray-100 min-h-screen`}>
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">{t("drafts")}</h1>

      {/* Search Filters */}
      <div className="grid grid-cols-6 gap-4 mb-4">
        {/* Input Fields */}
        <input
          type="text"
          name="subject"
          value={searchParams.subject}
          onChange={handleChange}
          placeholder={t("subject")}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="buyers"
          value={searchParams.buyers}
          onChange={handleChange}
          placeholder={t("buyers")}
          className="border p-2 rounded"
        />

        {/* Date Fields */}
        <input
          type="date"
          name="startDate"
          value={searchParams.startDate}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="endDate"
          value={searchParams.endDate}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <div className="flex flex-row justify-between col-span-2 me-6">
          <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md">
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
      </div>

      {/* Table */}
      <div className="border rounded-md shadow-md overflow-hidden bg-white mt-10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 w-0">
                <input type="checkbox" className="w-5 h-5 mt-2"
                  checked={isChecked}
                  onChange={handleHeaderCheckboxChange} />
              </th>
              <th className="p-3">{t("subject")}</th>
              <th className="p-3">{t("buyers")}</th>
              <th className="p-3">{t("creationDate")}</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="p-4">
                  <div className="flex justify-center items-center">
                    <LoaderCircle color="#2563eb" className="w-8 h-8 animate-spin text-blue-600" />
                  </div>
                </td>
              </tr>
            ) : (data.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-500">
                  {t("noRecordFound")}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="border">
                  <td className="p-2 w-0">
                    <input type="checkbox" className="w-5 h-5 mt-1"
                      checked={rowChecked[item.id] || false}
                      onChange={(e) => handleRowCheckboxChange(e, item.id)}
                    />
                  </td>
                  <td className="p-2">{item.subject}</td>
                  <td className="p-2">{item.Buyers}</td>
                  <td className="p-2">{item.last_modified}</td>
                </tr>
              ))
            )
            )}
          </tbody>
        </table>
      </div>

      {/* New Message Dialog */}
      <NewCapMessageDialog
        open={dialogOpen}
        handleClose={handleClose}
      />
    </div>
  );
}

export default Drafts;