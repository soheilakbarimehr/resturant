import { useState } from 'react';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, CreditCard, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  const deliveryFee = 15000;
  const finalTotal = totalPrice + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="container px-4 py-8 mx-auto min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 md:w-24 md:h-24" />
          </div>
          <h1 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">سبد خرید شما خالی است</h1>
          <p className="mb-6 text-sm text-gray-600 md:text-base md:mb-8">هنوز محصولی به سبد خرید اضافه نکرده‌اید</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base text-white transition-colors rounded-lg bg-red-600 hover:bg-red-700"
          >
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            مشاهده منو
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCompleteOrder = () => {
    navigate('/order-completion');
  };

  return (
    <div className="container px-3 py-4 mx-auto md:px-4 md:py-8">
      {/* Header */}
      <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between md:mb-8">
        <div className="flex items-center gap-3">
          <Link 
            to="/" 
            className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 md:text-sm md:gap-2 md:px-4"
          >
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">بازگشت به منو</span>
            <span className="sm:hidden">منو</span>
          </Link>
          <h1 className="text-lg font-bold md:text-2xl">سبد خرید</h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 text-xs bg-blue-50 text-blue-700 rounded-lg md:text-sm md:px-4">
          <ShoppingBag className="w-3 h-3 md:w-4 md:h-4" />
          {items.reduce((sum, item) => sum + item.quantity, 0)} محصول
        </div>
      </div>
      
      <div className="space-y-6 lg:grid lg:gap-8 lg:grid-cols-3 lg:space-y-0">
        {/* Cart Items */}
        <div className="space-y-4 lg:col-span-2">
          <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
            <h2 className="mb-4 text-base font-semibold md:text-lg md:mb-6">محصولات سفارش</h2>
            <div className="space-y-3 md:space-y-4">
              {items.map(item => (
                <div key={item.product.id} className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg md:items-center md:gap-4 md:p-4">
                  <div className="flex-shrink-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="object-cover w-16 h-16 rounded-lg md:w-20 md:h-20" 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1 text-sm font-semibold text-gray-900 md:text-lg md:mb-1">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 md:text-sm">
                      {item.product.description}
                    </p>
                    <div className="flex flex-col gap-2 mt-2 sm:flex-row sm:items-center sm:justify-between md:mt-3">
                      <div className="text-sm font-bold text-gray-900 md:text-lg">
                        {(item.product.price * item.quantity).toLocaleString('fa-IR')} تومان
                      </div>
                      {item.product.originalPrice && (
                        <div className="text-xs text-gray-400 line-through md:text-sm">
                          {(item.product.originalPrice * item.quantity).toLocaleString('fa-IR')} تومان
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2 md:gap-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        className="flex items-center justify-center w-7 h-7 text-gray-700 transition-colors border border-gray-300 rounded-md hover:bg-gray-100 hover:border-gray-400 md:w-8 md:h-8"
                      >
                        <Minus className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                      <span className="w-6 text-sm font-semibold text-center md:w-8 md:text-base">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="flex items-center justify-center w-7 h-7 text-gray-700 transition-colors border border-gray-300 rounded-md hover:bg-gray-100 hover:border-gray-400 md:w-8 md:h-8"
                      >
                        <Plus className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="flex items-center justify-center w-7 h-7 text-red-600 transition-colors rounded-md hover:bg-red-50 hover:text-red-700 md:w-8 md:h-8"
                    >
                      <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-4 md:space-y-6">
          {/* Summary Card */}
          <div className="p-4 bg-white rounded-lg shadow-sm sticky top-4 md:p-6">
            <h3 className="mb-4 text-base font-semibold md:text-lg md:mb-6">خلاصه سفارش</h3>
            
            <div className="space-y-2 mb-4 md:space-y-3 md:mb-6">
              <div className="flex justify-between text-xs md:text-sm">
                <span>قیمت محصولات:</span>
                <span>{totalPrice.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span>هزینه ارسال:</span>
                <span>{deliveryFee.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="pt-2 border-t border-gray-200 md:pt-3">
                <div className="flex justify-between text-base font-bold md:text-lg">
                  <span>مجموع نهایی:</span>
                  <span className="text-red-600">{finalTotal.toLocaleString('fa-IR')} تومان</span>
                </div>
              </div>
            </div>

            {/* Delivery Time */}
            <div className="flex items-center gap-2 p-2.5 mb-4 bg-green-50 text-green-700 rounded-lg md:p-3 md:mb-6">
              <Clock className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm">زمان تحویل: ۳۰-۴۵ دقیقه</span>
            </div>

            {/* Payment Method */}
            <div className="mb-4 md:mb-6">
              <h4 className="mb-2 text-xs font-medium text-gray-700 md:text-sm md:mb-3">روش پرداخت</h4>
              <div className="flex items-center gap-2 p-2.5 border border-gray-200 rounded-lg bg-gray-50 md:gap-3 md:p-3">
                <CreditCard className="w-4 h-4 text-gray-600 md:w-5 md:h-5" />
                <span className="text-xs md:text-sm">پرداخت آنلاین</span>
              </div>
            </div>

            <button
              onClick={handleCompleteOrder}
              className="w-full py-3 text-sm font-semibold text-white transition-colors rounded-lg bg-red-600 hover:bg-red-700 md:py-4 md:text-lg"
            >
              تکمیل سفارش
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}