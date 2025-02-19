import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react"; // Icons for dropdown
import { useSidebar } from "../../src/contextApi/SideBarContext";

export default function Sidebar() {
  const location = useLocation();  // Get the current route

  const { isSidebarOpen } = useSidebar(); 

  const [isAccountOpen, setIsAccountOpen] = useState(false)
  // Function to check if the current route matches the link
  const getActiveClass = (path) => {
    return location.pathname === path ? "bg-gray-100 text-gray-700" : "bg-white text-gray-700"; // Highlight active link
  };

  return (
    <aside className={`h-screen fixed top-20 left-0 transition-all duration-400 ${isSidebarOpen ? "pb-28 w-64" : "w-0"} overflow-y-auto`}>
      <nav>
        <ul>
          <li className={`p-2 border-b ${getActiveClass("/inbox")}`}>
            <Link to="/inbox" className='block py-2 px-4 rounded-md'>
              Inbox
            </Link>
          </li>
          <li className={`p-2 border-b ${getActiveClass("/outbox")}`}>
            <Link to="/outbox" className='block py-2 px-4 rounded-md'>
              Outbox
            </Link>
          </li>
          <li className={`p-2 border-b ${getActiveClass("/drafts")}`}>
            <Link to="/drafts" className='block py-2 px-4 rounded-md'>
              Drafts
            </Link>
          </li>
          <li className={`p-2 border-b ${getActiveClass("/evidence-box")}`}>
            <Link to="/evidence-box" className='block py-2 px-4 rounded-md'>
              Evidence Box
            </Link>
          </li>
          <li className={`p-2 border-b ${getActiveClass("/bin")}`}>
            <Link to="/bin" className='block py-2 px-4 rounded-md'>
              Bin
            </Link>
          </li>
          <li className={`p-2 border-b ${getActiveClass("/my-address-book")}`}>
            <Link to="/my-address-book" className='block py-2 px-4 rounded-md'>
              My Address Book
            </Link>
          </li>
          <li className={`p-2 border-b ${getActiveClass("/verify-evidence")}`}>
            <Link to="/verify-evidence" className='block py-2 px-4 rounded-md'>
              Verify Evidence 
            </Link>
          </li>
          <li className={`p-2 border-b ${getActiveClass("/inquire-guide")}`}>
            <Link to="/inquire-guide" className='block py-2 px-4 rounded-md'>
              Inquire Guide
            </Link>
          </li>

             {/* Parent Link with Dropdown */}
             <li className="p-2 border-b">
            <button
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className="w-full flex justify-between items-center py-2 px-4 rounded-md bg-white text-gray-700"
            >
              Account Transactions {isAccountOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {/* Sublinks - Only show when isAccountOpen is true */}
            {isAccountOpen && (
              <ul className="pl-6 mt-2 space-y-1">
                <li className={getActiveClass("/account-holder-information")}>
                  <Link to="/account-holder-information" className="block py-2 px-4 rounded-md">Account Holder Information</Link>
                </li>
                <li className={getActiveClass("/account-information")}>
                  <Link to="/account-information" className="block py-2 px-4 rounded-md">Account Information</Link>
                </li>
                <li className={getActiveClass("/user-information")}>
                  <Link to="/user-information" className="block py-2 px-4 rounded-md">User Information</Link>
                </li>
                <li className={getActiveClass("/account-logs")}>
                  <Link to="/account-logs" className="block py-2 px-4 rounded-md">Account Logs</Link>
                </li>
                <li className={getActiveClass("/account-closure")}>
                  <Link to="/account-closure" className="block py-2 px-4 rounded-md">Account Closure</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
}
