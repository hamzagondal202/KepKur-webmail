
const AccountHolderInformation = () => {
  return (
    <div className="bg-gray-100 p-4 min-h-screen">
      <div className="p-4 mx-4 bg-white shadow rounded-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th colSpan="2" className="p-2">
                <h2 className="text-green-400 font-bold text-lg border-b border-green-400">Account Holder Information</h2>
              </th>
            </tr>
          </thead>
          <tbody className="grid grid-cols-2 gap-4 p-2">
            <tr className="flex justify-between col-span-2">
              <td className="flex-1">Account Holder Name:</td>
              <td className="flex-1">ILAYDA QURAN</td>
            </tr>

            <tr className="flex justify-between col-span-2">
              <td className="flex-1">Tax Number:</td>
              <td className="flex-1">58225489216</td>
            </tr>

            <tr className="flex justify-between col-span-2">
              <td className="flex-1">City:</td>
              <td className="flex-1">ISTANBUL</td>
            </tr>

            <tr className="flex justify-between col-span-2">
              <td className="flex-1">District:</td>
              <td className="flex-1">District</td>
            </tr>

            <tr className="flex justify-between col-span-2">
              <td className="flex-1">Neighbourhood:</td>
              <td className="flex-1"></td>
            </tr>

          </tbody>
        </table>
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-green-600 text-white rounded">Edit Account Holder Information</button>
        </div>
      </div>
    </div>
  );
};
export default AccountHolderInformation
