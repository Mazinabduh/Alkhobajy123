import { Link, useLocation } from 'react-router-dom';
import { useThemeStore } from '../stores/themeStore';
import {
  Home,
  Users,
  Gauge,
  FileText,
  Wallet,
  AlertCircle,
  Package,
  Zap,
  DollarSign,
  BarChart3,
  MessageSquare,
  UserCog,
  Database,
  Settings,
  ChevronRight,
  Droplets,
} from 'lucide-react';

const menuItems = [
  { path: '/', icon: Home, label: 'Dashboard', labelAr: 'لوحة التحكم' },
  { path: '/subscribers', icon: Users, label: 'Subscribers', labelAr: 'المشتركون' },
  { path: '/readings', icon: Gauge, label: 'Readings', labelAr: 'القراءات' },
  { path: '/invoices', icon: FileText, label: 'Invoices', labelAr: 'الفواتير' },
  { path: '/collections', icon: Wallet, label: 'Collections', labelAr: 'التحصيل' },
  { path: '/arrears', icon: AlertCircle, label: 'Arrears', labelAr: 'المتأخرات' },
  { path: '/inventory', icon: Package, label: 'Inventory', labelAr: 'المخزون' },
  { path: '/meters', icon: Zap, label: 'Meters', labelAr: 'العدادات' },
  { path: '/expenses', icon: DollarSign, label: 'Expenses', labelAr: 'المصروفات' },
  { path: '/reports', icon: BarChart3, label: 'Reports', labelAr: 'التقارير' },
  { path: '/sms', icon: MessageSquare, label: 'SMS', labelAr: 'الرسائل' },
  { path: '/users', icon: UserCog, label: 'Users', labelAr: 'المستخدمون' },
  { path: '/backup', icon: Database, label: 'Backup', labelAr: 'النسخ الاحتياطي' },
  { path: '/settings', icon: Settings, label: 'Settings', labelAr: 'الإعدادات' },
];

export default function Sidebar() {
  const location = useLocation();
  const { sidebarCollapsed } = useThemeStore();

  return (
    <aside
      className={`fixed right-0 top-0 h-full bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-2xl transition-all duration-300 z-50 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-blue-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg">Alkhabji</span>
              <span className="text-xs text-blue-300">Water Station</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100%-4rem)]">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-l from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'text-blue-100 hover:bg-blue-700/50'
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-blue-300'}`} />
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1 text-sm font-medium">{item.labelAr}</span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${isActive ? 'rotate-180' : 'group-hover:translate-x-1'}`}
                  />
                </>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
