
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(storage.getBooks());
  const [categories] = useState<Category[]>(storage.getCategories());
  const [cart, setCart] = useState<CartItem[]>(storage.getCart());
  const [currentUser, setCurrentUser] = useState<User | null>(storage.getCurrentUser());
  const [orders, setOrders] = useState<Order[]>(storage.getOrders());

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
      <div className="flex flex-col min-h-screen">
        <Header cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} user={currentUser} />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            {/* صفحه اصلی - صریحاً در ریشه قرار دارد */}
            <Route path="/" element={<HomePage books={books} categories={categories} />} />
            
            {/* سایر صفحات */}
            <Route path="/books" element={<BookListPage books={books} categories={categories} />} />
            <Route path="/book/:slug" element={<BookDetailPage books={books} onAddToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage cart={cart} onUpdateQty={updateCartQuantity} onRemove={removeFromCart} />} />
            <Route path="/checkout" element={<CheckoutPage cart={cart} onPlaceOrder={handlePlaceOrder} user={currentUser} />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupPage onLogin={handleLogin} />} />
            <Route path="/profile" element={<ProfilePage user={currentUser} orders={orders.filter(o => o.userId === currentUser?.id)} onLogout={handleLogout} />} />
            
            {/* صفحات اطلاع‌رسانی */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/returns" element={<ReturnPolicyPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/shipping" element={<ShippingInfoPage />} />
            <Route path="/careers" element={<CareersPage />} />

            {/* پنل ادمین */}
            <Route path="/admin" element={<AdminDashboard orders={orders} books={books} />} />
            <Route path="/admin/books" element={<AdminBooks books={books} categories={categories} onUpdateBooks={(updated) => {setBooks(updated); storage.saveBooks(updated);}} />} />
            <Route path="/admin/orders" element={<AdminOrders orders={orders} onUpdateOrders={(updated) => {setOrders(updated); storage.saveOrders(updated);}} />} />

            {/* مدیریت مسیرهای اشتباه - هدایت به صفحه اصلی */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
