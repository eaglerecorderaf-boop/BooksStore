
import React from 'react';

const ReturnPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <h1 className="text-3xl font-black text-slate-900 mb-8 border-b pb-6">شرایط بازگشت کالا</h1>
        
        <div className="space-y-8 text-slate-600 leading-8">
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="text-amber-500">۰۱</span> ضمانت ۷ روزه بازگشت
            </h2>
            <p>تمامی کتاب‌های خریداری شده از کتابینو دارای ۷ روز ضمانت بازگشت هستند. اگر به هر دلیلی از خرید خود پشیمان شدید یا کتاب دارای نقص فیزیکی بود، می‌توانید آن را مرجوع کنید.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="text-amber-500">۰۲</span> شرایط مرجوعی
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>کتاب باید در وضعیت اولیه خود باشد (بدون تاخوردگی، نوشته یا لکه).</li>
              <li>پلمب کتاب (در صورت وجود) نباید باز شده باشد.</li>
              <li>فاکتور خرید یا کد سفارش همراه کالا باشد.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="text-amber-500">۰۳</span> فرآیند بازگشت وجه
            </h2>
            <p>پس از دریافت کالای مرجوعی توسط تیم انبار و تایید سلامت آن، مبلغ پرداختی ظرف ۴۸ تا ۷۲ ساعت کاری به شماره کارت اعلام شده توسط مشتری واریز خواهد شد.</p>
          </section>

          <div className="bg-red-50 p-6 rounded-2xl border border-red-100 text-red-800 text-sm">
            <strong>توجه:</strong> هزینه ارسال کالای مرجوعی در صورت پشیمانی از خرید بر عهده مشتری و در صورت وجود نقص فنی یا اشتباه در ارسال، بر عهده کتابینو خواهد بود.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;
