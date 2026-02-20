
import React from 'react';

const CareersPage: React.FC = () => {
  const jobs = [
    { title: 'برنامه‌نویس ری‌اکت (Senior)', type: 'تمام وقت', remote: 'امکان دورکاری' },
    { title: 'کارشناس تولید محتوا', type: 'تمام وقت / پاره وقت', remote: 'حضوری' },
    { title: 'ادمین شبکه‌های اجتماعی', type: 'پروژه‌ای', remote: 'دورکاری' },
    { title: 'کارشناس پشتیبانی مشتریان', type: 'تمام وقت', remote: 'شیفت چرخشی' }
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-20">
        <span className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-4 block">همکاری با ما</span>
        <h1 className="text-5xl font-black text-slate-900 mb-8">به تیم کتابینو بپیوندید</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">ما همیشه به دنبال افراد بااستعداد، خلاق و عاشق کتاب هستیم تا با هم دنیای مطالعه را متحول کنیم.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:border-amber-500 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-bold">{job.type}</span>
                <span className="text-slate-300 text-xs">{job.remote}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">{job.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">اگر در این حوزه مهارت دارید و به دنبال محیطی پویا برای رشد هستید، مشتاق دیدار شما هستیم.</p>
            </div>
            <button className="bg-slate-50 text-slate-900 py-3 rounded-xl font-bold hover:bg-slate-900 hover:text-white transition-all">مشاهده و ارسال رزومه</button>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-indigo-600 rounded-[2.5rem] p-12 text-white text-center">
        <h3 className="text-3xl font-bold mb-4">رزومه شما در لیست ما نیست؟</h3>
        <p className="text-indigo-100 mb-8">رزومه خود را به صورت عمومی برای ما بفرستید تا در صورت نیاز با شما تماس بگیریم.</p>
        <a href="mailto:hr@ketabino.ir" className="bg-white text-indigo-600 px-10 py-4 rounded-2xl font-black hover:bg-indigo-50 transition-all inline-block">ارسال ایمیل به منابع انسانی</a>
      </div>
    </div>
  );
};

export default CareersPage;
