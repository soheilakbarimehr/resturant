import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { products } from '../data/menu';
import ProductCard from './ProductCard';

// رنگ‌های مختلف برای هر دسته‌بندی
const categoryColors: Record<string, string> = {
  burger: 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-100',
  pizza: 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-100',
  hotdog: 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100',
  sandwich: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-100',
  iranian: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100',
  drinks: 'bg-gradient-to-br from-cyan-50 to-teal-50 border-cyan-100'
};

const categoryTitleColors: Record<string, string> = {
  burger: 'text-orange-700',
  pizza: 'text-yellow-700',
  hotdog: 'text-purple-700',
  sandwich: 'text-green-700',
  iranian: 'text-blue-700',
  drinks: 'text-cyan-700'
};

const categoryButtonColors: Record<string, string> = {
  burger: 'text-orange-700 border-orange-600 hover:border-orange-700 hover:bg-orange-100',
  pizza: 'text-yellow-700 border-yellow-600 hover:border-yellow-700 hover:bg-yellow-100',
  hotdog: 'text-purple-700 border-purple-600 hover:border-purple-700 hover:bg-purple-100',
  sandwich: 'text-green-700 border-green-600 hover:border-green-700 hover:bg-green-100',
  iranian: 'text-blue-700 border-blue-600 hover:border-blue-700 hover:bg-blue-100',
  drinks: 'text-cyan-700 border-cyan-600 hover:border-cyan-700 hover:bg-cyan-100'
};

interface CategorySectionProps {
  categoryId: string;
  title: string;
}

export default function CategorySection({ categoryId, title }: CategorySectionProps) {
  const [showAll, setShowAll] = useState(false);
  const allCategoryProducts = products.filter(product => product.category === categoryId);
  const displayProducts = showAll ? allCategoryProducts : allCategoryProducts.slice(0, 3);

  const sectionBgColor = categoryColors[categoryId] || 'bg-gray-50 border-gray-100';
  const titleColor = categoryTitleColors[categoryId] || 'text-gray-700';
  const buttonColor = categoryButtonColors[categoryId] || 'text-gray-700 border-gray-600 hover:border-gray-700 hover:bg-gray-100';

  return (
    <section id={`section-${categoryId}`} className={`py-8 ${sectionBgColor} border-t border-b`}>
      <div className="container px-4 mx-auto">
        <h2 className={`mb-8 text-2xl font-bold text-center ${titleColor}`}>{title}</h2>
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
                  className={`flex items-center gap-3 px-8 py-4 text-base font-medium transition-colors bg-white border rounded-full ${buttonColor}`}
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