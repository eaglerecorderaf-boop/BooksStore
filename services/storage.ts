
import { Book, Category, Order, User, Coupon, PaymentSettings } from '../types';
import { INITIAL_BOOKS, INITIAL_CATEGORIES } from '../constants';

const KEYS = {
  BOOKS: 'ketabino_books',
  CATEGORIES: 'ketabino_categories',
  ORDERS: 'ketabino_orders',
  USERS: 'ketabino_users',
  COUPONS: 'ketabino_coupons',
  CURRENT_USER: 'ketabino_current_user',
  CART: 'ketabino_cart',
  PAYMENT_SETTINGS: 'ketabino_payment_settings'
};

export const storage = {
  getBooks: (): Book[] => {
    const data = localStorage.getItem(KEYS.BOOKS);
    return data ? JSON.parse(data) : INITIAL_BOOKS;
  },
  saveBooks: (books: Book[]) => localStorage.setItem(KEYS.BOOKS, JSON.stringify(books)),
  
  getCategories: (): Category[] => {
    const data = localStorage.getItem(KEYS.CATEGORIES);
    return data ? JSON.parse(data) : INITIAL_CATEGORIES;
  },
  
  getOrders: (): Order[] => {
    const data = localStorage.getItem(KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  },
  saveOrders: (orders: Order[]) => localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders)),

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(KEYS.CURRENT_USER);
    // Default admin if nothing found, but for a real flow we start with null
    return data ? JSON.parse(data) : null;
  },
  saveCurrentUser: (user: User) => localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user)),
  clearCurrentUser: () => localStorage.removeItem(KEYS.CURRENT_USER),
  
  getCart: (): any[] => {
    const data = localStorage.getItem(KEYS.CART);
    return data ? JSON.parse(data) : [];
  },
  saveCart: (cart: any[]) => localStorage.setItem(KEYS.CART, JSON.stringify(cart)),

  getUsers: (): User[] => {
    const data = localStorage.getItem(KEYS.USERS);
    return data ? JSON.parse(data) : [];
  },
  saveUsers: (users: User[]) => localStorage.setItem(KEYS.USERS, JSON.stringify(users)),

  getCoupons: (): Coupon[] => {
    const data = localStorage.getItem(KEYS.COUPONS);
    return data ? JSON.parse(data) : [];
  },
  saveCoupons: (coupons: Coupon[]) => localStorage.setItem(KEYS.COUPONS, JSON.stringify(coupons)),

  getPaymentSettings: (): PaymentSettings => {
    const data = localStorage.getItem(KEYS.PAYMENT_SETTINGS);
    return data ? JSON.parse(data) : {
      cardNumber: '۶۰۳۷ - ۹۹۷۵ - ۱۲۳۴ - ۵۶۷۸',
      accountHolder: 'مدیریت فروشگاه کتابینو',
      bankName: 'بانک ملی ایران'
    };
  },
  savePaymentSettings: (settings: PaymentSettings) => localStorage.setItem(KEYS.PAYMENT_SETTINGS, JSON.stringify(settings)),
};
