import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { products } from '../data/menu';
import ProductCard from './ProductCard';

export default function DiscountsSection() {
  const [showAll, setShowAll] = useState(false);
  const discountedProducts = products.filter(product => product.originalPrice !== undefined);
  const displayProducts = showAll ? discountedProducts : discountedProducts.slice(0, 3);

  if (discountedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 border-t border-b border-red-100">
      <div className="container px-4 mx-auto">
        <h2 className="mb-8 text-2xl font-bold text-center text-red-700">🔥 تخفیف‌های امروز</h2>
        <div className="max-w-2xl mx-auto space-y-8">
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {discountedProducts.length > 3 && (
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-orange-200"></div>
              </div>
              <div className="relative flex justify-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-red-700 transition-colors bg-white border border-red-300 rounded-full hover:text-red-800 hover:border-red-500 hover:bg-red-50"
                >
                  {showAll ? 'مشاهده کمتر' : 'مشاهده همه'}
                  {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}