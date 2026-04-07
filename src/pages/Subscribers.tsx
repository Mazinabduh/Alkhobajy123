import { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Phone,
  MapPin,
} from 'lucide-react';

interface Subscriber {
  id: number;
  name: string;
  phone: string;
  address: string;
  meterNumber: string;
  status: 'active' | 'inactive';
  balance: number;
}

const mockSubscribers: Subscriber[] = [
  { id: 1, name: 'أحمد محمد العلي', phone: '0501234567', address: 'شارع الملك فهد، الرياض', meterNumber: 'M-001', status: 'active', balance: 500 },
  { id: 2, name: 'سارة علي حسن', phone: '0507654321', address: 'شارع العليا، الرياض', meterNumber: 'M-002', status: 'active', balance: 0 },
  { id: 3, name: 'محمد خالد يوسف', phone: '0509876543', address: 'حي النخيل، جدة', meterNumber: 'M-003', status: 'inactive', balance: 1200 },
  { id: 4, name: 'فاطمة حسن محمد', phone: '0503456789', address: 'حي السلامة، جدة', meterNumber: 'M-004', status: 'active', balance: 300 },
  { id: 5, name: 'عبدالله سعيد', phone: '0502345678', address: 'شارع التحلية، الدمام', meterNumber: 'M-005', status: 'active', balance: 0 },
];

export default function Subscribers() {
  const [subscribers] = useState<Subscriber[]>(mockSubscribers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filteredSubscribers = subscribers.filter(
    (s) =>
      s.name.includes(searchTerm) ||
      s.phone.includes(searchTerm) ||
      s.meterNumber.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            إدارة المشتركين
          </h1>
          <p className="text-gray-500 mt-1">إدارة وعرض جميع المشتركين في النظام</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>إضافة مشترك</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="بحث بالاسم، الهاتف، أو رقم العداد..."
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

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">#</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الاسم</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الهاتف</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">العنوان</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">رقم العداد</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الحالة</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الرصيد</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscribers.map((subscriber, index) => (
                <tr key={subscriber.id} className="border-t hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-800">{index + 1}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {subscriber.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-800">{subscriber.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      {subscriber.phone}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {subscriber.address}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-blue-600 font-medium">{subscriber.meterNumber}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        subscriber.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {subscriber.status === 'active' ? 'نشط' : 'غير نشط'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`font-medium ${
                        subscriber.balance > 0 ? 'text-red-600' : 'text-green-600'
                      }`}
                    >
                      {subscriber.balance} ر.س
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-green-50 rounded-lg text-green-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg mx-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">إضافة مشترك جديد</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رقم العداد</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600"
                >
                  حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
