import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";
// import { NewMessageDialog } from "../components/DialogBoxes/Dialog";
import NewCapMessageDialog from "../components/DialogBoxes/NewCapMessage";
const AccountLogs = () => {
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
  const [isChecked, setIsChecked] = useState(false);
  const [rowChecked, setRowChecked] = useState({});

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


  useEffect(() => {
    // Simulate fetching data with a delay (replace with your actual API call)
    setTimeout(() => {
      setData([
        {
          id: 1,
          process: "Payment",
          explanation: "Monthly subscription fee deducted",
          history: "2024-02-15 10:30:00"
        },
        {
          id: 2,
          process: "Storage Upgrade",
          explanation: "Increased storage from 100MB to 500MB",
          history: "2024-02-14 14:45:00"
        },
        {
          id: 3,
          process: "Credit Purchase",
          explanation: "Purchased 50 credits",
          history: "2024-02-13 09:20:00"
        },
        {
          id: 4,
          process: "Account Update",
          explanation: "Changed email address",
          history: "2024-02-12 16:05:00"
        },
        {
          id: 5,
          process: "Service Activation",
          explanation: "Activated send/receive service",
          history: "2024-02-10 08:00:00"
        }
      ]);
    }, 2000);
  }, []);

  return (
    <div className={`transition-all duration-300 p-6 bg-gray-100 min-h-screen`}>
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">{t("user-logs")}</h1>

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
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md">
            <FaSearch />
            <span>{t("weBuy")}</span>
          </button>
        </div>

      </div>


      {/* Table */}
      <div className="border rounded-md shadow-md overflow-hidden bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 w-0">
                <input type="checkbox" className="w-5 h-5 mt-2"
                  checked={isChecked}  // Bind header checkbox to isChecked state
                  onChange={handleHeaderCheckboxChange} />
              </th>
              <th className="p-3">{t("process")}</th>
              <th className="p-3">{t("explanation")}</th>
              <th className="p-3">{t("history")}</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-500">
                  {t("no-record-found")}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="border">
                  <td className="p-2 w-0">
                    <input type="checkbox" className="w-5 h-5 mt-1"
                      checked={rowChecked[item.id] || false} // Bind row checkbox to individual state
                      onChange={(e) => handleRowCheckboxChange(e, item.id)} // Handle row checkbox change
                    />
                  </td>
                  <td className="p-3">{item.process}</td>
                  <td className="p-3">{item.explanation}</td>
                  <td className="p-3">{item.history}</td>
                </tr>
              ))
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

export default AccountLogs;