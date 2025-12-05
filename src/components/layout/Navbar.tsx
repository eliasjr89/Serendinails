'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronUp } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { MegaDropdown } from './MegaDropdown';
import { menuItems } from '@/data/menuItems';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [arrowPosition, setArrowPosition] = useState(0);
  const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();
  const closeTimeoutRef = useRef<NodeJS.Timeout>();
  const linkRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
    if ((isMobileMenuOpen || activeDropdown) && latest > 50) {
      setIsMobileMenuOpen(false);
      setActiveDropdown(null);
    }
  });

  const updateArrowPosition = (label: string) => {
    const linkElement = linkRefs.current[label];
    if (linkElement) {
      const rect = linkElement.getBoundingClientRect();
      const screenCenter = window.innerWidth / 2;
      const linkCenter = rect.left + rect.width / 2;
      const offset = linkCenter - screenCenter;
      setArrowPosition(offset);
    }
  };

  const handleMouseEnter = (label: string, hasDropdown?: boolean) => {
    if (!hasDropdown) return;
    
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    
    updateArrowPosition(label);
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(label);
    }, 50);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    closeTimeoutRef.current = setTimeout(() => {
      if (!isHoveringDropdown) {
        setActiveDropdown(null);
      }
    }, 200);
  };

  const handleDropdownMouseEnter = () => {
    setIsHoveringDropdown(true);
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
  };

  const handleDropdownMouseLeave = () => {
    setIsHoveringDropdown(false);
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const handleLinkClick = (e: React.MouseEvent, label: string, hasDropdown?: boolean) => {
    if (hasDropdown) {
      e.preventDefault();
      if (activeDropdown === label) {
        setActiveDropdown(null);
      } else {
        updateArrowPosition(label);
        setActiveDropdown(label);
      }
    }
  };

  useEffect(() => {
    const handleClick = () => {
      setActiveDropdown(null);
    };
    
    if (activeDropdown) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [activeDropdown]);

  useEffect(() => {
    if (activeDropdown) {
      updateArrowPosition(activeDropdown);
    }
  }, [activeDropdown]);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const activeDropdownItems = menuItems.find(item => item.label === activeDropdown)?.dropdownItems || [];

  // Navbar should darken when scrolled OR when dropdown is active
  const shouldDarken = isScrolled || !!activeDropdown;

  return (
    <>
      <motion.nav
        initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
        animate={{
          backgroundColor: shouldDarken ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0)',
          backdropFilter: shouldDarken ? 'blur(10px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 mb-4"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Left with Gold Gradient */}
            <Link href="/" className="flex items-center space-x-2 group z-50">
              <span className="font-display text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 transition-all duration-400">
                SERENDINAILS
              </span>
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
              {menuItems.map((item) => (
                <div
                  key={item.label}
                  ref={(el) => { linkRefs.current[item.label] = el; }}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label, item.hasDropdown)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={(e) => handleLinkClick(e, item.label, item.hasDropdown)}
                    className={`${
                      shouldDarken 
                        ? 'text-white' 
                        : 'text-gray-900 dark:text-white'
                    } hover:text-white/80 dark:hover:text-white/80 transition-colors duration-300 font-normal text-base flex items-center gap-1 bg-transparent border-none cursor-pointer`}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <motion.div
                        animate={{ rotate: activeDropdown === item.label ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        <ChevronUp className="w-4 h-4" />
                      </motion.div>
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Right Side - CTA and Theme Toggle */}
            <div className="hidden md:flex items-center space-x-4">
              {/* CTA Button with Gold Hover */}
              <a
                href="https://www.fresha.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`relative px-6 py-2.5 rounded-md border ${
                  shouldDarken 
                    ? 'border-white text-white' 
                    : 'border-gray-900 text-gray-900 dark:border-white dark:text-white'
                } font-medium overflow-hidden group`}
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-400">
                  Reservar Cita
                </span>
                {/* Gold gradient fill from left */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                />
              </a>

              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4 z-50">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`${
                  shouldDarken 
                    ? 'text-white' 
                    : 'text-gray-900 dark:text-white'
                } hover:text-verde-pastel transition-colors p-2`}
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

        {/* Shared Dropdown - Centered with moving arrow */}
        <MegaDropdown
          items={activeDropdownItems}
          isOpen={!!activeDropdown}
          arrowPosition={arrowPosition}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        />
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed top-20 left-0 right-0 bg-black/95 backdrop-blur-md overflow-hidden z-40 md:hidden"
          >
            <div className="px-4 py-6 space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {menuItems.map((item) => (
                <div key={item.label}>
                  <button
                    onClick={(e) => {
                      if (!item.hasDropdown) {
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    className="block text-white hover:text-verde-pastel transition-colors duration-300 py-2 font-medium text-lg flex items-center gap-2 bg-transparent border-none w-full text-left"
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  
                  {/* Mobile Dropdown Items */}
                  {item.hasDropdown && item.dropdownItems && (
                    <div className="ml-4 mt-3 space-y-4 pb-4 border-l-2 border-white/10 pl-4">
                      {item.dropdownItems.map((category) => (
                        <div key={category.category}>
                          <p className="text-xs text-white/50 uppercase tracking-wider mb-2 font-semibold">
                            {category.category}
                          </p>
                          <div className="space-y-2">
                            {category.items.map((subItem) => (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-white/80 hover:text-verde-pastel transition-colors duration-300 py-1.5 text-sm"
                              >
                                {subItem.label}
                                {subItem.description && (
                                  <span className="block text-xs text-white/40 mt-0.5">
                                    {subItem.description}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
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
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-6 py-3 rounded-md border border-white text-white font-semibold mt-6 hover:bg-gradient-to-r hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 hover:text-black transition-all duration-400"
              >
                Reservar Cita
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
