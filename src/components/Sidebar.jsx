import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen }) {
  const location = useLocation();  // Get the current route

  // Function to check if the current route matches the link
  const getActiveClass = (path) => {
    return location.pathname === path ? "bg-gray-100 text-gray-700" : "bg-white text-gray-700"; // Highlight active link
  };

  return (
    <aside className={`h-screen fixed top-20 left-0 transition-all duration-400 ${isOpen ? "w-64" : "w-0"} overflow-hidden`}>
      <nav>
        <ul>
          <li className={`p-2 border-b ${getActiveClass("/users")}`}>
            <Link to="/users" className='block py-2 px-4 rounded-md'>
              Users
            </Link>
          </li>
          <li className={`p-2 border-b ${getActiveClass("/inbox")}`}>
            <Link to="/inbox" className='block py-2 px-4 rounded-md'>
              Inbox
            </Link>
          </li>
          <li className={`p-2 border-b ${getActiveClass("/profile")}`}>
            <Link to="/profile" className='block py-2 px-4 rounded-md'>
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
