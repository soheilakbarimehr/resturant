import { useAdminNavigation } from '../hooks/useAdminNavigation';
import AdminSidebar from '../components/layout/AdminSidebar';
import AdminHeader from '../components/layout/AdminHeader';
import Dashboard from '../components/admin/Dashboard';
import FoodsManagement from '../components/admin/FoodsManagement';
import CategoriesManagement from '../components/admin/CategoriesManagement';
import UserManagement from '../components/admin/UserManagement';
import DeliveryManagement from '../components/admin/DeliveryManagement';
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
      case 'delivery-management':
        return <DeliveryManagement />;
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
    <div className="min-h-screen bg-gray-50 lg:flex">
      <AdminSidebar
        activeSection={activeSection}
        isMobileMenuOpen={isMobileMenuOpen}
        onNavigate={navigateToSection}
        onCloseMobileMenu={closeMobileMenu}
      />

      <div className="flex-1 flex flex-col min-h-screen lg:min-h-0">
        <AdminHeader
          activeSection={activeSection}
          onOpenMobileMenu={openMobileMenu}
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}