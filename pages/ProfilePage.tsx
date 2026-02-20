
import React, { useState } from 'react';
import { User, Order, Address, Review } from '../types';
import { formatPrice } from '../constants';
import { useNavigate } from 'react-router-dom';
import { storage } from '../services/storage';

interface Props {
  user: User | null;
  orders: Order[];
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
}

type Tab = 'orders' | 'favorites' | 'addresses' | 'reviews' | 'security' | 'coupons' | 'edit';

const ProfilePage: React.FC<Props> = ({ user, orders, onLogout, onUpdateUser }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
  });

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

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { ...user, ...editForm };
    onUpdateUser(updatedUser);
    setIsEditing(false);
    alert('پروفایل با موفقیت بروزرسانی شد.');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div className="space-y-6">
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
        );
      case 'favorites':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
              <span>❤️</span> علاقه‌مندی‌ها
            </h2>
            <div className="bg-white p-12 rounded-3xl text-center border border-slate-100 shadow-sm">
              <p className="text-slate-400 mb-4">لیست علاقه‌مندی‌های شما خالی است.</p>
              <button onClick={() => navigate('/books')} className="text-amber-600 font-bold hover:underline">افزودن کتاب</button>
            </div>
          </div>
        );
      case 'addresses':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <span>📍</span> آدرس‌های من
              </h2>
              <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold">+ افزودن آدرس</button>
            </div>
            {(!user.addresses || user.addresses.length === 0) ? (
              <div className="bg-white p-12 rounded-3xl text-center border border-slate-100 shadow-sm">
                <p className="text-slate-400">شما هنوز هیچ آدرسی ثبت نکرده‌اید.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.addresses.map(addr => (
                  <div key={addr.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-bold text-slate-800">{addr.title}</h4>
                      <div className="flex gap-2">
                        <button className="text-slate-400 hover:text-amber-600">✏️</button>
                        <button className="text-slate-400 hover:text-red-600">🗑️</button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{addr.fullName}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{addr.fullAddress}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'reviews':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
              <span>💬</span> نظرات من
            </h2>
            {(!user.reviews || user.reviews.length === 0) ? (
              <div className="bg-white p-12 rounded-3xl text-center border border-slate-100 shadow-sm">
                <p className="text-slate-400">شما هنوز هیچ نظری ثبت نکرده‌اید.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {user.reviews.map(review => (
                  <div key={review.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-800">{review.bookTitle}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        review.status === 'approved' ? 'bg-green-100 text-green-700' : 
                        review.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {review.status === 'approved' ? 'تایید شده' : review.status === 'pending' ? 'در انتظار تایید' : 'رد شده'}
                      </span>
                    </div>
                    <div className="flex text-amber-400 text-xs mb-3">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{review.comment}</p>
                    <p className="text-[10px] text-slate-400 mt-4">{new Date(review.createdAt).toLocaleDateString('fa-IR')}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
              <span>🔒</span> امنیت و گذرواژه
            </h2>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 pr-2">رمز عبور فعلی</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 pr-2">رمز عبور جدید</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 pr-2">تکرار رمز عبور جدید</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                </div>
              </div>
              <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-700 transition-all shadow-lg shadow-slate-900/20">تغییر رمز عبور</button>
            </div>
          </div>
        );
      case 'coupons':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
              <span>🎟️</span> کدهای تخفیف من
            </h2>
            <div className="bg-white p-12 rounded-3xl text-center border border-slate-100 shadow-sm">
              <p className="text-slate-400 mb-4">شما در حال حاضر هیچ کد تخفیف فعالی ندارید.</p>
              <p className="text-xs text-slate-300">کدهای تخفیف به مناسبت‌های مختلف برای شما ارسال خواهد شد.</p>
            </div>
          </div>
        );
      case 'edit':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
              <span>✏️</span> ویرایش پروفایل
            </h2>
            <form onSubmit={handleUpdateProfile} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 pr-2">نام و نام خانوادگی</label>
                  <input 
                    type="text" 
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 pr-2">ایمیل</label>
                  <input 
                    type="email" 
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all text-left" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 pr-2">شماره موبایل</label>
                  <input 
                    type="tel" 
                    value={editForm.mobile}
                    onChange={(e) => setEditForm({...editForm, mobile: e.target.value})}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all text-left" 
                  />
                </div>
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-700 transition-all shadow-lg shadow-slate-900/20">ذخیره تغییرات</button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 mb-12 flex flex-col md:flex-row items-center gap-8 shadow-xl shadow-slate-900/10">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 text-4xl md:text-5xl font-bold border-4 border-white/20">
          {user.name[0]}
        </div>
        <div className="text-center md:text-right flex-grow">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{user.name}</h1>
          <p className="text-slate-400 mb-4 text-sm md:text-base">{user.email}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <button 
              onClick={() => setActiveTab('edit')}
              className="bg-white/10 hover:bg-white/20 px-5 py-2 rounded-xl text-xs md:text-sm transition-all border border-white/10"
            >
              ویرایش پروفایل
            </button>
            <button 
              onClick={handleLogoutClick}
              className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-5 py-2 rounded-xl text-xs md:text-sm transition-all border border-red-500/20"
            >
              خروج از حساب
            </button>
          </div>
        </div>
        {user.isAdmin && (
          <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl text-center">
            <span className="text-amber-500 font-bold text-[10px] block mb-1">سطح دسترسی</span>
            <span className="bg-amber-500 text-slate-900 px-3 py-1 rounded-lg text-[10px] font-black uppercase">مدیر کل</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-slate-100 p-4 space-y-1 shadow-sm sticky top-24">
            {[
              { id: 'orders', icon: '📦', label: 'سفارشات من' },
              { id: 'favorites', icon: '❤️', label: 'علاقه‌مندی‌ها' },
              { id: 'addresses', icon: '📍', label: 'آدرس‌های من' },
              { id: 'reviews', icon: '💬', label: 'نظرات من' },
              { id: 'security', icon: '🔒', label: 'امنیت و گذرواژه' },
              { id: 'coupons', icon: '🎟️', label: 'کدهای تخفیف' },
              { id: 'edit', icon: '✏️', label: 'ویرایش پروفایل' }
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => setActiveTab(item.id as Tab)}
                className={`w-full text-right p-4 rounded-2xl transition-all font-bold text-sm flex items-center justify-between group ${
                  activeTab === item.id ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/20' : 'hover:bg-slate-50 text-slate-600'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </span>
                <span className={`${activeTab === item.id ? 'text-slate-900' : 'text-slate-300 group-hover:text-amber-500'} transition-all`}>←</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="lg:col-span-3 min-h-[400px]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
