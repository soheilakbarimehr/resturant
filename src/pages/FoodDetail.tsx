import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingCart, Plus, Minus, MessageCircle, Send } from 'lucide-react';
import { products } from '../data/menu';
import { useCart } from '../context/CartContext';

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  adminReply?: {
    message: string;
    date: string;
  };
}

export default function FoodDetail() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [adminReply, setAdminReply] = useState<{ [key: string]: string }>({});
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      user: 'علی احمدی',
      rating: 5,
      comment: 'واقعاً عالی بود! طعم فوق‌العاده‌ای داشت و تازه هم بود.',
      date: '۱۴۰۲/۱۲/۱۵'
    },
    {
      id: '2',
      user: 'مریم کریمی',
      rating: 4,
      comment: 'خوب بود ولی کمی دیر رسید. در کل راضی هستم.',
      date: '۱۴۰۲/۱۲/۱۰',
      adminReply: {
        message: 'متشکریم از نظرتون. سعی می‌کنیم زمان تحویل رو بهتر کنیم.',
        date: '۱۴۰۲/۱۲/۱۱'
      }
    },
    {
      id: '3',
      user: 'حسن رضایی',
      rating: 5,
      comment: 'بهترین غذایی که تا حالا خوردم! حتماً دوباره سفارش می‌دم.',
      date: '۱۴۰۲/۱۲/۰۸'
    }
  ]);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container px-4 py-16 mx-auto text-center">
        <h1 className="mb-4 text-2xl font-bold">محصول یافت نشد</h1>
        <Link to="/" className="inline-block px-6 py-3 text-white transition-colors rounded-lg bg-red-600 hover:bg-red-700">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.comment.trim()) {
      const review: Review = {
        id: Date.now().toString(),
        user: 'کاربر جدید',
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toLocaleDateString('fa-IR')
      };
      setReviews([review, ...reviews]);
      setNewReview({ rating: 5, comment: '' });
    }
  };

  const handleAdminReply = (reviewId: string) => {
    const replyText = adminReply[reviewId];
    if (replyText?.trim()) {
      setReviews(reviews.map(review => 
        review.id === reviewId 
          ? { 
              ...review, 
              adminReply: { 
                message: replyText, 
                date: new Date().toLocaleDateString('fa-IR') 
              } 
            }
          : review
      ));
      setAdminReply({ ...adminReply, [reviewId]: '' });
    }
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Navigation */}
      <div className="flex items-center mb-8">
        <Link to="/" className="flex items-center px-4 py-2 ml-4 text-sm text-gray-600 transition-colors bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
          <ArrowRight className="w-5 h-5 ml-2" />
          بازگشت به منو
        </Link>
      </div>

      {/* Product Details */}
      <div className="grid gap-8 mb-12 lg:grid-cols-2">
        {/* Product Image */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-96 lg:h-[500px]"
            />
          </div>
          {product.originalPrice && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl shadow-lg">
              <span className="font-bold">{discount}٪ تخفیف</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="mb-4 text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
            <span className="text-gray-600">({reviews.length} نظر)</span>
          </div>

          {/* Price */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            {product.originalPrice && (
              <div className="mb-2 text-lg text-gray-400 line-through">
                {product.originalPrice.toLocaleString('fa-IR')} تومان
              </div>
            )}
            <div className="text-3xl font-bold text-gray-900">
              {product.price.toLocaleString('fa-IR')} تومان
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="p-6 space-y-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">تعداد:</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex items-center justify-center w-10 h-10 text-gray-600 transition-colors border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-12 text-xl font-bold text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex items-center justify-center w-10 h-10 text-gray-600 transition-colors border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center w-full gap-3 py-4 text-lg font-semibold text-white transition-colors rounded-lg bg-red-600 hover:bg-red-700"
            >
              <ShoppingCart className="w-6 h-6" />
              افزودن به سبد خرید
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">نظرات کاربران</h2>

        {/* Add Review Form */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">نظر خود را بنویسید</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">امتیاز:</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">نظر:</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                rows={4}
                placeholder="نظر خود را بنویسید..."
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 text-white transition-colors rounded-lg bg-red-600 hover:bg-red-700"
            >
              ثبت نظر
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold">{review.user}</h4>
                  <div className="flex items-center gap-2 mt-1">
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
                </div>
              </div>
              <p className="mb-4 text-gray-700">{review.comment}</p>

              {/* Admin Reply */}
              {review.adminReply && (
                <div className="p-4 mr-6 bg-blue-50 rounded-lg border-r-4 border-blue-500">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-600">پاسخ مدیریت</span>
                    <span className="text-xs text-gray-500">{review.adminReply.date}</span>
                  </div>
                  <p className="text-gray-700">{review.adminReply.message}</p>
                </div>
              )}

              {/* Admin Reply Form (for demonstration - in real app, this would be admin-only) */}
              {!review.adminReply && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={adminReply[review.id] || ''}
                      onChange={(e) => setAdminReply({ ...adminReply, [review.id]: e.target.value })}
                      placeholder="پاسخ مدیریت..."
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => handleAdminReply(review.id)}
                      className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}