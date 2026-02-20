
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Book } from '../types';
import { formatPrice } from '../constants';

interface Props {
  books: Book[];
  onAddToCart: (book: Book) => void;
}

const BookDetailPage: React.FC<Props> = ({ books, onAddToCart }) => {
  const { slug } = useParams<{ slug: string }>();
  const book = books.find(b => b.slug === slug);

  useEffect(() => {
    if (book) {
      document.title = `${book.title} اثر ${book.author} | کتابینو`;
    }
  }, [book]);

  if (!book) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">کتاب مورد نظر یافت نشد</h1>
        <Link to="/books" className="text-amber-600 hover:underline">بازگشت به لیست کتاب‌ها</Link>
      </div>
    );
  }

  const discountedPrice = book.price * (1 - book.discount / 100);

  // SEO: Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": book.title,
    "author": { "@type": "Person", "name": book.author },
    "publisher": { "@type": "Organization", "name": book.publisher },
    "isbn": book.isbn,
    "offers": {
      "@type": "Offer",
      "price": discountedPrice,
      "priceCurrency": "IRR",
      "availability": book.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link to="/" className="hover:text-amber-600">خانه</Link>
        <span>/</span>
        <Link to="/books" className="hover:text-amber-600">کتاب‌ها</Link>
        <span>/</span>
        <Link to={`/books?category=${book.category}`} className="hover:text-amber-600">{book.category}</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium truncate max-w-[200px]">{book.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        {/* Left: Image */}
        <div className="md:col-span-4 lg:col-span-5">
          <div className="sticky top-24 space-y-4">
            <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 p-4">
              <img src={book.image} alt={book.title} className="w-full h-full object-contain shadow-lg rounded-lg" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-slate-100 rounded-lg overflow-hidden border cursor-pointer hover:border-amber-500">
                  <img src={`https://picsum.photos/seed/book${book.id}${i}/200/200`} alt="gallery" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="md:col-span-8 lg:col-span-7 flex flex-col">
          <div className="mb-6">
            <span className="text-amber-600 font-bold text-sm block mb-2">{book.category}</span>
            <h1 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">{book.title}</h1>
            <div className="flex items-center gap-6 text-sm">
              <span className="text-slate-500">نویسنده: <span className="text-slate-800 font-semibold">{book.author}</span></span>
              <div className="flex items-center gap-1">
                <span className="text-amber-400">★</span>
                <span className="font-bold text-slate-800">{book.rating}</span>
                <span className="text-slate-400 text-xs">(۱۲ نظر)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm border-y border-slate-100 py-6 mb-8">
            <div className="flex justify-between">
              <span className="text-slate-400">ناشر:</span>
              <span className="font-medium text-slate-800">{book.publisher}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">تاریخ انتشار:</span>
              <span className="font-medium text-slate-800">{book.publishDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">تعداد صفحات:</span>
              <span className="font-medium text-slate-800">{book.pages} صفحه</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">شابک:</span>
              <span className="font-medium text-slate-800">{book.isbn}</span>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="font-bold text-slate-800 mb-4">توضیحات کتاب</h3>
            <p className="text-slate-600 leading-8 text-justify">{book.description}</p>
          </div>

          <div className="mt-auto bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-slate-400 text-sm block mb-1">قیمت نهایی:</span>
                {book.discount > 0 && (
                  <span className="text-slate-400 line-through text-sm ml-3">{formatPrice(book.price)}</span>
                )}
                <span className="text-2xl font-bold text-slate-900">{formatPrice(discountedPrice)}</span>
              </div>
              <div>
                <span className={`px-4 py-1 rounded-full text-xs font-bold ${book.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {book.stock > 0 ? `در انبار موجود است (${book.stock} عدد)` : 'ناموجود'}
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => onAddToCart(book)}
                disabled={book.stock === 0}
                className="flex-grow bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                افزودن به سبد خرید
              </button>
              <button className="w-14 h-14 border border-slate-300 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-500 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Section (Mock) */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold text-slate-800 mb-8">کتاب‌های مرتبط</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {books.filter(b => b.category === book.category && b.id !== book.id).slice(0, 4).map(b => (
            <div key={b.id} className="bg-white rounded-xl border border-slate-100 p-4">
              <Link to={`/book/${b.slug}`}>
                <img src={b.image} alt={b.title} className="w-full aspect-[2/3] object-cover rounded-lg mb-4" />
                <h4 className="font-bold text-slate-800 text-sm truncate">{b.title}</h4>
                <p className="text-xs text-slate-500 mt-1">{b.author}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BookDetailPage;
