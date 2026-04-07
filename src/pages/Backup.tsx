import { useState } from 'react';
import { Database, Download, Upload, Trash2, RefreshCw, HardDrive, Cloud, CheckCircle } from 'lucide-react';

interface BackupFile {
  id: number;
  name: string;
  size: string;
  date: string;
  type: 'local' | 'cloud';
  status: 'completed' | 'in_progress' | 'failed';
}

const mockBackups: BackupFile[] = [
  { id: 1, name: 'backup_2024_01_15.zip', size: '25.4 MB', date: '2024-01-15 10:30', type: 'local', status: 'completed' },
  { id: 2, name: 'backup_2024_01_14.zip', size: '24.8 MB', date: '2024-01-14 10:30', type: 'cloud', status: 'completed' },
  { id: 3, name: 'backup_2024_01_13.zip', size: '24.2 MB', date: '2024-01-13 10:30', type: 'local', status: 'completed' },
  { id: 4, name: 'backup_2024_01_12.zip', size: '23.9 MB', date: '2024-01-12 10:30', type: 'cloud', status: 'completed' },
];

export default function Backup() {
  const [backups] = useState<BackupFile[]>(mockBackups);
  const [isBackingUp, setIsBackingUp] = useState(false);

  const handleBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => setIsBackingUp(false), 3000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3" /> مكتمل
          </span>
        );
      case 'in_progress':
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
            <RefreshCw className="w-3 h-3 animate-spin" /> جاري...
          </span>
        );
      case 'failed':
        return (
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">فشل</span>
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
            <Database className="w-8 h-8 text-blue-600" />
            النسخ الاحتياطي
          </h1>
          <p className="text-gray-500 mt-1">إدارة النسخ الاحتياطية للبيانات</p>
        </div>
        <button
          onClick={handleBackup}
          disabled={isBackingUp}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg disabled:opacity-50"
        >
          {isBackingUp ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Download className="w-5 h-5" />
          )}
          <span>{isBackingUp ? 'جاري الإنشاء...' : 'إنشاء نسخة احتياطية'}</span>
        </button>
      </div>

      {/* Storage Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <HardDrive className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-sm">التخزين المحلي</p>
              <p className="text-xl font-bold text-gray-800">125.3 MB</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">35% مستخدم من 500 MB</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Cloud className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-sm">التخزين السحابي</p>
              <p className="text-xl font-bold text-gray-800">98.4 MB</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">20% مستخدم من 500 MB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Auto Backup Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">إعدادات النسخ التلقائي</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center justify-between">
              <span className="text-gray-700">تفعيل النسخ التلقائي</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500" />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">تكرار النسخ</label>
            <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>يومياً</option>
              <option>أسبوعياً</option>
              <option>شهرياً</option>
            </select>
          </div>
        </div>
      </div>

      {/* Backup List */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">النسخ الاحتياطية</h3>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Upload className="w-4 h-4" />
            <span>استعادة</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">#</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">اسم الملف</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الحجم</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">التاريخ</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">النوع</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الحالة</th>
                <th className="text-right py-4 px-6 text-gray-600 font-semibold">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {backups.map((backup, index) => (
                <tr key={backup.id} className="border-t hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-800">{index + 1}</td>
                  <td className="py-4 px-6 text-gray-800 font-medium">{backup.name}</td>
                  <td className="py-4 px-6 text-gray-600">{backup.size}</td>
                  <td className="py-4 px-6 text-gray-500">{backup.date}</td>
                  <td className="py-4 px-6">
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                      backup.type === 'local' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {backup.type === 'local' ? <HardDrive className="w-3 h-3" /> : <Cloud className="w-3 h-3" />}
                      {backup.type === 'local' ? 'محلي' : 'سحابي'}
                    </span>
                  </td>
                  <td className="py-4 px-6">{getStatusBadge(backup.status)}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600" title="تحميل">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg text-red-600" title="حذف">
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
    </div>
  );
}
