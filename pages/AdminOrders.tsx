
import React from 'react';
import { Order, OrderStatus } from '../types';
import { formatPrice } from '../constants';

interface Props {
  orders: Order[];
  onUpdateOrders: (orders: Order[]) => void;
}

const AdminOrders: React.FC<Props> = ({ orders, onUpdateOrders }) => {
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
                  <td className="p-4 font-mono text-xs">#{order.id}</td>
                  <td className="p-4">
                    <div className="font-bold text-slate-800">{order.shippingAddress.fullName}</div>
                    <div className="text-[10px] text-slate-400">{order.shippingAddress.mobile}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex -space-x-2 space-x-reverse">
                      {order.items.map(item => (
                        <img key={item.id} src={item.image} className="w-8 h-10 object-cover rounded border border-white" title={item.title} />
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
                    <button className="text-indigo-600 font-bold hover:underline">جزئیات / فاکتور</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
