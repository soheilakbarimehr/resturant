import { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Store, Truck, Clock, CreditCard, CheckCircle, Map, Navigation, X, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

type DeliveryType = 'restaurant' | 'takeaway' | 'delivery';

interface LocationData {
  lat: number;
  lng: number;
  address: string;
}

interface DeliveryZone {
  id: string;
  name: string;
  minDistance: number;
  maxDistance: number;
  fee: number;
}

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

export default function OrderCompletion() {
  const { totalPrice } = useCart();
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('restaurant');
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [notes, setNotes] = useState('');
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [deliveryError, setDeliveryError] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);
  
  // Load delivery settings
  const [deliverySettings, setDeliverySettings] = useState({
    deliveryRadius: 10,
    deliveryMethods: {
      restaurant: true,
      takeaway: true,
      delivery: true
    },
    paymentMethods: {
      online: true,
      cash: true,
      card: false
    }
  });

  const [deliveryZones, setDeliveryZones] = useState<DeliveryZone[]>([
    { id: '1', name: 'منطقه نزدیک', minDistance: 0, maxDistance: 1, fee: 10000 },
    { id: '2', name: 'منطقه متوسط', minDistance: 1, maxDistance: 3, fee: 15000 },
    { id: '3', name: 'منطقه دور', minDistance: 3, maxDistance: 5, fee: 25000 },
  ]);

  const [restaurantLocation] = useState({ lat: 35.6892, lng: 51.3890 }); // Tehran coordinates

  // Load settings from localStorage
  useEffect(() => {
    const savedDeliveryInfo = localStorage.getItem('deliveryInfo');
    const savedDeliveryZones = localStorage.getItem('deliveryZones');
    const savedRestaurantInfo = localStorage.getItem('restaurantInfo');

    if (savedDeliveryInfo) {
      const info = JSON.parse(savedDeliveryInfo);
      setDeliverySettings(info);
    }

    if (savedDeliveryZones) {
      setDeliveryZones(JSON.parse(savedDeliveryZones));
    }

    if (savedRestaurantInfo) {
      const info = JSON.parse(savedRestaurantInfo);
      if (info.location) {
        // Update restaurant location if available
      }
    }
  }, []);

  // Calculate delivery fee based on distance
  useEffect(() => {
    if (selectedLocation && deliveryType === 'delivery') {
      const distance = calculateDistance(
        restaurantLocation.lat,
        restaurantLocation.lng,
        selectedLocation.lat,
        selectedLocation.lng
      );

      // Check if within delivery radius
      if (distance > deliverySettings.deliveryRadius) {
        setDeliveryError(`متأسفانه این آدرس خارج از محدوده ارسال ما است. حداکثر فاصله مجاز ${deliverySettings.deliveryRadius} کیلومتر می‌باشد. فاصله انتخاب شده: ${distance.toFixed(1)} کیلومتر`);
        setDeliveryFee(0);
        return;
      }

      // Find appropriate delivery zone
      const zone = deliveryZones.find(z => distance >= z.minDistance && distance < z.maxDistance);
      if (zone) {
        setDeliveryFee(zone.fee);
        setDeliveryError('');
      } else {
        setDeliveryFee(25000); // Default fee
        setDeliveryError('');
      }
    } else {
      setDeliveryFee(0);
      setDeliveryError('');
    }
  }, [selectedLocation, deliveryType, deliverySettings.deliveryRadius, deliveryZones, restaurantLocation]);

  const deliveryOptions = {
    restaurant: {
      title: 'تحویل در رستوران',
      description: 'سفارش خود را در رستوران تحویل بگیرید',
      icon: <Store className="w-5 h-5 md:w-6 md:h-6" />,
      time: '۱۵-۲۰ دقیقه',
      fee: 0,
      enabled: deliverySettings.deliveryMethods.restaurant
    },
    takeaway: {
      title: 'تحویل در رستوران (بیرون بر)',
      description: 'سفارش آماده شده را از بیرون رستوران تحویل بگیرید',
      icon: <Store className="w-5 h-5 md:w-6 md:h-6" />,
      time: '۱۰-۱۵ دقیقه',
      fee: 0,
      enabled: deliverySettings.deliveryMethods.takeaway
    },
    delivery: {
      title: 'ارسال با پیک',
      description: 'سفارش را تا درب منزل ارسال می‌کنیم',
      icon: <Truck className="w-5 h-5 md:w-6 md:h-6" />,
      time: '۳۰-۴۵ دقیقه',
      fee: deliveryFee,
      enabled: deliverySettings.deliveryMethods.delivery
    }
  };

  const selectedOption = deliveryOptions[deliveryType];
  const finalTotal = totalPrice + selectedOption.fee;

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Reverse geocoding using Nominatim (free service)
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=fa`
            );
            const data = await response.json();
            const address = data.display_name || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            
            setSelectedLocation({
              lat: latitude,
              lng: longitude,
              address: address
            });
          } catch (error) {
            console.error('Error getting address:', error);
            setSelectedLocation({
              lat: latitude,
              lng: longitude,
              address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
            });
          }
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoadingLocation(false);
          alert('دسترسی به موقعیت مکانی امکان‌پذیر نیست');
        }
      );
    } else {
      setIsLoadingLocation(false);
      alert('مرورگر شما از موقعیت‌یابی پشتیبانی نمی‌کند');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (deliveryType === 'delivery') {
      if (!selectedLocation) {
        alert('لطفاً آدرس تحویل را انتخاب کنید');
        return;
      }
      if (deliveryError) {
        alert('لطفاً آدرس معتبری در محدوده ارسال انتخاب کنید');
        return;
      }
    }

    setIsOrderSubmitted(true);
  };

  if (isOrderSubmitted) {
    return (
      <div className="container px-4 py-8 mx-auto md:py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6 md:mb-8">
            <CheckCircle className="w-16 h-16 mx-auto text-green-500 md:w-24 md:h-24" />
          </div>
          <h1 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">سفارش شما با موفقیت ثبت شد!</h1>
          <p className="mb-2 text-sm text-gray-600 md:text-base">شماره سفارش: <span className="font-bold">#{Math.floor(Math.random() * 10000)}</span></p>
          <p className="mb-6 text-sm text-gray-600 md:text-base md:mb-8">زمان تحویل تقریبی: <span className="font-bold">{selectedOption.time}</span></p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700 md:px-6 md:py-3 md:text-base"
          >
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container px-3 py-4 mx-auto md:px-4 md:py-8">
        {/* Header */}
        <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center md:mb-8">
          <Link 
            to="/cart" 
            className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 md:text-sm md:gap-2 md:px-4 w-fit"
          >
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">بازگشت به سبد خرید</span>
            <span className="sm:hidden">سبد خرید</span>
          </Link>
          <h1 className="text-lg font-bold md:text-2xl">تکمیل سفارش</h1>
        </div>

        <div className="space-y-6 lg:grid lg:gap-8 lg:grid-cols-3 lg:space-y-0">
          {/* Order Form */}
          <div className="space-y-4 md:space-y-6 lg:col-span-2">
            {/* Delivery Options */}
            <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-xl md:p-6">
              <h2 className="mb-4 text-base font-semibold text-gray-900 md:text-lg md:mb-6">نحوه تحویل سفارش</h2>
              <div className="space-y-3 md:space-y-4">
                {Object.entries(deliveryOptions).map(([key, option]) => (
                  option.enabled && (
                    <label
                      key={key}
                      className={`flex items-start gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md md:gap-4 md:p-4 ${
                        deliveryType === key 
                          ? 'border-red-500 bg-red-50 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        value={key}
                        checked={deliveryType === key}
                        onChange={(e) => setDeliveryType(e.target.value as DeliveryType)}
                        className="mt-1 text-red-600 focus:ring-red-500 md:mt-1.5"
                      />
                      <div className="flex items-start flex-1 gap-3 md:items-center md:gap-4">
                        <div className={`p-2 rounded-xl transition-colors md:p-3 ${
                          deliveryType === key 
                            ? 'bg-red-600 text-white shadow-lg' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {option.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-1 text-sm font-semibold text-gray-900 md:text-base">
                            {option.title}
                          </h3>
                          <p className="mb-2 text-xs text-gray-600 md:text-sm md:mb-3">
                            {option.description}
                          </p>
                          <div className="flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-3 md:text-sm md:gap-4">
                            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit md:gap-1.5 md:px-3">
                              <Clock className="w-3 h-3 md:w-4 md:h-4" />
                              <span className="font-medium">{option.time}</span>
                            </div>
                            <div className={`font-semibold px-2 py-1 rounded-full w-fit md:px-3 ${
                              option.fee === 0 
                                ? 'text-green-700 bg-green-100' 
                                : 'text-orange-700 bg-orange-100'
                            }`}>
                              {option.fee === 0 ? 'رایگان' : `${option.fee.toLocaleString('fa-IR')} تومان`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </label>
                  )
                ))}
              </div>
            </div>

            {/* Address Selection for Delivery */}
            {deliveryType === 'delivery' && (
              <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-xl md:p-6">
                <h2 className="mb-4 text-base font-semibold text-gray-900 md:text-lg md:mb-6">انتخاب آدرس تحویل</h2>
                
                {/* Delivery Error */}
                {deliveryError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-red-800 mb-1">خارج از محدوده ارسال</h4>
                        <p className="text-xs text-red-700">{deliveryError}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedLocation ? (
                  <div className="space-y-3 md:space-y-4">
                    <div className={`p-3 border rounded-xl md:p-4 ${
                      deliveryError ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'
                    }`}>
                      <div className="flex items-start gap-2 md:gap-3">
                        <MapPin className={`w-4 h-4 mt-0.5 flex-shrink-0 md:w-5 md:h-5 ${
                          deliveryError ? 'text-red-600' : 'text-green-600'
                        }`} />
                        <div className="flex-1">
                          <h3 className={`mb-1 text-sm font-medium md:text-base ${
                            deliveryError ? 'text-red-800' : 'text-green-800'
                          }`}>آدرس انتخاب شده</h3>
                          <p className={`text-xs leading-relaxed md:text-sm ${
                            deliveryError ? 'text-red-700' : 'text-green-700'
                          }`}>{selectedLocation.address}</p>
                          <p className={`mt-1.5 text-[10px] md:mt-2 md:text-xs ${
                            deliveryError ? 'text-red-600' : 'text-green-600'
                          }`}>
                            📍 مختصات: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                          </p>
                          {selectedLocation && (
                            <p className={`mt-1 text-[10px] md:text-xs ${
                              deliveryError ? 'text-red-600' : 'text-green-600'
                            }`}>
                              🚚 فاصله: {calculateDistance(
                                restaurantLocation.lat,
                                restaurantLocation.lng,
                                selectedLocation.lat,
                                selectedLocation.lng
                              ).toFixed(1)} کیلومتر
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                      <button
                        type="button"
                        onClick={() => setShowMapModal(true)}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors md:text-sm md:gap-2 md:px-4 md:py-2.5"
                      >
                        <Map className="w-3 h-3 md:w-4 md:h-4" />
                        تغییر آدرس
                      </button>
                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        disabled={isLoadingLocation}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 md:text-sm md:gap-2 md:px-4 md:py-2.5"
                      >
                        <Navigation className="w-3 h-3 md:w-4 md:h-4" />
                        {isLoadingLocation ? 'در حال تشخیص...' : 'موقعیت فعلی'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 text-center md:py-8">
                    <div className="mb-3 md:mb-4">
                      <MapPin className="w-12 h-12 mx-auto text-gray-300 md:w-16 md:h-16" />
                    </div>
                    <h3 className="mb-2 text-base font-medium text-gray-900 md:text-lg">آدرس تحویل را انتخاب کنید</h3>
                    <p className="mb-4 text-xs text-gray-600 md:text-sm md:mb-6">برای ادامه، آدرس تحویل سفارش را مشخص کنید</p>
                    
                    <div className="flex flex-col justify-center gap-2 sm:flex-row sm:gap-3">
                      <button
                        type="button"
                        onClick={() => setShowMapModal(true)}
                        className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs text-white transition-colors bg-red-600 rounded-lg shadow-md hover:bg-red-700 md:text-sm md:gap-2 md:px-6 md:py-3"
                      >
                        <Map className="w-4 h-4 md:w-5 md:h-5" />
                        انتخاب از نقشه
                      </button>
                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        disabled={isLoadingLocation}
                        className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs text-blue-600 transition-colors border border-blue-200 rounded-lg bg-blue-50 hover:bg-blue-100 disabled:opacity-50 md:text-sm md:gap-2 md:px-6 md:py-3"
                      >
                        <Navigation className="w-4 h-4 md:w-5 md:h-5" />
                        {isLoadingLocation ? 'در حال تشخیص...' : 'موقعیت فعلی من'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Notes Section */}
            <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-xl md:p-6">
              <h2 className="mb-3 text-base font-semibold text-gray-900 md:text-lg md:mb-4">توضیحات اضافی</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 text-sm transition-colors border border-gray-300 resize-none rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent md:text-base md:p-4"
                rows={3}
                placeholder="توضیحات اضافی برای سفارش (اختیاری)..."
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4 md:space-y-6">
            <div className="sticky p-4 bg-white border border-gray-100 shadow-sm rounded-xl top-4 md:p-6">
              <h3 className="mb-4 text-base font-semibold text-gray-900 md:text-lg md:mb-6">خلاصه سفارش</h3>
              
              <div className="mb-4 space-y-2 md:mb-6 md:space-y-4">
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-600">قیمت محصولات:</span>
                  <span className="font-medium">{totalPrice.toLocaleString('fa-IR')} تومان</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-600">هزینه {selectedOption.title}:</span>
                  <span className="font-medium">
                    {selectedOption.fee === 0 ? 'رایگان' : `${selectedOption.fee.toLocaleString('fa-IR')} تومان`}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-200 md:pt-4">
                  <div className="flex justify-between text-base font-bold md:text-lg">
                    <span>مجموع نهایی:</span>
                    <span className="text-red-600">{finalTotal.toLocaleString('fa-IR')} تومان</span>
                  </div>
                </div>
              </div>

              {/* Selected Delivery Info */}
              <div className="flex items-center gap-2 p-3 mb-4 text-blue-700 border border-blue-200 bg-blue-50 rounded-xl md:gap-3 md:p-4 md:mb-6">
                {selectedOption.icon}
                <div>
                  <div className="text-xs font-semibold md:text-sm">{selectedOption.title}</div>
                  <div className="text-[10px] md:text-xs">زمان تحویل: {selectedOption.time}</div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-4 md:mb-6">
                <h4 className="mb-2 text-xs font-medium text-gray-700 md:text-sm md:mb-3">روش پرداخت</h4>
                <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl bg-gray-50 md:gap-3 md:p-4">
                  <CreditCard className="w-4 h-4 text-gray-600 md:w-5 md:h-5" />
                  <span className="text-xs font-medium md:text-sm">پرداخت آنلاین</span>
                </div>
              </div>

              <button
                onClick={handleSubmitOrder}
                disabled={deliveryType === 'delivery' && (!selectedLocation || deliveryError)}
                className="w-full py-3 text-sm font-semibold text-white transition-colors bg-red-600 shadow-md rounded-xl hover:bg-red-700 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed md:py-4 md:text-lg"
              >
                ثبت نهایی سفارش
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Map Modal */}
      {showMapModal && (
        <MapModal
          onClose={() => setShowMapModal(false)}
          onLocationSelect={(location) => {
            setSelectedLocation(location);
            setShowMapModal(false);
          }}
          restaurantLocation={restaurantLocation}
          deliveryRadius={deliverySettings.deliveryRadius}
        />
      )}
    </>
  );
}

// Map Modal Component
function MapModal({ 
  onClose, 
  onLocationSelect,
  restaurantLocation,
  deliveryRadius
}: { 
  onClose: () => void;
  onLocationSelect: (location: LocationData) => void;
  restaurantLocation: { lat: number; lng: number };
  deliveryRadius: number;
}) {
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  // Component to handle map clicks
  function LocationMarker() {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setSelectedPosition([lat, lng]);
        setIsLoadingAddress(true);
        
        try {
          // Reverse geocoding using Nominatim
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=fa`
          );
          const data = await response.json();
          const address = data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
          setSelectedAddress(address);
        } catch (error) {
          console.error('Error getting address:', error);
          setSelectedAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        }
        
        setIsLoadingAddress(false);
      },
    });

    return selectedPosition ? (
      <Marker position={selectedPosition} />
    ) : null;
  }

  const handleConfirmLocation = () => {
    if (selectedPosition && selectedAddress) {
      onLocationSelect({
        lat: selectedPosition[0],
        lng: selectedPosition[1],
        address: selectedAddress
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/50 md:p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh] md:max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 flex-shrink-0 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900 md:text-xl">انتخاب آدرس از نقشه</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 transition-colors rounded-lg hover:bg-gray-200 md:p-2"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
        
        {/* Instructions */}
        <div className="p-3 bg-blue-50 border-b border-blue-200 flex-shrink-0 md:p-4">
          <p className="text-xs text-blue-700 text-center md:text-sm">
            روی نقشه کلیک کنید تا آدرس مورد نظر را انتخاب کنید. محدوده ارسال: {deliveryRadius} کیلومتر
          </p>
        </div>
        
        {/* Map Container */}
        <div className="flex-1 relative min-h-[300px] md:min-h-[400px]">
          <MapContainer
            center={[restaurantLocation.lat, restaurantLocation.lng]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Restaurant Marker */}
            <Marker position={[restaurantLocation.lat, restaurantLocation.lng]} />
            <LocationMarker />
          </MapContainer>
        </div>
        
        {/* Footer with Address and Buttons */}
        <div className="p-3 bg-white border-t border-gray-200 flex-shrink-0 md:p-6">
          {/* Selected Address Display */}
          {selectedAddress && (
            <div className="p-3 mb-3 border border-green-200 bg-green-50 rounded-xl md:p-4 md:mb-4">
              <div className="flex items-start gap-2 md:gap-3">
                <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0 md:w-5 md:h-5" />
                <div className="flex-1">
                  <p className="mb-1 text-xs font-medium text-green-800 md:text-sm">آدرس انتخاب شده:</p>
                  <p className="text-xs leading-relaxed text-green-700 md:text-sm">{selectedAddress}</p>
                  {selectedPosition && (
                    <p className="mt-1.5 text-[10px] text-green-600 md:mt-2 md:text-xs">
                      📍 مختصات: {selectedPosition[0].toFixed(6)}, {selectedPosition[1].toFixed(6)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Loading State */}
          {isLoadingAddress && (
            <div className="p-3 mb-3 border border-blue-200 bg-blue-50 rounded-xl md:p-4 md:mb-4">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-4 h-4 border-b-2 border-blue-600 rounded-full animate-spin md:w-5 md:h-5"></div>
                <p className="text-xs text-blue-700 md:text-sm">در حال تشخیص آدرس...</p>
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <button
              onClick={handleConfirmLocation}
              disabled={!selectedPosition || isLoadingAddress}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white transition-colors bg-red-600 rounded-xl hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed md:px-6 md:py-3 md:text-base"
            >
              {selectedPosition ? 'تأیید آدرس' : 'ابتدا روی نقشه کلیک کنید'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200 md:px-6 md:py-3 md:text-base"
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}