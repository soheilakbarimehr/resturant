import { useState, useEffect } from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';

interface SocialMedia {
  id: string;
  name: string;
  icon: string;
  link: string;
}

interface WorkingHours {
  weekdays: { open: string; close: string };
  weekends: { open: string; close: string };
}

interface FooterInfo {
  aboutText: string;
  copyrightText: string;
  showSocialMedia: boolean;
  showWorkingHours: boolean;
  showContactInfo: boolean;
}

interface RestaurantInfo {
  name: string;
  phone: string;
  address: string;
  workingHours: WorkingHours;
  socialMedia: SocialMedia[];
  footer: FooterInfo;
  enamad: string;
  samandehi: string;
  enamadLink?: string;
}

export default function Footer() {
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo | null>(null);

  // Load from localStorage
  useEffect(() => {
    const savedInfo = localStorage.getItem('restaurantInfo');
    if (savedInfo) {
      try {
        const parsed: RestaurantInfo = JSON.parse(savedInfo);
        setRestaurantInfo(parsed);
      } catch (err) {
        console.error("خطا در خواندن اطلاعات رستوران:", err);
      }
    }
  }, []);

  if (!restaurantInfo) return null;

  const {
    name,
    phone,
    address,
    workingHours,
    socialMedia,
    footer,
    enamad,
    samandehi,
    enamadLink,
  } = restaurantInfo;

  return (
    <footer className="bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] mt-16">
      <div className="container px-4 py-8 mx-auto">        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* About Section */}
          <div className="text-right md:col-span-2">
            <h3 className="mb-4 text-lg font-bold text-orange-600">{name}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              {footer.aboutText}
            </p>

            {/* Trust Badges */}
            <div className="flex items-center gap-4 mt-4">
              {enamad && (
                <img 
                  src={enamad} 
                  alt="نماد اعتماد الکترونیک" 
                  className="h-16 object-contain"
                />
              )}
              {samandehi && (
                <img 
                  src={samandehi} 
                  alt="نماد ساماندهی" 
                  className="h-16 object-contain"
                />
              )}
            </div>
          </div>
          
          {/* Contact Info */}
          {footer.showContactInfo && (
            <div className="text-right space-y-2 text-sm text-gray-700">
              <div className="flex items-center justify-end gap-2">
                <Phone className="w-4 h-4 text-orange-600" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <MapPin className="w-4 h-4 text-orange-600" />
                <span>{address}</span>
              </div>
              {enamadLink && enamad && (
                <a 
                  href={enamadLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img 
                    src={enamad} 
                    alt="نماد اعتماد الکترونیک" 
                    className="h-16 object-contain hover:opacity-80 transition-opacity"
                  />
                </a>
              )}
            </div>
          )}

          {/* Working Hours & Social Media */}
          <div className="text-right">
            {footer.showWorkingHours && (
              <div className="mb-6">
                <h3 className="mb-4 text-lg font-bold text-orange-600">ساعات کاری</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <div>
                      <p>شنبه تا چهارشنبه: {workingHours.weekdays.open} - {workingHours.weekdays.close}</p>
                      <p>پنجشنبه و جمعه: {workingHours.weekends.open} - {workingHours.weekends.close}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {footer.showSocialMedia && Array.isArray(socialMedia) && (
              <div>
                <h3 className="mb-4 text-lg font-bold text-orange-600">شبکه‌های اجتماعی</h3>
                <div className="flex flex-col space-y-3">
                  {socialMedia.map((social) => (
                    <a 
                      key={social.id}
                      href={social.link.startsWith('http') ? social.link : `https://${social.link.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 transition-colors hover:text-orange-500"
                    >
                      {social.icon ? (
                        <img src={social.icon} alt={social.name} className="w-4 h-4 object-contain" />
                      ) : (
                        <div className="w-4 h-4 bg-gray-400 rounded" />
                      )}
                      <span>{social.name}: {social.link}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="pt-6 mt-8 text-sm text-center text-gray-500 border-t border-orange-100">
          <span>{footer.copyrightText}</span>
        </div>
      </div>
    </footer>
  );
}
