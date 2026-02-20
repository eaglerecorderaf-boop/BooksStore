
import React from 'react';
import { User } from '../types';

interface Props {
  users: User[];
  onUpdateUsers: (users: User[]) => void;
}

const AdminUsers: React.FC<Props> = ({ users, onUpdateUsers }) => {
  const toggleAdmin = (userId: string) => {
    onUpdateUsers(users.map(u => u.id === userId ? { ...u, isAdmin: !u.isAdmin } : u));
  };

  const deleteUser = (userId: string) => {
    if (confirm('آیا از حذف این کاربر مطمئن هستید؟')) {
      onUpdateUsers(users.filter(u => u.id !== userId));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">مدیریت کاربران</h1>
        <div className="text-sm text-slate-500">تعداد کل کاربران: {users.length} نفر</div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="p-4 font-medium">نام کاربر</th>
                <th className="p-4 font-medium">ایمیل</th>
                <th className="p-4 font-medium">نقش</th>
                <th className="p-4 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                        {user.name[0]}
                      </div>
                      <span className="font-bold text-slate-800">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-500">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${user.isAdmin ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                      {user.isAdmin ? 'مدیر سیستم' : 'کاربر عادی'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      <button 
                        onClick={() => toggleAdmin(user.id)}
                        className="text-indigo-600 hover:text-indigo-900 font-bold"
                      >
                        تغییر نقش
                      </button>
                      <button 
                        onClick={() => deleteUser(user.id)}
                        className="text-red-600 hover:text-red-900 font-bold"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-slate-400">هیچ کاربری یافت نشد.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
