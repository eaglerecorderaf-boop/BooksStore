
import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <h1 className="text-3xl font-black text-slate-900 mb-8 border-b pb-6 text-center">حریم خصوصی کاربران</h1>
        
        <div className="space-y-8 text-slate-600 leading-8 text-justify">
          <p>کتابینو به حریم خصوصی شما احترام می‌گذارد و متعهد به محافظت از اطلاعات شخصی است که در اختیار ما قرار می‌دهید.</p>
          
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4">کدام اطلاعات را جمع‌آوری می‌کنیم؟</h2>
            <p>هنگام ثبت‌نام و خرید، اطلاعاتی نظیر نام، شماره تماس، آدرس پستی و ایمیل شما برای پردازش سفارش و بهبود تجربه کاربری جمع‌آوری می‌شود.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4">استفاده از کوکی‌ها</h2>
            <p>سایت ما از کوکی‌ها برای تحلیل ترافیک و شخصی‌سازی محتوا استفاده می‌کند. شما می‌توانید تنظیمات کوکی را در مرورگر خود مدیریت کنید.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4">امنیت داده‌ها</h2>
            <p>تمامی تراکنش‌های مالی از طریق درگاه‌های امن و دارای پروتکل SSL انجام می‌شود. اطلاعات کارت بانکی شما هرگز در دیتابیس ما ذخیره نخواهد شد.</p>
          </section>

          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-blue-800 text-sm text-center">
            آخرین به‌روزرسانی: مهر ماه ۱۴۰۳
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
