
import React from 'react';

const ShippingInfoPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-black text-slate-900 mb-12 text-center">روش‌های ارسال و تحویل</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all">
          <div className="text-5xl mb-6">🛵</div>
          <h3 className="text-2xl font-bold text-slate-800 mb-4">ارسال اکسپرس (تهران)</h3>
          <p className="text-slate-500 text-sm leading-7 mb-6">ویژه ساکنین شهر تهران. سفارش شما توسط پیک اختصاصی کتابینو در بازه زمانی انتخابی تحویل داده می‌شود.</p>
          <ul className="text-xs font-bold text-slate-400 space-y-2">
            <li>• تحویل در کمتر از ۲۴ ساعت</li>
            <li>• امکان انتخاب بازه زمانی</li>
            <li>• هزینه: ۵۰,۰۰۰ تومان</li>
          </ul>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all">
          <div className="text-5xl mb-6">📦</div>
          <h3 className="text-2xl font-bold text-slate-800 mb-4">پست پیشتاز (سراسر کشور)</h3>
          <p className="text-slate-500 text-sm leading-7 mb-6">ارسال به تمامی نقاط ایران از طریق شرکت پست. کد رهگیری مرسوله بلافاصله پس از تحویل به پست برای شما ارسال می‌شود.</p>
          <ul className="text-xs font-bold text-slate-400 space-y-2">
            <li>• تحویل ۳ تا ۵ روز کاری</li>
            <li>• ارسال به دورترین نقاط</li>
            <li>• هزینه: ۴۵,۰۰۰ تومان</li>
          </ul>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-12 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-right">
          <h4 className="text-2xl font-bold mb-2">ارسال رایگان برای خریدهای بالا</h4>
          <p className="text-slate-400">سفارش‌های بیش از ۵۰۰,۰۰۰ تومان را مهمان کتابینو باشید.</p>
        </div>
        <div className="bg-amber-500 text-slate-900 px-8 py-4 rounded-2xl font-black text-xl">رایگان!</div>
      </div>
    </div>
  );
};

export default ShippingInfoPage;
