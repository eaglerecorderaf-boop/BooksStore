
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Book, Category, CartItem, User, Order } from './types';
import { storage } from './services/storage';
import { supabaseService } from './services/supabaseService';
import { supabase } from './services/supabase';

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
  const [books, setBooks] = useState<Book[]>([]);
  const [categories] = useState<Category[]>(storage.getCategories());
  const [cart, setCart] = useState<CartItem[]>(storage.getCart());
  const [currentUser, setCurrentUser] = useState<User | null>(storage.getCurrentUser());
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [paymentSettings, setPaymentSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (retries = 2) => {
      try {
        setIsLoading(true);
        
        const fetchWithRetry = async <T>(fetchFn: () => Promise<T>, fallback: T, label: string): Promise<T> => {
          try {
            return await fetchFn();
          } catch (err) {
            console.error(`Error fetching ${label}:`, err);
            if (retries > 0) {
              console.log(`Retrying ${label}... (${retries} left)`);
              return await fetchData(retries - 1) as unknown as T; // This is a bit recursive, simplified for now
            }
            return fallback;
          }
        };

        // Fetch each resource individually to handle partial failures
        const fetchBooks = supabaseService.getBooks().catch(err => {
          console.error('Error fetching books:', err);
          return [];
        });
        const fetchCategories = supabaseService.getCategories().catch(err => {
          console.error('Error fetching categories:', err);
          return storage.getCategories();
        });
        const fetchOrders = supabaseService.getOrders().catch(err => {
          console.error('Error fetching orders:', err);
          return [];
        });
        const fetchUsers = supabaseService.getUsers().catch(err => {
          console.error('Error fetching users:', err);
          return [];
        });
        const fetchCoupons = supabaseService.getCoupons().catch(err => {
          console.error('Error fetching coupons:', err);
          return [];
        });
        const fetchSettings = supabaseService.getPaymentSettings().catch(err => {
          console.error('Error fetching settings:', err);
          return {
            cardNumber: '۶۰۳۷ - ۹۹۷۵ - ۱۲۳۴ - ۵۶۷۸',
            accountHolder: 'مدیریت فروشگاه کتابینو',
            bankName: 'بانک ملی ایران'
          };
        });

        const [dbBooks, dbCategories, dbOrders, dbUsers, dbCoupons, dbSettings] = await Promise.all([
          fetchBooks,
          fetchCategories,
          fetchOrders,
          fetchUsers,
          fetchCoupons,
          fetchSettings
        ]);

        setBooks(dbBooks);
        setOrders(dbOrders);
        setUsers(dbUsers);
        setCoupons(dbCoupons);
        setPaymentSettings(dbSettings);
      } catch (error) {
        console.error('Critical error in fetchData:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Real-time Subscriptions
    const booksChannel = supabase.channel('books-changes')
      .on('postgres_changes', { event: '*', table: 'books', schema: 'public' }, () => {
        supabaseService.getBooks().then(setBooks);
      }).subscribe();

    const ordersChannel = supabase.channel('orders-changes')
      .on('postgres_changes', { event: '*', table: 'orders', schema: 'public' }, () => {
        supabaseService.getOrders().then(setOrders);
      }).subscribe();

    const usersChannel = supabase.channel('users-changes')
      .on('postgres_changes', { event: '*', table: 'profiles', schema: 'public' }, () => {
        supabaseService.getUsers().then(setUsers);
      }).subscribe();

    const settingsChannel = supabase.channel('settings-changes')
      .on('postgres_changes', { event: '*', table: 'settings', schema: 'public' }, () => {
        supabaseService.getPaymentSettings().then(setPaymentSettings);
      }).subscribe();

    return () => {
      supabase.removeChannel(booksChannel);
      supabase.removeChannel(ordersChannel);
      supabase.removeChannel(usersChannel);
      supabase.removeChannel(settingsChannel);
    };
  }, []);

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
    supabaseService.saveOrder(order).catch(console.error);
    clearCart();
  };

  const handleAddNotification = (userId: string, title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const newNotif = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      title,
      message,
      type,
      isRead: false,
      createdAt: new Date().toISOString()
    };

    const updatedUsers = users.map(u => {
      if (u.id === userId) {
        const notifications = [...(u.notifications || []), newNotif];
        const updated = { ...u, notifications };
        supabaseService.updateProfile(updated).catch(console.error);
        return updated;
      }
      return u;
    });

    setUsers(updatedUsers);
    storage.saveUsers(updatedUsers);

    if (currentUser && currentUser.id === userId) {
      const updatedCurrentUser = { ...currentUser, notifications: [...(currentUser.notifications || []), newNotif] };
      setCurrentUser(updatedCurrentUser);
      storage.saveCurrentUser(updatedCurrentUser);
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    if (!currentUser) return;

    const updatedNotifications = (currentUser.notifications || []).map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    );

    const updatedUser = { ...currentUser, notifications: updatedNotifications };
    setCurrentUser(updatedUser);
    storage.saveCurrentUser(updatedUser);
    supabaseService.updateProfile(updatedUser).catch(console.error);

    const updatedUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);
    setUsers(updatedUsers);
    storage.saveUsers(updatedUsers);
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
    supabaseService.updateProfile(updatedUser).catch(console.error);
    
    // Also update in users list
    const updatedUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);
    setUsers(updatedUsers);
    storage.saveUsers(updatedUsers);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    storage.saveCurrentUser(user);
    supabaseService.updateProfile(user).catch(console.error);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    storage.clearCurrentUser();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans" dir="rtl">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold">در حال اتصال به پایگاه داده...</p>
        </div>
      </div>
    );
  }

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
                    <Route path="/books" element={<AdminBooks books={books} categories={categories} onUpdateBooks={(updated) => {
                      const deletedBook = books.find(b => !updated.find(u => u.id === b.id));
                      const addedOrUpdated = updated.filter(u => {
                        const original = books.find(b => b.id === u.id);
                        return !original || JSON.stringify(original) !== JSON.stringify(u);
                      });

                      setBooks(updated); 
                      storage.saveBooks(updated);

                      if (deletedBook) supabaseService.deleteBook(deletedBook.id).catch(console.error);
                      addedOrUpdated.forEach(b => supabaseService.saveBook(b).catch(console.error));
                    }} />} />
                    <Route path="/orders" element={<AdminOrders orders={orders} onUpdateOrders={(updated) => {
                      const changedOrder = updated.find(u => {
                        const original = orders.find(o => o.id === u.id);
                        return !original || JSON.stringify(original) !== JSON.stringify(u);
                      });

                      setOrders(updated); 
                      storage.saveOrders(updated);
                      
                      if (changedOrder) supabaseService.updateOrder(changedOrder).catch(console.error);
                    }} onAddNotification={handleAddNotification} />} />
                    <Route path="/users" element={<AdminUsers users={users} onUpdateUsers={(updated) => {
                      const changedUser = updated.find(u => {
                        const original = users.find(o => o.id === u.id);
                        return !original || JSON.stringify(original) !== JSON.stringify(u);
                      });

                      setUsers(updated); 
                      storage.saveUsers(updated);
                      
                      if (changedUser) supabaseService.updateProfile(changedUser).catch(console.error);
                    }} />} />
                    <Route path="/coupons" element={<AdminCoupons coupons={coupons} onUpdateCoupons={(updated) => {
                      setCoupons(updated); 
                      storage.saveCoupons(updated);
                      supabaseService.saveCoupons(updated).catch(console.error);
                    }} />} />
                    <Route path="/settings" element={<AdminSettings settings={paymentSettings} onUpdateSettings={(updated) => {
                      setPaymentSettings(updated); 
                      storage.savePaymentSettings(updated);
                      supabaseService.savePaymentSettings(updated).catch(console.error);
                    }} />} />
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
              <Header cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} user={currentUser} onMarkAsRead={handleMarkAsRead} />
              
              <main className="flex-grow container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<HomePage books={books} categories={categories} />} />
                  <Route path="/books" element={<BookListPage books={books} categories={categories} />} />
                  <Route path="/book/:slug" element={<BookDetailPage books={books} onAddToCart={addToCart} onToggleFavorite={handleToggleFavorite} favorites={currentUser?.favorites || []} />} />
                  <Route path="/cart" element={<CartPage cart={cart} onUpdateQty={updateCartQuantity} onRemove={removeFromCart} />} />
                  <Route path="/checkout" element={<CheckoutPage cart={cart} onPlaceOrder={handlePlaceOrder} user={currentUser} coupons={coupons} paymentSettings={paymentSettings} />} />
                  <Route path="/login" element={<LoginPage onLogin={handleLogin} users={users} />} />
                  <Route path="/signup" element={<SignupPage onSignup={(newUser) => {
                    const updatedUsers = [...users, newUser];
                    setUsers(updatedUsers);
                    storage.saveUsers(updatedUsers);
                    storage.saveCurrentUser(newUser);
                    setCurrentUser(newUser);
                    supabaseService.updateProfile(newUser).catch(console.error);
                  }} users={users} />} />
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
