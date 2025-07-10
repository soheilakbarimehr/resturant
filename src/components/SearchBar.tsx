import { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { products } from '../data/menu';
import { Product } from '../types';
import { Link } from 'react-router-dom';

interface SearchBarProps {
  onSearchResults?: (results: Product[]) => void;
}

export default function SearchBar({ onSearchResults }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches] = useState(['برگر', 'پیتزا', 'چیز برگر', 'مرغ', 'ساندویچ']);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Handle search
  useEffect(() => {
    if (searchTerm.trim()) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      onSearchResults?.(results);
    } else {
      setSearchResults([]);
      onSearchResults?.([]);
    }
  }, [searchTerm, onSearchResults]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (term: string) => {
    if (term.trim()) {
      setSearchTerm(term);
      setIsOpen(false);
      
      // Add to recent searches
      const newRecentSearches = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
      setRecentSearches(newRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsOpen(false);
    onSearchResults?.([]);
    inputRef.current?.focus();
  };

  const removeRecentSearch = (searchToRemove: string) => {
    const newRecentSearches = recentSearches.filter(s => s !== searchToRemove);
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="جستجو در منو..."
          className="w-full py-3 pl-4 pr-12 text-right transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent hover:shadow-md"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 transition-colors hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden bg-white border border-gray-200 shadow-xl top-full rounded-2xl max-h-96">
          {searchTerm ? (
            // Search Results
            <div className="p-2">
              {searchResults.length > 0 ? (
                <>
                  <div className="px-4 py-2 text-sm font-medium text-gray-500 border-b border-gray-100">
                    {searchResults.length} نتیجه یافت شد
                  </div>
                  <div className="overflow-y-auto max-h-80 custom-scrollbar">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        to={`/food/${product.id}`}
                        onClick={() => {
                          handleSearch(searchTerm);
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-4 p-3 transition-colors cursor-pointer hover:bg-gray-50 rounded-xl"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="flex-shrink-0 object-cover w-12 h-12 rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
                          <p className="text-sm text-gray-500 truncate">{product.description}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm font-bold text-red-600">
                              {product.price.toLocaleString('fa-IR')} تومان
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs text-gray-400 line-through">
                                {product.originalPrice.toLocaleString('fa-IR')}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div className="p-8 text-center">
                  <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-gray-500">نتیجه‌ای یافت نشد</p>
                  <p className="mt-1 text-sm text-gray-400">کلمه کلیدی دیگری امتحان کنید</p>
                </div>
              )}
            </div>
          ) : (
            // Recent and Popular Searches
            <div className="p-2">
              {recentSearches.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500">
                    <Clock className="w-4 h-4" />
                    جستجوهای اخیر
                  </div>
                  {recentSearches.map((search, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between px-4 py-2 transition-colors hover:bg-gray-50 rounded-xl group"
                    >
                      <button
                        onClick={() => handleSearch(search)}
                        className="flex-1 text-right text-gray-700 transition-colors hover:text-red-600"
                      >
                        {search}
                      </button>
                      <button
                        onClick={() => removeRecentSearch(search)}
                        className="p-1 text-gray-400 transition-all opacity-0 group-hover:opacity-100 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500">
                  <TrendingUp className="w-4 h-4" />
                  جستجوهای محبوب
                </div>
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="block w-full px-4 py-2 text-right text-gray-700 transition-colors hover:bg-gray-50 hover:text-red-600 rounded-xl"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}