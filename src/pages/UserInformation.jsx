const UserInformation = () => {
  return (
    <div className="p-4 bg-white shadow rounded-md">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th colSpan="2" className="p-2">
              <h2 className="text-green-400 font-bold text-lg border-b border-green-400">User Information</h2>
            </th>
          </tr>
        </thead>
        <tbody className="grid grid-cols-2 gap-4 p-2">
          <tr className="flex justify-between col-span-2">
            <td className="flex-1">TR ID Number:</td>
            <td className="flex-1">58225489216</td>
          </tr>

          <tr className="flex justify-between col-span-2">
            <td className="flex-1">Name:</td>
            <td className="flex-1">ILAYDA</td>
          </tr>

          <tr className="flex justify-between col-span-2">
            <td className="flex-1">Last name:</td>
            <td className="flex-1">KORAN</td>
          </tr>

          <tr className="flex justify-between col-span-2">
            <td className="flex-1">E-mail:</td>
            <td className="flex-1">ikuran@e-tugra.com.tr</td>
          </tr>

          <tr className="flex justify-between col-span-2">
            <td className="flex-1">Bake the Phone:</td>
            <td className="flex-1">5319251849</td>
          </tr>

          <tr className="flex col-span-2">
            <td className="flex-1">Send SMS:</td>
            <div className="flex-1">
              <input type="checkbox" className="w-7 h-7" />
            </div>
          </tr>

          <tr className="flex col-span-2">
            <td className="flex-1">View in Guide:</td>
            <div className="flex-1">
              <input type="checkbox" className="w-7 h-7" />
            </div>
          </tr>

          <tr className="flex col-span-2">
            <td className="flex-1">View Service Receiving Method in the Guide:</td>
            <div className="flex-1">
              <input type="checkbox" className="w-7 h-7" />
            </div>
          </tr>

          <tr className="flex col-span-2">
            <td className="flex-1">View Title in Directory:</td>
            <div className="flex-1">
              <input type="checkbox" className="w-7 h-7" />
            </div>
          </tr>

          <tr className="flex col-span-2">
            <td className="flex-1">View Province in Guide:</td>
            <div className="flex-1">
              <input type="checkbox" className="w-7 h-7" />
            </div>
          </tr>

          <tr className="flex col-span-2">
            <td className="flex-1">View District in Guide:</td>
            <div className="flex-1">
              <input type="checkbox" className="w-7 h-7" />
            </div>
          </tr>

          <tr className="flex col-span-2">
            <td className="flex-1">View Street in Directory:</td>
            <div className="flex-1">
              <input type="checkbox" className="w-7 h-7" />
            </div>
          </tr>

          <tr className="flex col-span-2">
            <td className="flex-1">View Signature Verificatin Data in Directory:</td>
            <div className="flex-1">
              <input type="checkbox" className="w-7 h-7" />
            </div>
          </tr>

          <tr className="flex col-span-2">
            <td className="flex-1">View Phone Number in Contacts:</td>
            <div className="flex-1">
              <input type="checkbox" className="w-7 h-7" />
            </div>
          </tr>

        </tbody>
      </table>
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-green-600 text-white rounded">Edit</button>
      </div>
    </div>
  )
}

export default UserInformation
