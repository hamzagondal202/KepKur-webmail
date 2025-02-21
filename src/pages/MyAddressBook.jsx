import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Button } from "@mui/material";
import NewCapMessageDialog from "../components/DialogBoxes/NewCapMessage";
import { useTranslation } from "react-i18next";

const MyAddressBook = () => {
  const { t } = useTranslation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [rowChecked, setRowChecked] = useState({});

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
          kepAddress: 'john.doe@kep.com',
          delivery: 'Standard Delivery',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          telephone: '+1234567890',
          address: '123 Main St, Springfield',
        },
        {
          id: 2,
          kepAddress: 'jane.smith@kep.com',
          delivery: 'Express Delivery',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          telephone: '+0987654321',
          address: '456 Elm St, Shelbyville',
        },
        {
          id: 3,
          kepAddress: 'alice.johnson@kep.com',
          delivery: 'Overnight Delivery',
          lastName: 'Johnson',
          email: 'alice.johnson@example.com',
          telephone: '+1122334455',
          address: '789 Oak St, Capital City',
        },
      ]);
    }, 2000);
  }, []);

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
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-500">
                  {t("noRecordFound")}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="border">
                  <td className="p-2 w-0">
                    <input type="checkbox" className="w-5 h-5"
                      checked={rowChecked[item.id] || false} // Bind row checkbox to individual state
                      onChange={(e) => handleRowCheckboxChange(e, item.id)} // Handle row checkbox change
                    />
                  </td>
                  <td className="p-2">{item.kepAddress}</td>
                  <td className="p-2">{item.delivery}</td>
                  <td className="p-2">{item.lastName}</td>
                  <td className="p-2">{item.email}</td>
                  <td className="p-2">{item.telephone}</td>
                  <td className="p-2">{item.address}</td>

                  <td className="p-2">
                    <button style={{ color: 'red', fontSize: '20px' }}>
                      <FaTrash />
                    </button>
                  </td>
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

export default MyAddressBook;