
import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../types';
import { formatPrice } from '../constants';

interface Props {
  cart: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartPage: React.FC<Props> = ({ cart, onUpdateQty, onRemove }) => {
  const totalOriginal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalDiscounted = cart.reduce((acc, item) => acc + (item.price * (1 - item.discount / 100) * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <div className="text-8xl mb-8">🛒</div>
        <h1 className="text-3xl font-bold text-slate-800 mb-4">سبد خرید شما خالی است</h1>
        <p className="text-slate-500 mb-8 text-lg">همین حالا به دنیای کتاب‌ها بروید و اولین کتاب خود را انتخاب کنید.</p>
        <Link to="/books" className="bg-amber-500 text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-amber-400 transition-all">
          مشاهده لیست کتاب‌ها
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-12 flex items-center gap-3">
        سبد خرید
        <span className="text-sm font-normal bg-slate-100 px-3 py-1 rounded-full text-slate-500">{cart.length} محصول</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-6">
          {cart.map(item => {
            const finalPrice = item.price * (1 - item.discount / 100);
            return (
              <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-6">
                <div className="w-24 h-36 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <Link to={`/book/${item.slug}`} className="font-bold text-lg text-slate-800 hover:text-amber-600 transition-colors">
                      {item.title}
                    </Link>
                    <button onClick={() => onRemove(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-slate-500 mb-6">{item.author}</p>
                  
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4 bg-slate-50 rounded-lg p-1">
                      <button onClick={() => onUpdateQty(item.id, -1)} className="w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-50">
                        -
                      </button>
                      <span className="font-bold text-slate-800 w-8 text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)} className="w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50">
                        +
                      </button>
                    </div>
                    
                    <div className="text-left">
                      {item.discount > 0 && (
                        <span className="block text-xs text-slate-400 line-through mb-1">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      )}
                      <span className="font-bold text-xl text-slate-900">
                        {formatPrice(finalPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sticky top-24 shadow-xl shadow-slate-900/20">
            <h3 className="text-xl font-bold mb-8 border-b border-slate-800 pb-4">خلاصه سفارش</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-400">
                <span>قیمت کل</span>
                <span>{formatPrice(totalOriginal)}</span>
              </div>
              <div className="flex justify-between text-red-400">
                <span>سود شما از خرید</span>
                <span>{formatPrice(totalOriginal - totalDiscounted)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>هزینه ارسال</span>
                <span>رایگان</span>
              </div>
              <div className="border-t border-slate-800 pt-4 flex justify-between items-center text-xl font-bold">
                <span>قابل پرداخت</span>
                <span className="text-amber-500">{formatPrice(totalDiscounted)}</span>
              </div>
            </div>

            <Link to="/checkout" className="block w-full bg-amber-500 text-slate-900 py-4 rounded-2xl font-bold text-center hover:bg-amber-400 transition-all">
              ادامه و تسویه حساب
            </Link>
            
            <p className="text-[10px] text-slate-500 text-center mt-6 leading-relaxed">
              با کلیک بر روی دکمه بالا، با قوانین و مقررات کتابینو موافقت می‌کنید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
