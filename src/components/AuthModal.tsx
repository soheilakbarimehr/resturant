import { useState } from 'react';
import { X, Phone, Lock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        const success = await login(phone, password);
        if (success) {
          onClose();
        } else {
          setError('شماره تلفن یا رمز عبور اشتباه است');
        }
      } else {
        // Handle registration logic here
        setError('ثبت نام در حال حاضر فعال نیست');
      }
    } catch (err) {
      setError('خطایی رخ داده است');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{isLogin ? 'ورود' : 'ثبت نام'}</h2>
          <button onClick={onClose} className="p-2 text-gray-500 transition-colors rounded-full hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Demo Credentials */}
        <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg text-sm">
          <p className="font-medium mb-1">حساب‌های آزمایشی:</p>
          <p>ادمین: 09123456789 / 123456</p>
          <p>مشتری: 09123456789 / 123456</p>
          <p>پیک: 09333333333 / 123456</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">نام</label>
                <div className="relative">
                  <User className="absolute w-5 h-5 text-gray-400 right-3 top-3" />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="نام خود را وارد کنید"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">نام خانوادگی</label>
                <div className="relative">
                  <User className="absolute w-5 h-5 text-gray-400 right-3 top-3" />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="نام خانوادگی خود را وارد کنید"
                    required
                  />
                </div>
              </div>
            </>
          )}
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">شماره تماس</label>
            <div className="relative">
              <Phone className="absolute w-5 h-5 text-gray-400 right-3 top-3" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-right"
                placeholder="شماره تماس خود را وارد کنید"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">رمز عبور</label>
            <div className="relative">
              <Lock className="absolute w-5 h-5 text-gray-400 right-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                placeholder="رمز عبور خود را وارد کنید"
                required
              />
            </div>
          </div>
          
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-3 text-white transition-colors rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-gray-400"
          >
            {isLoading ? 'در حال پردازش...' : (isLogin ? 'ورود' : 'ثبت نام')}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-red-600 hover:underline"
          >
            {isLogin ? 'حساب کاربری ندارید؟ ثبت نام کنید' : 'حساب کاربری دارید؟ وارد شوید'}
          </button>
        </div>
      </div>
    </div>
  );
}