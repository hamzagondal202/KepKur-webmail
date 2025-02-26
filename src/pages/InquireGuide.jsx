import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const InquireGuide = () => {
  const { t } = useTranslation();

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
          {t("real-person-inquiry")}
        </button>
        <button
          className={`pb-2 font-semibold ${activeTab === "legalEntity" ? "border-blue-600 border-b-4" : "text-gray-500"}`}
          onClick={() => setActiveTab("legalEntity")}
        >
          {t("legal-entity-inquiry")}
        </button>
      </div>

      {/* Form */}
      <div className="mt-4">
        <div className="space-y-4">
          {(activeTab === "realPerson" ? [
            { label: t("kep-account-address"), name: "kepAccountAddress" },
            { label: t("ad"), name: "ad" },
            { label: t("last-name"), name: "lastName" },
            { label: t("street"), name: "street" },
            { label: t("how-to-get-service"), name: "howToGetService" },
            { label: t("district"), name: "district" },
            { label: t("city"), name: "city" },
            { label: t("phone-number"), name: "phoneNumber" },
            { label: t("title"), name: "title" },
          ] : [
            { label: t("kep-account-address"), name: "kepAccountAddress" },
            { label: t("no-sinking"), name: "noSinking" },
            { label: t("tax-number"), name: "taxNumber" },
            { label: t("full-name-of-legal-entity"), name: "fullNameOfLegalEntity" },
            { label: t("main-field-of-activity"), name: "mainFieldOfActivity" },
            { label: t("province-Where-center-is-located"), name: "provinceWhereCenterIsLocated" },
            { label: t("address-information"), name: "addressInformation" },
            { label: t("transaction-authorized-tc"), name: "transactionAuthorizedTC" },
            { label: t("full-name-of-the-transaction-authority"), name: "fullNameOfTheTransactionAuthority" },
            { label: t("title-of-the-processing-officer"), name: "titleOfTheProcessingOfficer" },
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
          <FaSearch className="mr-1" /> {t("search")}
        </button>
      </div>

      {/* Results Table */}
      <div className="mt-6 border bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              {(activeTab === "realPerson"
                ? [t("account-name"), t("account-status"), t("ad"), t("last-name")]
                : [t("account-name"), t("account-status"), t("customer-name")]
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
