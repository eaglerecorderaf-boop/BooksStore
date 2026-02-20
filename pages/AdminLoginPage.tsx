
import React, { useState } from 'react';
import Logo from '../components/Logo';

interface Props {
  onLogin: (password: string) => void;
}

const AdminLoginPage: React.FC<Props> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'En12015@Ny') {
      onLogin(password);
    } else {
      setError('رمز عبور اشتباه است.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden p-8">
        <div className="text-center mb-8">
          <Logo size={64} className="flex-col mb-4" />
          <h1 className="text-2xl font-black text-slate-800">ورود به پنل مدیریت</h1>
          <p className="text-slate-500 text-sm mt-2">لطفاً رمز عبور مدیریت را وارد کنید</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold mb-6 flex items-center gap-2 border border-red-100">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase mb-2 pr-2">رمز عبور مدیریت</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-center font-mono tracking-widest"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 active:scale-95"
          >
            ورود به پنل
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 font-bold">دسترسی به این بخش محدود به مدیران سایت است.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
