import { useState } from 'react';
import { Zap, Plus, Search, Filter, Wrench } from 'lucide-react';

interface Meter {
  id: number;
  serialNumber: string;
  subscriber: string;
  type: string;
  installDate: string;
  lastReading: number;
  status: 'active' | 'maintenance' | 'replaced';
}

const mockMeters: Meter[] = [
  { id: 1, serialNumber: 'M-001', subscriber: 'أحمد محمد', type: '1 بوصة', installDate: '2022-05-15', lastReading: 1350, status: 'active' },
  { id: 2, serialNumber: 'M-002', subscriber: 'سارة علي', type: '3/4 بوصة', installDate: '2022-06-20', lastReading: 920, status: 'active' },
  { id: 3, serialNumber: 'M-003', subscriber: 'محمد خالد', type: '1 بوصة', installDate: '2021-03-10', lastReading: 2100, status: 'maintenance' },
  { id: 4, serialNumber: 'M-004', subscriber: 'فاطمة حسن', type: '3/4 بوصة', installDate: '2023-01-05', lastReading: 580, status: 'active' },
  { id: 5, serialNumber: 'M-005', subscriber: 'عبدالله سعيد', type: '1 بوصة', installDate: '2020-08-22', lastReading: 3500, status: 'replaced' },
];

export default function Meters() {
  const [meters] = useState<Meter[]>(mockMeters);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMeters = meters.filter(
    (m) => m.serialNumber.includes(searchTerm) || m.subscriber.includes(searchTerm)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">نشط</span>;
      case 'maintenance':
        return <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">صيانة</span>;
      case 'replaced':
        return <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">مستبدل</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <Zap className="w-8 h-8 text-blue-600" />
            إدارة العدادات
          </h1>
          <p className="text-gray-500 mt-1">متابعة وإدارة عدادات المياه</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg">
          <Plus className="w-5 h-5" />
          <span>تسجيل عداد</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <p className="text-green-600 text-sm">عدادات نشطة</p>
          <p className="text-2xl font-bold text-green-700">{meters.filter(m => m.status === 'active').length}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
          <p className="text-yellow-600 text-sm">في الصيانة</p>
          <p className="text-2xl font-bold text-yellow-700">{meters.filter(m => m.status === 'maintenance').length}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <p className="text-gray-600 text-sm">مستبدلة</p>
          <p className="text-2xl font-bold text-gray-700">{meters.filter(m => m.status === 'replaced').length}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="بحث برقم العداد أو المشترك..."
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
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">رقم العداد</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">المشترك</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">النوع</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">تاريخ التركيب</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">آخر قراءة</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الحالة</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredMeters.map((meter, index) => (
                <tr key={meter.id} className="border-t hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-800">{index + 1}</td>
                  <td className="py-4 px-6 text-blue-600 font-medium">{meter.serialNumber}</td>
                  <td className="py-4 px-6 text-gray-800">{meter.subscriber}</td>
                  <td className="py-4 px-6 text-gray-600">{meter.type}</td>
                  <td className="py-4 px-6 text-gray-500">{meter.installDate}</td>
                  <td className="py-4 px-6 text-gray-800">{meter.lastReading} م³</td>
                  <td className="py-4 px-6">{getStatusBadge(meter.status)}</td>
                  <td className="py-4 px-6">
                    <button className="p-2 hover:bg-yellow-50 rounded-lg text-yellow-600" title="صيانة">
                      <Wrench className="w-4 h-4" />
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
