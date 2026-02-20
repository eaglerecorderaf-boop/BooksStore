
import React, { useState } from 'react';
import { Book, Category } from '../types';
import { formatPrice } from '../constants';

interface Props {
  books: Book[];
  categories: Category[];
  onUpdateBooks: (books: Book[]) => void;
}

const AdminBooks: React.FC<Props> = ({ books, categories, onUpdateBooks }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const handleDelete = (id: string) => {
    if (confirm('آیا از حذف این کتاب مطمئن هستید؟')) {
      onUpdateBooks(books.filter(b => b.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const bookData: Partial<Book> = {
      title: formData.get('title') as string,
      author: formData.get('author') as string,
      translator: formData.get('translator') as string,
      publisher: formData.get('publisher') as string,
      isbn: formData.get('isbn') as string,
      publishDate: formData.get('publishDate') as string,
      price: Number(formData.get('price')),
      discount: Number(formData.get('discount')),
      stock: Number(formData.get('stock')),
      pages: Number(formData.get('pages')),
      language: formData.get('language') as string,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      image: formData.get('image') as string,
      rating: Number(formData.get('rating')),
      isFeatured: formData.get('isFeatured') === 'on',
      slug: (formData.get('title') as string).replace(/\s+/g, '-').toLowerCase(),
    };

    if (editingBook) {
      onUpdateBooks(books.map(b => b.id === editingBook.id ? { ...b, ...bookData } : b));
    } else {
      const newBook: Book = {
        ...bookData as Book,
        id: Math.random().toString(36).substr(2, 9),
      };
      onUpdateBooks([newBook, ...books]);
    }
    setShowModal(false);
    setEditingBook(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">مدیریت کتاب‌ها</h1>
        <button 
          onClick={() => { setEditingBook(null); setShowModal(true); }}
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2"
        >
          <span>+</span> افزودن کتاب جدید
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="p-4 font-medium">تصویر</th>
                <th className="p-4 font-medium">عنوان و نویسنده</th>
                <th className="p-4 font-medium">دسته‌بندی</th>
                <th className="p-4 font-medium">قیمت</th>
                <th className="p-4 font-medium">تخفیف</th>
                <th className="p-4 font-medium">موجودی</th>
                <th className="p-4 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {books.map(book => (
                <tr key={book.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <img src={book.image} className="w-12 h-16 object-cover rounded shadow-sm" />
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-slate-800">{book.title}</div>
                    <div className="text-xs text-slate-400">{book.author} {book.translator ? `(ترجمه: ${book.translator})` : ''}</div>
                  </td>
                  <td className="p-4">
                    <span className="bg-slate-100 px-2 py-1 rounded text-[10px] text-slate-600">{book.category}</span>
                  </td>
                  <td className="p-4 font-bold">{formatPrice(book.price)}</td>
                  <td className="p-4 text-red-500 font-bold">{book.discount}%</td>
                  <td className="p-4">
                    <span className={book.stock < 10 ? 'text-red-500 font-bold' : 'text-slate-600'}>
                      {book.stock} عدد
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => { setEditingBook(book); setShowModal(true); }}
                        className="text-indigo-600 hover:text-indigo-900 font-bold"
                      >
                        ویرایش
                      </button>
                      <button 
                        onClick={() => handleDelete(book.id)}
                        className="text-red-600 hover:text-red-900 font-bold"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl animate-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{editingBook ? 'ویرایش کتاب' : 'افزودن کتاب جدید'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">عنوان کتاب</label>
                    <input name="title" defaultValue={editingBook?.title} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">نویسنده</label>
                    <input name="author" defaultValue={editingBook?.author} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">مترجم (اختیاری)</label>
                    <input name="translator" defaultValue={editingBook?.translator} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">ناشر</label>
                    <input name="publisher" defaultValue={editingBook?.publisher} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">شابک (ISBN)</label>
                      <input name="isbn" defaultValue={editingBook?.isbn} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">تاریخ انتشار</label>
                      <input name="publishDate" defaultValue={editingBook?.publishDate || new Date().toLocaleDateString('fa-IR')} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">URL تصویر پوستر</label>
                    <input name="image" defaultValue={editingBook?.image} required placeholder="https://..." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none text-left" dir="ltr" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">قیمت (تومان)</label>
                      <input name="price" type="number" defaultValue={editingBook?.price} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">تخفیف (درصد)</label>
                      <input name="discount" type="number" min="0" max="100" defaultValue={editingBook?.discount} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">تعداد صفحات</label>
                      <input name="pages" type="number" defaultValue={editingBook?.pages} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">زبان کتاب</label>
                      <input name="language" defaultValue={editingBook?.language || 'فارسی'} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">موجودی</label>
                      <input name="stock" type="number" defaultValue={editingBook?.stock} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">امتیاز (۰ تا ۵)</label>
                      <input name="rating" type="number" step="0.1" min="0" max="5" defaultValue={editingBook?.rating} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-indigo-50 p-3 rounded-xl border border-indigo-100">
                    <input 
                      type="checkbox" 
                      name="isFeatured" 
                      id="isFeatured"
                      defaultChecked={editingBook?.isFeatured}
                      className="w-5 h-5 accent-indigo-600" 
                    />
                    <label htmlFor="isFeatured" className="text-sm font-bold text-indigo-900 cursor-pointer">نمایش در اسلایدر صفحه اصلی</label>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">دسته‌بندی</label>
                    <select name="category" defaultValue={editingBook?.category} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none">
                      {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">خلاصه کتاب</label>
                    <textarea name="description" defaultValue={editingBook?.description} required rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"></textarea>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-grow bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-900/20">ذخیره اطلاعات کتاب</button>
                <button type="button" onClick={() => setShowModal(false)} className="px-8 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all">انصراف</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBooks;
