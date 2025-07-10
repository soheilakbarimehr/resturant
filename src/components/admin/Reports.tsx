import { useState } from 'react';
import { 
  Calendar, 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Truck, 
  Store,
  Download,
  Filter,
  RefreshCw,
  PieChart,
  Activity
} from 'lucide-react';

interface ReportData {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  deliveryMethods: {
    restaurant: { count: number; amount: number };
    takeaway: { count: number; amount: number };
    delivery: { count: number; amount: number };
  };
  paymentMethods: {
    online: { count: number; amount: number };
    cash: { count: number; amount: number };
    card: { count: number; amount: number };
  };
  topProducts: Array<{
    name: string;
    quantity: number;
    revenue: number;
  }>;
  dailySales: Array<{
    date: string;
    sales: number;
    orders: number;
  }>;
}

export default function Reports() {
  const [dateRange, setDateRange] = useState({
    startDate: '۱۴۰۲/۱۲/۰۱',
    endDate: '۱۴۰۲/۱۲/۱۵'
  });
  const [reportType, setReportType] = useState<'sales' | 'orders' | 'products' | 'delivery'>('sales');
  const [isLoading, setIsLoading] = useState(false);

  // Mock report data
  const reportData: ReportData = {
    totalSales: 15750000,
    totalOrders: 127,
    averageOrderValue: 124000,
    deliveryMethods: {
      restaurant: { count: 45, amount: 5580000 },
      takeaway: { count: 38, amount: 4712000 },
      delivery: { count: 44, amount: 5458000 }
    },
    paymentMethods: {
      online: { count: 89, amount: 11025000 },
      cash: { count: 28, amount: 3472000 },
      card: { count: 10, amount: 1253000 }
    },
    topProducts: [
      { name: 'چیز برگر دوبل', quantity: 45, revenue: 8325000 },
      { name: 'پیتزا پپرونی', quantity: 32, revenue: 4000000 },
      { name: 'برگر مرغ', quantity: 28, revenue: 3360000 },
      { name: 'قورمه سبزی', quantity: 22, revenue: 2156000 },
      { name: 'پیتزا مارگریتا', quantity: 18, revenue: 2610000 }
    ],
    dailySales: [
      { date: '۱۴۰۲/۱۲/۰۱', sales: 980000, orders: 8 },
      { date: '۱۴۰۲/۱۲/۰۲', sales: 1250000, orders: 10 },
      { date: '۱۴۰۲/۱۲/۰۳', sales: 1100000, orders: 9 },
      { date: '۱۴۰۲/۱۲/۰۴', sales: 1450000, orders: 12 },
      { date: '۱۴۰۲/۱۲/۰۵', sales: 1680000, orders: 14 },
      { date: '۱۴۰۲/۱۲/۰۶', sales: 890000, orders: 7 },
      { date: '۱۴۰۲/۱۲/۰۷', sales: 1320000, orders: 11 }
    ]
  };

  const handleGenerateReport = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleExportReport = () => {
    // Create CSV content
    const csvContent = [
      ['نوع گزارش', 'مقدار'],
      ['کل فروش', reportData.totalSales.toLocaleString('fa-IR')],
      ['تعداد سفارشات', reportData.totalOrders.toString()],
      ['میانگین ارزش سفارش', reportData.averageOrderValue.toLocaleString('fa-IR')],
      [''],
      ['روش تحویل', 'تعداد', 'مبلغ'],
      ['تحویل در رستوران', reportData.deliveryMethods.restaurant.count.toString(), reportData.deliveryMethods.restaurant.amount.toLocaleString('fa-IR')],
      ['بیرون بر', reportData.deliveryMethods.takeaway.count.toString(), reportData.deliveryMethods.takeaway.amount.toLocaleString('fa-IR')],
      ['ارسال با پیک', reportData.deliveryMethods.delivery.count.toString(), reportData.deliveryMethods.delivery.amount.toLocaleString('fa-IR')],
      [''],
      ['روش پرداخت', 'تعداد', 'مبلغ'],
      ['آنلاین', reportData.paymentMethods.online.count.toString(), reportData.paymentMethods.online.amount.toLocaleString('fa-IR')],
      ['نقدی', reportData.paymentMethods.cash.count.toString(), reportData.paymentMethods.cash.amount.toLocaleString('fa-IR')],
      ['کارت خوان', reportData.paymentMethods.card.count.toString(), reportData.paymentMethods.card.amount.toLocaleString('fa-IR')]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `گزارش-فروش-${dateRange.startDate}-${dateRange.endDate}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reportTypes = [
    { value: 'sales', label: 'گزارش فروش', icon: <DollarSign className="w-4 h-4" /> },
    { value: 'orders', label: 'گزارش سفارشات', icon: <ShoppingBag className="w-4 h-4" /> },
    { value: 'products', label: 'گزارش محصولات', icon: <BarChart3 className="w-4 h-4" /> },
    { value: 'delivery', label: 'گزارش تحویل', icon: <Truck className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">گزارش‌گیری</h1>
          <p className="text-gray-600">تحلیل و بررسی عملکرد فروش</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 px-4 py-2 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Download className="w-4 h-4" />
            خروجی Excel
          </button>
          <button
            onClick={handleGenerateReport}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'در حال بارگذاری...' : 'تولید گزارش'}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">فیلترهای گزارش</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">از تاریخ</label>
            <div className="relative">
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="۱۴۰۲/۱۲/۰۱"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">تا تاریخ</label>
            <div className="relative">
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="۱۴۰۲/۱۲/۱۵"
              />
            </div>
          </div>
          {/* Report Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">نوع گزارش</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {reportTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">کل فروش</p>
              <p className="text-xl font-bold text-gray-900">{reportData.totalSales.toLocaleString('fa-IR')}</p>
              <p className="text-xs text-gray-500">تومان</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">تعداد سفارشات</p>
              <p className="text-xl font-bold text-gray-900">{reportData.totalOrders}</p>
              <p className="text-xs text-gray-500">سفارش</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">میانگین سفارش</p>
              <p className="text-xl font-bold text-gray-900">{reportData.averageOrderValue.toLocaleString('fa-IR')}</p>
              <p className="text-xs text-gray-500">تومان</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">رشد فروش</p>
              <p className="text-xl font-bold text-green-600">+۱۲.۵٪</p>
              <p className="text-xs text-gray-500">نسبت به ماه قبل</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Delivery Methods */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Truck className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900">روش‌های تحویل</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Store className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">تحویل در رستوران</p>
                  <p className="text-sm text-gray-600">{reportData.deliveryMethods.restaurant.count} سفارش</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{reportData.deliveryMethods.restaurant.amount.toLocaleString('fa-IR')}</p>
                <p className="text-sm text-gray-500">تومان</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">بیرون بر</p>
                  <p className="text-sm text-gray-600">{reportData.deliveryMethods.takeaway.count} سفارش</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{reportData.deliveryMethods.takeaway.amount.toLocaleString('fa-IR')}</p>
                <p className="text-sm text-gray-500">تومان</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium text-gray-900">ارسال با پیک</p>
                  <p className="text-sm text-gray-600">{reportData.deliveryMethods.delivery.count} سفارش</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{reportData.deliveryMethods.delivery.amount.toLocaleString('fa-IR')}</p>
                <p className="text-sm text-gray-500">تومان</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900">روش‌های پرداخت</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-blue-600 rounded"></div>
                <div>
                  <p className="font-medium text-gray-900">پرداخت آنلاین</p>
                  <p className="text-sm text-gray-600">{reportData.paymentMethods.online.count} سفارش</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{reportData.paymentMethods.online.amount.toLocaleString('fa-IR')}</p>
                <p className="text-sm text-gray-500">تومان</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-600 rounded"></div>
                <div>
                  <p className="font-medium text-gray-900">پرداخت نقدی</p>
                  <p className="text-sm text-gray-600">{reportData.paymentMethods.cash.count} سفارش</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{reportData.paymentMethods.cash.amount.toLocaleString('fa-IR')}</p>
                <p className="text-sm text-gray-500">تومان</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-purple-600 rounded"></div>
                <div>
                  <p className="font-medium text-gray-900">کارت خوان</p>
                  <p className="text-sm text-gray-600">{reportData.paymentMethods.card.count} سفارش</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{reportData.paymentMethods.card.amount.toLocaleString('fa-IR')}</p>
                <p className="text-sm text-gray-500">تومان</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900">محصولات پرفروش</h3>
          </div>
          <div className="space-y-3">
            {reportData.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.quantity} عدد</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{product.revenue.toLocaleString('fa-IR')}</p>
                  <p className="text-sm text-gray-500">تومان</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Sales Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900">فروش روزانه</h3>
          </div>
          <div className="space-y-3">
            {reportData.dailySales.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{day.date}</p>
                  <p className="text-sm text-gray-600">{day.orders} سفارش</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{day.sales.toLocaleString('fa-IR')}</p>
                  <p className="text-sm text-gray-500">تومان</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}