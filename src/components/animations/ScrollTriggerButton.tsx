'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollTriggerButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

export function ScrollTriggerButton({ children, className = '', ...props }: ScrollTriggerButtonProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Only apply scroll-triggered animation on mobile
  if (!isMobile) {
    if (props.href) {
      return (
        <a {...props} className={className}>
          {children}
        </a>
      );
    }
    return (
      <button {...props} className={className}>
        {children}
      </button>
    );
  }

  // Mobile: scroll-triggered animation
  const Tag = props.href ? motion.a : motion.button;

  return (
    <Tag
      ref={ref}
      {...props}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      whileHover="hover"
    >
      {children}
    </Tag>
  );
}
