import React from "react";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
  labelPosition?: 'left' | 'right';
}

const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
  variant = 'default',
  className = '',
  labelPosition = 'right'
}) => {
  // Size classes
  const sizeClasses = {
    sm: {
      track: 'w-9 h-5',
      thumb: 'w-4 h-4',
      translate: 'translate-x-4',
      label: 'text-sm',
      description: 'text-xs'
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translate: 'translate-x-5',
      label: 'text-base',
      description: 'text-sm'
    },
    lg: {
      track: 'w-14 h-8',
      thumb: 'w-7 h-7',
      translate: 'translate-x-6',
      label: 'text-lg',
      description: 'text-base'
    }
  };

  // Variant classes
  const variantClasses = {
    default: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    danger: 'bg-red-600'
  };

  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const toggleElement = (
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={handleToggle}
        disabled={disabled}
      />
      
      {/* Track */}
      <div
        className={`
          ${sizeClasses[size].track} rounded-full transition-all duration-200 ease-in-out
          ${disabled
            ? 'bg-gray-200 cursor-not-allowed'
            : checked
              ? `${variantClasses[variant]} shadow-lg`
              : 'bg-gray-300 hover:bg-gray-400'
          }
        `}
      />

      {/* Thumb */}
      <div
        className={`
          absolute top-0.5 left-0.5 ${sizeClasses[size].thumb} bg-white rounded-full
          transition-all duration-200 ease-in-out transform shadow-md
          ${checked ? sizeClasses[size].translate : 'translate-x-0'}
          ${disabled ? 'shadow-sm' : 'hover:shadow-lg'}
        `}
      />

      {/* Focus ring */}
      {!disabled && (
        <div
          className={`
            absolute inset-0 rounded-full transition-all duration-200
            ${checked ? 'ring-2 ring-offset-2 ring-blue-200' : ''}
          `}
        />
      )}
    </div>
  );

  const labelElement = (label || description) && (
    <div className="flex-1 min-w-0">
      {label && (
        <div
          className={`
            ${sizeClasses[size].label} font-medium leading-tight
            ${disabled ? 'text-gray-400' : 'text-gray-900'}
          `}
        >
          {label}
        </div>
      )}
      {description && (
        <div
          className={`
            ${sizeClasses[size].description} leading-tight mt-1
            ${disabled ? 'text-gray-300' : 'text-gray-500'}
          `}
        >
          {description}
        </div>
      )}
    </div>
  );

  if (!label && !description) {
    return (
      <label
        className={`
          inline-flex items-center cursor-pointer
          ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          ${className}
        `}
      >
        {toggleElement}
      </label>
    );
  }

  return (
    <label
      className={`
        flex items-start gap-3 cursor-pointer select-none
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        ${className}
      `}
    >
      {labelPosition === 'left' && labelElement}
      <div className="flex-shrink-0 mt-0.5">
        {toggleElement}
      </div>
      {labelPosition === 'right' && labelElement}
    </label>
  );
};

export default Toggle;
