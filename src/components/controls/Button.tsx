import React from 'react';

interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    isDanger?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled, isLoading, isDanger, className }) => {
    return (
        <div>
            <button
                className={`font-bold py-2 px-4 rounded ${isDanger ? 'bg-red-500' : 'bg-blue-500'} text-white ${className}`}
                onClick={onClick}
                disabled={disabled}
            >
                {isLoading ? 'Loading...' : label}
            </button>
        </div>
    );
};

export default Button;