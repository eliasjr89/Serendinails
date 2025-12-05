'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { DropdownCategory } from '@/types/navbar';

interface MegaDropdownProps {
  items: DropdownCategory[];
  isOpen: boolean;
  arrowPosition: number; // Position of arrow in pixels from left
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function MegaDropdown({ items, isOpen, arrowPosition, onMouseEnter, onMouseLeave }: MegaDropdownProps) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && items.length > 0 && (
        <motion.div
          key="shared-dropdown"
          initial={{ opacity: 0, visibility: 'hidden' }}
          animate={{ 
            opacity: 1, 
            visibility: 'visible'
          }}
          exit={{ opacity: 0, visibility: 'hidden' }}
          transition={{ 
            opacity: { duration: 0.6, ease: [0.165, 0.84, 0.44, 1] },
            visibility: { duration: 0.3, ease: 'linear' }
          }}
          className="fixed left-1/2 -translate-x-1/2 top-20 z-40"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* Arrow pointing up - moves to point at active link */}
          <motion.div 
            animate={{ 
              x: arrowPosition
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.165, 0.84, 0.44, 1] 
            }}
            className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-black z-10"
          />
          
          <motion.div 
            layout
            transition={{ 
              layout: { duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }
            }}
            className="rounded-lg bg-black overflow-hidden mt-0"
            style={{
              boxShadow: '0 134px 80px 0 rgba(0, 0, 0, 0.05), 0 60px 60px 0 rgba(0, 0, 0, 0.09), 0 15px 33px 0 rgba(0, 0, 0, 0.1)'
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                opacity: { duration: 0.3, ease: 'linear' }
              }}
              className="p-10"
            >
              <div className="flex flex-row justify-start items-start gap-8">
                {items.map((category, categoryIndex) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ 
                      duration: 0.15,
                      delay: 0.05 + (categoryIndex * 0.03),
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="flex-shrink-0 min-w-[180px]"
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
                          exit={{ opacity: 0, y: 4 }}
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
                            <div className="text-white font-normal text-sm group-hover:text-verde-pastel transition-colors duration-150 whitespace-nowrap">
                              {item.label}
                            </div>
                            {item.description && (
                              <div className="text-xs text-white/40 mt-0.5 group-hover:text-white/60 transition-colors duration-150 whitespace-nowrap">
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
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
