import { ShoppingBag, Users, Utensils, CheckCircle, X, MessageCircle, Send, Star } from 'lucide-react';
import { useState } from 'react';

interface Review {
  id: string;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  adminReply?: string;
}

export default function Dashboard() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      productName: 'چیز برگر دوبل',
      customerName: 'علی احمدی',
      rating: 5,
      comment: 'واقعاً عالی بود! طعم فوق‌العاده‌ای داشت و تازه هم بود.',
      date: '۱۴۰۲/۱۲/۱۵',
      status: 'pending'
    },
    {
      id: '2',
      productName: 'پیتزا پپرونی',
      customerName: 'مریم کریمی',
      rating: 4,
      comment: 'خوب بود ولی کمی دیر رسید. در کل راضی هستم.',
      date: '۱۴۰۲/۱۲/۱۴',
      status: 'pending'
    },
    {
      id: '3',
      productName: 'برگر مرغ',
      customerName: 'حسن رضایی',
      rating: 5,
      comment: 'بهترین غذایی که تا حالا خوردم! حتماً دوباره سفارش می‌دم.',
      date: '۱۴۰۲/۱۲/۱۳',
      status: 'pending'
    }
  ]);

  const [adminReplies, setAdminReplies] = useState<{ [key: string]: string }>({});

  const stats = [
    { title: 'کل سفارشات', value: '۱۲۳', icon: <ShoppingBag className="w-6 h-6 md:w-8 md:h-8" />, color: 'bg-blue-500' },
    { title: 'کاربران فعال', value: '۴۵', icon: <Users className="w-6 h-6 md:w-8 md:h-8" />, color: 'bg-green-500' },
    { title: 'محصولات', value: '۱۴', icon: <Utensils className="w-6 h-6 md:w-8 md:h-8" />, color: 'bg-purple-500' },
    { title: 'نظرات در انتظار', value: reviews.filter(r => r.status === 'pending').length.toString(), icon: <MessageCircle className="w-6 h-6 md:w-8 md:h-8" />, color: 'bg-orange-500' },
  ];

  const handleApproveReview = (reviewId: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, status: 'approved' as const, adminReply: adminReplies[reviewId] || undefined }
        : review
    ));
    setAdminReplies({ ...adminReplies, [reviewId]: '' });
  };

  const handleRejectReview = (reviewId: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, status: 'rejected' as const } : review
    ));
  };

  const handleReplyChange = (reviewId: string, reply: string) => {
    setAdminReplies({ ...adminReplies, [reviewId]: reply });
  };

  const pendingReviews = reviews.filter(review => review.status === 'pending');

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

      {/* Recent Reviews */}
      <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
        <h3 className="mb-4 text-base font-semibold md:text-lg">نظرات اخیر</h3>
        {pendingReviews.length === 0 ? (
          <div className="py-8 text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500">نظر جدیدی در انتظار تأیید نیست</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingReviews.map((review) => (
              <div key={review.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-gray-900">{review.customerName}</h4>
                      <span className="text-sm text-gray-500">برای {review.productName}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700 mb-3">{review.comment}</p>
                    
                    {/* Admin Reply Input */}
                    <div className="mb-3">
                      <textarea
                        value={adminReplies[review.id] || ''}
                        onChange={(e) => handleReplyChange(review.id, e.target.value)}
                        placeholder="پاسخ شما (اختیاری)..."
                        className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApproveReview(review.id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    تأیید
                  </button>
                  <button
                    onClick={() => handleRejectReview(review.id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    رد
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}