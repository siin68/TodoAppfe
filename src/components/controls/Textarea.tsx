import React, { useState, useRef, useEffect } from 'react';

interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  autoResize?: boolean;
  className?: string;
  required?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  placeholder = "Nhập nội dung...",
  label,
  error = false,
  errorMessage,
  helperText,
  disabled = false,
  rows = 4,
  maxLength,
  resize = 'vertical',
  autoResize = false,
  className = '',
  required = false
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto resize functionality
  useEffect(() => {
    if (autoResize && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value, autoResize]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize'
  };

  const characterCount = value.length;
  const isNearLimit = maxLength && characterCount > maxLength * 0.8;
  const isOverLimit = maxLength && characterCount > maxLength;

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Textarea Container */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          rows={autoResize ? 1 : rows}
          maxLength={maxLength}
          className={`
            w-full px-4 py-3 rounded-lg border transition-all duration-200
            placeholder-gray-400 focus:outline-none
            ${resizeClasses[resize]}
            ${disabled
              ? 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed'
              : error
                ? 'border-red-300 bg-white focus:border-red-500 focus:ring-2 focus:ring-red-200'
                : isFocused
                  ? 'border-blue-500 bg-white ring-2 ring-blue-200'
                  : 'border-gray-300 bg-white hover:border-gray-400'
            }
          `}
        />

        {/* Character count (floating) */}
        {maxLength && (
          <div
            className={`
              absolute bottom-2 right-3 text-xs font-medium
              ${isOverLimit
                ? 'text-red-500'
                : isNearLimit
                  ? 'text-yellow-600'
                  : 'text-gray-400'
              }
            `}
          >
            {characterCount}/{maxLength}
          </div>
        )}
      </div>

      {/* Helper text or Error message */}
      {(error && errorMessage) ? (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {errorMessage}
        </p>
      ) : helperText ? (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
};

export default Textarea;
                
