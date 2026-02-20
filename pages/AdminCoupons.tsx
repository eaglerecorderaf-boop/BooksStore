
import React, { useState } from 'react';
import { Coupon } from '../types';

interface Props {
  coupons: Coupon[];
  onUpdateCoupons: (coupons: Coupon[]) => void;
}

const AdminCoupons: React.FC<Props> = ({ coupons, onUpdateCoupons }) => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCoupon: Coupon = {
      code: (formData.get('code') as string).toUpperCase(),
      discount: Number(formData.get('discount')),
      isActive: true,
    };

    if (coupons.some(c => c.code === newCoupon.code)) {
      alert('این کد تخفیف قبلاً تعریف شده است.');
      return;
    }

    onUpdateCoupons([newCoupon, ...coupons]);
    setShowModal(false);
  };

  const toggleStatus = (code: string) => {
    onUpdateCoupons(coupons.map(c => c.code === code ? { ...c, isActive: !c.isActive } : c));
  };

  const deleteCoupon = (code: string) => {
    if (confirm('آیا از حذف این کد تخفیف مطمئن هستید؟')) {
      onUpdateCoupons(coupons.filter(c => c.code !== code));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">مدیریت کدهای تخفیف</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2"
        >
          <span>+</span> ایجاد کد جدید
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="p-4 font-medium">کد تخفیف</th>
                <th className="p-4 font-medium">میزان تخفیف</th>
                <th className="p-4 font-medium">وضعیت</th>
                <th className="p-4 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {coupons.map(coupon => (
                <tr key={coupon.code} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-mono font-bold text-slate-800 tracking-widest">{coupon.code}</td>
                  <td className="p-4 font-bold text-green-600">{coupon.discount}%</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${coupon.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {coupon.isActive ? 'فعال' : 'غیرفعال'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      <button 
                        onClick={() => toggleStatus(coupon.code)}
                        className="text-indigo-600 hover:text-indigo-900 font-bold"
                      >
                        {coupon.isActive ? 'غیرفعال‌سازی' : 'فعال‌سازی'}
                      </button>
                      <button 
                        onClick={() => deleteCoupon(coupon.code)}
                        className="text-red-600 hover:text-red-900 font-bold"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {coupons.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-slate-400">هیچ کد تخفیفی یافت نشد.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in duration-200">
            <h3 className="text-xl font-bold mb-6">ایجاد کد تخفیف جدید</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs text-slate-400 mb-1">کد تخفیف (مثلاً: WELCOME20)</label>
                <input name="code" required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none font-mono uppercase" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">درصد تخفیف</label>
                <input name="discount" type="number" min="1" max="100" required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-grow bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-900/20">ایجاد کد</button>
                <button type="button" onClick={() => setShowModal(false)} className="px-8 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all">انصراف</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCoupons;
