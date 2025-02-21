import { useTranslation } from "react-i18next";

const VerifyEvidence = () => {
  const { t } = useTranslation();

  return (
    <div className="p-4 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{t("verify-evidence")}</h1>
      <div className="relative overflow-hidden inline-block">
        {/* <!-- Hidden file input --> */}
        <input
          type="file"
          id="file-input"
          className="absolute left-0 top-0 opacity-0 cursor-pointer w-full h-full"
        />
        {/* <!-- Custom button --> */}
        <label
          htmlFor="file-input"
          className="inline-block px-4 py-2 bg-gray-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
        >
          {t("upload-file")}
        </label>
      </div>
    </div>
  );
};

export default VerifyEvidence;