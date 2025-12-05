'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { DropdownCategory } from '@/types/navbar';

interface MegaDropdownProps {
  items: DropdownCategory[];
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function MegaDropdown({ items, isOpen, onMouseEnter, onMouseLeave }: MegaDropdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="absolute left-0 right-0 top-full z-40"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="bg-black/90 backdrop-blur-md border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className={`grid gap-8 ${items.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {items.map((category) => (
                  <div key={category.category}>
                    <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-4">
                      {category.category}
                    </h3>
                    <ul className="space-y-3">
                      {category.items.map((item) => (
                        <li key={item.label}>
                          <Link 
                            href={item.href} 
                            className="group block py-1 hover:translate-x-1 transition-transform duration-200"
                          >
                            <div className="text-white font-medium group-hover:text-verde-pastel transition-colors duration-200">
                              {item.label}
                            </div>
                            {item.description && (
                              <div className="text-sm text-white/50 mt-0.5 group-hover:text-white/70 transition-colors duration-200">
                                {item.description}
                              </div>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
