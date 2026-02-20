
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-slate-900 mb-6">داستان کتابینو</h1>
        <p className="text-lg text-slate-600 leading-relaxed">ما معتقدیم هر کتاب، دریچه‌ای به سوی دنیایی جدید است.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800" alt="کتابخانه" className="rounded-3xl shadow-2xl" />
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800">از سال ۱۳۹۸ در کنار شما هستیم</h2>
          <p className="text-slate-600 leading-8 text-justify">
            کتابینو فعالیت خود را با تیمی کوچک اما مشتاق آغاز کرد. هدف ما همواره فراهم کردن دسترسی آسان و سریع به باارزش‌ترین منابع دانش و ادبیات بوده است. امروز، با بیش از ۱۰,۰۰۰ عنوان کتاب در حوزه‌های مختلف، به یکی از مراجع معتبر کتاب در ایران تبدیل شده‌ایم.
          </p>
          <div className="flex gap-4">
            <div className="bg-amber-100 p-4 rounded-2xl flex-grow text-center">
              <span className="block text-2xl font-black text-amber-600">۵۰k+</span>
              <span className="text-xs text-slate-500 font-bold">مشتری وفادار</span>
            </div>
            <div className="bg-indigo-100 p-4 rounded-2xl flex-grow text-center">
              <span className="block text-2xl font-black text-indigo-600">۱۰k+</span>
              <span className="text-xs text-slate-500 font-bold">عنوان کتاب</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-white rounded-[2.5rem] p-12">
        <h3 className="text-2xl font-bold mb-8 text-center">ارزش‌های ما</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🌱</div>
            <h4 className="font-bold mb-2">رشد مداوم</h4>
            <p className="text-sm text-slate-400">ما هر روز برای بهتر شدن تلاش می‌کنیم.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h4 className="font-bold mb-2">تعهد به مشتری</h4>
            <p className="text-sm text-slate-400">رضایت شما بالاترین اولویت ماست.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">💎</div>
            <h4 className="font-bold mb-2">اصالت کالا</h4>
            <p className="text-sm text-slate-400">تضمین کیفیت و اصالت تمامی کتاب‌ها.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
