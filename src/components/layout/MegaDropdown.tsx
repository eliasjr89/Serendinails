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
            <div className="max-w-7xl mx-auto px-8 py-12">
              <div className="grid grid-cols-3 gap-12">
                {items.map((category) => (
                  <div key={category.category}>
                    <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-6 letter-spacing-wide">
                      {category.category}
                    </h3>
                    <ul className="space-y-4">
                      {category.items.map((item) => (
                        <li key={item.label}>
                          <Link 
                            href={item.href} 
                            className="group block"
                          >
                            <div className="text-white font-normal text-base group-hover:text-white/80 transition-colors duration-150">
                              {item.label}
                            </div>
                            {item.description && (
                              <div className="text-sm text-white/40 mt-1 group-hover:text-white/50 transition-colors duration-150">
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
