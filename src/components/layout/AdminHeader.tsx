import { Menu, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminSection, getSectionTitle } from '../../constants/adminMenuItems';

interface AdminHeaderProps {
  activeSection: AdminSection;
  onOpenMobileMenu: () => void;
}

export default function AdminHeader({ activeSection, onOpenMobileMenu }: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900 md:text-xl">
            {getSectionTitle(activeSection)}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-gray-500 md:text-sm">
            مدیر سیستم
          </div>
          <Link
            to="/"
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-xs text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors md:text-sm md:px-4 md:py-2"
          >
            <LogOut className="w-4 h-4 md:w-5 md:h-5" />
            خروج
          </Link>
        </div>
      </div>
    </header>
  );
}