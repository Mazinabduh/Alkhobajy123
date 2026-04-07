import { useState } from 'react';
import { Settings as SettingsIcon, Save, Globe, Palette, Building, Bell, Lock, Database } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'عام', icon: SettingsIcon },
    { id: 'company', name: 'الشركة', icon: Building },
    { id: 'appearance', name: 'المظهر', icon: Palette },
    { id: 'notifications', name: 'الإشعارات', icon: Bell },
    { id: 'security', name: 'الأمان', icon: Lock },
    { id: 'backup', name: 'النسخ الاحتياطي', icon: Database },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-blue-600" />
            الإعدادات
          </h1>
          <p className="text-gray-500 mt-1">إعدادات النظام والتطبيق</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg">
          <Save className="w-5 h-5" />
          <span>حفظ التغييرات</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex border-b">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">الإعدادات العامة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اللغة</label>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <select className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="ar">العربية</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المنطقة الزمنية</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Asia/Riyadh (GMT+3)</option>
                    <option>Asia/Dubai (GMT+4)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">تنسيق التاريخ</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">العملة</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>ريال سعودي (ر.س)</option>
                    <option>درهم إماراتي (د.إ)</option>
                    <option>دينار كويتي (د.ك)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'company' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">معلومات الشركة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اسم المحطة</label>
                  <input
                    type="text"
                    defaultValue="محطة الخبجي للمياه"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الرقم الضريبي</label>
                  <input
                    type="text"
                    defaultValue="123456789012345"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الهاتف</label>
                  <input
                    type="text"
                    defaultValue="+966 11 234 5678"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    defaultValue="info@alkhabji-water.com"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
                  <textarea
                    rows={3}
                    defaultValue="شارع الملك فهد، الرياض، المملكة العربية السعودية"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">إعدادات المظهر</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">السمة</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="p-4 border-2 border-blue-500 rounded-lg bg-white">
                      <div className="w-full h-8 bg-gray-100 rounded mb-2"></div>
                      <span className="text-sm">فاتح</span>
                    </button>
                    <button className="p-4 border-2 border-gray-200 rounded-lg bg-gray-900">
                      <div className="w-full h-8 bg-gray-800 rounded mb-2"></div>
                      <span className="text-sm text-white">داكن</span>
                    </button>
                    <button className="p-4 border-2 border-gray-200 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                      <div className="w-full h-8 bg-white/20 rounded mb-2"></div>
                      <span className="text-sm text-white">أزرق</span>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اللون الرئيسي</label>
                  <div className="flex gap-3">
                    <button className="w-10 h-10 rounded-full bg-blue-600 ring-2 ring-offset-2 ring-blue-600"></button>
                    <button className="w-10 h-10 rounded-full bg-green-600"></button>
                    <button className="w-10 h-10 rounded-full bg-purple-600"></button>
                    <button className="w-10 h-10 rounded-full bg-red-600"></button>
                    <button className="w-10 h-10 rounded-full bg-orange-600"></button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">إعدادات الإشعارات</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">إشعارات الفواتير</p>
                    <p className="text-sm text-gray-500">تلقي إشعار عند إنشاء فاتورة جديدة</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500" />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">إشعارات الدفعات</p>
                    <p className="text-sm text-gray-500">تلقي إشعار عند استلام دفعة</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500" />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">تنبيهات المتأخرات</p>
                    <p className="text-sm text-gray-500">تلقي تنبيه عند وجود فواتير متأخرة</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500" />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">تنبيهات المخزون</p>
                    <p className="text-sm text-gray-500">تلقي تنبيه عند انخفاض المخزون</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500" />
                </label>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">إعدادات الأمان</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">مهلة الجلسة (بالدقائق)</label>
                  <input
                    type="number"
                    defaultValue={30}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأدنى لكلمة المرور</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>6 أحرف</option>
                    <option>8 أحرف</option>
                    <option>12 حرف</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">تفعيل المصادقة الثنائية</p>
                    <p className="text-sm text-gray-500">حماية إضافية لحسابك</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500" />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">تسجيل محاولات الدخول</p>
                    <p className="text-sm text-gray-500">حفظ سجل بجميع محاولات تسجيل الدخول</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500" />
                </label>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">إعدادات النسخ الاحتياطي</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">تكرار النسخ التلقائي</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>يومياً</option>
                    <option>أسبوعياً</option>
                    <option>شهرياً</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الاحتفاظ بالنسخ</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>30 يوم</option>
                    <option>60 يوم</option>
                    <option>90 يوم</option>
                    <option>للأبد</option>
                  </select>
                </div>
              </div>
              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">النسخ السحابي التلقائي</p>
                  <p className="text-sm text-gray-500">رفع النسخ الاحتياطية تلقائياً للسحابة</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500" />
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
