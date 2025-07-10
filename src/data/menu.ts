import { Category, Product } from '../types';

export const categories: Category[] = [
  { id: 'burger', name: 'برگر', icon: 'burger' },
  { id: 'pizza', name: 'پیتزا', icon: 'pizza' },
  { id: 'hotdog', name: 'هات داگ', icon: 'hotdog' },
  { id: 'sandwich', name: 'ساندویچ', icon: 'sandwich' },
  { id: 'iranian', name: 'غذای ایرانی', icon: 'utensils' },
  { id: 'drinks', name: 'نوشیدنی', icon: 'coffee' },
];

export const products: Product[] = [
  // Category: Burger
  {
    id: '1',
    name: 'چیز برگر دوبل',
    description: 'برگر گوشت دوبل با پنیر چدار، کاهو، گوجه و سس مخصوص',
    price: 185000,
    originalPrice: 220000,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
    rating: 4.8,
    reviews: 124,
    category: 'burger'
  },
  {
    id: '2',
    name: 'برگر مرغ',
    description: 'برگر مرغ کبابی با سس مایونز و سبزیجات تازه',
    price: 120000,
    originalPrice: 150000,
    image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg',
    rating: 4.6,
    reviews: 90,
    category: 'burger'
  },
  {
    id: '3',
    name: 'برگر گیاهی',
    description: 'برگر گیاهی با پاته سویا و سبزیجات ارگانیک',
    price: 140000,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    rating: 4.4,
    reviews: 70,
    category: 'burger'
  },
  {
    id: '30',
    name: 'برگر مخصوص',
    description: 'برگر گوشت , سرو با سس مخصوص',
    price: 120000,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    rating: 4.9,
    reviews: 75,
    category: 'burger'
  },
  // Category: Pizza
  {
    id: '4',
    name: 'پیتزا پپرونی',
    description: 'پیتزا با خمیر تازه، سس مخصوص، پپرونی و پنیر موزارلا',
    price: 125000,
    originalPrice: 165000,
    image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg',
    rating: 4.5,
    reviews: 89,
    category: 'pizza'
  },
  {
    id: '5',
    name: 'پیتزا مارگریتا',
    description: 'پیتزا کلاسیک با سس گوجه، موزارلا و ریحان تازه',
    price: 145000,
    image: 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg',
    rating: 4.7,
    reviews: 95,
    category: 'pizza'
  },
  {
    id: '6',
    name: 'پیتزا سبزیجات',
    description: 'پیتزا با انواع سبزیجات تازه و پنیر پارمزان',
    price: 120000,
    originalPrice: 160000,
    image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg',
    rating: 4.6,
    reviews: 80,
    category: 'pizza'
  },
  // Category: Hotdog
  {
    id: '7',
    name: 'هات داگ کلاسیک',
    description: 'هات داگ با نان تازه و سس خردل',
    price: 65000,
    originalPrice: 80000,
    image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg',
    rating: 4.2,
    reviews: 60,
    category: 'hotdog'
  },
  {
    id: '8',
    name: 'هات داگ چیلی',
    description: 'هات داگ با سس چیلی تند و پنیر',
    price: 90000,
    image: 'https://images.pexels.com/photos/1256875/pexels-photo-1256875.jpeg',
    rating: 4.3,
    reviews: 55,
    category: 'hotdog'
  },
  {
    id: '9',
    name: 'هات داگ مرغ',
    description: 'هات داگ با گوشت مرغ و سبزیجات',
    price: 85000,
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg',
    rating: 4.1,
    reviews: 50,
    category: 'hotdog'
  },
  // Category: Sandwich
  {
    id: '10',
    name: 'ساندویچ مرغ گریل',
    description: 'ساندویچ با فیله مرغ گریل و سس مخصوص',
    price: 95000,
    originalPrice: 120000,
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
    rating: 4.5,
    reviews: 75,
    category: 'sandwich'
  },
  {
    id: '11',
    name: 'ساندویچ تن ماهی',
    description: 'ساندویچ با تن ماهی و سبزیجات تازه',
    price: 110000,
    image: 'https://images.pexels.com/photos/2092090/pexels-photo-2092090.jpeg',
    rating: 4.4,
    reviews: 65,
    category: 'sandwich'
  },
  // Category: Iranian
  {
    id: '12',
    name: 'قورمه سبزی',
    description: 'غذای ایرانی با سبزیجات تازه و گوشت',
    price: 98000,
    originalPrice: 130000,
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
    rating: 4.7,
    reviews: 100,
    category: 'iranian'
  },
  // Category: Drinks
  {
    id: '13',
    name: 'چای سرد',
    description: 'چای سرد با طعم لیمو',
    price: 30000,
    image: 'https://images.pexels.com/photos/1352277/pexels-photo-1352277.jpeg',
    rating: 4.2,
    reviews: 45,
    category: 'drinks'
  },
  {
    id: '14',
    name: 'آبمیوه طبیعی',
    description: 'آبمیوه تازه پرتقال',
    price: 32000,
    originalPrice: 40000,
    image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg',
    rating: 4.3,
    reviews: 50,
    category: 'drinks'
  }
];