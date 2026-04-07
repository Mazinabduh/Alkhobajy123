import {
  Users,
  FileText,
  Wallet,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Droplets,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const monthlyData = [
  { month: 'يناير', revenue: 45000, expenses: 12000 },
  { month: 'فبراير', revenue: 52000, expenses: 15000 },
  { month: 'مارس', revenue: 48000, expenses: 11000 },
  { month: 'أبريل', revenue: 61000, expenses: 18000 },
  { month: 'مايو', revenue: 55000, expenses: 14000 },
  { month: 'يونيو', revenue: 67000, expenses: 20000 },
];

const consumptionData = [
  { name: 'منطقة A', value: 35, color: '#3b82f6' },
  { name: 'منطقة B', value: 25, color: '#06b6d4' },
  { name: 'منطقة C', value: 20, color: '#8b5cf6' },
  { name: 'منطقة D', value: 20, color: '#22c55e' },
];

const recentPayments = [
  { id: 1, subscriber: 'أحمد محمد', amount: 500, date: '2024-01-15' },
  { id: 2, subscriber: 'سارة علي', amount: 750, date: '2024-01-14' },
  { id: 3, subscriber: 'محمد خالد', amount: 300, date: '2024-01-13' },
  { id: 4, subscriber: 'فاطمة حسن', amount: 450, date: '2024-01-12' },
];

export default function Dashboard() {
  const stats = [
    {
      title: 'إجمالي المشتركين',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'الفواتير الشهرية',
      value: '856',
      change: '+8%',
      trend: 'up',
      icon: FileText,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'التحصيل الشهري',
      value: '450,000 ر.س',
      change: '+15%',
      trend: 'up',
      icon: Wallet,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'المتأخرات',
      value: '125,000 ر.س',
      change: '-5%',
      trend: 'down',
      icon: AlertCircle,
      color: 'from-red-500 to-red-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">لوحة التحكم</h1>
          <p className="text-gray-500 mt-1">مرحباً بك في نظام إدارة محطة المياه</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
          <Droplets className="w-5 h-5" />
          <span className="font-medium">يناير 2024</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">الإيرادات والمصروفات</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" name="الإيرادات" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#ef4444" name="المصروفات" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">استهلاك المناطق</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={consumptionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {consumptionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {consumptionData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">آخر المدفوعات</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-right py-3 px-4 text-gray-600 font-medium">#</th>
                <th className="text-right py-3 px-4 text-gray-600 font-medium">المشترك</th>
                <th className="text-right py-3 px-4 text-gray-600 font-medium">المبلغ</th>
                <th className="text-right py-3 px-4 text-gray-600 font-medium">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((payment, index) => (
                <tr key={payment.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">{index + 1}</td>
                  <td className="py-3 px-4 text-gray-800">{payment.subscriber}</td>
                  <td className="py-3 px-4 text-green-600 font-medium">
                    {payment.amount} ر.س
                  </td>
                  <td className="py-3 px-4 text-gray-500">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
