import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { products } from '../data/menu';
import ProductCard from './ProductCard';

interface CategorySectionProps {
  categoryId: string;
  title: string;
}

export default function CategorySection({ categoryId, title }: CategorySectionProps) {
  const [showAll, setShowAll] = useState(false);
  const allCategoryProducts = products.filter(product => product.category === categoryId);
  const displayProducts = showAll ? allCategoryProducts : allCategoryProducts.slice(0, 3);

  return (
    <section id={`section-${categoryId}`} className="py-8">
      <div className="container px-4 mx-auto">
        <h2 className="mb-8 text-2xl font-bold text-center">{title}</h2>
        <div className="max-w-2xl mx-auto space-y-8">
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {allCategoryProducts.length > 3 && (
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="flex items-center gap-3 px-8 py-4 text-base font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-full hover:text-red-600 hover:border-red-600 hover:bg-red-50"
                >
                  {showAll ? 'مشاهده کمتر' : 'مشاهده همه'}
                  {showAll ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}