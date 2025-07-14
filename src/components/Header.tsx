import { Utensils, ShoppingCart, LogIn, User } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';

export default function Header() {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: 'رستوران ایرانی',
    logo: ''
  });

  // Load restaurant info from localStorage
  useEffect(() => {
    const savedInfo = localStorage.getItem('restaurantInfo');
    if (savedInfo) {
      const info = JSON.parse(savedInfo);
      setRestaurantInfo({
        name: info.name || 'رستوران ایرانی',
        logo: info.logo || ''
      });
    }
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container flex items-center justify-between px-4 py-3 mx-auto">
          <Link to="/" className="flex items-center">
            {restaurantInfo.logo ? (
              <img 
                src={restaurantInfo.logo} 
                alt={restaurantInfo.name}
                className="w-6 h-6 md:w-8 md:h-8 object-contain"
              />
            ) : (
              <Utensils className="w-6 h-6 text-red-600 md:w-8 md:h-8" />
            )}
            <h1 className="mr-2 text-lg font-bold md:text-2xl">{restaurantInfo.name}</h1>
          </Link>
          <div className="flex items-center gap-2 md:gap-4">
            <Link 
              to="/cart" 
              className="relative flex items-center px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
            >
              <ShoppingCart className="w-4 h-4 ml-1 md:w-5 md:h-5 md:ml-2" />
              <span className="hidden md:inline">سبد خرید</span>
              {totalItems > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-green-500 rounded-full -top-2 -right-2 md:w-6 md:h-6">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="hidden md:inline">{user.name}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      پروفایل من
                    </Link>
                    
                    {/* نمایش منوی مناسب بر اساس نقش کاربر */}
                    {(user.role === 'admin' || user.role === 'cashier') && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        پنل مدیریت
                      </Link>
                    )}
                    
                    {user.role === 'delivery' && (
                      <Link
                        to="/delivery"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        پنل پیک
                      </Link>
                    )}
                    
                    {user.role === 'customer' && (
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        سفارشات من
                      </Link>
                    )}
                    
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      خروج
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <LogIn className="w-4 h-4 ml-1 md:w-5 md:h-5 md:ml-2" />
                <span className="hidden md:inline">ورود</span>
              </button>
            )}
          </div>
        </div>
      </header>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}