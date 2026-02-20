import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User } from '../types';
import Logo from '../components/Logo';
import { storage } from '../services/storage';

interface Props {
  onSignup: (user: User) => void;
  users: User[];
}

const SignupPage: React.FC<Props> = ({ onSignup, users }) => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!name || !email || !password) {
      setError('لطفاً تمامی فیلدها را پر کنید.');
      return;
    }

    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      setError('این ایمیل قبلاً ثبت شده است. لطفاً وارد شوید.');
      return;
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: name,
      email: email,
      password: password,
      isAdmin: false,
      addresses: [],
      favorites: [],
      reviews: [],
      notifications: []
    };

    onSignup(newUser);
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Form Section */}
        <div className="p-8 md:p-12 order-2 md:order-1">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4">
              <Logo size={64} className="flex-col" />
            </Link>
            <h1 className="text-3xl font-bold text-slate-800">ساخت حساب</h1>
            <p className="text-slate-500 text-sm mt-2">به خانواده کتابینو بپیوندید</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-bold mb-6 flex items-center gap-2 shadow-md shadow-red-500/10">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">نام و نام خانوادگی</label>
              <input 
                name="name" 
                type="text" 
                required 
                placeholder="مثلاً: علی رضایی"
                className="w-full bg-slate-50 border-slate-200 border rounded-xl p-4 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300 ease-in-out"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">ایمیل</label>
              <input 
                name="email" 
                type="email" 
                required 
                placeholder="example@mail.com"
                className="w-full bg-slate-50 border-slate-200 border rounded-xl p-4 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300 ease-in-out text-left"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">رمز عبور</label>
              <input 
                name="password" 
                type="password" 
                required 
                placeholder="••••••••"
                className="w-full bg-slate-50 border-slate-200 border rounded-xl p-4 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300 ease-in-out text-left"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-slate-900/20"
            >
              ثبت‌نام در کتابینو
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              قبلاً ثبت‌نام کرده‌اید؟{' '}
              <Link to="/login" className="text-amber-600 font-bold hover:underline transition-colors">
                وارد شوید
              </Link>
            </p>
          </div>
        </div>
        
        {/* Image Section */}
        <div className="hidden md:block order-1 md:order-2">
          <img 
            src="https://picsum.photos/seed/ketabino-signup/800/1200"
            alt="قفسه کتابها"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

      </div>
    </div>
  );
};

export default SignupPage;
