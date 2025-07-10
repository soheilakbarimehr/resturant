import { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { products } from '../../data/menu';
import { Product } from '../../types';

export default function FoodsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 right-3 top-1/2 md:w-5 md:h-5" />
          <input
            type="text"
            placeholder="جستجو در غذاها..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-4 pr-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent md:text-base md:py-3 md:pr-12"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-sm text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700 md:px-4 md:py-3 md:text-base">
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          افزودن غذای جدید
        </button>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200 md:p-6">
          <h3 className="text-base font-semibold md:text-lg">لیست غذاها ({filteredProducts.length})</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredProducts.map((product) => (
            <div key={product.id} className="p-4 md:p-6">
              <div className="flex items-start gap-3 md:gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-16 h-16 rounded-lg md:w-20 md:h-20"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 md:text-base">{product.name}</h4>
                      <p className="mt-1 text-xs text-gray-600 line-clamp-2 md:text-sm">{product.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm font-bold text-gray-900 md:text-base">
                          {product.price.toLocaleString('fa-IR')} تومان
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through md:text-sm">
                            {product.originalPrice.toLocaleString('fa-IR')} تومان
                          </span>
                        )}
                        <span className="text-xs text-gray-500 md:text-sm">
                          ⭐ {product.rating} ({product.reviews} نظر)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-blue-600 transition-colors rounded-lg hover:bg-blue-50 md:p-2">
                        <Edit className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                      <button className="p-1.5 text-red-600 transition-colors rounded-lg hover:bg-red-50 md:p-2">
                        <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}