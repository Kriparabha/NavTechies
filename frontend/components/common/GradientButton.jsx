import React from 'react';
import { motion } from 'framer-motion';

const GradientButton = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-semibold rounded-lg shadow-lg transform transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-xl hover:-translate-y-0.5',
    secondary: 'bg-white text-primary-600 border-2 border-primary-200 hover:shadow-lg hover:-translate-y-0.5',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-xl hover:-translate-y-0.5',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-xl hover:-translate-y-0.5',
  };

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3',
    large: 'px-8 py-4 text-lg',
  };

  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-current mr-2" />
          Loading...
        </div>
      ) : children}
    </motion.button>
  );
};

export default GradientButton;