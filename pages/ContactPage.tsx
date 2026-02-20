
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-slate-900 mb-6">با ما در ارتباط باشید</h1>
        <p className="text-lg text-slate-600">پیشنهادات، انتقادات و سوالات خود را با ما در میان بگذارید.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="text-2xl mb-4">📍</div>
            <h4 className="font-bold text-slate-800 mb-2">دفتر مرکزی</h4>
            <p className="text-slate-500 text-sm leading-relaxed">تهران، میدان ونک، خیابان ملاصدرا، پلاک ۱۲۳، طبقه ۴</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="text-2xl mb-4">📞</div>
            <h4 className="font-bold text-slate-800 mb-2">تلفن پشتیبانی</h4>
            <p className="text-slate-500 text-sm font-mono">۰۲۱-۱۲۳۴۵۶۷۸</p>
            <p className="text-slate-400 text-xs mt-1">پاسخگویی ۹ صبح تا ۶ عصر</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="text-2xl mb-4">✉️</div>
            <h4 className="font-bold text-slate-800 mb-2">پست الکترونیک</h4>
            <p className="text-slate-500 text-sm">support@ketabino.ir</p>
          </div>
        </div>

        <div className="lg:col-span-8">
          <form className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2">نام کامل</label>
                <input type="text" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="علی رضایی" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2">ایمیل</label>
                <input type="email" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none text-left" placeholder="example@mail.com" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">موضوع</label>
              <input type="text" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="مثلاً: پیگیری سفارش" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">متن پیام</label>
              <textarea rows={6} className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none resize-none" placeholder="پیام خود را اینجا بنویسید..."></textarea>
            </div>
            <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black hover:bg-amber-500 hover:text-slate-900 transition-all shadow-lg shadow-slate-900/10">ارسال پیام</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
