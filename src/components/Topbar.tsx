import { useAuthStore } from '../stores/authStore';
import { useThemeStore } from '../stores/themeStore';
import {
  Menu,
  Bell,
  Sun,
  Moon,
  LogOut,
  Search,
  Globe,
} from 'lucide-react';
import { useState } from 'react';

export default function Topbar() {
  const { user, logout } = useAuthStore();
  const { toggleSidebar, theme, setTheme } = useThemeStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: 1, title: 'فاتورة جديدة', message: 'تم إنشاء فاتورة للمشترك أحمد محمد', time: '5 دقائق' },
    { id: 2, title: 'دفعة مستلمة', message: 'تم استلام دفعة بقيمة 500 ريال', time: '10 دقائق' },
    { id: 3, title: 'تنبيه قراءة', message: 'حان وقت قراءة العدادات الشهرية', time: '1 ساعة' },
  ];

  return (
    <header className="h-16 bg-white shadow-sm border-b flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Right Side */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>

        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="بحث..."
            className="w-64 pr-10 pl-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Left Side */}
      <div className="flex items-center gap-3">
        {/* Language Toggle */}
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1">
          <Globe className="w-5 h-5 text-gray-600" />
          <span className="text-sm text-gray-600">AR</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-gray-600" />
          ) : (
            <Sun className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-800">الإشعارات</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-4 border-b hover:bg-gray-50 cursor-pointer"
                  >
                    <p className="font-medium text-gray-800">{notif.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{notif.message}</p>
                    <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-gray-50 text-center">
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                  عرض الكل
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-700">{user?.name || 'Admin'}</p>
              <p className="text-xs text-gray-500">{user?.role || 'مدير النظام'}</p>
            </div>
          </button>

          {showProfile && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border overflow-hidden">
              <div className="p-2">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <LogOut className="w-4 h-4" />
                  <span onClick={logout}>تسجيل الخروج</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
