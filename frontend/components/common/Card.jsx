import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hoverable = true,
  animated = true,
  padding = 'medium',
  gradient = false,
  ...props
}) => {
  const paddingClasses = {
    none: '',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
  };

  const baseClasses = 'bg-white rounded-2xl shadow-lg';

  const classes = `
    ${baseClasses}
    ${paddingClasses[padding]}
    ${hoverable ? 'transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]' : ''}
    ${gradient ? 'bg-gradient-to-br from-white to-gray-50' : ''}
    ${className}
  `;

  const content = (
    <div className={classes} {...props}>
      {children}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

export default Card;