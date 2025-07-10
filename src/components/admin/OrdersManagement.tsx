import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Truck, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Package,
  MapPin,
  Phone,
  Calendar,
  DollarSign,
  User,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Printer,
  Check,
  X
} from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  deliveryType: 'restaurant' | 'takeaway' | 'delivery';
  deliveryAddress?: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled';
  paymentMethod: 'online' | 'cash' | 'card';
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderDate: string;
  estimatedDelivery: string;
  notes?: string;
  isOnline: boolean;
}

const mockOnlineOrders: Order[] = [
  {
    id: '1',
    orderNumber: '#1001',
    customer: {
      name: 'علی احمدی',
      phone: '۰۹۱۲۳۴۵۶۷۸۹',
      email: 'ali@example.com'
    },
    items: [
      { name: 'چیز برگر دوبل', quantity: 2, price: 185000 },
      { name: 'پیتزا پپرونی', quantity: 1, price: 125000 }
    ],
    totalAmount: 495000,
    deliveryType: 'delivery',
    deliveryAddress: 'تهران، خیابان آزادی، پلاک ۱۲۳',
    status: 'pending',
    paymentMethod: 'online',
    paymentStatus: 'paid',
    orderDate: '۱۴۰۲/۱۲/۱۵ - ۱۴:۳۰',
    estimatedDelivery: '۱۵:۱۵',
    notes: 'لطفاً تند نباشد',
    isOnline: true
  },
  {
    id: '2',
    orderNumber: '#1002',
    customer: {
      name: 'مریم کریمی',
      phone: '۰۹۸۷۶۵۴۳۲۱',
      email: 'maryam@example.com'
    },
    items: [
      { name: 'برگر مرغ', quantity: 1, price: 120000 },
      { name: 'چای سرد', quantity: 2, price: 30000 }
    ],
    totalAmount: 180000,
    deliveryType: 'takeaway',
    status: 'pending',
    paymentMethod: 'cash',
    paymentStatus: 'pending',
    orderDate: '۱۴۰۲/۱۲/۱۵ - ۱۴:۴۵',
    estimatedDelivery: '۱۵:۰۰',
    isOnline: true
  }
];

const mockDailyOrders: Order[] = [
  {
    id: '3',
    orderNumber: '#1003',
    customer: {
      name: 'حسن رضایی',
      phone: '۰۹۳۳۳۳۳۳۳۳',
      email: 'hassan@example.com'
    },
    items: [
      { name: 'پیتزا مارگریتا', quantity: 1, price: 145000 },
      { name: 'آبمیوه طبیعی', quantity: 1, price: 32000 }
    ],
    totalAmount: 177000,
    deliveryType: 'restaurant',
    status: 'delivered',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    orderDate: '۱۴۰۲/۱۲/۱۵ - ۱۳:۲۰',
    estimatedDelivery: '۱۳:۴۰',
    isOnline: false
  },
  {
    id: '4',
    orderNumber: '#1004',
    customer: {
      name: 'فاطمه محمدی',
      phone: '۰۹۱۱۱۱۱۱۱۱',
      email: 'fateme@example.com'
    },
    items: [
      { name: 'قورمه سبزی', quantity: 1, price: 98000 },
      { name: 'هات داگ کلاسیک', quantity: 2, price: 65000 }
    ],
    totalAmount: 228000,
    deliveryType: 'delivery',
    deliveryAddress: 'تهران، خیابان ولیعصر، پلاک ۴۵۶',
    status: 'delivered',
    paymentMethod: 'online',
    paymentStatus: 'paid',
    orderDate: '۱۴۰۲/۱۲/۱۵ - ۱۵:۱۰',
    estimatedDelivery: '۱۶:۰۰',
    isOnline: false
  },
  {
    id: '5',
    orderNumber: '#1005',
    customer: {
      name: 'محمد صادقی',
      phone: '۰۹۵۵۵۵۵۵۵۵',
      email: 'mohammad@example.com'
    },
    items: [
      { name: 'برگر گیاهی', quantity: 1, price: 140000 }
    ],
    totalAmount: 140000,
    deliveryType: 'takeaway',
    status: 'cancelled',
    paymentMethod: 'online',
    paymentStatus: 'failed',
    orderDate: '۱۴۰۲/۱۲/۱۵ - ۱۲:۳۰',
    estimatedDelivery: '۱۲:۴۵',
    isOnline: false
  }
];

const statusOptions = [
  { value: 'all', label: 'همه وضعیت‌ها', color: 'bg-gray-100 text-gray-800' },
  { value: 'pending', label: 'در انتظار تأیید', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'confirmed', label: 'تأیید شده', color: 'bg-blue-100 text-blue-800' },
  { value: 'preparing', label: 'در حال آماده‌سازی', color: 'bg-orange-100 text-orange-800' },
  { value: 'ready', label: 'آماده تحویل', color: 'bg-purple-100 text-purple-800' },
  { value: 'delivering', label: 'در حال ارسال', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'delivered', label: 'تحویل شده', color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'لغو شده', color: 'bg-red-100 text-red-800' }
];

const deliveryTypeOptions = [
  { value: 'all', label: 'همه انواع' },
  { value: 'restaurant', label: 'تحویل در رستوران' },
  { value: 'takeaway', label: 'بیرون بر' },
  { value: 'delivery', label: 'ارسال با پیک' }
];

export default function OrdersManagement() {
  const [activeTab, setActiveTab] = useState<'online' | 'daily'>('online');
  const [onlineOrders, setOnlineOrders] = useState<Order[]>(mockOnlineOrders);
  const [dailyOrders, setDailyOrders] = useState<Order[]>(mockDailyOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deliveryTypeFilter, setDeliveryTypeFilter] = useState('all');
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  const currentOrders = activeTab === 'online' ? onlineOrders : dailyOrders;

  const filteredOrders = currentOrders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesDeliveryType = deliveryTypeFilter === 'all' || order.deliveryType === deliveryTypeFilter;
    return matchesSearch && matchesStatus && matchesDeliveryType;
  });

  const getStatusInfo = (status: string) => {
    return statusOptions.find(option => option.value === status) || statusOptions[0];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'preparing': return <Package className="w-4 h-4" />;
      case 'ready': return <AlertCircle className="w-4 h-4" />;
      case 'delivering': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleConfirmOrder = (orderId: string) => {
    if (activeTab === 'online') {
      setOnlineOrders(onlineOrders.filter(order => order.id !== orderId));
      alert('سفارش تأیید شد و از لیست سفارشات آنلاین حذف شد');
    }
  };

  const handlePrintOrder = (orderId: string) => {
    const order = currentOrders.find(o => o.id === orderId);
    if (!order) return;

    const printContent = `
      <html>
        <head>
          <title>سفارش ${order.orderNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; direction: rtl; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
            .order-info { margin-bottom: 20px; }
            .items { margin: 20px 0; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
            th { background-color: #f2f2f2; }
            .total { font-size: 18px; font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>رستوران ایرانی</h1>
            <h2>سفارش ${order.orderNumber}</h2>
            <p>تاریخ چاپ: ${new Date().toLocaleDateString('fa-IR')}</p>
          </div>
          
          <div class="order-info">
            <p><strong>مشتری:</strong> ${order.customer.name}</p>
            <p><strong>تلفن:</strong> ${order.customer.phone}</p>
            <p><strong>نوع تحویل:</strong> ${getDeliveryTypeLabel(order.deliveryType)}</p>
            ${order.deliveryAddress ? `<p><strong>آدرس:</strong> ${order.deliveryAddress}</p>` : ''}
            <p><strong>تاریخ سفارش:</strong> ${order.orderDate}</p>
            ${order.notes ? `<p><strong>توضیحات:</strong> ${order.notes}</p>` : ''}
          </div>
          
          <table>
            <thead>
              <tr>
                <th>محصول</th>
                <th>تعداد</th>
                <th>قیمت واحد</th>
                <th>قیمت کل</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>${item.price.toLocaleString('fa-IR')} تومان</td>
                  <td>${(item.price * item.quantity).toLocaleString('fa-IR')} تومان</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="total">
            <p>مجموع کل: ${order.totalAmount.toLocaleString('fa-IR')} تومان</p>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }

    if (activeTab === 'online') {
      setOnlineOrders(onlineOrders.filter(o => o.id !== orderId));
      alert('سفارش چاپ شد و از لیست سفارشات آنلاین حذف شد');
    }
  };

  const toggleOrderExpansion = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const getDeliveryTypeLabel = (type: string) => {
    switch (type) {
      case 'restaurant': return 'تحویل در رستوران';
      case 'takeaway': return 'بیرون بر';
      case 'delivery': return 'ارسال با پیک';
      default: return type;
    }
  };

  const getDeliveryTypeIcon = (type: string) => {
    switch (type) {
      case 'restaurant': return <MapPin className="w-4 h-4" />;
      case 'takeaway': return <Package className="w-4 h-4" />;
      case 'delivery': return <Truck className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مدیریت سفارشات</h1>
          <p className="text-gray-600">مدیریت و پیگیری سفارشات مشتریان</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <RefreshCw className="w-5 h-5" />
            بروزرسانی
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('online')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'online'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              سفارشات آنلاین ({onlineOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('daily')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'daily'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              سفارشات روزانه ({dailyOrders.length})
            </button>
          </nav>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-3 top-1/2" />
              <input
                type="text"
                placeholder="جستجو در سفارشات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {statusOptions.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>
            <select
              value={deliveryTypeFilter}
              onChange={(e) => setDeliveryTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {deliveryTypeOptions.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="divide-y divide-gray-100">
          {filteredOrders.length === 0 ? (
            <div className="p-8 text-center">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">سفارشی یافت نشد</h3>
              <p className="text-gray-600">هیچ سفارشی با فیلترهای انتخاب شده وجود ندارد</p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              const isExpanded = expandedOrders.has(order.id);
              
              return (
                <div key={order.id} className="p-4 md:p-6">
                  {/* Order Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          {getDeliveryTypeIcon(order.deliveryType)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h4>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}>
                            {getStatusIcon(order.status)}
                            {statusInfo.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {order.customer.name}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {order.customer.phone}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {order.orderDate}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <div className="flex items-center gap-1 text-blue-600">
                            {getDeliveryTypeIcon(order.deliveryType)}
                            {getDeliveryTypeLabel(order.deliveryType)}
                          </div>
                          <div className="flex items-center gap-1 text-green-600">
                            <DollarSign className="w-4 h-4" />
                            {order.totalAmount.toLocaleString('fa-IR')} تومان
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleOrderExpansion(order.id)}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                      {activeTab === 'online' && (
                        <>
                          <button
                            onClick={() => handleConfirmOrder(order.id)}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <Check className="w-4 h-4" />
                            تأیید
                          </button>
                          <button
                            onClick={() => handlePrintOrder(order.id)}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            <Printer className="w-4 h-4" />
                            چاپ
                          </button>
                        </>
                      )}
                      {activeTab === 'daily' && (
                        <button
                          onClick={() => handlePrintOrder(order.id)}
                          className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <Printer className="w-4 h-4" />
                          چاپ
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
                      {/* Order Items */}
                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">آیتم‌های سفارش:</h5>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-white rounded border">
                              <div>
                                <span className="font-medium">{item.name}</span>
                                <span className="text-gray-500 mr-2">× {item.quantity}</span>
                              </div>
                              <span className="font-medium">{(item.price * item.quantity).toLocaleString('fa-IR')} تومان</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Delivery Address */}
                      {order.deliveryAddress && (
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">آدرس تحویل:</h5>
                          <div className="flex items-start gap-2 p-3 bg-white rounded border">
                            <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{order.deliveryAddress}</span>
                          </div>
                        </div>
                      )}

                      {/* Notes */}
                      {order.notes && (
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">توضیحات:</h5>
                          <div className="p-3 bg-white rounded border">
                            <span className="text-gray-700">{order.notes}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}