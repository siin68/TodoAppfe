import React from "react";

interface RadioButtonProps {
    label: string;
    value: string;
    checked: boolean;
    onChange: (value: string) => void;
    className?: string;
    isDanger?: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({
    label,
    value,
    checked,
    onChange,
    className,
    isDanger,
}) => {
    return (
        <label
            htmlFor={value}
            className={`flex items-center gap-2 cursor-pointer select-none ${className}`}
        >
            <div className="relative">
                <input
                    type="radio"
                    id={value}
                    name="radio-group"
                    value={value}
                    checked={checked}
                    onChange={() => onChange(value)}
                    className="sr-only"
                />

                {/* Custom radio button */}
                <div
                    className={`
                        h-4 w-4 rounded-full border-2 cursor-pointer
                        flex items-center justify-center
                        transition-all duration-200 ease-in-out
                        ${isDanger
                            ? checked
                                ? "border-red-500 bg-white"
                                : "border-gray-300 bg-white hover:border-red-400"
                            : checked
                                ? "border-orange-500 bg-white"
                                : "border-gray-300 bg-white hover:border-orange-400"
                        }
                    `}
                >
                    {/* Inner dot when checked */}
                    {checked && (
                        <div
                            className={`
                                w-2 h-2 rounded-full
                                ${isDanger ? "bg-red-500" : "bg-orange-500"}
                            `}
                        />
                    )}
                </div>
            </div>

            <span
                className={`text-sm ${isDanger ? "text-red-600 font-medium" : "text-gray-700"}`}
            >
                {label}
            </span>
        </label>
    );
};

export default RadioButton;
