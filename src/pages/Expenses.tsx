import { useState } from 'react';
import { DollarSign, Plus, Search, Filter, Calendar, Receipt } from 'lucide-react';

interface Expense {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: string;
  paymentMethod: string;
}

const mockExpenses: Expense[] = [
  { id: 1, description: 'فاتورة كهرباء', category: 'مرافق', amount: 2500, date: '2024-01-15', paymentMethod: 'تحويل بنكي' },
  { id: 2, description: 'راتب موظفين', category: 'رواتب', amount: 15000, date: '2024-01-10', paymentMethod: 'تحويل بنكي' },
  { id: 3, description: 'صيانة مضخات', category: 'صيانة', amount: 800, date: '2024-01-12', paymentMethod: 'نقداً' },
  { id: 4, description: 'وقود مولدات', category: 'تشغيل', amount: 1200, date: '2024-01-14', paymentMethod: 'نقداً' },
  { id: 5, description: 'أدوات مكتبية', category: 'مكتبية', amount: 150, date: '2024-01-13', paymentMethod: 'نقداً' },
];

export default function Expenses() {
  const [expenses] = useState<Expense[]>(mockExpenses);
  const [searchTerm, setSearchTerm] = useState('');

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const filteredExpenses = expenses.filter(
    (e) => e.description.includes(searchTerm) || e.category.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-blue-600" />
            المصروفات
          </h1>
          <p className="text-gray-500 mt-1">تسجيل وإدارة مصروفات المحطة</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg">
          <Plus className="w-5 h-5" />
          <span>إضافة مصروف</span>
        </button>
      </div>

      <div className="bg-gradient-to-l from-purple-500 to-indigo-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100">إجمالي المصروفات هذا الشهر</p>
            <p className="text-4xl font-bold mt-2">{totalExpenses.toLocaleString()} ر.س</p>
            <p className="text-purple-200 text-sm mt-2">{expenses.length} عملية صرف</p>
          </div>
          <Receipt className="w-16 h-16 text-purple-200" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <p className="text-blue-600 text-sm">مرافق</p>
          <p className="text-xl font-bold text-blue-700">2,500 ر.س</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <p className="text-green-600 text-sm">رواتب</p>
          <p className="text-xl font-bold text-green-700">15,000 ر.س</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
          <p className="text-yellow-600 text-sm">صيانة</p>
          <p className="text-xl font-bold text-yellow-700">800 ر.س</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <p className="text-purple-600 text-sm">تشغيل</p>
          <p className="text-xl font-bold text-purple-700">1,200 ر.س</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="بحث..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="month"
            className="pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Filter className="w-5 h-5 text-gray-500" />
          <span>تصفية</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">#</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الوصف</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الفئة</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">المبلغ</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">التاريخ</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">طريقة الدفع</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense, index) => (
                <tr key={expense.id} className="border-t hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-800">{index + 1}</td>
                  <td className="py-4 px-6 text-gray-800 font-medium">{expense.description}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                      {expense.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-red-600 font-medium">{expense.amount} ر.س</td>
                  <td className="py-4 px-6 text-gray-500">{expense.date}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      expense.paymentMethod === 'نقداً' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {expense.paymentMethod}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
