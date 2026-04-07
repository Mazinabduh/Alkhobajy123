import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Dashboard from './pages/Dashboard';
import Subscribers from './pages/Subscribers';
import Readings from './pages/Readings';
import Invoices from './pages/Invoices';
import Collections from './pages/Collections';
import Arrears from './pages/Arrears';
import Inventory from './pages/Inventory';
import Meters from './pages/Meters';
import Expenses from './pages/Expenses';
import Reports from './pages/Reports';
import SMS from './pages/SMS';
import Users from './pages/Users';
import Backup from './pages/Backup';
import Settings from './pages/Settings';
import Login from './pages/Login';
import { useAuthStore } from './stores/authStore';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected Routes */}
        <Route element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/subscribers" element={<Subscribers />} />
          <Route path="/readings" element={<Readings />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/arrears" element={<Arrears />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/meters" element={<Meters />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/sms" element={<SMS />} />
          <Route path="/users" element={<Users />} />
          <Route path="/backup" element={<Backup />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
