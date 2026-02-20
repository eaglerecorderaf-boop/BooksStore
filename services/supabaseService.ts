
import { supabase } from './supabase';
import { Book, Category, Order, User, Coupon, PaymentSettings, Notification } from '../types';

export const supabaseService = {
  // Books
  getBooks: async (): Promise<Book[]> => {
    const { data, error } = await supabase.from('books').select('*');
    if (error) throw error;
    return data || [];
  },
  saveBook: async (book: Book) => {
    const { error } = await supabase.from('books').upsert(book);
    if (error) throw error;
  },
  deleteBook: async (id: string) => {
    const { error } = await supabase.from('books').delete().eq('id', id);
    if (error) throw error;
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) throw error;
    return data || [];
  },

  // Orders
  getOrders: async (): Promise<Order[]> => {
    const { data, error } = await supabase.from('orders').select('*').order('createdAt', { ascending: false });
    if (error) throw error;
    return data || [];
  },
  saveOrder: async (order: Order) => {
    const { error } = await supabase.from('orders').insert(order);
    if (error) throw error;
  },
  updateOrder: async (order: Order) => {
    const { error } = await supabase.from('orders').update(order).eq('id', order.id);
    if (error) throw error;
  },

  // Users & Profiles
  getUsers: async (): Promise<User[]> => {
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) throw error;
    return data || [];
  },
  updateProfile: async (user: User) => {
    const { error } = await supabase.from('profiles').upsert(user);
    if (error) throw error;
  },

  // Coupons
  getCoupons: async (): Promise<Coupon[]> => {
    const { data, error } = await supabase.from('coupons').select('*');
    if (error) throw error;
    return data || [];
  },
  saveCoupons: async (coupons: Coupon[]) => {
    const { error } = await supabase.from('coupons').upsert(coupons);
    if (error) throw error;
  },

  // Payment Settings
  getPaymentSettings: async (): Promise<PaymentSettings> => {
    const { data, error } = await supabase.from('settings').select('*').eq('key', 'payment').single();
    if (error && error.code !== 'PGRST116') throw error;
    return data?.value || {
      cardNumber: '۶۰۳۷ - ۹۹۷۵ - ۱۲۳۴ - ۵۶۷۸',
      accountHolder: 'مدیریت فروشگاه کتابینو',
      bankName: 'بانک ملی ایران'
    };
  },
  savePaymentSettings: async (settings: PaymentSettings) => {
    const { error } = await supabase.from('settings').upsert({ key: 'payment', value: settings });
    if (error) throw error;
  },
};
