import { useState } from 'react';
import {
  Utensils, Pizza, Sandwich, Cookie, Coffee, Drumstick
} from 'lucide-react';
import { categories } from '../data/menu';

const categoryIcons: Record<string, JSX.Element> = {
  burger: <Cookie className="w-5 h-5 md:w-6 md:h-6" />,
  pizza: <Pizza className="w-5 h-5 md:w-6 md:h-6" />,
  hotdog: <Drumstick className="w-5 h-5 md:w-6 md:h-6" />,
  sandwich: <Sandwich className="w-5 h-5 md:w-6 md:h-6" />,
  iranian: <Utensils className="w-5 h-5 md:w-6 md:h-6" />,
  drinks: <Coffee className="w-5 h-5 md:w-6 md:h-6" />,
};

export default function CategoryBar() {
  const [activeCategory, setActiveCategory] = useState<string>('burger');

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    const section = document.getElementById(`section-${id}`);
    if (section) {
      // Calculate offset for all fixed elements with increased spacing
      const headerHeight = window.innerWidth >= 768 ? 57 : 49; // Header height
      const categoryBarHeight = window.innerWidth >= 768 ? 65 : 57; // Category bar height  
      const searchBarHeight = window.innerWidth >= 768 ? 128 : 112; // Search bar height (increased more)
      const totalOffset = headerHeight + categoryBarHeight + searchBarHeight + 20; // Extra padding
      
      const elementPosition = section.offsetTop - totalOffset;
      window.scrollTo({
        top: Math.max(0, elementPosition),
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed top-[49px] md:top-[57px] left-0 right-0 z-40 bg-white shadow-lg border-b border-gray-200">
      <div className="container py-2 mx-auto overflow-x-auto md:py-3 custom-scrollbar">
        <div className="flex justify-start px-4 space-x-2 space-x-reverse md:justify-center md:space-x-4 md:px-0">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex flex-col items-center min-w-[64px] md:min-w-[80px] p-1.5 md:p-2 rounded-lg transition-all duration-300 transform hover:scale-105
                ${activeCategory === category.id 
                  ? 'bg-red-500 text-white shadow-lg' 
                  : 'hover:bg-gray-100'}`}
            >
              <div className="mb-1 md:mb-2">
                {categoryIcons[category.id]}
              </div>
              <span className="text-xs md:text-sm">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}