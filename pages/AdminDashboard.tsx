
import React from 'react';
import { Link } from 'react-router-dom';
import { Order, Book } from '../types';
import { formatPrice } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Props {
  orders: Order[];
  books: Book[];
}

const AdminDashboard: React.FC<Props> = ({ orders, books }) => {
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const lowStock = books.filter(b => b.stock < 10);
  
  // Chart Mock Data
  const chartData = [
    { name: 'فروردین', sales: 4000 },
    { name: 'اردیبهشت', sales: 3000 },
    { name: 'خرداد', sales: 2000 },
    { name: 'تیر', sales: 2780 },
    { name: 'مرداد', sales: 1890 },
    { name: 'شهریور', sales: 2390 },
  ];

  const stats = [
    { title: 'کل فروش', value: formatPrice(totalRevenue), color: 'bg-indigo-500', icon: '💰' },
    { title: 'سفارشات', value: orders.length, color: 'bg-amber-500', icon: '📦' },
    { title: 'موجودی کتاب', value: books.reduce((acc, b) => acc + b.stock, 0), color: 'bg-green-500', icon: '📚' },
    { title: 'کاربران', value: '۱۵۴', color: 'bg-slate-800', icon: '👥' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar (Simple for Admin) */}
      <aside className="lg:col-span-1 space-y-2">
        <Link to="/admin" className="block bg-amber-500 text-slate-900 p-4 rounded-xl font-bold shadow-md transition-all">📊 داشبورد</Link>
        <Link to="/admin/books" className="block bg-white text-slate-600 p-4 rounded-xl font-bold hover:bg-slate-50 transition-all">📖 مدیریت کتاب‌ها</Link>
        <Link to="/admin/orders" className="block bg-white text-slate-600 p-4 rounded-xl font-bold hover:bg-slate-50 transition-all">📦 مدیریت سفارش‌ها</Link>
        <Link to="/admin/users" className="block bg-white text-slate-600 p-4 rounded-xl font-bold hover:bg-slate-50 transition-all">👥 کاربران</Link>
        <Link to="/admin/coupons" className="block bg-white text-slate-600 p-4 rounded-xl font-bold hover:bg-slate-50 transition-all">🎟 کدهای تخفیف</Link>
        
        <div className="pt-8 px-4">
          <h4 className="text-[10px] font-black text-slate-400 uppercase mb-4">تنظیمات درگاه پرداخت</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold text-slate-600">درگاه مستقیم (بانک)</span>
              <div className="w-8 h-4 bg-green-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 opacity-50">
              <span className="text-[10px] font-bold text-slate-600">درگاه واسط (زرین‌پال)</span>
              <div className="w-8 h-4 bg-slate-200 rounded-full relative">
                <div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:col-span-3 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className={`w-12 h-12 ${s.color} text-white rounded-xl flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                {s.icon}
              </div>
              <p className="text-slate-500 text-sm mb-1">{s.title}</p>
              <h3 className="text-xl font-bold text-slate-800">{s.value}</h3>
            </div>
          ))}
        </div>

        {/* Chart & Low Stock */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-8">نمودار فروش ۶ ماهه</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{fontSize: 12}} />
                  <YAxis hide />
                  <Tooltip cursor={{fill: '#f8fafc'}} />
                  <Bar dataKey="sales" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-slate-800">هشدار موجودی کم</h3>
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">{lowStock.length} عنوان</span>
            </div>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {lowStock.map(b => (
                <div key={b.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                  <img src={b.image} className="w-10 h-10 object-cover rounded" />
                  <div className="flex-grow">
                    <p className="text-xs font-bold text-slate-800 truncate w-40">{b.title}</p>
                    <p className="text-[10px] text-slate-500">موجودی: {b.stock} عدد</p>
                  </div>
                  <Link to="/admin/books" className="text-indigo-600 text-xs hover:underline">ویرایش</Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Latest Orders Table */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <h3 className="font-bold text-slate-800 mb-8">آخرین سفارش‌ها</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="pb-4 font-medium">شماره سفارش</th>
                  <th className="pb-4 font-medium">مشتری</th>
                  <th className="pb-4 font-medium">تاریخ</th>
                  <th className="pb-4 font-medium">مبلغ</th>
                  <th className="pb-4 font-medium">وضعیت</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">هیچ سفارشی ثبت نشده است</td>
                  </tr>
                ) : (
                  orders.slice(0, 5).map(order => (
                    <tr key={order.id} className="border-b border-slate-50 last:border-0">
                      <td className="py-4 font-mono">#{order.id.slice(0, 8)}</td>
                      <td className="py-4 font-bold">{order.shippingAddress.fullName}</td>
                      <td className="py-4 text-slate-500">{new Date(order.createdAt).toLocaleDateString('fa-IR')}</td>
                      <td className="py-4 font-bold">{formatPrice(order.totalAmount)}</td>
                      <td className="py-4">
                        <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
