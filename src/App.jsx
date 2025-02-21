import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Inbox from "./pages/Inbox";
import OutBox from "./pages/OutBox";
import Drafts from "./pages/Drafts";
import EvidenceBox from "./pages/EvidenceBox"
import Bin from "./pages/Bin"
import MyAddressBook from "./pages/MyAddressBook";
import VerifyEvidence from "./pages/VerifyEvidence"
import InquireGuide from "./pages/InquireGuide";
import AccountHolderInformation from "./pages/AccountHolderInformation"
import AccountInformation from "./pages/AccountInformation"
import UserInformation from "./pages/UserInformation"
import AccountLogs from "./pages/AccountLogs"
import AccountClosure from "./pages/AccountClosure"
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
            <Route path="inbox" element={<Inbox />} />
            <Route path="outbox" element={<OutBox />} />
            <Route path="drafts" element={<Drafts />} />
            <Route path="evidence-box" element={<EvidenceBox />} />
            <Route path="bin" element={<Bin />} />
            <Route path="my-address-book" element={<MyAddressBook />} />
            <Route path="verify-evidence" element={<VerifyEvidence />} />
            <Route path="inquire-guide" element={<InquireGuide />} />
            <Route path="account-holder-information" element={<AccountHolderInformation />} />
            <Route path="account-information" element={<AccountInformation />} />
            <Route path="user-information" element={<UserInformation />} />
            <Route path="account-logs" element={<AccountLogs />} />
            <Route path="account-closure" element={<AccountClosure />} />

          </Route>
        </Route>

        {/* Catch-All Route for unmatched paths (redirect to login page) */}
        <Route path="*" element={<Navigate to="/" replace />} /> {/* Redirect unmatched routes to "/" */}
      </Routes>
    </Router>
  );
};

export default App;
