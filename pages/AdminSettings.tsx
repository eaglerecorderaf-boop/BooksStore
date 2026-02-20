
import React, { useState } from 'react';
import { PaymentSettings } from '../types';

interface Props {
  settings: PaymentSettings;
  onUpdateSettings: (settings: PaymentSettings) => void;
}

const AdminSettings: React.FC<Props> = ({ settings, onUpdateSettings }) => {
  const [form, setForm] = useState<PaymentSettings>(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(form);
    alert('تنظیمات پرداخت با موفقیت بروزرسانی شد.');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-slate-800">تنظیمات پرداخت</h1>
      
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 pr-2">شماره کارت بانکی</label>
            <input 
              type="text" 
              value={form.cardNumber}
              onChange={(e) => setForm({...form, cardNumber: e.target.value})}
              placeholder="۶۰۳۷ - ۹۹۷۵ - ۱۲۳۴ - ۵۶۷۸"
              className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all text-left font-mono" 
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 pr-2">نام صاحب حساب</label>
            <input 
              type="text" 
              value={form.accountHolder}
              onChange={(e) => setForm({...form, accountHolder: e.target.value})}
              className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 pr-2">نام بانک</label>
            <input 
              type="text" 
              value={form.bankName}
              onChange={(e) => setForm({...form, bankName: e.target.value})}
              className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-700 transition-all shadow-lg shadow-slate-900/20"
          >
            ذخیره تنظیمات
          </button>
        </form>
      </div>

      <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl">
        <h4 className="text-amber-800 font-bold mb-2 flex items-center gap-2">
          <span>💡</span> راهنما
        </h4>
        <p className="text-xs text-amber-700 leading-relaxed">
          اطلاعاتی که در این بخش وارد می‌کنید، در مرحله تسویه حساب به کاربرانی که روش «کارت به کارت» را انتخاب می‌کنند نمایش داده می‌شود. لطفاً در وارد کردن شماره کارت دقت فرمایید.
        </p>
      </div>
    </div>
  );
};

export default AdminSettings;
