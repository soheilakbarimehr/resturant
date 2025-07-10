import { useAdminNavigation } from '../hooks/useAdminNavigation';
import AdminSidebar from '../components/layout/AdminSidebar';
import AdminHeader from '../components/layout/AdminHeader';
import Dashboard from '../components/admin/Dashboard';
import FoodsManagement from '../components/admin/FoodsManagement';
import CategoriesManagement from '../components/admin/CategoriesManagement';
import UserManagement from '../components/admin/UserManagement';
import RestaurantInfo from '../components/admin/RestaurantInfo';
import DeliveryInfo from '../components/admin/DeliveryInfo';
import OrdersManagement from '../components/admin/OrdersManagement';
import Reports from '../components/admin/Reports';
import Settings from '../components/admin/Settings';

export default function AdminPanel() {
  const {
    activeSection,
    isMobileMenuOpen,
    navigateToSection,
    closeMobileMenu,
    openMobileMenu
  } = useAdminNavigation();

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'foods':
        return <FoodsManagement />;
      case 'categories':
        return <CategoriesManagement />;
      case 'user-management':
        return <UserManagement />;
      case 'restaurant-info':
        return <RestaurantInfo />;
      case 'delivery-info':
        return <DeliveryInfo />;
      case 'orders':
        return <OrdersManagement />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar
        activeSection={activeSection}
        isMobileMenuOpen={isMobileMenuOpen}
        onNavigate={navigateToSection}
        onCloseMobileMenu={closeMobileMenu}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <AdminHeader
          activeSection={activeSection}
          onOpenMobileMenu={openMobileMenu}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}