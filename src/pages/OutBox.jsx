import { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaSyncAlt } from "react-icons/fa";
// import { NewMessageDialog } from "../components/DialogBoxes/Dialog";
import { Button } from "@mui/material";
import NewCapMessageDialog from "../components/DialogBoxes/NewCapMessage";
const OutBox = () => {
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
          subject: 'Subject 1',
          buyers: 'Buyer 1',
          postDate: '2025-02-19',
          status: 'sent'
        },
        {
          id: 2,
          subject: 'Subject 2',
          buyers: 'Buyer 2',
          postDate: '2025-02-20',
          status: 'pending'
        },
      ]);
    }, 2000);
  }, []);

  return (
    <div className={`transition-all duration-300 p-6 bg-gray-100 min-h-screen`}>
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">OutBox</h1>

      {/* Search Filters */}
      <div className="grid grid-cols-6 gap-4 mb-4">
        {/* Input Fields */}
        <input
          type="text"
          name="subject"
          value={searchParams.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="buyers"
          value={searchParams.buyers}
          onChange={handleChange}
          placeholder="Buyers"
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
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md shadow-md">
            <FaSearch />
            <span>We buy</span>
          </button>

          <Button
            className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md"
            variant="contained"
            color="success"
            onClick={() => setDialogOpen(true)}
          >
            <FaPlus />
            <span>New Cap Message</span>
          </Button>
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
              <th className="p-3">Subject</th>
              <th className="p-3">Buyers</th>
              <th className="p-3">Post Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  No record found
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id}>
                  <td className="p-2 w-0 ">
                    <input type="checkbox" className="w-5 h-5 mt-1"
                      checked={rowChecked[item.id] || false} // Bind row checkbox to individual state
                      onChange={(e) => handleRowCheckboxChange(e, item.id)} // Handle row checkbox change
                    />
                  </td>
                  <td className="p-2 border-b">{item.subject}</td>
                  <td className="p-2 border-b">{item.buyers}</td>
                  <td className="p-2 border-b">{item.postDate}</td>
                  <td className="p-2 border-b">{item.status}</td>

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

export default OutBox;