import { useState } from 'react';
import { Package, Plus, Search, Filter, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  price: number;
}

const mockItems: InventoryItem[] = [
  { id: 1, name: 'عداد مياه 1 بوصة', category: 'عدادات', quantity: 25, unit: 'قطعة', minStock: 10, price: 150 },
  { id: 2, name: 'عداد مياه 3/4 بوصة', category: 'عدادات', quantity: 8, unit: 'قطعة', minStock: 10, price: 120 },
  { id: 3, name: 'أنبوب PVC 1 بوصة', category: 'أنابيب', quantity: 150, unit: 'متر', minStock: 50, price: 5 },
  { id: 4, name: 'محبس مياه 1 بوصة', category: 'محابس', quantity: 40, unit: 'قطعة', minStock: 20, price: 25 },
  { id: 5, name: 'وصلة T 1 بوصة', category: 'وصلات', quantity: 5, unit: 'قطعة', minStock: 30, price: 8 },
];

export default function Inventory() {
  const [items] = useState<InventoryItem[]>(mockItems);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(
    (item) => item.name.includes(searchTerm) || item.category.includes(searchTerm)
  );

  const totalValue = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const lowStockItems = items.filter(item => item.quantity <= item.minStock);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <Package className="w-8 h-8 text-blue-600" />
            إدارة المخزون
          </h1>
          <p className="text-gray-500 mt-1">متابعة وإدارة مخزون المحطة</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg">
          <Plus className="w-5 h-5" />
          <span>إضافة صنف</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <p className="text-blue-600 text-sm">إجمالي الأصناف</p>
          <p className="text-2xl font-bold text-blue-700">{items.length}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <p className="text-green-600 text-sm">قيمة المخزون</p>
          <p className="text-2xl font-bold text-green-700">{totalValue.toLocaleString()} ر.س</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <p className="text-red-600 text-sm">أصناف منخفضة</p>
          <p className="text-2xl font-bold text-red-700">{lowStockItems.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="بحث بالاسم أو الفئة..."
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
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">اسم الصنف</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الفئة</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الكمية</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الوحدة</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الحد الأدنى</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">السعر</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-800">{index + 1}</td>
                  <td className="py-4 px-6 text-gray-800 font-medium">{item.name}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`font-medium ${item.quantity <= item.minStock ? 'text-red-600' : 'text-green-600'}`}>
                      {item.quantity}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{item.unit}</td>
                  <td className="py-4 px-6 text-gray-500">{item.minStock}</td>
                  <td className="py-4 px-6 text-gray-800">{item.price} ر.س</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-green-50 rounded-lg text-green-600" title="إدخال">
                        <ArrowUpCircle className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg text-red-600" title="إخراج">
                        <ArrowDownCircle className="w-4 h-4" />
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
