import { Outlet } from "react-router-dom";  // Import Outlet
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState); // Toggle the sidebar state
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar - Left side, hidden when closed */}
      <div className={`transition-all duration-400 ${isSidebarOpen ? 'w-64' : 'w-0'} fixed left-0 top-16 z-50`}>
        <Sidebar isOpen={isSidebarOpen} />
      </div>

      <div className={`flex flex-col w-full transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}> {/* Dynamic margin */}
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <main className="mt-20 transition-all duration-300 w-full">
          <Outlet />  {/* Render the child route component */}
        </main>
      </div>
    </div>
  );
}
