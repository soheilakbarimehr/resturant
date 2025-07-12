import { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
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
    },
    footer: {
      aboutText: 'رستوران ایرانی با بیش از ۱۰ سال تجربه در ارائه بهترین غذاهای ایرانی و فست فود',
      copyrightText: '© ۱۴۰۲ رستوران ایرانی. تمامی حقوق محفوظ است.',
      showSocialMedia: true,
      showWorkingHours: true,
      showContactInfo: true
    },
    enamad: '',
    samandehi: ''
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
        },
        footer: info.footer || {
          aboutText: 'رستوران ایرانی با بیش از ۱۰ سال تجربه در ارائه بهترین غذاهای ایرانی و فست فود',
          copyrightText: '© ۱۴۰۲ رستوران ایرانی. تمامی حقوق محفوظ است.',
          showSocialMedia: true,
          showWorkingHours: true,
          showContactInfo: true
        },
        enamad: info.enamad || '',
        samandehi: info.samandehi || ''
      });
    }
  }, []);

  return (
    <footer className="bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] mt-16">
      <div className="container px-4 py-8 mx-auto">        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* About Section */}
          <div className="text-right md:col-span-2">
            <h3 className="mb-4 text-lg font-bold text-orange-600">{restaurantInfo.name}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              {restaurantInfo.footer.aboutText}
            </p>
            
            {/* Trust Badges */}
            <div className="flex items-center gap-4 mt-4">
              {restaurantInfo.enamad && (
                <img 
                  src={restaurantInfo.enamad} 
                  alt="نماد اعتماد الکترونیک" 
                  className="h-16 object-contain"
                />
              )}
              {restaurantInfo.samandehi && (
                <img 
                  src={restaurantInfo.samandehi} 
                  alt="نماد ساماندهی" 
                  className="h-16 object-contain"
                />
              )}
            </div>
          </div>
          
          {/* Contact Info */}
          {restaurantInfo.footer.showContactInfo && (
            <div className="text-right">
              <h3 className="mb-4 text-lg font-bold text-orange-600">تماس با ما</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-right text-gray-600">
                  <Phone className="w-4 h-4 text-orange-600" />
                  <span>{restaurantInfo.phone}</span>
                </div>
                <div className="flex items-start gap-2 text-right text-gray-600">
                  <MapPin className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>{restaurantInfo.address}</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Working Hours & Social Media */}
          <div className="text-right">
            {restaurantInfo.footer.showWorkingHours && (
              <div className="mb-6">
                <h3 className="mb-4 text-lg font-bold text-orange-600">ساعات کاری</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <div>
                      <p>شنبه تا چهارشنبه: {restaurantInfo.workingHours.weekdays.open} - {restaurantInfo.workingHours.weekdays.close}</p>
                      <p>پنجشنبه و جمعه: {restaurantInfo.workingHours.weekends.open} - {restaurantInfo.workingHours.weekends.close}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {restaurantInfo.footer.showSocialMedia && (
              <div>
                <h3 className="mb-4 text-lg font-bold text-orange-600">شبکه‌های اجتماعی</h3>
                <div className="flex flex-col space-y-3">
                  {restaurantInfo.socialMedia.instagram && (
                    <a 
                      href={`https://instagram.com/${restaurantInfo.socialMedia.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 transition-colors hover:text-pink-500"
                    >
                      <Instagram className="w-4 h-4" />
                      <span>{restaurantInfo.socialMedia.instagram}</span>
                    </a>
                  )}
                  {restaurantInfo.socialMedia.twitter && (
                    <a 
                      href={`https://twitter.com/${restaurantInfo.socialMedia.twitter.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 transition-colors hover:text-blue-500"
                    >
                      <Twitter className="w-4 h-4" />
                      <span>{restaurantInfo.socialMedia.twitter}</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="pt-6 mt-8 text-sm text-center text-gray-500 border-t border-orange-100">
          <span>{restaurantInfo.footer.copyrightText}</span>
        </div>
      </div>
    </footer>
  );
}