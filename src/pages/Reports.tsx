import { useState } from 'react';
import { BarChart3, FileText, Download, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const revenueData = [
  { month: 'يناير', revenue: 45000, expenses: 12000, profit: 33000 },
  { month: 'فبراير', revenue: 52000, expenses: 15000, profit: 37000 },
  { month: 'مارس', revenue: 48000, expenses: 11000, profit: 37000 },
  { month: 'أبريل', revenue: 61000, expenses: 18000, profit: 43000 },
  { month: 'مايو', revenue: 55000, expenses: 14000, profit: 41000 },
  { month: 'يونيو', revenue: 67000, expenses: 20000, profit: 47000 },
];

const consumptionData = [
  { month: 'يناير', consumption: 12500 },
  { month: 'فبراير', consumption: 13200 },
  { month: 'مارس', consumption: 11800 },
  { month: 'أبريل', consumption: 14500 },
  { month: 'مايو', consumption: 15200 },
  { month: 'يونيو', consumption: 16800 },
];

const categoryData = [
  { name: 'مشتركين', value: 45, color: '#3b82f6' },
  { name: 'تجاري', value: 30, color: '#22c55e' },
  { name: 'حكومي', value: 15, color: '#8b5cf6' },
  { name: 'أخرى', value: 10, color: '#f59e0b' },
];

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState('billing');

  const reports = [
    { id: 'billing', name: 'تقرير الفواتير', icon: FileText },
    { id: 'collection', name: 'تقرير التحصيل', icon: TrendingUp },
    { id: 'expenses', name: 'تقرير المصروفات', icon: TrendingDown },
    { id: 'production', name: 'تقرير الإنتاج', icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            التقارير
          </h1>
          <p className="text-gray-500 mt-1">عرض وتحليل تقارير المحطة</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="month"
              className="pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            <Download className="w-5 h-5" />
            <span>تصدير PDF</span>
          </button>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="flex gap-2 bg-white rounded-xl p-2 shadow-sm">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                selectedReport === report.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{report.name}</span>
            </button>
          );
        })}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-500 text-sm">إجمالي الإيرادات</p>
          <p className="text-2xl font-bold text-green-600">328,000 ر.س</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-500">+15%</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-500 text-sm">إجمالي المصروفات</p>
          <p className="text-2xl font-bold text-red-600">90,000 ر.س</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-500">+8%</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-500 text-sm">صافي الربح</p>
          <p className="text-2xl font-bold text-blue-600">238,000 ر.س</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-500">+18%</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-500 text-sm">إجمالي الاستهلاك</p>
          <p className="text-2xl font-bold text-purple-600">84,000 م³</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-500">+12%</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">الإيرادات والمصروفات</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#22c55e" name="الإيرادات" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#ef4444" name="المصروفات" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">استهلاك المياه</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={consumptionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="consumption" stroke="#3b82f6" strokeWidth={2} name="الاستهلاك" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">توزيع المشتركين</h3>
        <div className="flex items-center justify-center gap-8">
          <ResponsiveContainer width="50%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-gray-600">{item.name}</span>
                <span className="font-semibold text-gray-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
