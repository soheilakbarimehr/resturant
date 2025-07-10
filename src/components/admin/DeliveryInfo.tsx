import { useState } from 'react';
import { DollarSign, Clock, CreditCard, MapPin, Plus, Trash2, Save, AlertTriangle } from 'lucide-react';

interface DeliveryZone {
  id: string;
  name: string;
  minDistance: number;
  maxDistance: number;
  fee: number;
}

export default function DeliveryInfo() {
  const [deliveryInfo, setDeliveryInfo] = useState({
    deliveryRadius: 10,
    freeDeliveryThreshold: 100000,
    deliveryTimes: {
      restaurant: '15-20',
      takeaway: '10-15',
      delivery: '30-45'
    },
    paymentMethods: {
      online: true,
      cash: true,
      card: false
    },
    deliveryMethods: {
      restaurant: true,
      takeaway: true,
      delivery: true
    }
  });

  const [deliveryZones, setDeliveryZones] = useState<DeliveryZone[]>([
    { id: '1', name: 'منطقه نزدیک', minDistance: 0, maxDistance: 1, fee: 10000 },
    { id: '2', name: 'منطقه متوسط', minDistance: 1, maxDistance: 3, fee: 15000 },
    { id: '3', name: 'منطقه دور', minDistance: 3, maxDistance: 5, fee: 25000 },
  ]);

  const [newZone, setNewZone] = useState({
    name: '',
    minDistance: 0,
    maxDistance: 0,
    fee: 0
  });

  const handleSave = () => {
    // Save to localStorage for demo
    localStorage.setItem('deliveryInfo', JSON.stringify(deliveryInfo));
    localStorage.setItem('deliveryZones', JSON.stringify(deliveryZones));
    alert('اطلاعات ارسال با موفقیت ذخیره شد');
  };

  const addDeliveryZone = () => {
    if (newZone.name && newZone.maxDistance > newZone.minDistance) {
      const zone: DeliveryZone = {
        id: Date.now().toString(),
        ...newZone
      };
      setDeliveryZones([...deliveryZones, zone]);
      setNewZone({ name: '', minDistance: 0, maxDistance: 0, fee: 0 });
    }
  };

  const removeDeliveryZone = (id: string) => {
    setDeliveryZones(deliveryZones.filter(zone => zone.id !== id));
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {/* Delivery Settings */}
        <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
          <h3 className="flex items-center gap-2 mb-4 text-base font-semibold md:text-lg md:mb-6">
            <MapPin className="w-5 h-5 text-red-600 md:w-6 md:h-6" />
            تنظیمات محدوده
          </h3>
          <div className="space-y-3 md:space-y-4">
            <div>
              <label className="block mb-1.5 text-xs font-medium text-gray-700 md:text-sm md:mb-2">
                حداکثر شعاع ارسال (کیلومتر)
              </label>
              <input
                type="number"
                value={deliveryInfo.deliveryRadius}
                onChange={(e) => setDeliveryInfo({...deliveryInfo, deliveryRadius: parseInt(e.target.value)})}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent md:text-base md:px-4 md:py-3"
              />
              <p className="mt-1 text-xs text-gray-500">
                سفارشات خارج از این محدوده رد می‌شوند
              </p>
            </div>
            <div>
              <label className="block mb-1.5 text-xs font-medium text-gray-700 md:text-sm md:mb-2">
                حد آزاد ارسال (تومان)
              </label>
              <input
                type="number"
                value={deliveryInfo.freeDeliveryThreshold}
                onChange={(e) => setDeliveryInfo({...deliveryInfo, freeDeliveryThreshold: parseInt(e.target.value)})}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent md:text-base md:px-4 md:py-3"
              />
            </div>
          </div>
        </div>

        {/* Delivery Times */}
        <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
          <h3 className="flex items-center gap-2 mb-4 text-base font-semibold md:text-lg md:mb-6">
            <Clock className="w-5 h-5 text-red-600 md:w-6 md:h-6" />
            زمان‌های تحویل
          </h3>
          <div className="space-y-3 md:space-y-4">
            <div>
              <label className="block mb-1.5 text-xs font-medium text-gray-700 md:text-sm md:mb-2">تحویل در رستوران (دقیقه)</label>
              <input
                type="text"
                value={deliveryInfo.deliveryTimes.restaurant}
                onChange={(e) => setDeliveryInfo({
                  ...deliveryInfo,
                  deliveryTimes: { ...deliveryInfo.deliveryTimes, restaurant: e.target.value }
                })}
                placeholder="15-20"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent md:text-base md:px-4 md:py-3"
              />
            </div>
            <div>
              <label className="block mb-1.5 text-xs font-medium text-gray-700 md:text-sm md:mb-2">بیرون بر (دقیقه)</label>
              <input
                type="text"
                value={deliveryInfo.deliveryTimes.takeaway}
                onChange={(e) => setDeliveryInfo({
                  ...deliveryInfo,
                  deliveryTimes: { ...deliveryInfo.deliveryTimes, takeaway: e.target.value }
                })}
                placeholder="10-15"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent md:text-base md:px-4 md:py-3"
              />
            </div>
            <div>
              <label className="block mb-1.5 text-xs font-medium text-gray-700 md:text-sm md:mb-2">ارسال با پیک (دقیقه)</label>
              <input
                type="text"
                value={deliveryInfo.deliveryTimes.delivery}
                onChange={(e) => setDeliveryInfo({
                  ...deliveryInfo,
                  deliveryTimes: { ...deliveryInfo.deliveryTimes, delivery: e.target.value }
                })}
                placeholder="30-45"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent md:text-base md:px-4 md:py-3"
              />
            </div>
          </div>
        </div>

        {/* Delivery Methods */}
        <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
          <h3 className="flex items-center gap-2 mb-4 text-base font-semibold md:text-lg md:mb-6">
            <DollarSign className="w-5 h-5 text-red-600 md:w-6 md:h-6" />
            شیوه‌های تحویل
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 md:p-4">
              <input
                type="checkbox"
                checked={deliveryInfo.deliveryMethods.restaurant}
                onChange={(e) => setDeliveryInfo({
                  ...deliveryInfo,
                  deliveryMethods: { ...deliveryInfo.deliveryMethods, restaurant: e.target.checked }
                })}
                className="text-red-600 focus:ring-red-500"
              />
              <span className="text-xs md:text-sm">تحویل در رستوران</span>
            </label>
            <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 md:p-4">
              <input
                type="checkbox"
                checked={deliveryInfo.deliveryMethods.takeaway}
                onChange={(e) => setDeliveryInfo({
                  ...deliveryInfo,
                  deliveryMethods: { ...deliveryInfo.deliveryMethods, takeaway: e.target.checked }
                })}
                className="text-red-600 focus:ring-red-500"
              />
              <span className="text-xs md:text-sm">بیرون بر</span>
            </label>
            <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 md:p-4">
              <input
                type="checkbox"
                checked={deliveryInfo.deliveryMethods.delivery}
                onChange={(e) => setDeliveryInfo({
                  ...deliveryInfo,
                  deliveryMethods: { ...deliveryInfo.deliveryMethods, delivery: e.target.checked }
                })}
                className="text-red-600 focus:ring-red-500"
              />
              <span className="text-xs md:text-sm">ارسال با پیک</span>
            </label>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
          <h3 className="flex items-center gap-2 mb-4 text-base font-semibold md:text-lg md:mb-6">
            <CreditCard className="w-5 h-5 text-red-600 md:w-6 md:h-6" />
            روش‌های پرداخت
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 md:p-4">
              <input
                type="checkbox"
                checked={deliveryInfo.paymentMethods.online}
                onChange={(e) => setDeliveryInfo({
                  ...deliveryInfo,
                  paymentMethods: { ...deliveryInfo.paymentMethods, online: e.target.checked }
                })}
                className="text-red-600 focus:ring-red-500"
              />
              <span className="text-xs md:text-sm">پرداخت آنلاین</span>
            </label>
            <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 md:p-4">
              <input
                type="checkbox"
                checked={deliveryInfo.paymentMethods.cash}
                onChange={(e) => setDeliveryInfo({
                  ...deliveryInfo,
                  paymentMethods: { ...deliveryInfo.paymentMethods, cash: e.target.checked }
                })}
                className="text-red-600 focus:ring-red-500"
              />
              <span className="text-xs md:text-sm">پرداخت نقدی</span>
            </label>
            <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 md:p-4">
              <input
                type="checkbox"
                checked={deliveryInfo.paymentMethods.card}
                onChange={(e) => setDeliveryInfo({
                  ...deliveryInfo,
                  paymentMethods: { ...deliveryInfo.paymentMethods, card: e.target.checked }
                })}
                className="text-red-600 focus:ring-red-500"
              />
              <span className="text-xs md:text-sm">کارت خوان</span>
            </label>
          </div>
        </div>
      </div>

      {/* Delivery Zones */}
      <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
        <h3 className="flex items-center gap-2 mb-4 text-base font-semibold md:text-lg md:mb-6">
          <MapPin className="w-5 h-5 text-red-600 md:w-6 md:h-6" />
          مناطق تحویل و تعرفه
        </h3>
        
        {/* Current Zones */}
        <div className="space-y-3 mb-6">
          {deliveryZones.map((zone) => (
            <div key={zone.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{zone.name}</h4>
                <p className="text-sm text-gray-600">
                  از {zone.minDistance} تا {zone.maxDistance} کیلومتر - {zone.fee.toLocaleString('fa-IR')} تومان
                </p>
              </div>
              <button
                onClick={() => removeDeliveryZone(zone.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add New Zone */}
        <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">افزودن منطقه جدید</h4>
          <div className="grid gap-3 md:grid-cols-4">
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">نام منطقه</label>
              <input
                type="text"
                value={newZone.name}
                onChange={(e) => setNewZone({...newZone, name: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="نام منطقه"
              />
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">از (کیلومتر)</label>
              <input
                type="number"
                step="0.1"
                value={newZone.minDistance}
                onChange={(e) => setNewZone({...newZone, minDistance: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">تا (کیلومتر)</label>
              <input
                type="number"
                step="0.1"
                value={newZone.maxDistance}
                onChange={(e) => setNewZone({...newZone, maxDistance: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">تعرفه (تومان)</label>
              <input
                type="number"
                value={newZone.fee}
                onChange={(e) => setNewZone({...newZone, fee: parseInt(e.target.value)})}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
          <button
            onClick={addDeliveryZone}
            className="flex items-center gap-2 px-4 py-2 mt-3 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            افزودن منطقه
          </button>
        </div>

        {/* Warning */}
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mt-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-yellow-800 font-medium mb-1">نکته مهم</p>
              <p className="text-xs text-yellow-700">
                مناطق نباید با هم تداخل داشته باشند. هر فاصله باید دقیقاً در یک منطقه قرار گیرد.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700 md:px-6 md:py-3 md:text-base"
        >
          <Save className="w-4 h-4" />
          ذخیره تغییرات
        </button>
      </div>
    </div>
  );
}