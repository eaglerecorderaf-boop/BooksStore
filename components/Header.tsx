
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';
import Logo from './Logo';

interface Props {
  cartCount: number;
  user: User | null;
}

const Header: React.FC<Props> = ({ cartCount, user }) => {
  const [search, setSearch] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/books?q=${encodeURIComponent(search)}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-3 py-2 md:py-4">
          <div className="flex items-center justify-between gap-3">
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="p-1.5 text-slate-700 hover:bg-slate-100 rounded-lg active:scale-90 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link to="/" className="hover:opacity-80 transition-opacity">
                <Logo size={32} className="md:hidden" />
                <Logo size={44} className="hidden md:flex" />
              </Link>
            </div>

            {/* Micro-Search: Enhanced Visibility */}
            <form onSubmit={handleSearch} className="flex-grow max-w-sm">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="جستجوی کتاب..."
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:bg-white transition-all text-[11px] md:text-sm font-medium"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            <nav className="flex items-center gap-2 md:gap-6">
              <Link to="/cart" className="relative p-1.5 text-slate-600 hover:text-amber-600 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] font-black w-3.5 h-3.5 md:w-5 md:h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link to={user ? "/profile" : "/login"} className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100 overflow-hidden active:scale-95 transition-all">
                {user ? <span className="text-[10px] md:text-sm font-black text-amber-700">{user.name[0]}</span> : <span className="text-xs">👤</span>}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* MOBILE MENU - GLASSMORPHISM STYLE */}
      <div className={`fixed inset-0 z-[100] transition-all duration-300 ${isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[4px]" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute top-0 right-0 h-full w-[260px] bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
          <div className="p-5 border-b flex justify-between items-center">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <Logo size={32} />
            </Link>
            <button onClick={() => setIsMenuOpen(false)} className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full text-slate-400">✕</button>
          </div>

          <div className="flex-grow overflow-y-auto p-5 space-y-8">
            <nav className="space-y-2">
              <Link onClick={() => setIsMenuOpen(false)} to="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-[12px] font-bold text-slate-700"><span>🏠</span> صفحه اصلی</Link>
              <Link onClick={() => setIsMenuOpen(false)} to="/books" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-[12px] font-bold text-slate-700"><span>📚</span> آرشیو کتاب‌ها</Link>
              <Link onClick={() => setIsMenuOpen(false)} to="/cart" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-[12px] font-bold text-slate-700"><span>🛒</span> سبد خرید</Link>
              <Link onClick={() => setIsMenuOpen(false)} to="/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-[12px] font-bold text-slate-700"><span>👤</span> حساب من</Link>
            </nav>

            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-tighter pr-2">دسته‌بندی‌های پیشنهادی</h4>
              <div className="flex flex-col gap-1.5">
                <Link onClick={() => setIsMenuOpen(false)} to="/books?category=برنامه‌نویسی" className="p-3 bg-slate-50 rounded-xl text-[11px] font-bold text-slate-600 flex justify-between"><span>💻 برنامه‌نویسی</span> <span className="opacity-30">←</span></Link>
                <Link onClick={() => setIsMenuOpen(false)} to="/books?category=روانشناسی" className="p-3 bg-slate-50 rounded-xl text-[11px] font-bold text-slate-600 flex justify-between"><span>🧠 روانشناسی</span> <span className="opacity-30">←</span></Link>
                <Link onClick={() => setIsMenuOpen(false)} to="/books?category=ادبیات و داستان" className="p-3 bg-slate-50 rounded-xl text-[11px] font-bold text-slate-600 flex justify-between"><span>📖 ادبیات</span> <span className="opacity-30">←</span></Link>
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-900 text-center">
            <p className="text-[10px] text-slate-400 font-bold mb-1">کتابینو؛ مرجع تخصصی کتاب</p>
            <p className="text-[10px] text-amber-500 font-mono">Ketabino Online Shop</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
