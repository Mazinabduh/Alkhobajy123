import { useState } from 'react';
import { MessageSquare, Plus, Search, Filter, Send, Clock, CheckCircle, XCircle } from 'lucide-react';

interface SMSMessage {
  id: number;
  subscriber: string;
  phone: string;
  message: string;
  status: 'sent' | 'pending' | 'failed';
  date: string;
}

const mockMessages: SMSMessage[] = [
  { id: 1, subscriber: 'أحمد محمد', phone: '0501234567', message: 'تذكير: فاتورتك بقيمة 500 ريال مستحقة الدفع', status: 'sent', date: '2024-01-15 10:30' },
  { id: 2, subscriber: 'سارة علي', phone: '0507654321', message: 'تم استلام دفعتك بنجاح. شكراً لك', status: 'sent', date: '2024-01-15 09:15' },
  { id: 3, subscriber: 'محمد خالد', phone: '0509876543', message: 'تنبيه: فاتورتك متأخرة. يرجى السداد', status: 'pending', date: '2024-01-15 08:00' },
  { id: 4, subscriber: 'فاطمة حسن', phone: '0503456789', message: 'عذراً، حدث خطأ في إرسال الفاتورة', status: 'failed', date: '2024-01-14 14:20' },
];

export default function SMS() {
  const [messages] = useState<SMSMessage[]>(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filteredMessages = messages.filter(
    (m) => m.subscriber.includes(searchTerm) || m.phone.includes(searchTerm)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3" /> تم الإرسال
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
            <Clock className="w-3 h-3" /> في الانتظار
          </span>
        );
      case 'failed':
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
            <XCircle className="w-3 h-3" /> فشل
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            الرسائل النصية
          </h1>
          <p className="text-gray-500 mt-1">إدارة وإرسال الرسائل النصية للمشتركين</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>إرسال رسالة</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <p className="text-green-600 text-sm">تم الإرسال</p>
          <p className="text-2xl font-bold text-green-700">{messages.filter(m => m.status === 'sent').length}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
          <p className="text-yellow-600 text-sm">في الانتظار</p>
          <p className="text-2xl font-bold text-yellow-700">{messages.filter(m => m.status === 'pending').length}</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <p className="text-red-600 text-sm">فشلت</p>
          <p className="text-2xl font-bold text-red-700">{messages.filter(m => m.status === 'failed').length}</p>
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
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الرسالة</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الحالة</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((message, index) => (
                <tr key={message.id} className="border-t hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-800">{index + 1}</td>
                  <td className="py-4 px-6 text-gray-800 font-medium">{message.subscriber}</td>
                  <td className="py-4 px-6 text-gray-600">{message.phone}</td>
                  <td className="py-4 px-6 text-gray-600 max-w-xs truncate">{message.message}</td>
                  <td className="py-4 px-6">{getStatusBadge(message.status)}</td>
                  <td className="py-4 px-6 text-gray-500">{message.date}</td>
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
            <h2 className="text-xl font-bold text-gray-800 mb-4">إرسال رسالة نصية</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">المشترك</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>جميع المشتركين</option>
                  <option>مشتركي منطقة A</option>
                  <option>مشتركي منطقة B</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الرسالة</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="اكتب رسالتك هنا..."
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
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600"
                >
                  <Send className="w-4 h-4" />
                  إرسال
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
