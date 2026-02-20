
export enum OrderStatus {
  PENDING = 'در انتظار',
  AWAITING_PAYMENT = 'در انتظار پرداخت',
  VERIFYING_PAYMENT = 'در حال بررسی رسید',
  PROCESSING = 'در حال پردازش',
  SHIPPED = 'ارسال شده',
  DELIVERED = 'تحویل داده شده',
  CANCELLED = 'لغو شده',
  REJECTED = 'رد شده'
}

export interface Book {
  id: string;
  title: string;
  author: string;
  translator?: string;
  publisher: string;
  isbn: string;
  publishDate: string;
  price: number;
  discount: number;
  stock: number;
  category: string;
  description: string;
  image: string;
  pages: number;
  language: string;
  rating: number;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
}

export interface CartItem extends Book {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  paymentMethod: 'online' | 'card_to_card';
  receiptImage?: string; // base64
  adminNote?: string;
  shippingAddress: {
    fullName: string;
    mobile: string;
    address: string;
  };
}

export interface Address {
  id: string;
  title: string;
  fullName: string;
  mobile: string;
  city: string;
  fullAddress: string;
}

export interface Review {
  id: string;
  bookId: string;
  bookTitle: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  mobile?: string;
  isAdmin: boolean;
  avatar?: string;
  addresses?: Address[];
  favorites?: string[]; // array of book IDs
  reviews?: Review[];
  notifications?: Notification[];
}

export interface Coupon {
  code: string;
  discount: number; // percentage
  isActive: boolean;
}

export interface PaymentSettings {
  cardNumber: string;
  accountHolder: string;
  bankName: string;
}
