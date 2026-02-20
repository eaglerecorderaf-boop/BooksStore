
import React from 'react';
import { User, Order } from '../types';
import { formatPrice } from '../constants';
import { useNavigate } from 'react-router-dom';

interface Props {
  user: User | null;
  orders: Order[];
  onLogout: () => void;
}

const ProfilePage: React.FC<Props> = ({ user, orders, onLogout }) => {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 text-center">
        <div className="text-6xl mb-6">🔒</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">لطفاً ابتدا وارد شوید</h2>
        <button 
          onClick={() => navigate('/login')}
          className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-700 transition-all"
        >
          رفتن به صفحه ورود
        </button>
      </div>
    );
  }

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-slate-900 text-white rounded-3xl p-10 mb-12 flex flex-col md:flex-row items-center gap-8 shadow-xl shadow-slate-900/10">
        <div className="w-32 h-32 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 text-5xl font-bold border-4 border-white/20">
          {user.name[0]}
        </div>
        <div className="text-center md:text-right flex-grow">
          <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
          <p className="text-slate-400 mb-4">{user.email}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <button className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-xl text-sm transition-all border border-white/10">ویرایش پروفایل</button>
            <button 
              onClick={handleLogoutClick}
              className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-6 py-2 rounded-xl text-sm transition-all border border-red-500/20"
            >
              خروج از حساب
            </button>
          </div>
        </div>
        {user.isAdmin && (
          <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl text-center">
            <span className="text-amber-500 font-bold text-sm block mb-2">سطح دسترسی</span>
            <span className="bg-amber-500 text-slate-900 px-3 py-1 rounded-lg text-xs font-bold uppercase">مدیر کل</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <span>📦</span> سفارشات اخیر
          </h2>
          {orders.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl text-center border border-slate-100 shadow-sm">
              <p className="text-slate-400 mb-4">شما هنوز هیچ سفارشی ثبت نکرده‌اید.</p>
              <button onClick={() => navigate('/books')} className="text-amber-600 font-bold hover:underline">مشاهده فروشگاه</button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map(order => (
                <div key={order.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm overflow-hidden relative group hover:border-amber-200 transition-all">
                  <div className="absolute top-0 right-0 w-1.5 h-full bg-amber-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">شماره سفارش: <span className="font-mono text-slate-800">#{order.id.slice(0, 8)}</span></p>
                      <p className="text-xs text-slate-400">تاریخ: {new Date(order.createdAt).toLocaleDateString('fa-IR')}</p>
                    </div>
                    <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="flex gap-4 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                    {order.items.map(item => (
                      <img key={item.id} src={item.image} className="w-12 h-16 object-cover rounded border border-slate-100 flex-shrink-0" alt={item.title} />
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center border-t border-slate-50 pt-4">
                    <p className="font-bold text-slate-900">مبلغ کل: {formatPrice(order.totalAmount)}</p>
                    <button className="text-amber-600 text-sm font-bold hover:underline">مشاهده جزئیات</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-8">پنل کاربری</h2>
          <div className="bg-white rounded-3xl border border-slate-100 p-4 space-y-2 shadow-sm">
            {[
              { icon: '❤️', label: 'علاقه‌مندی‌ها' },
              { icon: '📍', label: 'آدرس‌های من' },
              { icon: '💬', label: 'نظرات من' },
              { icon: '🔒', label: 'امنیت و گذرواژه' },
              { icon: '🎟️', label: 'کدهای تخفیف' }
            ].map((item, idx) => (
              <button key={idx} className="w-full text-right p-4 rounded-2xl hover:bg-slate-50 transition-all font-medium text-slate-700 flex items-center justify-between group">
                <span className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  {item.label}
                </span>
                <span className="text-slate-300 group-hover:text-amber-500 transition-all">←</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
