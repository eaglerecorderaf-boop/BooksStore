
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, Order, User, OrderStatus, Address, Coupon } from '../types';
import { formatPrice } from '../constants';

interface Props {
  cart: CartItem[];
  user: User | null;
  onPlaceOrder: (order: Order) => void;
  coupons: Coupon[];
}

const CheckoutPage: React.FC<Props> = ({ cart, user, onPlaceOrder, coupons }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    user?.addresses && user.addresses.length > 0 ? user.addresses[0].id : 'new'
  );
  
  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + (item.price * (1 - item.discount / 100) * item.quantity), 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discount / 100) : 0;
  const totalAmount = subtotal - discountAmount;

  const handleApplyCoupon = () => {
    setCouponError('');
    setAppliedCoupon(null);

    if (!couponCode.trim()) {
      setCouponError('لطفاً کد تخفیف را وارد کنید.');
      return;
    }

    const coupon = coupons.find(c => c.code === couponCode && c.isActive);

    if (coupon) {
      setAppliedCoupon(coupon);
      setCouponError('');
    } else {
      setCouponError('کد تخفیف نامعتبر یا منقضی شده است.');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API Call
    setTimeout(() => {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      
      let shippingAddress;
      if (selectedAddressId === 'new') {
        shippingAddress = {
          fullName: formData.get('fullName') as string,
          mobile: formData.get('mobile') as string,
          address: formData.get('address') as string,
        };
      } else {
        const saved = user?.addresses?.find(a => a.id === selectedAddressId);
        shippingAddress = {
          fullName: saved?.fullName || '',
          mobile: saved?.mobile || '',
          address: `${saved?.city} - ${saved?.fullAddress}` || '',
        };
      }

      const order: Order = {
        id: Math.random().toString(36).substr(2, 9),
        userId: user?.id || 'guest',
        items: [...cart],
        totalAmount,
        status: OrderStatus.PENDING,
        createdAt: new Date().toISOString(),
        shippingAddress
      };
      
      onPlaceOrder(order);
      setLoading(false);
      alert('سفارش شما با موفقیت ثبت شد!');
      navigate('/profile');
    }, 1500);
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-12">تکمیل سفارش</h1>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          {user?.addresses && user.addresses.length > 0 && (
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 border-b pb-4 mb-6">انتخاب آدرس ارسال</h3>
              <div className="space-y-3">
                {user.addresses.map(addr => (
                  <label 
                    key={addr.id} 
                    className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedAddressId === addr.id ? 'border-amber-500 bg-amber-50/30' : 'border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="addressSelect" 
                      value={addr.id} 
                      checked={selectedAddressId === addr.id}
                      onChange={() => setSelectedAddressId(addr.id)}
                      className="accent-amber-500 mt-1" 
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-800">{addr.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{addr.fullName} - {addr.mobile}</p>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{addr.city} - {addr.fullAddress}</p>
                    </div>
                  </label>
                ))}
                <label 
                  className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedAddressId === 'new' ? 'border-amber-500 bg-amber-50/30' : 'border-slate-100 hover:border-slate-300'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="addressSelect" 
                    value="new" 
                    checked={selectedAddressId === 'new'}
                    onChange={() => setSelectedAddressId('new')}
                    className="accent-amber-500" 
                  />
                  <span className="text-sm font-bold text-slate-800">استفاده از آدرس جدید</span>
                </label>
              </div>
            </div>
          )}

          {selectedAddressId === 'new' && (
            <div className="space-y-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
              <h3 className="text-lg font-bold text-slate-800 border-b pb-4">اطلاعات ارسال جدید</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-bold">نام و نام خانوادگی</label>
                  <input required name="fullName" className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-amber-500 outline-none text-sm" placeholder="مثلاً: علی رضایی" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-bold">شماره موبایل</label>
                  <input required name="mobile" className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-amber-500 outline-none text-sm" placeholder="۰۹۱۲۳۴۵۶۷۸۹" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-bold">نشانی دقیق پستی</label>
                  <textarea required name="address" rows={4} className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-amber-500 outline-none text-sm resize-none" placeholder="استان، شهر، خیابان..." />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Checkout */}
        <div className="space-y-6">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-6">خلاصه خرید</h3>
            <div className="space-y-4 mb-8">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-slate-600 truncate max-w-[150px]">{item.title} (x{item.quantity})</span>
                  <span className="font-mono">{formatPrice(item.price * (1 - item.discount / 100) * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>جمع کل:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between items-center text-sm text-green-600 font-bold">
                    <span>تخفیف ({appliedCoupon.discount}%):</span>
                    <span>- {formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-lg font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>مبلغ قابل پرداخت:</span>
                  <span className="text-amber-600">{formatPrice(totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Coupon Section */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-6">
              <label className="block text-xs font-bold text-slate-500 mb-2">کد تخفیف</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="مثلاً: OFF20"
                  className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                />
                <button 
                  type="button"
                  onClick={handleApplyCoupon}
                  className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-700 transition-all"
                >
                  اعمال
                </button>
              </div>
              {couponError && <p className="text-xs text-red-500 mt-2 font-bold">{couponError}</p>}
              {appliedCoupon && <p className="text-xs text-green-600 mt-2 font-bold">کد تخفیف با موفقیت اعمال شد!</p>}
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-3 p-4 bg-white rounded-2xl border cursor-pointer hover:border-amber-500 transition-colors">
                <input type="radio" name="payment" value="online" defaultChecked className="accent-amber-500 w-4 h-4" />
                <span className="text-sm font-bold text-slate-800">پرداخت آنلاین (درگاه زرین‌پال)</span>
              </label>
              <label className="flex items-center gap-3 p-4 bg-white rounded-2xl border cursor-pointer hover:border-amber-500 transition-colors opacity-50">
                <input type="radio" name="payment" value="cod" disabled className="accent-amber-500 w-4 h-4" />
                <span className="text-sm font-bold text-slate-800">پرداخت در محل (غیرفعال)</span>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 text-white mt-8 py-5 rounded-2xl font-bold hover:bg-slate-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? 'در حال اتصال به درگاه...' : 'تأیید نهایی و پرداخت'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
