
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Book, Category, CartItem, User, Order } from './types';
import { storage } from './services/storage';

// Pages
import HomePage from './pages/HomePage';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminBooks from './pages/AdminBooks';
import AdminOrders from './pages/AdminOrders';
import AdminUsers from './pages/AdminUsers';
import AdminCoupons from './pages/AdminCoupons';
import AdminSettings from './pages/AdminSettings';
import AdminAuthWrapper from './components/AdminAuthWrapper';

// Informational Pages
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import ReturnPolicyPage from './pages/ReturnPolicyPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ShippingInfoPage from './pages/ShippingInfoPage';
import CareersPage from './pages/CareersPage';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Logo from './components/Logo';

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(storage.getBooks());
  const [categories] = useState<Category[]>(storage.getCategories());
  const [cart, setCart] = useState<CartItem[]>(storage.getCart());
  const [currentUser, setCurrentUser] = useState<User | null>(storage.getCurrentUser());
  const [orders, setOrders] = useState<Order[]>(storage.getOrders());
  const [users, setUsers] = useState<User[]>(storage.getUsers());
  const [coupons, setCoupons] = useState<any[]>(storage.getCoupons());
  const [paymentSettings, setPaymentSettings] = useState<any>(storage.getPaymentSettings());

  useEffect(() => {
    storage.saveCart(cart);
  }, [cart]);

  const addToCart = (book: Book) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item => item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId: string) => {
    setCart(prev => prev.filter(item => item.id !== bookId));
  };

  const updateCartQuantity = (bookId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === bookId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const handlePlaceOrder = (order: Order) => {
    const newOrders = [order, ...orders];
    setOrders(newOrders);
    storage.saveOrders(newOrders);
    clearCart();
  };

  const handleToggleFavorite = (bookId: string) => {
    if (!currentUser) {
      alert('لطفاً ابتدا وارد حساب کاربری خود شوید.');
      return;
    }

    const currentFavorites = currentUser.favorites || [];
    const isFavorite = currentFavorites.includes(bookId);
    
    let newFavorites;
    if (isFavorite) {
      newFavorites = currentFavorites.filter(id => id !== bookId);
    } else {
      newFavorites = [...currentFavorites, bookId];
    }

    const updatedUser = { ...currentUser, favorites: newFavorites };
    setCurrentUser(updatedUser);
    storage.saveCurrentUser(updatedUser);
    
    // Also update in users list
    const updatedUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);
    setUsers(updatedUsers);
    storage.saveUsers(updatedUsers);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    storage.saveCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    storage.clearCurrentUser();
  };

  return (
    <Router>
      <Routes>
        {/* Admin Section - Completely Separate Layout */}
        <Route
          path="/admin/*"
          element={
            <AdminAuthWrapper>
              <div className="min-h-screen bg-slate-50 font-sans" dir="rtl">
                <div className="bg-slate-900 text-white p-4 shadow-lg">
                  <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <Logo size={32} className="text-white" />
                      <span className="bg-amber-500 text-slate-900 px-2 py-0.5 rounded text-[10px] font-black uppercase">Admin Panel</span>
                    </div>
                    <div className="flex gap-4 text-xs font-bold">
                      <Link to="/admin" className="hover:text-amber-500">داشبورد</Link>
                      <Link to="/admin/books" className="hover:text-amber-500">کتاب‌ها</Link>
                      <Link to="/admin/orders" className="hover:text-amber-500">سفارشات</Link>
                      <Link to="/admin/users" className="hover:text-amber-500">کاربران</Link>
                      <Link to="/admin/coupons" className="hover:text-amber-500">تخفیف‌ها</Link>
                      <Link to="/admin/settings" className="hover:text-amber-500">تنظیمات</Link>
                      <button 
                        onClick={() => {
                          sessionStorage.removeItem('admin_auth');
                          window.location.href = '/';
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        خروج
                      </button>
                    </div>
                  </div>
                </div>
                <main className="container mx-auto px-4 py-8">
                  <Routes>
                    <Route path="/" element={<AdminDashboard orders={orders} books={books} />} />
                    <Route path="/books" element={<AdminBooks books={books} categories={categories} onUpdateBooks={(updated) => {setBooks(updated); storage.saveBooks(updated);}} />} />
                    <Route path="/orders" element={<AdminOrders orders={orders} onUpdateOrders={(updated) => {setOrders(updated); storage.saveOrders(updated);}} />} />
                    <Route path="/users" element={<AdminUsers users={users} onUpdateUsers={(updated) => {setUsers(updated); storage.saveUsers(updated);}} />} />
                    <Route path="/coupons" element={<AdminCoupons coupons={coupons} onUpdateCoupons={(updated) => {setCoupons(updated); storage.saveCoupons(updated);}} />} />
                    <Route path="/settings" element={<AdminSettings settings={paymentSettings} onUpdateSettings={(updated) => {setPaymentSettings(updated); storage.savePaymentSettings(updated);}} />} />
                  </Routes>
                </main>
              </div>
            </AdminAuthWrapper>
          }
        />

        {/* Main Site Section */}
        <Route
          path="*"
          element={
            <div className="flex flex-col min-h-screen">
              <Header cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} user={currentUser} />
              
              <main className="flex-grow container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<HomePage books={books} categories={categories} />} />
                  <Route path="/books" element={<BookListPage books={books} categories={categories} />} />
                  <Route path="/book/:slug" element={<BookDetailPage books={books} onAddToCart={addToCart} onToggleFavorite={handleToggleFavorite} favorites={currentUser?.favorites || []} />} />
                  <Route path="/cart" element={<CartPage cart={cart} onUpdateQty={updateCartQuantity} onRemove={removeFromCart} />} />
                  <Route path="/checkout" element={<CheckoutPage cart={cart} onPlaceOrder={handlePlaceOrder} user={currentUser} coupons={coupons} paymentSettings={paymentSettings} />} />
                  <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                  <Route path="/signup" element={<SignupPage onLogin={handleLogin} />} />
                  <Route path="/profile" element={<ProfilePage user={currentUser} orders={orders.filter(o => o.userId === currentUser?.id)} books={books} onLogout={handleLogout} onUpdateUser={handleLogin} />} />
                  
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/returns" element={<ReturnPolicyPage />} />
                  <Route path="/privacy" element={<PrivacyPolicyPage />} />
                  <Route path="/shipping" element={<ShippingInfoPage />} />
                  <Route path="/careers" element={<CareersPage />} />

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
