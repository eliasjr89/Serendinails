'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
}

export function FadeInUp({ children, delay = 0, className = '', duration = 0.8 }: FadeInUpProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 20,
        filter: 'blur(4px)'
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        filter: 'blur(0px)'
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
