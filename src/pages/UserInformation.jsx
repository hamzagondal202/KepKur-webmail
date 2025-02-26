import { useTranslation } from "react-i18next";

const UserInformation = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="p-4 mx-4 bg-white shadow rounded-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th colSpan="2" className="p-2">
                <h2 className="text-green-400 font-bold text-lg border-b border-green-400">{t("user-information")}</h2>
              </th>
            </tr>
          </thead>
          <tbody className="grid grid-cols-2 gap-4 p-2">
            <tr className="flex justify-between col-span-2">
              <td className="flex-1">{t("tr-id-number")}:</td>
              <td className="flex-1">58225489216</td>
            </tr>

            <tr className="flex justify-between col-span-2">
              <td className="flex-1">{t("name")}:</td>
              <td className="flex-1">ILAYDA</td>
            </tr>

            <tr className="flex justify-between col-span-2">
              <td className="flex-1">{t("last-name")}:</td>
              <td className="flex-1">KORAN</td>
            </tr>

            <tr className="flex justify-between col-span-2">
              <td className="flex-1">{t("email")}:</td>
              <td className="flex-1">ikuran@e-tugra.com.tr</td>
            </tr>

            <tr className="flex justify-between col-span-2">
              <td className="flex-1">{t("bake-the-phone")}:</td>
              <td className="flex-1">5319251849</td>
            </tr>

            <tr className="flex col-span-2">
              <td className="flex-1">{t("send-sms")}:</td>
              <div className="flex-1">
                <input type="checkbox" className="w-5 h-5" />
              </div>
            </tr>

            <tr className="flex col-span-2">
              <td className="flex-1">{t("view-in-guide")}:</td>
              <div className="flex-1">
                <input type="checkbox" className="w-5 h-5" />
              </div>
            </tr>

            <tr className="flex col-span-2">
              <td className="flex-1">{t("view-service-receiving")}:</td>
              <div className="flex-1">
                <input type="checkbox" className="w-5 h-5" />
              </div>
            </tr>

            <tr className="flex col-span-2">
              <td className="flex-1">{t("view-title-in-directory")}:</td>
              <div className="flex-1">
                <input type="checkbox" className="w-5 h-5" />
              </div>
            </tr>

            <tr className="flex col-span-2">
              <td className="flex-1">{t("view-province-in-guide")}:</td>
              <div className="flex-1">
                <input type="checkbox" className="w-5 h-5" />
              </div>
            </tr>

            <tr className="flex col-span-2">
              <td className="flex-1">{t("view-district-in-guide")}:</td>
              <div className="flex-1">
                <input type="checkbox" className="w-5 h-5" />
              </div>
            </tr>

            <tr className="flex col-span-2">
              <td className="flex-1">{t("view-street-in-directory")}:</td>
              <div className="flex-1">
                <input type="checkbox" className="w-5 h-5" />
              </div>
            </tr>

            <tr className="flex col-span-2">
              <td className="flex-1">{t("view-signature-verificatin-data-in-directory")}:</td>
              <div className="flex-1">
                <input type="checkbox" className="w-5 h-5" />
              </div>
            </tr>

            <tr className="flex col-span-2">
              <td className="flex-1">{t("view-phone-number-in-contact")}:</td>
              <div className="flex-1">
                <input type="checkbox" className="w-5 h-5" />
              </div>
            </tr>

          </tbody>
        </table>
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-green-600 text-white rounded">{t("edit")}</button>
        </div>
      </div>
    </div>
  )
}

export default UserInformation
