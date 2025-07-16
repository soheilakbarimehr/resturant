import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import PriceDisplay from './PriceDisplay';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { items, addItem, updateQuantity } = useCart();
  const isDiscounted = product.originalPrice !== undefined;
  
  // Find if this product is already in cart
  const cartItem = items.find(item => item.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    
    // Show success alert
    const productName = product.name;
    const alertDiv = document.createElement('div');
    alertDiv.className = 'fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out';
    alertDiv.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>${productName} با موفقیت به سبد خرید اضافه شد</span>
      </div>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Remove alert after 3 seconds
    setTimeout(() => {
      alertDiv.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(alertDiv);
      }, 300);
    }, 3000);
  };

  const handleIncreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity - 1);
    }
  };

  return (
    <Link to={`/food/${product.id}`}>
      <div className={`flex items-start p-4 mb-6 rounded-lg transition-all duration-300 hover:shadow-md cursor-pointer ${
        isDiscounted ? 'border-2 border-orange-400 bg-orange-50' : 'bg-white shadow-sm hover:shadow-lg'
      }`}>
        <div className="flex flex-col items-center w-24 ml-4">
          <div className="w-24 h-24 overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
            />
          </div>
          
          {/* Cart Controls */}
          {quantityInCart > 0 ? (
            <div className="flex items-center gap-1 mt-3 bg-red-600 rounded-lg p-1">
              <button 
                onClick={handleDecreaseQuantity}
                className="flex items-center justify-center w-8 h-8 text-white transition-all duration-300 hover:bg-red-700 rounded-md active:scale-95"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white">
                {quantityInCart}
              </span>
              <button 
                onClick={handleIncreaseQuantity}
                className="flex items-center justify-center w-8 h-8 text-white transition-all duration-300 hover:bg-red-700 rounded-md active:scale-95"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleAddToCart}
              className="flex items-center justify-center w-full h-10 mt-3 text-sm text-white transition-all duration-300 bg-red-600 rounded-lg hover:bg-red-700 hover:shadow-md active:scale-95"
            >
              <ShoppingCart className="w-4 h-4 ml-2" />
              افزودن
            </button>
          )}
        </div>
        <div className="flex-1 text-right">
          <h3 className="mb-2 text-base font-semibold transition-colors hover:text-red-600">{product.name}</h3>
          <p className="mb-4 text-sm text-gray-600 line-clamp-2">{product.description}</p>
          <Rating rating={product.rating} reviews={product.reviews} />
          <div className="mt-3">
            <PriceDisplay price={product.price} originalPrice={product.originalPrice} />
          </div>
        </div>
      </div>
    </Link>
  );
}