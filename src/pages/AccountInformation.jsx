import { useState } from "react";
import BuyNow from "../components/DialogBoxes/BuyNow";
import AddStorage from "../components/DialogBoxes/AddStorage";
import StorageArea from "../components/DialogBoxes/StorageArea"
import Purchases from "../components/DialogBoxes/Purchases"
import AddBilling from "../components/DialogBoxes/AddBilling"
const AccountInformation = () => {

  const [buyDialogOpen, setBuyDialogOpen] = useState(false);
  const [addStorageDialogOpen, setAddStorageDialogOpen] = useState(false);
  const [storageAreaDialogOpen, setStorageAreaDialogOpen] = useState(false);
  const [purchasesDialogOpen, setPurchasesDialogOpen] = useState(false);
  const [addBillingDialogOpen, setAddBillingDialogOpen] = useState(false);

  const handleBuyClose = () => {
    setBuyDialogOpen(false);
  };

  const handleAddStorageClose = () => {
    setAddStorageDialogOpen(false);
  };

  const handleStorageAreaClose = () => {
    setStorageAreaDialogOpen(false);
  };

  const handlePurchasesClose = () => {
    setPurchasesDialogOpen(false);
  };

  const handleAddBillingClose = () => {
    setAddBillingDialogOpen(false);
  };

  return (
    <div className="grid grid-cols-2 gap-4 bg-gray-100 min-h-screen p-4">
      <div className="col-span-2 p-4 bg-white rounded-md border border-gray-300 shadow-lg mx-2">
        <h2 className="text-green-400 font-bold text-lg border-b-2 border-green-400 pb-2">Remaining Credit Information</h2>
        <div className="mt-2 text-gray-700">
          <div className="flex flex-row gap-20 items-center">
            <p>Remaining Credit Balance: </p>
            <div className="space-x-5">
              <span className="text-black">0</span>
              <button
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
                onClick={() => setBuyDialogOpen(true)}>Buy Now
              </button>
            </div>
          </div>

          <a href="#" className="block text-blue-600 mt-2 mx-2">See usage details</a>

          <div className="mt-2 p-6 rounded mx-2 border-2 shadow-sm space-y-10">
            <div className="flex flex-row items-center gap-8">
              <p>Storage Area: </p>
              <p>0.00MB / 100.00MB</p>

              <button
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
                onClick={() => setAddStorageDialogOpen(true)}>Add
              </button>

              <button
                className="mt-2 ml-2 px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => setStorageAreaDialogOpen(true)}>Details Do
              </button>

            </div>
            <div className="flex flex-row space-x-7">
              <div className="flex flex-row w-1/2 items-center gap-4">
                <p>Should you add your incoming KEPs automatically so that you can receive them when your storage space is full?</p>
                <input type="checkbox" className="h-10 w-10 mt-2" />
              </div>
              <div className="flex flex-row w-1/2 items-center gap-4">
                <p className="text-red-600">You will receive a notification when your credit drops to 0 credits</p>
                <button className="bg-blue-600 text-white px-4 py-2">Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1 p-4 bg-white shadow-lg rounded-md border border-gray-300 mt-4 mx-2 h-fit">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th colSpan="2" className="p-2">
                <h2 className="text-green-400 font-bold text-lg border-b border-green-400">Account Information</h2>
              </th>
            </tr>
          </thead>
          <tbody className="grid grid-cols-2 gap-4 p-2">
            <tr className="flex justify-between col-span-2">
              <td className="flex-1">Account Name:</td>
              <td className="flex-1">hivin.polat@hs06.kep.tr</td>
            </tr>

            <tr className="flex justify-between col-span-2">
              <td className="flex-1">Account Type:</td>
              <td className="flex-1">individual</td>
            </tr>

            <tr className="flex justify-between col-span-2">
              <td className="flex-1">How to Get Service:</td>
              <td className="flex-1">Send/Receive</td>
            </tr>

            <tr className="flex justify-between col-span-2">
              <td className="flex-1">Account Status:</td>
              <td className="flex-1">Open</td>
            </tr>

            <tr className="flex justify-between col-span-2">
              <td className="flex-1">End Date:</td>
              <td className="flex-1"> 26.08.2025</td>
            </tr>

          </tbody>
        </table>
      </div>
      <div className="col-span-1 p-4 bg-white shadow-lg rounded-md border border-gray-300 mt-4 mx-2 h-fit">
        <div className="mt-2 text-gray-700">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th colSpan="2" className="p-2">
                  <h2 className="text-green-400 font-bold text-lg border-b border-green-400">Customer Information</h2>
                </th>
              </tr>
            </thead>
            <tbody className="grid grid-cols-2 gap-4 p-2">
              <tr className="flex justify-between col-span-2">
                <td className="flex-1">Customer Number:</td>
                <td className="flex-1">1190799</td>
              </tr>

              <tr className="flex justify-between col-span-2">
                <td className="flex-1">Ad Soyad:</td>
                <td className="flex-1"></td>
              </tr>

              <tr className="flex justify-between col-span-2">
                <td className="flex-1">Telephone:</td>
                <td className="flex-1"></td>
              </tr>

              <tr className="flex justify-between col-span-2">
                <td className="flex-1">Email:</td>
                <td className="flex-1"></td>
              </tr>

            </tbody>
          </table>
          <h2 className="text-green-400 font-bold text-lg border-b border-green-400">Billing Address</h2>
          <div className="flex flex-row justify-end">
            <button
              className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded"
              onClick={() => setPurchasesDialogOpen(true)}>Show Purchases
            </button>
            <button
              className="mt-2 ml-2 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setAddBillingDialogOpen(true)}>Add Billing Address
            </button>
          </div>

          <div className="mt-4 border-t pt-2">
            <p className="text-gray-500">No records to display.</p>
          </div>
        </div>
      </div>

      {/* New Message Dialog */}
      <BuyNow
        open={buyDialogOpen}
        handleClose={handleBuyClose}
      />

      <AddStorage
        open={addStorageDialogOpen}
        handleClose={handleAddStorageClose}
      />

      <StorageArea
        open={storageAreaDialogOpen}
        handleClose={handleStorageAreaClose}
      />

      <Purchases
        open={purchasesDialogOpen}
        handleClose={handlePurchasesClose}
      />

      <AddBilling
        open={addBillingDialogOpen}
        handleClose={handleAddBillingClose}
      />

    </div>
  )
}

export default AccountInformation
