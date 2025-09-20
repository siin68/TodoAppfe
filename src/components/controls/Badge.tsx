import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  dot?: boolean;
  outline?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  dot = false,
  outline = false
}) => {
  // Size classes
  const sizeClasses = {
    sm: dot ? 'w-2 h-2' : 'px-2 py-0.5 text-xs',
    md: dot ? 'w-2.5 h-2.5' : 'px-2.5 py-1 text-sm',
    lg: dot ? 'w-3 h-3' : 'px-3 py-1.5 text-base'
  };

  // Variant classes
  const variantClasses = {
    default: outline 
      ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
      : 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    primary: outline
      ? 'bg-white border border-blue-300 text-blue-700 hover:bg-blue-50'
      : 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    success: outline
      ? 'bg-white border border-green-300 text-green-700 hover:bg-green-50'
      : 'bg-green-100 text-green-800 hover:bg-green-200',
    warning: outline
      ? 'bg-white border border-yellow-300 text-yellow-700 hover:bg-yellow-50'
      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    danger: outline
      ? 'bg-white border border-red-300 text-red-700 hover:bg-red-50'
      : 'bg-red-100 text-red-800 hover:bg-red-200',
    info: outline
      ? 'bg-white border border-cyan-300 text-cyan-700 hover:bg-cyan-50'
      : 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200'
  };

  // Dot variant classes (solid colors)
  const dotVariantClasses = {
    default: 'bg-gray-400',
    primary: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-cyan-500'
  };

  if (dot) {
    return (
      <span
        className={`
          inline-block rounded-full transition-all duration-200
          ${sizeClasses[size]}
          ${dotVariantClasses[variant]}
          ${className}
        `}
        title={typeof children === 'string' ? children : undefined}
      />
    );
  }

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full transition-all duration-200
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;