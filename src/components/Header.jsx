import { Menu, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header({ toggleSidebar }) {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('auth')
    navigate("/"); // Redirect to login page
  };

  return (
    <header className="w-full bg-blue-600 shadow-md p-3 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      {/* Sidebar Toggle Button */}
      <div className="flex flex-row justify-center items-center">
        <button onClick={toggleSidebar} className="p-2">
          <Menu className="w-6 h-6 text-white" />
        </button>
        <div className="text-white px-8">KEPKUR Webmail</div>
      </div>

      {/* Right Side - Info & Email (Stacked) */}
      <div className="flex flex-col items-end">
        {/* Storage & Credit Info (Top Row) */}
        <div className="flex gap-4 mx-4">
          <div className="bg-yellow-600 text-white px-3 rounded-full text-sm">
            <b>Storage Space(MB)</b> 0.47 MB / 100.00 MB Remaining 99.53%
          </div>
          <div className="bg-green-500 text-white px-3 rounded-full text-sm">
            <b>Remaining credit:</b> 4386.50
          </div>
        </div>

        {/* Email (Bottom Row) */}
        <div className="relative mt-1">
          <button
            onClick={() => setShowLogout(!showLogout)}
            className="text-white text-sm font-medium flex"
          >
            ilayda.kuran@hs06.kep.tr <ChevronDown />
          </button>

          {/* Logout Dropdown */}
          {showLogout && (
            <div
              className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md p-2"
              onClick={handleLogout}
            >
              <button className="flex items-center gap-2 text-red-600">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}