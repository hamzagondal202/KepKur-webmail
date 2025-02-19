import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const InquiryPage = () => {
  const [formData, setFormData] = useState({
    kepAccountAddress: "",
    ad: "",
    lastName: "",
    street: "",
    howToGetService: "",
    district: "",
    city: "",
    phoneNumber: "",
    title: "",
  });

  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setSearchResults([
      { accountName: "JohnDoe", status: "Active", ad: formData.ad, lastName: formData.lastName },
    ]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Tabs */}
      <div className="border-b flex space-x-6">
        <button className="pb-2 border-b-4 border-blue-600 font-semibold">
          Real Person Inquiry
        </button>
        <button className="pb-2 text-gray-500">Legal Entity Inquiry</button>
      </div>

      {/* Form */}
      <div className="mt-4">
        <div className="space-y-4">
          {[
            { label: "KEP Account Address", name: "kepAccountAddress" },
            { label: "Ad", name: "ad" },
            { label: "Last Name", name: "lastName" },
            { label: "Street", name: "street" },
            { label: "How to Get Service", name: "howToGetService" },
            { label: "District", name: "district" },
            { label: "City", name: "city" },
            { label: "Phone Number", name: "phoneNumber" },
            { label: "Title", name: "title" },
          ].map(({ label, name }, index) => (
            <div key={index} className="flex items-center">
              <label className="w-1/2">{label}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="border p-2 w-full mr-40 rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Search Button */}
      <div className="flex justify-end mt-4">
        <button onClick={handleSearch} className="bg-green-600 text-white px-4 py-2 flex items-center rounded-md">
          <FaSearch className="mr-1" /> We buy
        </button>
      </div>

      {/* Results Table */}
      <div className="mt-6 border bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              {["Account Name", "Account Status", "Ad", "Last Name"].map((header, index) => (
                <th key={index} className="p-2 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{result.accountName}</td>
                <td className="p-2">{result.status}</td>
                <td className="p-2">{result.ad}</td>
                <td className="p-2">{result.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InquiryPage;
