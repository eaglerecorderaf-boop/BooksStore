
import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Book, Category } from '../types';
import { BookCard } from './HomePage';

interface Props {
  books: Book[];
  categories: Category[];
}

const BookListPage: React.FC<Props> = ({ books, categories }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const initialCategory = searchParams.get('category') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sort, setSort] = useState('newest');
  const [priceRange, setPriceRange] = useState(500000);

  const filteredBooks = useMemo(() => {
    return books
      .filter(book => {
        const matchesQuery = !query || book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
        const matchesCategory = !selectedCategory || book.category === selectedCategory;
        const matchesPrice = book.price <= priceRange;
        return matchesQuery && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sort === 'cheapest') return a.price - b.price;
        if (sort === 'expensive') return b.price - a.price;
        if (sort === 'rating') return b.rating - a.rating;
        return 0; // default newest
      });
  }, [books, query, selectedCategory, sort, priceRange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
      {/* Sidebar Filters */}
      <aside className="lg:col-span-1 space-y-10">
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-6">دسته‌بندی‌ها</h3>
          <div className="space-y-3">
            <button 
              onClick={() => setSelectedCategory('')}
              className={`block w-full text-right px-4 py-2 rounded-xl text-sm transition-all ${selectedCategory === '' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              همه دسته‌ها
            </button>
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`block w-full text-right px-4 py-2 rounded-xl text-sm transition-all ${selectedCategory === cat.name ? 'bg-amber-100 text-amber-900 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-6">بازه قیمت</h3>
          <input 
            type="range" 
            min="0" 
            max="1000000" 
            step="10000"
            value={priceRange} 
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-amber-500 mb-4"
          />
          <div className="flex justify-between text-xs text-slate-500 font-mono">
            <span>۰ تومان</span>
            <span>{new Intl.NumberFormat('fa-IR').format(priceRange)} تومان</span>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 text-white text-center">
          <p className="text-xs text-slate-400 mb-4 uppercase tracking-widest">فروش ویژه</p>
          <h4 className="text-xl font-bold mb-4">۳۰٪ تخفیف روی تمامی کتب مدیریت</h4>
          <button className="bg-amber-500 text-slate-900 px-6 py-2 rounded-lg font-bold text-sm">مشاهده</button>
        </div>
      </aside>

      {/* Main Listing */}
      <div className="lg:col-span-3">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-white p-4 rounded-2xl border border-slate-100">
          <p className="text-sm text-slate-500">
            نمایش <span className="font-bold text-slate-800">{filteredBooks.length}</span> کتاب
          </p>
          <div className="flex items-center gap-4">
            <label className="text-sm text-slate-400">مرتب‌سازی:</label>
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
              className="bg-slate-50 border-none text-sm font-bold rounded-lg px-4 py-1.5 focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="newest">جدیدترین</option>
              <option value="cheapest">ارزان‌ترین</option>
              <option value="expensive">گران‌ترین</option>
              <option value="rating">محبوب‌ترین</option>
            </select>
          </div>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">نتیجه‌ای یافت نشد</h3>
            <p className="text-slate-500">لطفاً فیلترها را تغییر داده یا جستجوی دیگری انجام دهید.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookListPage;
