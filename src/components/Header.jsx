import { Menu, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { getDashboardInfo } from "../services/UserInfoService";

// eslint-disable-next-line react/prop-types
export default function Header({ toggleSidebar }) {
  const { user, exitUser } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [showLogout, setShowLogout] = useState(false);
  const [data, setData] = useState({});
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    exitUser();
    navigate("/"); // Redirect to login page
  };

  const fetchData = async () => {
    try {
      const response = await getDashboardInfo(); // Fetch data
      if (response) {
        setData(response);
      } else {
        setData([]); // Default to empty array
      }
    } catch (error) {
      console.error("Error fetching inbox items:", error);
      setData([]);
    }
  };

  // Fetch data when component mounts or when reloadTrigger changes
  useEffect(() => {
    fetchData();
  }, [reloadTrigger]);


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
            <b>{t("storage-space")}(MB)</b> {data.used_quota} MB / {data.total_quota} MB {t("remaining")} {(1 - data.used_quota / data.total_quota) * 100}%
          </div>
          <div className="bg-green-500 text-white px-3 rounded-full text-sm">
            <b>{t("remaining-credit")}:</b> 4386.50
          </div>
        </div>

        {/* Email (Bottom Row) */}
        <div className="relative mt-3 flex">
          {/* Language Dropdown */}
          <div className="relative px-4">
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              value={i18n.language}
              className="bg-gray-100 text-black px-2 py-1 rounded-md text-sm cursor-pointer"
            >
              <option value="en">en</option>
              <option value="tr">tr</option>
            </select>
          </div>
          <div>
            <button
              onClick={() => setShowLogout(!showLogout)}
              className="text-white text-sm  flex"
            >
              {user?.kep_address}<ChevronDown />
            </button>

            {/* Logout Dropdown */}
            {showLogout && (
              <div
                className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md p-2"
                onClick={handleLogout}
              >
                <button className="flex items-center gap-2 text-red-600">
                  <LogOut className="w-4 h-4" /> {t("logout")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}