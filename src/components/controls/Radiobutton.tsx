import React from "react";

interface RadioButtonProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  name?: string;
  disabled?: boolean;
  error?: boolean;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  checked,
  onChange,
  name = "radio-group",
  disabled = false,
  error = false,
  description,
  size = 'md',
  className = ''
}) => {
  // Size classes
  const sizeClasses = {
    sm: {
      radio: 'h-4 w-4',
      dot: 'w-2 h-2',
      text: 'text-sm',
      description: 'text-xs'
    },
    md: {
      radio: 'h-5 w-5',
      dot: 'w-2.5 h-2.5',
      text: 'text-base',
      description: 'text-sm'
    },
    lg: {
      radio: 'h-6 w-6',
      dot: 'w-3 h-3',
      text: 'text-lg',
      description: 'text-base'
    }
  };

  const handleChange = () => {
    if (!disabled) {
      onChange(value);
    }
  };

  return (
    <div className={`${className}`}>
      <label
        className={`
          flex items-start gap-3 cursor-pointer select-none
          ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        `}
      >
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            type="radio"
            name={name}
            value={value}
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            className="sr-only"
          />

          {/* Custom radio button */}
          <div
            className={`
              ${sizeClasses[size].radio} rounded-full border-2 
              flex items-center justify-center
              transition-all duration-200 ease-in-out
              ${disabled
                ? 'border-gray-200 bg-gray-50'
                : error
                  ? checked
                    ? 'border-red-500 bg-white shadow-sm'
                    : 'border-red-300 bg-white hover:border-red-400'
                  : checked
                    ? 'border-blue-500 bg-white shadow-sm ring-2 ring-blue-100'
                    : 'border-gray-300 bg-white hover:border-blue-400 hover:ring-2 hover:ring-blue-50'
              }
            `}
          >
            {/* Inner dot when checked */}
            {checked && (
              <div
                className={`
                  ${sizeClasses[size].dot} rounded-full transition-all duration-200
                  ${disabled
                    ? 'bg-gray-400'
                    : error
                      ? 'bg-red-500'
                      : 'bg-blue-500'
                  }
                `}
              />
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div
            className={`
              ${sizeClasses[size].text} font-medium leading-tight
              ${disabled
                ? 'text-gray-400'
                : error
                  ? 'text-red-700'
                  : 'text-gray-900'
              }
            `}
          >
            {label}
          </div>
          
          {description && (
            <div
              className={`
                ${sizeClasses[size].description} mt-1 leading-tight
                ${disabled
                  ? 'text-gray-300'
                  : error
                    ? 'text-red-600'
                    : 'text-gray-500'
                }
              `}
            >
              {description}
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default RadioButton;
