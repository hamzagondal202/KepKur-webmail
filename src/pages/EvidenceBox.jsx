import { useState, useEffect } from "react";
import { FaSearch, FaSyncAlt } from "react-icons/fa";
import CapDetail from "../components/DialogBoxes/CapDetail";
import { useTranslation } from "react-i18next";
import { LoaderCircle } from "lucide-react";

const EvidenceBox = () => {
  const { t } = useTranslation();

  const [capDetailDialogOpen, setCapDetailDialogOpen] = useState(false);
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


  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleCapDetailClose = () => {
    setCapDetailDialogOpen(false);
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
    setLoading(true);
    setTimeout(() => {
      setData([
        {
          id: 1,
          subject: 'Meeting Agenda for Project X',
          postDate: '2025-02-19',
          sender: 'Alice Johnson',
        },
        {
          id: 2,
          subject: 'Invoice for February - 2025',
          postDate: '2025-02-20',
          sender: 'Bob Smith',
        },
        {
          id: 3,
          subject: 'Project Update: Milestone 1 Complete',
          postDate: '2025-02-21',
          sender: 'Charlie Davis',
        },
        {
          id: 4,
          subject: 'New Order Confirmation #56789',
          postDate: '2025-02-22',
          sender: 'Dana Lee',
        },
        {
          id: 5,
          subject: 'Quarterly Report: Q1 2025',
          postDate: '2025-02-23',
          sender: 'Evan Miller',
        },
        {
          id: 6,
          subject: 'Request for Proposal (RFP)',
          postDate: '2025-02-24',
          sender: 'Fiona Brown',
        },
        {
          id: 7,
          subject: 'Contract Renewal Reminder',
          postDate: '2025-02-25',
          sender: 'George White',
        },
        {
          id: 8,
          subject: 'Product Launch Announcement',
          postDate: '2025-02-26',
          sender: 'Hannah Green',
        },
        {
          id: 9,
          subject: 'Monthly Sales Report',
          postDate: '2025-02-27',
          sender: 'Ian Scott',
        },
        {
          id: 10,
          subject: 'Customer Feedback Survey',
          postDate: '2025-02-28',
          sender: 'Jessica Adams',
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className={`transition-all duration-300 p-6 bg-gray-100 min-h-screen`}>
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">{t("evidence-box")}</h1>

      {/* Search Filters */}
      <div className="grid grid-cols-6 gap-4 mb-4">
        {/* Input Fields */}
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
          name="buyers"
          value={searchParams.buyers}
          onChange={handleChange}
          placeholder={t("buyers")}
          className="border p-2 rounded h-11 mt-6"
        />

        <div className="flex flex-col">
          <div className="font-semibold pl-1">Start</div>
          <input
            type="date"
            name="startDate"
            value={searchParams.startDate}
            onChange={handleChange}
            placeholder={t("startDate")}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold pl-1">End</div>
          <input
            type="date"
            name="endDate"
            value={searchParams.endDate}
            onChange={handleChange}
            placeholder={t("endDate")}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-row justify-between col-span-2 me-6 h-11 mt-6">
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md shadow-md">
            <FaSearch />
            <span>{t("weBuy")}</span>
          </button>
        </div>

      </div>


      <div className="flex flex-row items-end justify-end mb-2">
        <button className="bg-green-500 text-white p-2 rounded-md shadow-md">
          <FaSyncAlt />
        </button>
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
              <th className="p-3">{t("subject")}</th>
              <th className="p-3">{t("postDate")}</th>
              <th className="p-3">{t("sender")}</th>
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
                <tr key={item.id} className="border" onClick={() => setCapDetailDialogOpen(true)}>
                  <td className="p-2 w-0">
                    <input type="checkbox" className="w-5 h-5 mt-1"
                      checked={rowChecked[item.id] || false} // Bind row checkbox to individual state
                      onChange={(e) => handleRowCheckboxChange(e, item.id)} // Handle row checkbox change
                    />
                  </td>
                  <td className="p-3">{item.subject}</td>
                  <td className="p-3">{item.postDate}</td>
                  <td className="p-3">{item.sender}</td>
                </tr>
              ))
            )
            )}
          </tbody>
        </table>
      </div>

      {/* New Message Dialog */}
      <CapDetail
        open={capDetailDialogOpen}
        handleClose={handleCapDetailClose}
      />
    </div>
  );
}

export default EvidenceBox;