import { useState } from "react";
import { FaSearch, FaPlus, FaSyncAlt } from "react-icons/fa";
// import { NewMessageDialog } from "../components/DialogBoxes/Dialog";
import { Button } from "@mui/material";
import NewCapMessageDialog from "../components/DialogBoxes/NewCapMessage";
const Inbox = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    readStatus: "",
    subject: "",
    sender: "",
    buyers: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setDialogOpen(false);
  };


  return (
    <div className={`transition-all duration-300 p-6 bg-gray-100 min-h-screen`}>
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">Inbox</h1>

      {/* Search Filters */}
      <div className="grid grid-cols-6 gap-4 mb-4">
        {/* Dropdown for Read Status */}
        <select
          name="readStatus"
          value={searchParams.readStatus}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Read Status</option>
          <option value="read">Read</option>
          <option value="unread">Unread</option>
        </select>

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
          name="sender"
          value={searchParams.sender}
          onChange={handleChange}
          placeholder="Sender"
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
          placeholder="Start Date"
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="endDate"
          value={searchParams.endDate}
          onChange={handleChange}
          placeholder="End Date"
          className="border p-2 rounded"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4 mb-4">
        {/* Search Button */}
        <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md shadow-md">
          <FaSearch />
          <span>We buy</span>
        </button>

        {/* New Cap Message Button */}
        <Button
          className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md"
          variant="contained"
          color="success"
          onClick={() => setDialogOpen(true)}
        >
          <FaPlus />
          <span>New Cap Message</span>
        </Button>

        {/* Refresh Button */}
        <button className="bg-green-500 text-white p-2 rounded-md shadow-md">
          <FaSyncAlt />
        </button>
      </div>

      {/* Table */}
      <div className="border rounded-md shadow-md overflow-hidden bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border bg-white">Read Status</th>
              <th className="p-3 border bg-white">Subject</th>
              <th className="p-3 border bg-white">Sender</th>
              <th className="p-3 border bg-white">Buyers</th>
              <th className="p-3 border bg-white">Post Date</th>
            </tr>
          </thead>
          <tbody>
            {/* No Record Found */}
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                No record found
              </td>
            </tr>
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

export default Inbox;