import { useState } from 'react';
import { AlertCircle, Search, Filter, Send, Phone } from 'lucide-react';

interface Arrear {
  id: number;
  subscriber: string;
  phone: string;
  invoiceNumber: string;
  amount: number;
  daysOverdue: number;
  lastPayment: string;
}

const mockArrears: Arrear[] = [
  { id: 1, subscriber: 'محمد خالد', phone: '0509876543', invoiceNumber: 'INV-2024-003', amount: 1200, daysOverdue: 15, lastPayment: '2023-11-15' },
  { id: 2, subscriber: 'عبدالرحمن سعيد', phone: '0501112233', invoiceNumber: 'INV-2024-006', amount: 800, daysOverdue: 7, lastPayment: '2023-12-01' },
  { id: 3, subscriber: 'نورة أحمد', phone: '0504445566', invoiceNumber: 'INV-2024-007', amount: 450, daysOverdue: 3, lastPayment: '2024-01-05' },
];

export default function Arrears() {
  const [arrears] = useState<Arrear[]>(mockArrears);
  const [searchTerm, setSearchTerm] = useState('');

  const totalArrears = arrears.reduce((sum, a) => sum + a.amount, 0);

  const filteredArrears = arrears.filter(
    (a) => a.subscriber.includes(searchTerm) || a.invoiceNumber.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-red-600" />
            المتأخرات
          </h1>
          <p className="text-gray-500 mt-1">متابعة وإدارة المدفوعات المتأخرة</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-orange-600 transition-all shadow-lg">
          <Send className="w-5 h-5" />
          <span>إرسال تذكير جماعي</span>
        </button>
      </div>

      <div className="bg-gradient-to-l from-red-500 to-orange-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-100">إجمالي المتأخرات</p>
            <p className="text-4xl font-bold mt-2">{totalArrears.toLocaleString()} ر.س</p>
            <p className="text-red-200 text-sm mt-2">{arrears.length} فاتورة متأخرة</p>
          </div>
          <AlertCircle className="w-16 h-16 text-red-200" />
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
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">المشترك</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الهاتف</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">رقم الفاتورة</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">المبلغ</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">أيام التأخير</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">آخر دفعة</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredArrears.map((arrear, index) => (
                <tr key={arrear.id} className="border-t hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-800">{index + 1}</td>
                  <td className="py-4 px-6 text-gray-800 font-medium">{arrear.subscriber}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      {arrear.phone}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-blue-600">{arrear.invoiceNumber}</td>
                  <td className="py-4 px-6 text-red-600 font-medium">{arrear.amount} ر.س</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      arrear.daysOverdue > 10 ? 'bg-red-100 text-red-700' : 
                      arrear.daysOverdue > 5 ? 'bg-orange-100 text-orange-700' : 
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {arrear.daysOverdue} يوم
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-500">{arrear.lastPayment}</td>
                  <td className="py-4 px-6">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                      <Send className="w-4 h-4" />
                      <span className="text-sm">تذكير</span>
                    </button>
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
