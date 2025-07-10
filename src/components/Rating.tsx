import { Star, User } from 'lucide-react';

interface RatingProps {
  rating: number;
  reviews: number;
}

export default function Rating({ rating, reviews }: RatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center text-sm">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < fullStars ? 'fill-yellow-400 text-yellow-400' : i === fullStars && hasHalfStar ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
      <span className="mr-2 text-gray-600">{reviews} نظر</span>
      <User className="w-4 h-4 mr-1 text-gray-400" />
    </div>
  );
}