
import React from 'react';
import { Order, OrderStatus } from '../types';
import { formatPrice } from '../constants';

interface Props {
  orders: Order[];
  onUpdateOrders: (orders: Order[]) => void;
  onAddNotification: (userId: string, title: string, message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
}

const AdminOrders: React.FC<Props> = ({ orders, onUpdateOrders, onAddNotification }) => {
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    onUpdateOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

    // Create notification for status change
    let title = 'بروزرسانی وضعیت سفارش';
    let message = `وضعیت سفارش #${orderId.slice(0, 8)} به "${newStatus}" تغییر یافت.`;
    let type: 'info' | 'success' | 'warning' | 'error' = 'info';

    if (newStatus === OrderStatus.DELIVERED) {
      title = 'سفارش تحویل داده شد';
      message = `سفارش شما با موفقیت تحویل داده شد. ممنون از اعتماد شما به کتابینو! امیدواریم از مطالعه کتاب‌های خود لذت ببرید.`;
      type = 'success';
    } else if (newStatus === OrderStatus.SHIPPED) {
      title = 'سفارش ارسال شد';
      message = `سفارش شما تحویل پست گردید و به زودی به دست شما خواهد رسید.`;
      type = 'success';
    }

    onAddNotification(order.userId, title, message, type);
  };

  const handleApproveOrder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    onUpdateOrders(orders.map(o => o.id === orderId ? { ...o, status: OrderStatus.PROCESSING, adminNote: 'رسید تایید شد.' } : o));
    
    onAddNotification(
      order.userId, 
      'تایید پرداخت بانکی', 
      `رسید پرداخت سفارش #${orderId.slice(0, 8)} توسط مدیریت تایید شد و سفارش شما وارد مرحله پردازش گردید.`,
      'success'
    );

    setSelectedOrder(null);
    alert('سفارش تایید شد و به مرحله پردازش رفت.');
  };

  const handleRejectOrder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const reason = prompt('لطفاً دلیل رد سفارش را وارد کنید:', 'رسید نامعتبر یا فیک است.');
    if (reason) {
      onUpdateOrders(orders.map(o => o.id === orderId ? { ...o, status: OrderStatus.REJECTED, adminNote: reason } : o));
      
      onAddNotification(
        order.userId, 
        'رد پرداخت بانکی', 
        `متاسفانه رسید پرداخت سفارش #${orderId.slice(0, 8)} رد شد. علت: ${reason}. لطفاً مجدداً بررسی نمایید.`,
        'error'
      );

      setSelectedOrder(null);
      alert('سفارش رد شد و به کاربر اطلاع داده می‌شود.');
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-800">مدیریت سفارش‌ها</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="p-4 font-medium">شماره سفارش</th>
                <th className="p-4 font-medium">مشتری</th>
                <th className="p-4 font-medium">اقلام</th>
                <th className="p-4 font-medium">مبلغ کل</th>
                <th className="p-4 font-medium">روش پرداخت</th>
                <th className="p-4 font-medium">وضعیت</th>
                <th className="p-4 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-mono text-xs">#{order.id.slice(0, 8)}</td>
                  <td className="p-4">
                    <div className="font-bold text-slate-800">{order.shippingAddress.fullName}</div>
                    <div className="text-[10px] text-slate-400">{order.shippingAddress.mobile}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex -space-x-2 space-x-reverse">
                      {order.items.map(item => (
                        <img key={item.id} src={item.image} className="w-8 h-10 object-cover rounded border border-white shadow-sm" title={item.title} />
                      ))}
                    </div>
                  </td>
                  <td className="p-4 font-bold">{formatPrice(order.totalAmount)}</td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${order.paymentMethod === 'online' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                      {order.paymentMethod === 'online' ? 'آنلاین' : 'کارت به کارت'}
                    </span>
                  </td>
                  <td className="p-4">
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className="bg-slate-100 border-none rounded-lg p-2 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {Object.values(OrderStatus).map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="text-indigo-600 font-bold hover:underline"
                    >
                      جزئیات / فاکتور
                    </button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-400">هیچ سفارشی ثبت نشده است.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 print:p-0 print:bg-white print:static print:inset-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl animate-in zoom-in duration-200 print:shadow-none print:p-0 print:max-w-none print:rounded-none invoice-container">
            <style>{`
              @media print {
                body * {
                  visibility: hidden;
                }
                .invoice-container, .invoice-container * {
                  visibility: visible;
                }
                .invoice-container {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                }
                .no-print {
                  display: none !important;
                }
              }
            `}</style>
            
            <div className="flex justify-between items-center mb-8 no-print">
              <h3 className="text-xl font-bold">جزئیات سفارش #{selectedOrder.id.slice(0, 8)}</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            {/* Invoice Header (Visible only in print or modal) */}
            <div className="hidden print:flex justify-between items-center mb-10 border-b-2 border-slate-900 pb-6">
              <div>
                <h2 className="text-3xl font-black text-slate-900">فاکتور فروش کتابینو</h2>
                <p className="text-slate-500 mt-1">مرجع تخصصی خرید کتاب آنلاین</p>
              </div>
              <div className="text-left" dir="ltr">
                <p className="font-bold">Order ID: #{selectedOrder.id.slice(0, 8)}</p>
                <p className="text-sm text-slate-500">{new Date(selectedOrder.createdAt).toLocaleDateString('fa-IR')}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-400 uppercase print:text-slate-900">اطلاعات مشتری</h4>
                <div className="bg-slate-50 p-4 rounded-2xl space-y-2 print:bg-white print:border print:border-slate-200">
                  <p className="text-sm font-bold text-slate-800">{selectedOrder.shippingAddress.fullName}</p>
                  <p className="text-sm text-slate-600">{selectedOrder.shippingAddress.mobile}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{selectedOrder.shippingAddress.address}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-400 uppercase print:text-slate-900">خلاصه فاکتور</h4>
                <div className="bg-slate-50 p-4 rounded-2xl space-y-2 print:bg-white print:border print:border-slate-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">تعداد اقلام:</span>
                    <span className="font-bold">{selectedOrder.items.reduce((acc, i) => acc + i.quantity, 0)} عدد</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">مبلغ کل:</span>
                    <span className="font-bold text-indigo-600 print:text-slate-900">{formatPrice(selectedOrder.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">وضعیت پرداخت:</span>
                    <span className={`font-bold ${selectedOrder.paymentMethod === 'online' ? 'text-green-600' : 'text-purple-600'}`}>
                      {selectedOrder.paymentMethod === 'online' ? 'پرداخت شده (آنلاین)' : 'کارت به کارت (نیاز به بررسی)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {selectedOrder.paymentMethod === 'card_to_card' && selectedOrder.receiptImage && (
              <div className="mb-8 p-6 bg-slate-900 rounded-3xl text-white no-print">
                <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
                  <span>📸</span> تصویر رسید ارسالی کاربر
                </h4>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <img 
                    src={selectedOrder.receiptImage} 
                    className="w-full md:w-48 h-auto rounded-xl shadow-2xl cursor-pointer hover:scale-105 transition-transform" 
                    alt="رسید بانکی"
                    onClick={() => window.open(selectedOrder.receiptImage)}
                  />
                  <div className="flex-grow space-y-4">
                    <p className="text-xs text-slate-400 leading-relaxed">
                      لطفاً مبلغ واریزی را با موجودی حساب خود چک کنید. در صورت صحت رسید، دکمه تایید و در صورت فیک بودن، دکمه رد را بزنید.
                    </p>
                    {selectedOrder.status === OrderStatus.VERIFYING_PAYMENT && (
                      <div className="flex gap-3">
                        <button 
                          onClick={() => handleApproveOrder(selectedOrder.id)}
                          className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-all text-sm"
                        >
                          ✅ تایید سفارش
                        </button>
                        <button 
                          onClick={() => handleRejectOrder(selectedOrder.id)}
                          className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-all text-sm"
                        >
                          ❌ رد سفارش (فیک)
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-400 uppercase print:text-slate-900">لیست کتاب‌ها</h4>
              <div className="max-h-40 overflow-y-auto space-y-2 pr-2 print:max-h-none print:overflow-visible print:pr-0">
                {selectedOrder.items.map(item => (
                  <div key={item.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl print:bg-white print:border-b print:rounded-none">
                    <img src={item.image} className="w-10 h-12 object-cover rounded no-print" />
                    <div className="flex-grow">
                      <p className="text-xs font-bold text-slate-800">{item.title}</p>
                      <p className="text-[10px] text-slate-500">{item.quantity} نسخه × {formatPrice(item.price)}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-800">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-10 border-t border-slate-100 hidden print:block">
              <div className="flex justify-between items-center">
                <div className="text-xs text-slate-400">
                  <p>از خرید شما سپاسگزاریم.</p>
                  <p>کتابینو - ketabino.com</p>
                </div>
                <div className="w-24 h-24 border border-slate-200 flex items-center justify-center text-[10px] text-slate-300">
                  محل مهر و امضا
                </div>
              </div>
            </div>

            <div className="mt-8 no-print">
              <button 
                onClick={() => window.print()}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2"
              >
                <span>🖨️</span> چاپ فاکتور رسمی
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
