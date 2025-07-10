export default function PriceDisplay({ price, originalPrice }: { price: number; originalPrice?: number }) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="flex items-end justify-end">
      {originalPrice && (
        <div className="relative flex items-center px-2 md:px-3 py-1 md:py-1.5 ml-2 md:ml-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-md animate-pulse">
          <span className="text-xs font-bold md:text-sm">{discount}٪ تخفیف</span>
          <div className="absolute -top-2 -right-2 bg-white text-red-600 text-[10px] md:text-xs font-bold px-1 md:px-1.5 py-0.5 rounded-full shadow-sm">
            ویژه
          </div>
        </div>
      )}
      <div className="text-right">
        {originalPrice && (
          <div className="mb-0.5 md:mb-1 text-xs md:text-sm text-gray-400 line-through">
            {originalPrice.toLocaleString('fa-IR')} تومان
          </div>
        )}
        <div className="text-base font-extrabold text-gray-900 md:text-xl">
          {price.toLocaleString('fa-IR')} تومان
        </div>
      </div>
    </div>
  );
}