
import React, { useState } from 'react';
import { motion } from 'motion/react';

interface Job {
  id: string;
  title: string;
  type: string;
  remote: string;
  department: string;
  description: string;
  requirements: string[];
}

const CareersPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  const jobs: Job[] = [
    { 
      id: '1',
      title: 'برنامه‌نویس ری‌اکت (Senior)', 
      type: 'تمام وقت', 
      remote: 'امکان دورکاری',
      department: 'فنی و مهندسی',
      description: 'ما به دنبال یک توسعه‌دهنده ارشد React هستیم که به مفاهیم مدرن وب، Next.js و بهینه‌سازی عملکرد تسلط داشته باشد.',
      requirements: ['تسلط کامل به React و TypeScript', 'تجربه کار با Redux یا Zustand', 'آشنایی با SSR و Next.js', 'حداقل ۴ سال تجربه کاری مرتبط']
    },
    { 
      id: '2',
      title: 'کارشناس تولید محتوا', 
      type: 'تمام وقت / پاره وقت', 
      remote: 'حضوری',
      department: 'بازاریابی',
      description: 'اگر قلم توانایی دارید و دنیای کتاب‌ها را می‌شناسید، جای شما در تیم محتوای کتابینو خالی است.',
      requirements: ['توانایی نگارش متون جذاب و سئو شده', 'آشنایی با اصول کپی‌رایتینگ', 'علاقه شدید به مطالعه و نقد کتاب', 'آشنایی با ابزارهای مدیریت محتوا']
    },
    { 
      id: '3',
      title: 'ادمین شبکه‌های اجتماعی', 
      type: 'پروژه‌ای', 
      remote: 'دورکاری',
      department: 'بازاریابی',
      description: 'مدیریت اینستاگرام و تلگرام کتابینو و تعامل با جامعه کتاب‌خوان‌ها.',
      requirements: ['تجربه مدیریت پیج‌های فروشگاهی', 'توانایی کار با ابزارهای گرافیکی موبایل', 'خلاقیت در سناریونویسی برای استوری و ریلز', 'پاسخگویی سریع و محترمانه']
    },
    { 
      id: '4',
      title: 'کارشناس پشتیبانی مشتریان', 
      type: 'تمام وقت', 
      remote: 'شیفت چرخشی',
      department: 'عملیات',
      description: 'پاسخگویی به تماس‌ها و تیکت‌های کاربران و پیگیری سفارشات.',
      requirements: ['روابط عمومی بالا و صبوری', 'توانایی کار با سیستم‌های CRM', 'دقت بالا در ثبت اطلاعات', 'روحیه کار تیمی']
    }
  ];

  const benefits = [
    { title: 'بیمه و مزایا', icon: '🛡️', desc: 'بیمه تامین اجتماعی و تکمیلی از روز اول همکاری.' },
    { title: 'تخفیف کتاب', icon: '📚', desc: 'تخفیف‌های ویژه و بن خرید کتاب برای تمام همکاران.' },
    { title: 'محیط پویا', icon: '🚀', desc: 'کار در محیطی جوان، خلاق و به دور از بروکراسی اداری.' },
    { title: 'رشد شغلی', icon: '📈', desc: 'فرصت‌های یادگیری مداوم و ارتقای جایگاه شغلی.' },
    { title: 'ساعت کاری منعطف', icon: '⏰', desc: 'امکان تنظیم ساعت کاری برای برخی پوزیشن‌ها.' },
    { title: 'رویدادهای تیمی', icon: '🎉', desc: 'برگزاری دورهمی‌ها و رویدادهای تفریحی تیمی.' },
  ];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setSelectedJob(null);
      alert('درخواست شما با موفقیت ثبت شد. تیم منابع انسانی به زودی با شما تماس خواهد گرفت.');
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-4 block">همکاری با ما</span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
            داستان موفقیت بعدی ما را <br className="hidden md:block" />
            <span className="text-amber-500">شما بنویسید</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            کتابینو فقط یک فروشگاه نیست؛ یک خانواده بزرگ از عاشقان کتاب است. ما به دنبال افرادی هستیم که می‌خواهند در کنار ما رشد کنند.
          </p>
        </motion.div>
      </div>

      {/* Benefits Section */}
      <section className="mb-32">
        <h2 className="text-2xl font-bold text-slate-800 mb-12 text-center">چرا کتابینو؟</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="font-bold text-slate-800 mb-2">{benefit.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Job Listings */}
      <section id="jobs">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">فرصت‌های شغلی فعلی</h2>
            <p className="text-slate-500">موقعیت مورد نظر خود را پیدا کنید</p>
          </div>
          <div className="hidden md:block text-slate-400 text-sm">
            تعداد پوزیشن‌ها: {jobs.length}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {jobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:border-amber-500 transition-all flex flex-col md:flex-row md:items-center justify-between group"
            >
              <div className="mb-6 md:mb-0">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-bold">{job.department}</span>
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-bold">{job.type}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">{job.title}</h3>
                <p className="text-slate-400 text-sm">{job.remote}</p>
              </div>
              <button 
                onClick={() => setSelectedJob(job)}
                className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-amber-500 hover:text-slate-900 transition-all shadow-lg shadow-slate-900/10"
              >
                مشاهده جزئیات و ارسال رزومه
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* General Application */}
      <div className="mt-32 bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
        
        <div className="relative z-10">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">رزومه شما در لیست ما نیست؟</h3>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed">
            اگر فکر می‌کنید می‌توانید به ما کمک کنید اما پوزیشن مناسب خود را پیدا نکردید، رزومه خود را برای ما بفرستید. ما همیشه برای افراد بااستعداد جا داریم.
          </p>
          <a href="mailto:hr@ketabino.ir" className="bg-amber-500 text-slate-900 px-12 py-5 rounded-2xl font-black hover:bg-white transition-all inline-block shadow-xl shadow-amber-500/20">
            ارسال رزومه عمومی
          </a>
        </div>
      </div>

      {/* Job Detail & Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in duration-300">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md p-8 border-b border-slate-100 flex justify-between items-center z-20">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">{selectedJob.title}</h3>
                <p className="text-sm text-slate-500">{selectedJob.department} | {selectedJob.type}</p>
              </div>
              <button onClick={() => setSelectedJob(null)} className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all">✕</button>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="space-y-10">
                <section>
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
                    درباره این نقش
                  </h4>
                  <p className="text-slate-600 leading-relaxed">{selectedJob.description}</p>
                </section>

                <section>
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
                    نیازمندی‌ها و مهارت‌ها
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600 bg-slate-50 p-4 rounded-2xl">
                        <span className="text-amber-500 mt-0.5">✓</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                  <h4 className="font-bold text-slate-800 mb-8 text-center">فرم ارسال درخواست</h4>
                  <form onSubmit={handleApply} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-2 pr-2">نام و نام خانوادگی</label>
                        <input required type="text" className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-2 pr-2">شماره موبایل</label>
                        <input required type="tel" className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all text-left" dir="ltr" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2 pr-2">لینک رزومه یا پروفایل لینکدین</label>
                      <input required type="url" placeholder="https://..." className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all text-left" dir="ltr" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2 pr-2">توضیحات کوتاه (اختیاری)</label>
                      <textarea rows={3} className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all resize-none"></textarea>
                    </div>
                    <button 
                      disabled={isApplying}
                      type="submit" 
                      className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isApplying ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          در حال ارسال...
                        </>
                      ) : (
                        'ثبت درخواست همکاری'
                      )}
                    </button>
                  </form>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareersPage;
