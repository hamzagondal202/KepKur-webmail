import { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaSyncAlt } from "react-icons/fa";
import { Button } from "@mui/material";
import NewCapMessageDialog from "../components/DialogBoxes/NewCapMessage";
import { useTranslation } from "react-i18next";
import { getInboxItems } from "../services/InboxService";
import { LoaderCircle } from "lucide-react";

const Inbox = () => {
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

  const handleHeaderCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    const newRowChecked = data.reduce((acc, item) => {
      acc[item.id] = checked;
      return acc;
    }, {});
    setRowChecked(newRowChecked);
  };

  const handleRowCheckboxChange = (e, id) => {
    const checked = e.target.checked;
    setRowChecked((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  // Function to fetch inbox data
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getInboxItems(); // Fetch data
      if (response && response.emails) {
        setData(response.emails);
      } else {
        setData([]);
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
      <h1 className="text-2xl font-bold mb-4">{t("inbox")}</h1>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <select
          name="readStatus"
          value={searchParams.readStatus}
          onChange={handleChange}
          className="border p-2 rounded"
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
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="sender"
          value={searchParams.sender}
          onChange={handleChange}
          placeholder={t("sender")}
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

        <input
          type="date"
          name="startDate"
          value={searchParams.startDate}
          onChange={handleChange}
          placeholder={t("startDate")}
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="endDate"
          value={searchParams.endDate}
          onChange={handleChange}
          placeholder={t("endDate")}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex items-center justify-between mb-4 me-6">
        <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md shadow-md">
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
              <th className="p-3">{t("buyers")}</th>
              <th className="p-3">{t("postDate")}</th>
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
                  <td className="p-3">{item.Buyer}</td>
                  <td className="p-3">{item.received_date}</td>
                </tr>
              ))
            )
            )}
          </tbody>
        </table>
      </div>

      <NewCapMessageDialog open={dialogOpen} handleClose={handleClose} />
    </div>
  );
};

export default Inbox;