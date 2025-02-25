import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const InquireGuide = () => {
  const [activeTab, setActiveTab] = useState("realPerson");

  const [realPersonData, setRealPersonData] = useState({
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

  const [legalEntityData, setLegalEntityData] = useState({
    kepAccountAddress: "",
    noSinking: "",
    taxNumber: "",
    fullNameOfLegalEntity: "",
    mainFieldOfActivity: "",
    provinceWhereCenterIsLocated: "",
    addressInformation: "",
    transactionAuthorizedTC: "",
    fullNameOfTheTransactionAuthority: "",
    titleOfTheProcessingOfficer: "",
  });

  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === "realPerson") {
      setRealPersonData((prev) => ({ ...prev, [name]: value }));
    } else {
      setLegalEntityData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSearch = () => {
    setSearchResults([
      activeTab === "realPerson"
        ? { accountName: "JohnDoe", status: "Active", ad: realPersonData.ad, lastName: realPersonData.lastName }
        : { fullNameOfLegalEntity: legalEntityData.fullNameOfLegalEntity, status: "Active", taxNumber: legalEntityData.taxNumber }
    ]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Tabs */}
      <div className="border-b flex space-x-6">
        <button
          className={`pb-2 font-semibold ${activeTab === "realPerson" ? "border-blue-600 border-b-4" : "text-gray-500"}`}
          onClick={() => setActiveTab("realPerson")}
        >
          Real Person Inquiry
        </button>
        <button
          className={`pb-2 font-semibold ${activeTab === "legalEntity" ? "border-blue-600 border-b-4" : "text-gray-500"}`}
          onClick={() => setActiveTab("legalEntity")}
        >
          Legal Entity Inquiry
        </button>
      </div>

      {/* Form */}
      <div className="mt-4">
        <div className="space-y-4">
          {(activeTab === "realPerson" ? [
            { label: "KEP Account Address", name: "kepAccountAddress" },
            { label: "Ad", name: "ad" },
            { label: "Last Name", name: "lastName" },
            { label: "Street", name: "street" },
            { label: "How to Get Service", name: "howToGetService" },
            { label: "District", name: "district" },
            { label: "City", name: "city" },
            { label: "Phone Number", name: "phoneNumber" },
            { label: "Title", name: "title" },
          ] : [
            { label: "KEP Account Address", name: "kepAccountAddress" },
            { label: "No Sinking", name: "noSinking" },
            { label: "Tax Number", name: "taxNumber" },
            { label: "Full Name of Legal Entity", name: "fullNameOfLegalEntity" },
            { label: "Main Field of Activity", name: "mainFieldOfActivity" },
            { label: "Province Where Center Is Located", name: "provinceWhereCenterIsLocated" },
            { label: "Address Information", name: "addressInformation" },
            { label: "Transaction Authorized TC", name: "transactionAuthorizedTC" },
            { label: "Full Name of the Transaction Authority", name: "fullNameOfTheTransactionAuthority" },
            { label: "Title of the Processing Officer", name: "titleOfTheProcessingOfficer" },
          ]).map(({ label, name }, index) => (
            <div key={index} className="flex items-center">
              <label className="w-1/2">{label}</label>
              {label == "Phone Number" ? <input
                type="number"
                name={name}
                value={activeTab === "realPerson" ? realPersonData[name] : legalEntityData[name]}
                onChange={(e) => handleChange(e, activeTab)}
                className="border p-2 w-full mr-40 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              /> :
                <input
                  type="text"
                  name={name}
                  value={activeTab === "realPerson" ? realPersonData[name] : legalEntityData[name]}
                  onChange={(e) => handleChange(e, activeTab)}
                  className="border p-2 w-full mr-40 rounded-md"
                />}
            </div>
          ))}
        </div>
      </div>

      {/* Search Button */}
      <div className="flex justify-end mt-4">
        <button onClick={handleSearch} className="bg-green-600 text-white px-4 py-2 flex items-center rounded-md">
          <FaSearch className="mr-1" /> Search
        </button>
      </div>

      {/* Results Table */}
      <div className="mt-6 border bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              {(activeTab === "realPerson"
                ? ["Account Name", "Account Status", "Ad", "Last Name"]
                : ["Account name", "Account Status", "Customer Name"]
              ).map((header, index) => (
                <th key={index} className="p-2 text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result, index) => (
              <tr key={index} className="border-b">
                {activeTab === "realPerson" ? (
                  <>
                    <td className="p-2">{result.accountName}</td>
                    <td className="p-2">{result.status}</td>
                    <td className="p-2">{result.ad}</td>
                    <td className="p-2">{result.lastName}</td>
                  </>
                ) : (
                  <>
                    <td className="p-2">{result.accountName}</td>
                    <td className="p-2">{result.status}</td>
                    <td className="p-2">{result.customerName}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InquireGuide;
