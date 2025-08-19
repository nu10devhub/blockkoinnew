import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import Unallocated from '../pages/UnallocatedDeposits';
import Match from '../pages/UnallocatedDeposits/Match';
import Reports from '../pages/ReportsPage';
import Allocated from '../pages/MatchedDeposits';
import Withdraw from '../pages/WithdrawPage';
import Profiles from '../pages/ProfilesPage';
import ClientProfile from '../pages/ProfilesPage/ClientProfile';
import TransactionHistory from '../pages/ProfilesPage/TransactionHistory';
import Beneficiaries from '../pages/Beneficiaries';
import Banks from '../pages/Banks';
import Fees from '../pages/FeePage';
import Rights from '../pages/RightsPage';
import Settings from '../pages/Settings';
import Archive from '../pages/Archive';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/unallocated" element={<Unallocated />} />
      <Route path="/unallocated/match" element={<Match />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/allocated" element={<Allocated />} />
      <Route path="/withdraw" element={<Withdraw />} />
      <Route path="/profiles" element={<Profiles />} />
      <Route path="/profiles/:username" element={<ClientProfile />} />
      <Route path="/profiles/:username/transactionhistory" element={<TransactionHistory />} />
      <Route path="/beneficiaries" element={<Beneficiaries />} />
      <Route path="/banks" element={<Banks />} />
      <Route path="/fees" element={<Fees />} />
      <Route path="/rights" element={<Rights />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/archive" element={<Archive />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;