import { FaInfoCircle } from "react-icons/fa";
const AccountClosure = () => {
  return (
    <div className="p-6 rounded-md bg-gray-100 h-screen overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Account Closure</h1>

      {/* E-Signature Closure Section */}
      <div className="p-4 border rounded-md mb-4">
        <h2 className="text-lg ">E-Signature</h2>
        <div className="text-gray-700 text-sm mt-2 flex flex-row gap-2">
          <FaInfoCircle className="text-gray-700 text-2xl" />
          <p>If you want to close your account with e-signature, your account will be closed immediately.
            You will not be able to send or receive messages from your account, but you can log in for 3 months.</p>
        </div>
        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded">
          Close My Account with E-Signature
        </button>
      </div>

      {/* Account Closure Request Section */}
      <div className="p-4 border rounded-md">
        <h2 className="text-lg">Creating an Account Closure Request</h2>

        <div className="text-gray-700 text-sm mt-2 flex flex-row gap-2">
          <FaInfoCircle className="text-gray-700 text-2xl" />
          <p>If you request closure, you must send a signed account closure petition within 3 days.
          You cannot send or receive messages during this period.</p>
        </div>

        <div className="text-gray-700 text-sm mt-2 flex flex-row gap-2">
          <FaInfoCircle className="text-gray-700 text-2xl" />
          <p> If you do not send your petition after 3 days, your account will be reopened for sending and receiving.</p>
        </div>

        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded">
          Create Account Closure Request
        </button>
      </div>
    </div>
  );
};

export default AccountClosure;
