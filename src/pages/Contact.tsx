import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Instagram, Twitter } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: 'رستوران ایرانی',
    phone: '۰۲۱-۱۲۳۴۵۶۷۸',
    address: 'تهران، خیابان ولیعصر',
    workingHours: {
      weekdays: { open: '11:00', close: '23:00' },
      weekends: { open: '11:00', close: '24:00' }
    },
    socialMedia: {
      instagram: '@restaurant_instagram',
      twitter: '@restaurant_twitter'
    }
  });

  // Load restaurant info from localStorage
  useEffect(() => {
    const savedInfo = localStorage.getItem('restaurantInfo');
    if (savedInfo) {
      const info = JSON.parse(savedInfo);
      setRestaurantInfo({
        name: info.name || 'رستوران ایرانی',
        phone: info.phone || '۰۲۱-۱۲۳۴۵۶۷۸',
        address: info.address || 'تهران، خیابان ولیعصر',
        workingHours: info.workingHours || {
          weekdays: { open: '11:00', close: '23:00' },
          weekends: { open: '11:00', close: '24:00' }
        },
        socialMedia: info.socialMedia || {
          instagram: '@restaurant_instagram',
          twitter: '@restaurant_twitter'
        }
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('پیام شما با موفقیت ارسال شد. در اسرع وقت با شما تماس خواهیم گرفت.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">تماس با ما</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          ما همیشه آماده پاسخگویی به سوالات و پیشنهادات شما هستیم. از طریق راه‌های زیر می‌توانید با ما در ارتباط باشید.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Information */}
        <div className="space-y-8">
          {/* Restaurant Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">اطلاعات تماس</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-red-100 rounded-lg">
                  <Phone className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">تلفن</h3>
                  <p className="text-gray-600">{restaurantInfo.phone}</p>
                  <p className="text-sm text-gray-500 mt-1">پاسخگویی ۲۴ ساعته</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-blue-100 rounded-lg">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">آدرس</h3>
                  <p className="text-gray-600">{restaurantInfo.address}</p>
                  <p className="text-sm text-gray-500 mt-1">نزدیک به ایستگاه مترو</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-green-100 rounded-lg">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">ساعات کاری</h3>
                  <div className="text-gray-600 space-y-1">
                    <p>شنبه تا چهارشنبه: {restaurantInfo.workingHours.weekdays.open} - {restaurantInfo.workingHours.weekdays.close}</p>
                    <p>پنجشنبه و جمعه: {restaurantInfo.workingHours.weekends.open} - {restaurantInfo.workingHours.weekends.close}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">شبکه‌های اجتماعی</h2>
            <div className="space-y-4">
              <a
                href={`https://instagram.com/${restaurantInfo.socialMedia.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <Instagram className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">اینستاگرام</h3>
                  <p className="text-sm opacity-90">{restaurantInfo.socialMedia.instagram}</p>
                </div>
              </a>

              <a
                href={`https://twitter.com/${restaurantInfo.socialMedia.twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-blue-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <Twitter className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">توییتر</h3>
                  <p className="text-sm opacity-90">{restaurantInfo.socialMedia.twitter}</p>
                </div>
              </a>
            </div>
          </div>

          {/* Quick Contact */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <MessageCircle className="w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold">تماس فوری</h2>
                <p className="text-red-100">برای سفارش تلفنی</p>
              </div>
            </div>
            <a
              href={`tel:${restaurantInfo.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors"
            >
              <Phone className="w-5 h-5" />
              {restaurantInfo.phone}
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">ارسال پیام</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نام و نام خانوادگی</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="نام خود را وارد کنید"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">شماره تماس</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="شماره تماس خود را وارد کنید"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="ایمیل خود را وارد کنید"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">موضوع</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">موضوع را انتخاب کنید</option>
                <option value="order">سفارش غذا</option>
                <option value="complaint">شکایت</option>
                <option value="suggestion">پیشنهاد</option>
                <option value="cooperation">همکاری</option>
                <option value="other">سایر موارد</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">پیام</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                placeholder="پیام خود را بنویسید..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  در حال ارسال...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  ارسال پیام
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">موقعیت ما روی نقشه</h2>
        <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-gray-500">نقشه در اینجا نمایش داده خواهد شد</p>
            <p className="text-sm text-gray-400 mt-1">{restaurantInfo.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}