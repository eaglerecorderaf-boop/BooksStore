
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Book, Category } from '../types';
import { formatPrice } from '../constants';

interface Props {
  books: Book[];
  categories: Category[];
}

const HomePage: React.FC<Props> = ({ books, categories }) => {
  const featuredRef = useRef<HTMLDivElement>(null);
  const bestSellersRef = useRef<HTMLDivElement>(null);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const popularBooks = useMemo(() => {
    const featured = books.filter(b => b.isFeatured);
    if (featured.length > 0) return featured.slice(0, 5);
    // Fallback to high rating if no books are marked as featured
    return books.filter(b => b.rating >= 4.7).slice(0, 5);
  }, [books]);

  useEffect(() => {
    if (popularBooks.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % popularBooks.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [popularBooks.length]);

  const featuredBooks = books.slice(0, 8);
  const bestSellers = [...books].sort((a, b) => b.rating - a.rating).slice(0, 8);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = window.innerWidth < 768 ? 140 : 300;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="space-y-6 md:space-y-16 pb-12">
      {/* Book-Ratio Slider - Focused & Vertical like a real book banner */}
      <section className="relative h-[320px] md:h-[600px] flex items-center justify-center overflow-hidden">
        {/* Blurred Background for Depth */}
        <div className="absolute inset-0 z-0">
           {popularBooks.length > 0 && (
             <img 
               src={popularBooks[currentSlide]?.image} 
               className="w-full h-full object-cover blur-2xl opacity-20 scale-125" 
               alt="bg" 
             />
           )}
        </div>

        <div className="relative z-10 w-full max-w-[210px] md:max-w-[420px] aspect-[3/4.2] rounded-xl md:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 group">
          {popularBooks.length > 0 ? (
            popularBooks.map((book, index) => (
              <div 
                key={book.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                {/* Actual Book Image as Banner */}
                <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                
                {/* Glass Overlay for Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent flex flex-col justify-end p-4 md:p-12 text-right">
                  <div className="space-y-1.5 md:space-y-4">
                    <h3 className="text-xs md:text-3xl font-black text-white drop-shadow-lg line-clamp-1">{book.title}</h3>
                    <div className="flex items-center justify-between gap-2">
                      {/* Updated Glassy Button */}
                      <Link 
                        to={`/book/${book.slug}`} 
                        className="backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 text-white px-3 py-1.5 md:px-8 md:py-4 rounded-lg md:rounded-2xl font-black text-[9px] md:text-lg active:scale-95 shadow-lg transition-all flex items-center gap-1 md:gap-2 group/btn"
                      >
                        <span className="drop-shadow-md">خرید آنلاین</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 md:h-5 md:w-5 group-hover/btn:translate-x-[-2px] transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                      </Link>
                      {book.discount > 0 && (
                        <span className="bg-red-600/90 backdrop-blur-sm text-white px-2 py-0.5 md:px-4 md:py-2 rounded-md md:rounded-xl text-[9px] md:text-xl font-black">
                          {book.discount}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-400 text-xs">
              در حال بارگذاری...
            </div>
          )}

          {/* Mini Indicators */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
            {popularBooks.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-1 rounded-full transition-all duration-500 ${
                  idx === currentSlide ? 'h-6 md:h-12 bg-amber-500' : 'h-1.5 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="px-1">
        <div className="flex justify-between items-center mb-3 md:mb-10">
          <h2 className="text-sm md:text-4xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-amber-500 rounded-full"></span>
            جدیدترین‌ها
          </h2>
          <Link to="/books" className="text-[10px] font-bold text-slate-400 hover:text-amber-600 transition-colors">مشاهده همه</Link>
        </div>
        
        <div ref={featuredRef} className="flex overflow-x-auto gap-3 md:gap-8 pb-4 scrollbar-hide snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {featuredBooks.map(book => (
            <div key={book.id} className="flex-none w-[140px] md:w-[280px] snap-start">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="bg-slate-50/50 -mx-4 px-4 py-8 md:py-24 rounded-3xl md:rounded-[4rem] border-y border-slate-100">
        <div className="container mx-auto">
          <h2 className="text-sm md:text-4xl font-black text-slate-900 mb-4 px-1">پرفروش‌ها</h2>
          <div ref={bestSellersRef} className="flex overflow-x-auto gap-3 md:gap-10 pb-2 scrollbar-hide snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {bestSellers.map(book => (
              <div key={book.id} className="flex-none w-[140px] md:w-[300px] snap-start">
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  const discountedPrice = book.price * (1 - book.discount / 100);
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col h-full text-right transition-all hover:shadow-md relative group">
      {/* Ribbon */}
      {book.isFeatured && (
        <div className="absolute top-5 -right-9 bg-[#ff4d4f] text-white text-[10px] md:text-xs font-bold px-10 py-1.5 rotate-45 z-20 shadow-sm">
          پیشنهاد ویژه
        </div>
      )}
      
      <Link to={`/book/${book.slug}`} className="relative block aspect-[3/4] p-4 md:p-6 bg-white flex items-center justify-center">
        <img src={book.image} alt={book.title} className="max-w-full max-h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300" />
      </Link>
      
      <div className="px-4 md:px-6 pb-4 flex flex-col flex-grow bg-white">
        <Link to={`/book/${book.slug}`} className="font-bold text-slate-800 mb-1 line-clamp-1 text-sm md:text-lg">{book.title}</Link>
        <p className="text-xs md:text-sm text-slate-500 mb-4 font-medium line-clamp-1">{book.author}</p>
        
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-start justify-between">
          {/* Discount Badge (Right side in RTL) */}
          {book.discount > 0 ? (
            <div className="bg-[#ff4d4f] text-white text-[11px] md:text-sm font-bold px-2.5 py-0.5 rounded-full mt-0.5">
              ٪{book.discount.toLocaleString('fa-IR')}
            </div>
          ) : (
            <div></div>
          )}

          {/* Price Section (Left side in RTL) */}
          <div className="flex flex-col items-end">
            {book.discount > 0 ? (
              <span className="text-[11px] md:text-sm text-slate-400 line-through mb-1">{book.price.toLocaleString('fa-IR')}</span>
            ) : (
              <span className="h-4 md:h-5 mb-1"></span> // Placeholder to keep height consistent
            )}
            <div className="flex items-center gap-1.5 flex-row-reverse">
              <span className="text-sm md:text-xl font-black text-indigo-900">{discountedPrice.toLocaleString('fa-IR')}</span>
              <span className="text-[10px] md:text-xs text-indigo-900 font-bold">تومان</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default HomePage;
