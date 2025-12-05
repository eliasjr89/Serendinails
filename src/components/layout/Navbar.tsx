'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from 'framer-motion';
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
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          borderBottomColor: isScrolled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group z-50">
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
                    className="text-white hover:text-white/80 transition-colors duration-200 font-normal text-base"
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

              {/* CTA Button with Fill Effect */}
              <a
                href="https://www.fresha.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-6 py-2.5 rounded-md border border-white text-white font-medium overflow-hidden group"
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                  Reservar Cita
                </span>
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{ transformOrigin: 'left' }}
                />
              </a>

              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4 z-50">
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
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-20 left-0 right-0 bg-black/95 backdrop-blur-md overflow-hidden z-40 md:hidden"
          >
            <div className="px-4 py-6 space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {menuItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => !item.hasDropdown && setIsMobileMenuOpen(false)}
                    className="block text-white hover:text-verde-pastel transition-colors py-2 font-medium text-lg"
                  >
                    {item.label}
                  </Link>
                  
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
                                className="block text-white/80 hover:text-verde-pastel transition-colors py-1.5 text-sm"
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
                className="block w-full text-center px-6 py-3 rounded-md border border-white text-white font-semibold mt-6 hover:bg-white hover:text-black transition-colors duration-300"
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
