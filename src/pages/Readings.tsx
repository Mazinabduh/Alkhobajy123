import { useState } from 'react';
import { Gauge, Plus, Search, Filter, Calendar } from 'lucide-react';

interface Reading {
  id: number;
  subscriber: string;
  meterNumber: string;
  previousReading: number;
  currentReading: number;
  consumption: number;
  date: string;
  status: 'pending' | 'confirmed';
}

const mockReadings: Reading[] = [
  { id: 1, subscriber: 'أحمد محمد', meterNumber: 'M-001', previousReading: 1200, currentReading: 1350, consumption: 150, date: '2024-01-15', status: 'confirmed' },
  { id: 2, subscriber: 'سارة علي', meterNumber: 'M-002', previousReading: 800, currentReading: 920, consumption: 120, date: '2024-01-15', status: 'confirmed' },
  { id: 3, subscriber: 'محمد خالد', meterNumber: 'M-003', previousReading: 2100, currentReading: 2100, consumption: 0, date: '2024-01-14', status: 'pending' },
  { id: 4, subscriber: 'فاطمة حسن', meterNumber: 'M-004', previousReading: 500, currentReading: 580, consumption: 80, date: '2024-01-14', status: 'confirmed' },
];

export default function Readings() {
  const [readings] = useState<Reading[]>(mockReadings);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReadings = readings.filter(
    (r) => r.subscriber.includes(searchTerm) || r.meterNumber.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <Gauge className="w-8 h-8 text-blue-600" />
            قراءات العدادات
          </h1>
          <p className="text-gray-500 mt-1">تسجيل وإدارة قراءات عدادات المشتركين</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg">
          <Plus className="w-5 h-5" />
          <span>تسجيل قراءة</span>
        </button>
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
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">المشترك</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">رقم العداد</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">القراءة السابقة</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">القراءة الحالية</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الاستهلاك</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">التاريخ</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {filteredReadings.map((reading, index) => (
                <tr key={reading.id} className="border-t hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-800">{index + 1}</td>
                  <td className="py-4 px-6 text-gray-800 font-medium">{reading.subscriber}</td>
                  <td className="py-4 px-6 text-blue-600">{reading.meterNumber}</td>
                  <td className="py-4 px-6 text-gray-600">{reading.previousReading}</td>
                  <td className="py-4 px-6 text-gray-600">{reading.currentReading}</td>
                  <td className="py-4 px-6">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {reading.consumption} م³
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-500">{reading.date}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        reading.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {reading.status === 'confirmed' ? 'مؤكد' : 'معلق'}
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
