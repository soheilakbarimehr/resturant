import { ShoppingBag, Users, Utensils, BarChart3 } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: 'کل سفارشات', value: '۱۲۳', icon: <ShoppingBag className="w-6 h-6 md:w-8 md:h-8" />, color: 'bg-blue-500' },
    { title: 'کاربران فعال', value: '۴۵', icon: <Users className="w-6 h-6 md:w-8 md:h-8" />, color: 'bg-green-500' },
    { title: 'محصولات', value: '۱۴', icon: <Utensils className="w-6 h-6 md:w-8 md:h-8" />, color: 'bg-purple-500' },
    { title: 'درآمد امروز', value: '۲.۵M', icon: <BarChart3 className="w-6 h-6 md:w-8 md:h-8" />, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-sm md:p-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className={`p-2 rounded-lg text-white md:p-3 ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xs text-gray-600 md:text-sm">{stat.title}</p>
                <p className="text-lg font-bold text-gray-900 md:text-2xl">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
        <h3 className="mb-4 text-base font-semibold md:text-lg">آخرین سفارشات</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 text-right md:py-3">شماره سفارش</th>
                <th className="py-2 text-right md:py-3">مشتری</th>
                <th className="py-2 text-right md:py-3">مبلغ</th>
                <th className="py-2 text-right md:py-3">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((order) => (
                <tr key={order} className="border-b border-gray-100">
                  <td className="py-2 md:py-3">#{1000 + order}</td>
                  <td className="py-2 md:py-3">مشتری {order}</td>
                  <td className="py-2 md:py-3">{(150000 + order * 10000).toLocaleString('fa-IR')} تومان</td>
                  <td className="py-2 md:py-3">
                    <span className="px-2 py-1 text-xs text-green-700 bg-green-100 rounded-full">
                      تحویل شده
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}