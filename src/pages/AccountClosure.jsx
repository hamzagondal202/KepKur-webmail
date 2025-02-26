import { useTranslation } from "react-i18next";
import { FaInfoCircle } from "react-icons/fa";
const AccountClosure = () => {
  const {t} = useTranslation()
  return (
    <div className="p-6 rounded-md bg-gray-100 h-screen overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">{t("account-closure")}</h1>

      {/* E-Signature Closure Section */}
      <div className="p-4 border rounded-md mb-4">
        <h2 className="text-lg ">{t("e-signature")}</h2>
        <div className="text-gray-700 text-sm mt-2 flex flex-row gap-2">
          <FaInfoCircle className="text-gray-700 text-2xl" />
          <p>{t("if-you-want-to-close-your-account-with-e-signature")}</p>
        </div>
        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded">
        {t("close-my-acc-with-e-sign")}
        </button>
      </div>

      {/* Account Closure Request Section */}
      <div className="p-4 border rounded-md">
        <h2 className="text-lg">{t("create-an-account-closure-request")}</h2>

        <div className="text-gray-700 text-sm mt-2 flex flex-row gap-2">
          <FaInfoCircle className="text-gray-700 text-2xl" />
          <p>{t("if-you-request-closure")}</p>
        </div>

        <div className="text-gray-700 text-sm mt-2 flex flex-row gap-2">
          <FaInfoCircle className="text-gray-700 text-2xl" />
          <p> {t("if-you-do-not-send-you-petition")}</p>
        </div>

        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded">
          {t("create-account-closure-request")}
        </button>
      </div>
    </div>
  );
};

export default AccountClosure;
