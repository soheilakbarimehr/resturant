import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import CategoryBar from './components/CategoryBar';
import CategorySection from './components/CategorySection';
import DiscountsSection from './components/DiscountsSection';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import FoodDetail from './pages/FoodDetail';
import Cart from './pages/Cart';
import OrderCompletion from './pages/OrderCompletion';
import AdminPanel from './pages/AdminPanel';
import DeliveryPanel from './pages/DeliveryPanel';
import Profile from './pages/Profile';
import { categories, products } from './data/menu';
import { Product } from './types';
import { useAuth } from './context/AuthContext';

function HomePage() {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchResults = (results: Product[]) => {
    setSearchResults(results);
    setIsSearching(results.length > 0);
  };

  return (
    <>
      <CategoryBar />
      
      {/* Search Section - Fixed positioning with increased spacing */}
      <div className="fixed top-[106px] md:top-[122px] left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container px-4 py-6 mx-auto md:py-8">
          <SearchBar onSearchResults={handleSearchResults} />
        </div>
      </div>

      {/* Main content with proper top margin - increased to accommodate larger search bar */}
      <main className="pt-[240px] md:pt-[270px] pb-20">
        {isSearching ? (
          // Search Results
          <div className="container px-4 mx-auto">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-center">نتایج جستجو</h2>
              <p className="text-center text-gray-600 mt-2">{searchResults.length} محصول یافت شد</p>
            </div>
            <div className="max-w-2xl mx-auto space-y-6">
              {searchResults.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-right">
                          {product.originalPrice && (
                            <div className="text-sm text-gray-400 line-through mb-1">
                              {product.originalPrice.toLocaleString('fa-IR')} تومان
                            </div>
                          )}
                          <div className="text-lg font-bold text-gray-900">
                            {product.price.toLocaleString('fa-IR')} تومان
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">{product.rating} ⭐</span>
                          <span className="text-sm text-gray-400">({product.reviews} نظر)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Normal Content
          <>
            <DiscountsSection />
            {categories.map(category => (
              <CategorySection
                key={category.id}
                categoryId={category.id}
                title={category.name}
              />
            ))}
          </>
        )}
      </main>
    </>
  );
}

// Protected Route Component
function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">دسترسی محدود</h1>
          <p className="text-gray-600 mb-6">برای دسترسی به این صفحه باید وارد شوید</p>
        </div>
      </div>
    );
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">دسترسی غیرمجاز</h1>
          <p className="text-gray-600 mb-6">شما اجازه دسترسی به این صفحه را ندارید</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin', 'manager']}>
            <AdminPanel />
          </ProtectedRoute>
        } />
        <Route path="/delivery" element={
          <ProtectedRoute allowedRoles={['delivery']}>
            <DeliveryPanel />
          </ProtectedRoute>
        } />
        <Route path="/*" element={
          <>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/food/:id" element={<FoodDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order-completion" element={<OrderCompletion />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}