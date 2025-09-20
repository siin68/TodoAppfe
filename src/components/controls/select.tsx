import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: Option[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Select: React.FC<SelectProps> = ({
  options = [],
  value,
  placeholder = "Chọn một tùy chọn...",
  onChange,
  disabled = false,
  error = false,
  errorMessage,
  label,
  className = "",
  size = 'md'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options.find(opt => opt.value === value) || null
  );
  const selectRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cập nhật selected option khi value prop thay đổi
  useEffect(() => {
    const option = options.find(opt => opt.value === value);
    setSelectedOption(option || null);
  }, [value, options]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option: Option) => {
    if (!option.disabled) {
      setSelectedOption(option);
      setIsOpen(false);
      onChange?.(option.value);
    }
  };

  // Xử lý keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          // Focus next option logic could be added here
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          // Focus previous option logic could be added here
        }
        break;
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      {/* Select Button */}
      <div
        className={`
          relative w-full cursor-pointer rounded-lg border transition-all duration-200
          ${disabled 
            ? 'bg-gray-50 border-gray-200 cursor-not-allowed' 
            : error
              ? 'border-red-300 bg-white hover:border-red-400 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-200'
              : 'border-gray-300 bg-white hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200'
          }
          ${sizeClasses[size]}
        `}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center justify-between">
          <span className={`block truncate ${
            selectedOption 
              ? 'text-gray-900' 
              : 'text-gray-500'
          }`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          
          {/* Arrow Icon */}
          <svg
            className={`
              ${iconSizeClasses[size]} text-gray-400 transition-transform duration-200
              ${isOpen ? 'rotate-180' : 'rotate-0'}
            `}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-gray-500 text-center">
              Không có tùy chọn nào
            </div>
          ) : (
            <ul role="listbox" className="py-1">
              {options.map((option) => (
                <li
                  key={option.value}
                  className={`
                    px-4 py-3 cursor-pointer transition-colors duration-150
                    ${option.disabled
                      ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                      : selectedOption?.value === option.value
                        ? 'bg-blue-50 text-blue-900 font-medium'
                        : 'text-gray-900 hover:bg-gray-50'
                    }
                  `}
                  onClick={() => handleSelect(option)}
                  role="option"
                  aria-selected={selectedOption?.value === option.value}
                >
                  <div className="flex items-center justify-between">
                    <span className="block truncate">{option.label}</span>
                    {selectedOption?.value === option.value && (
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && errorMessage && (
        <p className="mt-2 text-sm text-red-600">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Select;