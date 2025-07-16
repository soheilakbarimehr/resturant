import { useState, useEffect } from 'react';
import { 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Phone, 
  User, 
  DollarSign,
  Navigation,
  Truck,
  Star,
  Calendar,
  BarChart3,
  RefreshCw,
  LogOut,
  X,
  Send,
  TrendingUp,
  Activity,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface DeliveryOrder {
  id: string;
  orderNumber: string;
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
  };
  items: {
    name: string;
    quantity: number;
  }[];
  totalAmount: number;
  status: 'assigned' | 'picked_up' | 'delivered';
  assignedAt: string;
  estimatedDelivery: string;
  deliveryCode: string;
  distance: string;
  notes?: string;
}

interface DeliveryStats {
  daily: {
    totalDeliveries: number;
    totalEarnings: number;
    totalDeliveryFees: number;
    totalOrderAmount: number;
  };
  weekly: {
    totalDeliveries: number;
    totalEarnings: number;
    totalDeliveryFees: number;
    totalOrderAmount: number;
  };
  monthly: {
    totalDeliveries: number;
    totalEarnings: number;
    totalDeliveryFees: number;
    totalOrderAmount: number;
  };
}

const mockOrders: DeliveryOrder[] = [
  {
    id: '1',
    orderNumber: '#1001',
    customer: {
      firstName: 'علی',
      lastName: 'احمدی',
      phone: '۰۹۱۲۳۴۵۶۷۸۹',
      address: 'تهران، خیابان آزادی، پلاک ۱۲۳'
    },
    items: [
      { name: 'چیز برگر دوبل', quantity: 2 },
      { name: 'پیتزا پپرونی', quantity: 1 }
    ],
    totalAmount: 495000,
    status: 'assigned',
    assignedAt: '۱۴۰۲/۱۲/۱۵ - ۱۴:۳۰',
    estimatedDelivery: '۱۵:۱۵',
    deliveryCode: '1234',
    distance: '۲.۵ کیلومتر',
    notes: 'لطفاً تند نباشد'
  },
  {
    id: '2',
    orderNumber: '#1004',
    customer: {
      firstName: 'فاطمه',
      lastName: 'محمدی',
      phone: '۰۹۱۱۱۱۱۱۱۱',
      address: 'تهران، خیابان ولیعصر، پلاک ۴۵۶'
    },
    items: [
      { name: 'قورمه سبزی', quantity: 1 },
      { name: 'هات داگ کلاسیک', quantity: 2 }
    ],
    totalAmount: 228000,
    status: 'picked_up',
    assignedAt: '۱۴۰۲/۱۲/۱۵ - ۱۵:۱۰',
    estimatedDelivery: '۱۶:۰۰',
    deliveryCode: '5678',
    distance: '۱.۸ کیلومتر'
  }
];

const mockStats: DeliveryStats = {
  daily: {
    totalDeliveries: 12,
    totalEarnings: 180000, // 15000 * 12
    totalDeliveryFees: 180000,
    totalOrderAmount: 2400000
  },
  weekly: {
    totalDeliveries: 85,
    totalEarnings: 1275000, // 15000 * 85
    totalDeliveryFees: 1275000,
    totalOrderAmount: 17000000
  },
  monthly: {
    totalDeliveries: 340,
    totalEarnings: 5100000, // 15000 * 340
    totalDeliveryFees: 5100000,
    totalOrderAmount: 68000000
  }
};

export default function DeliveryPanel() {
  const [activeTab, setActiveTab] = useState<'orders' | 'stats'>('orders');
  const [orders, setOrders] = useState<DeliveryOrder[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<DeliveryOrder | null>(null);
  const [deliveryCode, setDeliveryCode] = useState('');
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [statsPeriod, setStatsPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const deliveryStats = {
    totalOrders: orders.length,
    assigned: orders.filter(o => o.status === 'assigned').length,
    pickedUp: orders.filter(o => o.status === 'picked_up').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    totalEarnings: orders.reduce((sum, order) => sum + (order.status === 'delivered' ? 15000 : 0), 0),
    totalDeliveryFees: orders.reduce((sum, order) => sum + (order.status === 'delivered' ? 15000 : 0), 0),
    totalOrderAmount: orders.reduce((sum, order) => sum + (order.status === 'delivered' ? order.totalAmount : 0), 0)
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'assigned':
        return { label: 'تخصیص داده شده', color: 'bg-yellow-100 text-yellow-800', icon: <AlertCircle className="w-4 h-4" /> };
      case 'picked_up':
        return { label: 'برداشته شده', color: 'bg-blue-100 text-blue-800', icon: <Package className="w-4 h-4" /> };
      case 'delivered':
        return { label: 'تحویل شده', color: 'bg-green-100 text-green-800', icon: <CheckCircle className="w-4 h-4" /> };
      default:
        return { label: status, color: 'bg-gray-100 text-gray-800', icon: <AlertCircle className="w-4 h-4" /> };
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: DeliveryOrder['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handlePickUp = (orderId: string) => {
    updateOrderStatus(orderId, 'picked_up');
  };

  const handleDeliveryComplete = (order: DeliveryOrder) => {
    setSelectedOrder(order);
    setShowCodeModal(true);
  };

  const confirmDelivery = () => {
    if (selectedOrder && deliveryCode === selectedOrder.deliveryCode) {
      updateOrderStatus(selectedOrder.id, 'delivered');
      setShowCodeModal(false);
      setDeliveryCode('');
      setSelectedOrder(null);
      alert('سفارش با موفقیت تحویل داده شد!');
    } else {
      alert('کد تحویل اشتباه است!');
    }
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('fa-IR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const currentStats = mockStats[statsPeriod];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Truck className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 md:text-xl">پنل پیک</h1>
                <p className="text-xs text-gray-600 md:text-sm">زمان فعلی: {formatTime(currentTime)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <RefreshCw className="w-4 h-4" />
                <span className="hidden md:inline">بروزرسانی</span>
              </button>
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">خروج</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="container px-4 py-6 mx-auto">
          {/* Tabs */}
          <div className="mb-6">
            <div className="flex bg-white rounded-lg shadow-sm border border-gray-100 p-1">
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Package className="w-4 h-4" />
                سفارشات لایو
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'stats'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                آمار عملکرد
              </button>
            </div>
          </div>

          {activeTab === 'orders' ? (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-5">
                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Package className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">کل سفارشات</p>
                      <p className="text-lg font-bold text-gray-900">{deliveryStats.totalOrders}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">تخصیص داده شده</p>
                      <p className="text-lg font-bold text-yellow-600">{deliveryStats.assigned}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Truck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">در حال ارسال</p>
                      <p className="text-lg font-bold text-blue-600">{deliveryStats.pickedUp}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">تحویل شده</p>
                      <p className="text-lg font-bold text-green-600">{deliveryStats.delivered}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <DollarSign className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">مبلغ کل هزینه ارسال</p>
                      <p className="text-lg font-bold text-purple-600">{deliveryStats.totalDeliveryFees.toLocaleString('fa-IR')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Orders List */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 md:p-6">
                  <h2 className="text-lg font-semibold text-gray-900">سفارشات من</h2>
                </div>
                
                {orders.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="mb-4">
                      <Package className="w-16 h-16 mx-auto text-gray-300" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">هیچ سفارشی یافت نشد</h3>
                    <p className="text-gray-600">در حال حاضر سفارشی برای تحویل وجود ندارد</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {orders.map((order) => {
                      const statusInfo = getStatusInfo(order.status);
                      
                      return (
                        <div key={order.id} className="p-4 md:p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                  <Package className="w-6 h-6 text-orange-600" />
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h3>
                                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}>
                                    {statusInfo.icon}
                                    {statusInfo.label}
                                  </span>
                                </div>
                                <div className="space-y-2 text-sm text-gray-600">
                                  <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span>{order.customer.firstName} {order.customer.lastName}</span>
                                    <Phone className="w-4 h-4 mr-2" />
                                    <span>{order.customer.phone}</span>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <span>{order.customer.address}</span>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                      <Navigation className="w-4 h-4" />
                                      <span>{order.distance}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      <span>تحویل تا {order.estimatedDelivery}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <DollarSign className="w-4 h-4" />
                                      <span>{order.totalAmount.toLocaleString('fa-IR')} تومان</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Order Items */}
                          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">آیتم‌های سفارش:</h4>
                            <div className="space-y-1">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                  <span>{item.name}</span>
                                  <span>× {item.quantity}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Notes */}
                          {order.notes && (
                            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <h4 className="font-medium text-blue-900 mb-1">توضیحات مشتری:</h4>
                              <p className="text-sm text-blue-700">{order.notes}</p>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                            {order.status === 'assigned' && (
                              <button
                                onClick={() => handlePickUp(order.id)}
                                className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                <Package className="w-4 h-4" />
                                برداشتن سفارش
                              </button>
                            )}
                            {order.status === 'picked_up' && (
                              <button
                                onClick={() => handleDeliveryComplete(order)}
                                className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                              >
                                <CheckCircle className="w-4 h-4" />
                                تحویل سفارش
                              </button>
                            )}
                            <button className="flex items-center justify-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                              <Navigation className="w-4 h-4" />
                              مسیریابی
                            </button>
                            <button className="flex items-center justify-center gap-2 px-4 py-2 text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                              <Phone className="w-4 h-4" />
                              تماس با مشتری
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Stats Period Selector */}
              <div className="mb-6">
                <div className="flex bg-white rounded-lg shadow-sm border border-gray-100 p-1 max-w-md">
                  <button
                    onClick={() => setStatsPeriod('daily')}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      statsPeriod === 'daily'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    روزانه
                  </button>
                  <button
                    onClick={() => setStatsPeriod('weekly')}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      statsPeriod === 'weekly'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    هفتگی
                  </button>
                  <button
                    onClick={() => setStatsPeriod('monthly')}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      statsPeriod === 'monthly'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    ماهانه
                  </button>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">تعداد تحویل</p>
                      <p className="text-2xl font-bold text-gray-900">{currentStats.totalDeliveries}</p>
                      <p className="text-xs text-gray-500">
                        {statsPeriod === 'daily' ? 'امروز' : statsPeriod === 'weekly' ? 'این هفته' : 'این ماه'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">مبلغ کل هزینه ارسال</p>
                      <p className="text-2xl font-bold text-gray-900">{currentStats.totalDeliveryFees.toLocaleString('fa-IR')}</p>
                      <p className="text-xs text-gray-500">تومان</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">مبلغ کل سفارشات برده شده</p>
                      <p className="text-2xl font-bold text-gray-900">{currentStats.totalOrderAmount.toLocaleString('fa-IR')}</p>
                      <p className="text-xs text-gray-500">تومان</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <Target className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">میانگین در سفارش</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {currentStats.totalDeliveries > 0 
                          ? Math.round(currentStats.totalOrderAmount / currentStats.totalDeliveries).toLocaleString('fa-IR')
                          : '0'
                        }
                      </p>
                      <p className="text-xs text-gray-500">تومان</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Chart Placeholder */}
              <div className="mt-6 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">نمودار عملکرد</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <Activity className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-gray-500">نمودار عملکرد در نسخه آینده اضافه خواهد شد</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Delivery Code Modal */}
      {showCodeModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">تأیید تحویل سفارش</h3>
              <p className="text-sm text-gray-600 mt-1">سفارش {selectedOrder.orderNumber}</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700 mb-3">
                  <strong>راهنمایی:</strong> کد تحویل را از مشتری دریافت کرده و در زیر وارد کنید.
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  کد تحویل دریافتی از مشتری:
                </label>
                <input
                  type="text"
                  value={deliveryCode}
                  onChange={(e) => setDeliveryCode(e.target.value)}
                  className="w-full px-3 py-2 text-center text-lg font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="کد را وارد کنید"
                  maxLength={4}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowCodeModal(false);
                  setDeliveryCode('');
                  setSelectedOrder(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                انصراف
              </button>
              <button
                onClick={confirmDelivery}
                disabled={!deliveryCode.trim()}
                className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <CheckCircle className="w-4 h-4" />
                تأیید تحویل
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}