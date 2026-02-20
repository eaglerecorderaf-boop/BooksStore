
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from '../types';

interface Props {
  onLogin: (user: User) => void;
}

const AuthPage: React.FC<Props> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;

    if (!email) {
      setError('لطفاً ایمیل خود را وارد کنید.');
      return;
    }

    // Mock Authentication Logic
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: isLogin ? (email.split('@')[0]) : name,
      email: email,
      isAdmin: email.includes('admin'), // Simple rule: email with 'admin' becomes admin
    };

    onLogin(mockUser);
    navigate('/profile');
  };

  return (
    <div className="max-w-md mx-auto my-12">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 p-8 text-center text-white">
          <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center text-slate-900 text-3xl font-bold mx-auto mb-4">
            ک
          </div>
          <h1 className="text-2xl font-bold">{isLogin ? 'خوش آمدید' : 'ساخت حساب کاربری'}</h1>
          <p className="text-slate-400 text-sm mt-2">
            {isLogin ? 'برای ورود به حساب خود اطلاعات زیر را وارد کنید' : 'به خانواده بزرگ کتابینو بپیوندید'}
          </p>
        </div>

        <div className="p-8">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold mb-6 flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2">نام و نام خانوادگی</label>
                <input 
                  name="name" 
                  type="text" 
                  required 
                  placeholder="مثلاً: علی رضایی"
                  className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2">ایمیل</label>
              <input 
                name="email" 
                type="email" 
                required 
                placeholder="example@mail.com"
                className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all text-left"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2">رمز عبور</label>
              <input 
                name="password" 
                type="password" 
                required 
                placeholder="••••••••"
                className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all text-left"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-700 transition-all shadow-lg shadow-slate-900/20"
            >
              {isLogin ? 'ورود به حساب' : 'ثبت‌نام در کتابینو'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-slate-500 hover:text-amber-600 transition-colors"
            >
              {isLogin ? 'حساب کاربری ندارید؟ ثبت‌نام کنید' : 'قبلاً ثبت‌نام کرده‌اید؟ وارد شوید'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
