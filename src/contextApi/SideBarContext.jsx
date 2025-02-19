import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

// eslint-disable-next-line react/prop-types
export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom Hook to Access Context
// eslint-disable-next-line react-refresh/only-export-components
export const useSidebar = () => useContext(SidebarContext);
