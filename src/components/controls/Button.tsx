import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    className?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    fullWidth = false,
    className = '',
    leftIcon,
    rightIcon
}) => {
    // Size classes
    const sizeClasses = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2.5 text-base',
        lg: 'px-6 py-3 text-lg'
    };

    // Variant classes
    const variantClasses = {
        primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white border-transparent',
        secondary: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 text-white border-transparent',
        success: 'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white border-transparent',
        warning: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 text-white border-transparent',
        danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white border-transparent',
        ghost: 'bg-transparent hover:bg-gray-100 focus:ring-gray-500 text-gray-700 border-transparent',
        outline: 'bg-transparent hover:bg-gray-50 focus:ring-blue-500 text-gray-700 border-gray-300 border'
    };

    // Disabled classes
    const disabledClasses = 'opacity-50 cursor-not-allowed hover:bg-current focus:ring-0';

    // Loading spinner component
    const LoadingSpinner = () => (
        <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`
        inline-flex items-center justify-center font-medium rounded-lg
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${(disabled || loading) ? disabledClasses : ''}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
        >
            {loading && <LoadingSpinner />}
            {!loading && leftIcon && (
                <span className="mr-2 flex items-center">{leftIcon}</span>
            )}

            <span className={loading ? 'opacity-70' : ''}>
                {loading ? 'Đang tải...' : children}
            </span>

            {!loading && rightIcon && (
                <span className="ml-2 flex items-center">{rightIcon}</span>
            )}
        </button>
    );
};

export default Button;