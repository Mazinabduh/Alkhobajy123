import { useState } from 'react';
import { Wallet, Plus, Search, Filter, Calendar, DollarSign } from 'lucide-react';

interface Collection {
  id: number;
  receiptNumber: string;
  subscriber: string;
  invoiceNumber: string;
  amount: number;
  paymentMethod: string;
  date: string;
}

const mockCollections: Collection[] = [
  { id: 1, receiptNumber: 'REC-001', subscriber: 'أحمد محمد', invoiceNumber: 'INV-2024-001', amount: 500, paymentMethod: 'نقداً', date: '2024-01-15' },
  { id: 2, receiptNumber: 'REC-002', subscriber: 'سارة علي', invoiceNumber: 'INV-2024-002', amount: 750, paymentMethod: 'تحويل بنكي', date: '2024-01-14' },
  { id: 3, receiptNumber: 'REC-003', subscriber: 'فاطمة حسن', invoiceNumber: 'INV-2024-004', amount: 300, paymentMethod: 'نقداً', date: '2024-01-13' },
];

export default function Collections() {
  const [collections] = useState<Collection[]>(mockCollections);
  const [searchTerm, setSearchTerm] = useState('');

  const totalCollected = collections.reduce((sum, c) => sum + c.amount, 0);

  const filteredCollections = collections.filter(
    (c) => c.subscriber.includes(searchTerm) || c.receiptNumber.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <Wallet className="w-8 h-8 text-blue-600" />
            التحصيل
          </h1>
          <p className="text-gray-500 mt-1">إدارة عمليات التحصيل والمدفوعات</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg">
          <Plus className="w-5 h-5" />
          <span>تسجيل دفعة</span>
        </button>
      </div>

      <div className="bg-gradient-to-l from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100">إجمالي التحصيل هذا الشهر</p>
            <p className="text-4xl font-bold mt-2">{totalCollected.toLocaleString()} ر.س</p>
            <p className="text-green-200 text-sm mt-2">{collections.length} عملية تحصيل</p>
          </div>
          <DollarSign className="w-16 h-16 text-green-200" />
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
            type="date"
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
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">رقم الإيصال</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">المشترك</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">رقم الفاتورة</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">المبلغ</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">طريقة الدفع</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {filteredCollections.map((collection, index) => (
                <tr key={collection.id} className="border-t hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-800">{index + 1}</td>
                  <td className="py-4 px-6 text-blue-600 font-medium">{collection.receiptNumber}</td>
                  <td className="py-4 px-6 text-gray-800">{collection.subscriber}</td>
                  <td className="py-4 px-6 text-gray-600">{collection.invoiceNumber}</td>
                  <td className="py-4 px-6 text-green-600 font-medium">{collection.amount} ر.س</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      collection.paymentMethod === 'نقداً' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {collection.paymentMethod}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-500">{collection.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
