import { useTranslation } from "react-i18next";

const AccountHolderInformation = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-100 p-4 min-h-screen">
      <div className="p-4 mx-4 bg-white shadow rounded-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th colSpan="2" className="p-2">
                <h2 className="text-green-400 font-bold text-lg border-b border-green-400">{t("account-holder-information")}</h2>
              </th>
            </tr>
          </thead>
          <tbody className="grid grid-cols-2 gap-4 p-2">
            {
              [
                { label: t("account-holder-name"), value: "John Doe" },
                { label: t("tax-number"), value: "1234567890" },
                { label: t("city"), value: "Istanbul" },
                { label: t("district"), value: "Kadikoy" },
                { label: t("neighbourhood"), value: "Moda" }
              ].map((item, index) => (
                <tr key={index} className="flex justify-between col-span-2">
                  <td className="flex-1">{`${item.label}:`}</td>
                  <td className="flex-1">{item.value}</td> {/* Dummy Data Here */}
                </tr>
              ))
            }
          </tbody>
        </table>
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-green-600 text-white rounded">{t("edit-account-holder-information")}</button>
        </div>
      </div>
    </div>
  );
};
export default AccountHolderInformation
