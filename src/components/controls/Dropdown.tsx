import React from 'react';

interface DropdownProps {
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
    className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onChange, className }) => {
    return (
        <div className={className}>
            <select className="border border-gray-300 p-2 rounded" onChange={(e) => onChange(e.target.value)}>
                <option value="">Select an option</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
              