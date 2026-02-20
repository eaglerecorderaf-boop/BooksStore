
export enum OrderStatus {
  PENDING = 'در انتظار',
  PROCESSING = 'در حال پردازش',
  SHIPPED = 'ارسال شده',
  DELIVERED = 'تحویل داده شده',
  CANCELLED = 'لغو شده'
}

export interface Book {
  id: string;
  title: string;
  author: string;
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
  shippingAddress: {
    fullName: string;
    mobile: string;
    address: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  avatar?: string;
}

export interface Coupon {
  code: string;
  discount: number; // percentage
  isActive: boolean;
}
