import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import PriceDisplay from './PriceDisplay';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const isDiscounted = product.originalPrice !== undefined;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
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
          <button 
            onClick={handleAddToCart}
            className="flex items-center justify-center w-full h-10 mt-3 text-sm text-white transition-all duration-300 bg-red-600 rounded-lg hover:bg-red-700 hover:shadow-md active:scale-95"
          >
            <ShoppingCart className="w-4 h-4 ml-2" />
            افزودن
          </button>
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