
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <Link to="/" className="hover:opacity-80 transition-opacity mb-6 block">
              <Logo size={40} className="text-white" />
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              کتابینو مرجع تخصصی کتاب‌های علمی، دانشگاهی و داستانی. ما تلاش می‌کنیم بهترین تجربه خرید کتاب را برای شما فراهم کنیم.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-amber-500 transition-colors"><span className="sr-only">اینستاگرام</span>📱</a>
              <a href="#" className="hover:text-amber-500 transition-colors"><span className="sr-only">تلگرام</span>📢</a>
              <a href="#" className="hover:text-amber-500 transition-colors"><span className="sr-only">توییتر</span>🐦</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">دسترسی سریع</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/books" className="hover:text-amber-500 transition-colors">لیست کتاب‌ها</Link></li>
              <li><Link to="/about" className="hover:text-amber-500 transition-colors">درباره ما</Link></li>
              <li><Link to="/contact" className="hover:text-amber-500 transition-colors">تماس با ما</Link></li>
              <li><Link to="/faq" className="hover:text-amber-500 transition-colors">سوالات متداول</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-bold mb-6">قوانین و اطلاعات</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/returns" className="hover:text-amber-500 transition-colors">شرایط بازگشت کالا</Link></li>
              <li><Link to="/privacy" className="hover:text-amber-500 transition-colors">حریم خصوصی</Link></li>
              <li><Link to="/shipping" className="hover:text-amber-500 transition-colors">نحوه ارسال سفارش</Link></li>
              <li><Link to="/careers" className="hover:text-amber-500 transition-colors">فرصت‌های شغلی</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6">خبرنامه</h4>
            <p className="text-xs mb-4">با عضویت در خبرنامه از جدیدترین تخفیف‌ها مطلع شوید.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="ایمیل شما" 
                className="bg-slate-800 border-none rounded-r-lg px-4 py-2 text-sm w-full focus:ring-1 focus:ring-amber-500 outline-none"
              />
              <button className="bg-amber-500 text-slate-900 px-4 py-2 rounded-l-lg text-sm font-bold hover:bg-amber-400 transition-colors">
                عضویت
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© ۱۴۰۳ تمامی حقوق برای فروشگاه کتابینو محفوظ است.</p>
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 bg-white rounded p-1"><img src="https://picsum.photos/seed/enamad/100/100" alt="E-Namad" className="grayscale hover:grayscale-0" /></div>
            <div className="w-12 h-12 bg-white rounded p-1"><img src="https://picsum.photos/seed/samandehi/100/100" alt="Samandehi" className="grayscale hover:grayscale-0" /></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
