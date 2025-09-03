import React from 'react';

interface TextareaProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
    limit?: number;
}

const Textarea: React.FC<TextareaProps> = ({ value, onChange, className, limit }) => {
    return (
        <div>
            <textarea
                className={`border border-gray-300 p-2 rounded w-full ${className}`}
                rows={4}
                placeholder="Type your message here..."
                value={value}
                onChange={onChange}
                maxLength={limit}
            />
            {limit && (
                <div className="text-right text-sm text-gray-500">
                    {value.length}/{limit}
                </div>
            )}
        </div>
    );
};

export default Textarea;
                
