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
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="dropdown"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ 
            duration: 0.15,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="absolute left-1/2 -translate-x-1/2 top-full z-40 w-[700px] pt-3"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* Arrow pointing up */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-1.5 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-black/90" />
          
          <motion.div 
            className="bg-black/90 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.05 }}
          >
            <div className="px-8 py-6">
              <div className="grid grid-cols-3 gap-8">
                {items.map((category, categoryIndex) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.15,
                      delay: 0.05 + (categoryIndex * 0.03),
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  >
                    <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
                      {category.category}
                    </h3>
                    <ul className="space-y-2.5">
                      {category.items.map((item, itemIndex) => (
                        <motion.li
                          key={item.label}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            duration: 0.12,
                            delay: 0.08 + (categoryIndex * 0.03) + (itemIndex * 0.02),
                            ease: [0.4, 0, 0.2, 1]
                          }}
                        >
                          <Link 
                            href={item.href} 
                            className="group block"
                          >
                            <div className="text-white font-normal text-sm group-hover:text-verde-pastel transition-colors duration-150">
                              {item.label}
                            </div>
                            {item.description && (
                              <div className="text-xs text-white/40 mt-0.5 group-hover:text-white/60 transition-colors duration-150">
                                {item.description}
                              </div>
                            )}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
