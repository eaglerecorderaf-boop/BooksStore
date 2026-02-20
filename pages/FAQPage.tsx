
import React from 'react';

const FAQPage: React.FC = () => {
  const faqs = [
    { q: 'چگونه می‌توانم سفارش خود را ثبت کنم؟', a: 'برای ثبت سفارش ابتدا باید در سایت عضو شوید، سپس کتاب مورد نظر را به سبد خرید اضافه کرده و مراحل تسویه حساب را طی کنید.' },
    { q: 'هزینه ارسال چقدر است؟', a: 'هزینه ارسال برای سفارش‌های بالای ۵۰۰ هزار تومان رایگان است. برای سفارش‌های کمتر، مبلغ ۵۰ هزار تومان هزینه ثابت در نظر گرفته می‌شود.' },
    { q: 'مدت زمان ارسال چقدر است؟', a: 'در تهران ۲۴ تا ۴۸ ساعت کاری و در شهرستان‌ها بین ۳ تا ۵ روز کاری از طریق پست پیشتاز یا تیپاکس ارسال خواهد شد.' },
    { q: 'آیا امکان لغو سفارش وجود دارد؟', a: 'بله، تا قبل از مرحله خروج از انبار و ارسال، می‌توانید از طریق پنل کاربری یا تماس با پشتیبانی سفارش خود را لغو کنید.' },
    { q: 'چطور کد تخفیف دریافت کنم؟', a: 'کدهای تخفیف در خبرنامه، اینستاگرام کتابینو و به مناسبت‌های مختلف برای کاربران فعال ارسال می‌شود.' }
  ];

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-black text-slate-900 mb-12 text-center">سوالات متداول</h1>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <details key={idx} className="group bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-slate-50 transition-all">
              <span className="font-bold text-slate-800">{faq.q}</span>
              <span className="text-amber-500 text-xl group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <div className="p-6 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-50">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
      <div className="mt-16 bg-amber-50 p-10 rounded-[2.5rem] text-center border border-amber-100">
        <h3 className="font-bold text-slate-800 mb-4">پاسخ خود را پیدا نکردید؟</h3>
        <p className="text-slate-500 mb-6 text-sm">پشتیبانی ما ۲۴ ساعته در خدمت شماست.</p>
        <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold">ارسال تیکت پشتیبانی</button>
      </div>
    </div>
  );
};

export default FAQPage;
