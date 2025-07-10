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
  Printer
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
}

const mockOrders: Order[] = [
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
    status: 'preparing',
    paymentMethod: 'online',
    paymentStatus: 'paid',
    orderDate: '۱۴۰۲/۱۲/۱۵ - ۱۴:۳۰',
    estimatedDelivery: '۱۵:۱۵',
    notes: 'لطفاً تند نباشد'
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
    status: 'ready',
    paymentMethod: 'cash',
    paymentStatus: 'pending',
    orderDate: '۱۴۰۲/۱۲/۱۵ - ۱۴:۴۵',
    estimatedDelivery: '۱۵:۰۰'
  },
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
    estimatedDelivery: '۱۳:۴۰'
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
    status: 'delivering',
    paymentMethod: 'online',
    paymentStatus: 'paid',
    orderDate: '۱۴۰۲/۱۲/۱۵ - ۱۵:۱۰',
    estimatedDelivery: '۱۶:۰۰'
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
    estimatedDelivery: '۱۲:۴۵'
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
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deliveryTypeFilter, setDeliveryTypeFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  const filteredOrders = orders.filter(order => {
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

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
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

  const handlePrintOrders = () => {
    const printContent = `
      <html>
        <head>
          <title>لیست سفارشات</title>
          <style>
            body { font-family: Arial, sans-serif; direction: rtl; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
            th { background-color: #f2f2f2; }
            .header { text-align: center; margin-bottom: 20px; }
            .status { padding: 4px 8px; border-radius: 4px; font-size: 12px; }
            .status-pending { background-color: #fef3c7; color: #92400e; }
            .status-confirmed { background-color: #dbeafe; color: #1e40af; }
            .status-preparing { background-color: #fed7aa; color: #ea580c; }
            .status-ready { background-color: #e9d5ff; color: #7c3aed; }
            .status-delivering { background-color: #c7d2fe; color: #4338ca; }
            .status-delivered { background-color: #dcfce7; color: #166534; }
            .status-cancelled { background-color: #fecaca; color: #dc2626; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>لیست سفارشات رستوران</h1>
            <p>تاریخ چاپ: ${new Date().toLocaleDateString('fa-IR')}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>شماره سفارش</th>
                <th>مشتری</th>
                <th>تلفن</th>
                <th>نوع تحویل</th>
                <th>مبلغ</th>
                <th>وضعیت</th>
                <th>تاریخ</th>
              </tr>
            </thead>
            <tbody>
              ${filteredOrders.map(order => {
                const statusInfo = getStatusInfo(order.status);
                return `
                  <tr>
                    <td>${order.orderNumber}</td>
                    <td>${order.customer.name}</td>
                    <td>${order.customer.phone}</td>
                    <td>${getDeliveryTypeLabel(order.deliveryType)}</td>
                    <td>${order.totalAmount.toLocaleString('fa-IR')} تومان</td>
                    <td><span class="status status-${order.status}">${statusInfo.label}</span></td>
                    <td>${order.orderDate}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    ready: orders.filter(o => o.status === 'ready').length,
    delivering: orders.filter(o => o.status === 'delivering').length
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
          <button
            onClick={handlePrintOrders}
            className="flex items-center gap-2 px-4 py-2 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Printer className="w-5 h-5" />
            چاپ لیست
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <RefreshCw className="w-5 h-5" />
            بروزرسانی
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Package className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">کل سفارشات</p>
              <p className="text-lg font-bold text-gray-900">{orderStats.total}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">در انتظار</p>
              <p className="text-lg font-bold text-yellow-600">{orderStats.pending}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Package className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">در حال آماده‌سازی</p>
              <p className="text-lg font-bold text-orange-600">{orderStats.preparing}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">آماده تحویل</p>
              <p className="text-lg font-bold text-purple-600">{orderStats.ready}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Truck className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">در حال ارسال</p>
              <p className="text-lg font-bold text-indigo-600">{orderStats.delivering}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-sm sm:flex-row sm:items-center">
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
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 md:p-6">
          <h3 className="text-base font-semibold md:text-lg">
            سفارشات ({filteredOrders.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredOrders.map((order) => {
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
                    <button className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors">
                      <Edit className="w-5 h-5" />
                    </button>
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

                    {/* Status Update */}
                    <div>
                      <h5 className="font-medium text-gray-900 mb-3">تغییر وضعیت سفارش:</h5>
                      <div className="flex flex-wrap gap-2">
                        {statusOptions.slice(1).map((status) => (
                          <button
                            key={status.value}
                            onClick={() => updateOrderStatus(order.id, status.value as Order['status'])}
                            disabled={order.status === status.value}
                            className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                              order.status === status.value
                                ? `${status.color} cursor-not-allowed`
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {status.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}