import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Users from "./pages/Users";
import Inbox from "./pages/Inbox";
import Profile from "./pages/Profile";
import PrivateRoute from "./routes/PrivateRoute";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route for Login */}
        <Route path="/" element={<LoginPage />} /> {/* Login page is at "/" */}

        {/* Protected Routes - These routes are wrapped with PrivateRoute */}
        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            {/*<Route index element={<Navigate to="users" replace />} />  Redirect from dashboard root to /users */}
            <Route path="users" element={<Users />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Catch-All Route for unmatched paths (redirect to login page) */}
        <Route path="*" element={<Navigate to="/" replace />} /> {/* Redirect unmatched routes to "/" */}
      </Routes>
    </Router>
  );
};

export default App;
