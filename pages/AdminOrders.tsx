
import React from 'react';
import { Order, OrderStatus } from '../types';
import { formatPrice } from '../constants';

interface Props {
  orders: Order[];
  onUpdateOrders: (orders: Order[]) => void;
}

const AdminOrders: React.FC<Props> = ({ orders, onUpdateOrders }) => {
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    onUpdateOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
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
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold">جزئیات سفارش #{selectedOrder.id.slice(0, 8)}</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-400 uppercase">اطلاعات مشتری</h4>
                <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
                  <p className="text-sm font-bold text-slate-800">{selectedOrder.shippingAddress.fullName}</p>
                  <p className="text-sm text-slate-600">{selectedOrder.shippingAddress.mobile}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{selectedOrder.shippingAddress.address}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-400 uppercase">خلاصه فاکتور</h4>
                <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">تعداد اقلام:</span>
                    <span className="font-bold">{selectedOrder.items.reduce((acc, i) => acc + i.quantity, 0)} عدد</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">مبلغ کل:</span>
                    <span className="font-bold text-indigo-600">{formatPrice(selectedOrder.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">وضعیت:</span>
                    <span className="font-bold text-amber-600">{selectedOrder.status}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-400 uppercase">لیست کتاب‌ها</h4>
              <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
                {selectedOrder.items.map(item => (
                  <div key={item.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                    <img src={item.image} className="w-10 h-12 object-cover rounded" />
                    <div className="flex-grow">
                      <p className="text-xs font-bold text-slate-800">{item.title}</p>
                      <p className="text-[10px] text-slate-500">{item.quantity} نسخه × {formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <button 
                onClick={() => window.print()}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20"
              >
                🖨️ چاپ فاکتور
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
