import { useState } from 'react';
import { FileText, Plus, Search, Filter, Printer, Eye, Send } from 'lucide-react';

interface Invoice {
  id: number;
  invoiceNumber: string;
  subscriber: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'overdue';
}

const mockInvoices: Invoice[] = [
  { id: 1, invoiceNumber: 'INV-2024-001', subscriber: 'أحمد محمد', amount: 500, dueDate: '2024-01-30', status: 'paid' },
  { id: 2, invoiceNumber: 'INV-2024-002', subscriber: 'سارة علي', amount: 750, dueDate: '2024-01-30', status: 'unpaid' },
  { id: 3, invoiceNumber: 'INV-2024-003', subscriber: 'محمد خالد', amount: 1200, dueDate: '2024-01-15', status: 'overdue' },
  { id: 4, invoiceNumber: 'INV-2024-004', subscriber: 'فاطمة حسن', amount: 300, dueDate: '2024-01-30', status: 'paid' },
  { id: 5, invoiceNumber: 'INV-2024-005', subscriber: 'عبدالله سعيد', amount: 450, dueDate: '2024-02-15', status: 'unpaid' },
];

export default function Invoices() {
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInvoices = invoices.filter(
    (inv) => inv.subscriber.includes(searchTerm) || inv.invoiceNumber.includes(searchTerm)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">مدفوع</span>;
      case 'unpaid':
        return <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">غير مدفوع</span>;
      case 'overdue':
        return <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">متأخر</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            إدارة الفواتير
          </h1>
          <p className="text-gray-500 mt-1">إنشاء وإدارة فواتير المشتركين</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg">
          <Plus className="w-5 h-5" />
          <span>إنشاء فاتورة</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <p className="text-green-600 text-sm">الفواتير المدفوعة</p>
          <p className="text-2xl font-bold text-green-700">2</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
          <p className="text-yellow-600 text-sm">غير مدفوعة</p>
          <p className="text-2xl font-bold text-yellow-700">2</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <p className="text-red-600 text-sm">متأخرة</p>
          <p className="text-2xl font-bold text-red-700">1</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="بحث برقم الفاتورة أو اسم المشترك..."
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
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">رقم الفاتورة</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">المشترك</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">المبلغ</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">تاريخ الاستحقاق</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الحالة</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice, index) => (
                <tr key={invoice.id} className="border-t hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-800">{index + 1}</td>
                  <td className="py-4 px-6 text-blue-600 font-medium">{invoice.invoiceNumber}</td>
                  <td className="py-4 px-6 text-gray-800">{invoice.subscriber}</td>
                  <td className="py-4 px-6 text-gray-800 font-medium">{invoice.amount} ر.س</td>
                  <td className="py-4 px-6 text-gray-500">{invoice.dueDate}</td>
                  <td className="py-4 px-6">{getStatusBadge(invoice.status)}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600" title="عرض">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-green-50 rounded-lg text-green-600" title="طباعة">
                        <Printer className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-purple-50 rounded-lg text-purple-600" title="إرسال">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
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
