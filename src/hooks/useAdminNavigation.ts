import { useState } from 'react';
import { AdminSection } from '../constants/adminMenuItems';

export const useAdminNavigation = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateToSection = (section: AdminSection) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  return {
    activeSection,
    isMobileMenuOpen,
    navigateToSection,
    closeMobileMenu,
    openMobileMenu
  };
};