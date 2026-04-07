import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useThemeStore } from '../stores/themeStore';

export default function MainLayout() {
  const { sidebarCollapsed } = useThemeStore();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'mr-16' : 'mr-64'}`}>
        <Topbar />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
