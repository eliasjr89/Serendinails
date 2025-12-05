'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { MegaDropdown } from './MegaDropdown';
import { menuItems } from '@/data/menuItems';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
    // Close mobile menu and dropdowns on scroll
    if ((isMobileMenuOpen || activeDropdown) && latest > 50) {
      setIsMobileMenuOpen(false);
      setActiveDropdown(null);
    }
  });

  const handleMouseEnter = (label: string, hasDropdown?: boolean) => {
    if (!hasDropdown) return;
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      if (!isHoveringDropdown) {
        setActiveDropdown(null);
      }
    }, 100);
  };

  const handleDropdownMouseEnter = () => {
    setIsHoveringDropdown(true);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handleDropdownMouseLeave = () => {
    setIsHoveringDropdown(false);
    setActiveDropdown(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = () => {
      setActiveDropdown(null);
    };
    
    if (activeDropdown) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [activeDropdown]);

  return (
    <>
      <motion.nav
        initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
        animate={{
          backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0)',
          backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/0"
        style={{
          borderBottomColor: isScrolled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="font-display text-2xl font-bold text-white group-hover:text-verde-pastel transition-colors duration-200">
                Serendinails
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label, item.hasDropdown)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="text-white hover:text-verde-pastel transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </Link>
                  
                  {item.hasDropdown && item.dropdownItems && (
                    <MegaDropdown
                      items={item.dropdownItems}
                      isOpen={activeDropdown === item.label}
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleDropdownMouseLeave}
                    />
                  )}
                </div>
              ))}

              {/* CTA Button */}
              <a
                href="https://www.fresha.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-verde-pastel to-dorado text-black font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Reservar Cita
              </a>

              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-verde-pastel transition-colors p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-20 left-0 right-0 bg-black/95 backdrop-blur-md overflow-hidden z-40 md:hidden"
      >
        <div className="px-4 py-6 space-y-4">
          {menuItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-white hover:text-verde-pastel transition-colors py-2 font-medium"
              >
                {item.label}
              </Link>
              
              {/* Mobile Dropdown Items */}
              {item.hasDropdown && item.dropdownItems && (
                <div className="ml-4 mt-2 space-y-2">
                  {item.dropdownItems.map((category) => (
                    <div key={category.category}>
                      <p className="text-xs text-white/60 uppercase tracking-wider mb-2">
                        {category.category}
                      </p>
                      {category.items.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-white/80 hover:text-verde-pastel transition-colors py-1.5 text-sm"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <a
            href="https://www.fresha.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-6 py-3 rounded-lg bg-gradient-to-r from-verde-pastel to-dorado text-black font-semibold mt-4"
          >
            Reservar Cita
          </a>
        </div>
      </motion.div>
    </>
  );
}
