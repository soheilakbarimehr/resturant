import { X, LogOut, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { adminMenuItems, AdminSection } from '../../constants/adminMenuItems';
import { useState } from 'react';

interface AdminSidebarProps {
  activeSection: AdminSection;
  isMobileMenuOpen: boolean;
  onNavigate: (section: AdminSection) => void;
  onCloseMobileMenu: () => void;
}

export default function AdminSidebar({ 
  activeSection, 
  isMobileMenuOpen, 
  onNavigate, 
  onCloseMobileMenu 
}: AdminSidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set(['products', 'users']));

  const handleMenuItemClick = (itemId: string) => {
    const menuItem = adminMenuItems.find(item => item.id === itemId);
    
    if (menuItem?.hasSubmenu) {
      // Toggle submenu expansion
      const newExpanded = new Set(expandedMenus);
      if (newExpanded.has(itemId)) {
        newExpanded.delete(itemId);
      } else {
        newExpanded.add(itemId);
      }
      setExpandedMenus(newExpanded);
    } else {
      // Navigate to section
      if (itemId === 'products') {
        onNavigate('foods');
      } else if (itemId === 'users') {
        onNavigate('user-management');
      } else {
        onNavigate(itemId as AdminSection);
      }
    }
  };

  const isMenuItemActive = (itemId: string) => {
    if (itemId === 'products') {
      return activeSection === 'foods' || activeSection === 'categories';
    }
    if (itemId === 'users') {
      return activeSection === 'user-management' || activeSection === 'delivery-management';
    }
    return activeSection === itemId;
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onCloseMobileMenu}
        />
      )}

      {/* Sidebar - Fixed positioning and sticky for desktop */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col lg:h-screen lg:sticky lg:top-0 lg:max-h-screen ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:justify-center flex-shrink-0">
          <h1 className="text-lg font-bold text-gray-900 md:text-xl">پنل مدیریت</h1>
          <button
            onClick={onCloseMobileMenu}
            className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {adminMenuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors text-right md:text-base md:px-4 md:py-3 ${
                    isMenuItemActive(item.id)
                      ? 'bg-red-100 text-red-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                  </div>
                  {item.hasSubmenu && (
                    <div className="flex-shrink-0">
                      {expandedMenus.has(item.id) ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  )}
                </button>
                
                {/* Submenu */}
                {item.submenuItems && expandedMenus.has(item.id) && (
                  <ul className="mt-2 mr-6 space-y-1 md:mr-8">
                    {item.submenuItems.map((subItem) => (
                      <li key={subItem.id}>
                        <button
                          onClick={() => onNavigate(subItem.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg transition-colors text-right md:text-sm md:px-4 ${
                            activeSection === subItem.id
                              ? 'bg-red-50 text-red-600 font-medium'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {subItem.icon}
                          {subItem.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Exit Button for Mobile */}
        <div className="p-4 border-t border-gray-200 lg:hidden flex-shrink-0">
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 bg-red-50 rounded-lg transition-colors hover:bg-red-100 md:text-base md:px-4 md:py-3"
          >
            <LogOut className="w-4 h-4 md:w-5 md:h-5" />
            خروج از پنل ادمین
          </Link>
        </div>
      </div>
    </>
  );
}