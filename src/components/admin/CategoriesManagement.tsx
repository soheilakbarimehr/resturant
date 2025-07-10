import { Plus, Edit, Trash2 } from 'lucide-react';
import { categories } from '../../data/menu';
import { products } from '../../data/menu';

export default function CategoriesManagement() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold md:text-lg">مدیریت دسته‌بندی‌ها</h3>
        <button className="flex items-center gap-2 px-3 py-2 text-sm text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700 md:px-4 md:py-3 md:text-base">
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          افزودن دسته‌بندی جدید
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
        {categories.map((category) => (
          <div key={category.id} className="p-4 bg-white rounded-lg shadow-sm md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h4 className="text-sm font-semibold md:text-base">{category.name}</h4>
              <div className="flex items-center gap-1 md:gap-2">
                <button className="p-1.5 text-blue-600 transition-colors rounded-lg hover:bg-blue-50 md:p-2">
                  <Edit className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button className="p-1.5 text-red-600 transition-colors rounded-lg hover:bg-red-50 md:p-2">
                  <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-600 md:text-sm">
              شناسه: {category.id}
            </p>
            <p className="text-xs text-gray-600 md:text-sm">
              تعداد محصولات: {products.filter(p => p.category === category.id).length}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}