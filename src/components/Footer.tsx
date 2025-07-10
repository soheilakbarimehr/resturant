export default function Footer() {
  return (
    <footer className="bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)]">
      <div className="container px-4 py-8 mx-auto">        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-right">
            <h3 className="mb-4 text-lg font-bold text-orange-600">تماس با ما</h3>
            <div className="space-y-3">
              <div className="text-right text-gray-600">
                ۰۲۱-۱۲۳۴۵۶۷۸
              </div>
              <div className="text-right text-gray-600">
                info@puta.com
              </div>
              <div className="text-right text-gray-600">
                تهران، خیابان ولیعصر
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <h3 className="mb-4 text-lg font-bold text-orange-600">ساعات کاری</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>شنبه تا چهارشنبه: ۱۱ صبح تا ۱۱ شب</p>
              <p>پنجشنبه و جمعه: ۱۱ صبح تا ۱۲ شب</p>
            </div>
          </div>
          
          <div className="text-right">
            <h3 className="mb-4 text-lg font-bold text-orange-600">شبکه‌های اجتماعی</h3>
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-gray-600 transition-colors hover:text-orange-500">
                اینستاگرام
              </a>
              <a href="#" className="text-gray-600 transition-colors hover:text-orange-500">
                توییتر
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-6 mt-8 text-sm text-center text-gray-500 border-t border-orange-100">
          <span>© ۱۴۰۲ پوتا فست فود. تمامی حقوق محفوظ است.</span>
        </div>
      </div>
    </footer>
  );
}