import React from 'react';

interface SkeletonProps {
    count?: number;
    isDanger?: boolean;
    className?: string;
    
}
const Skeleton: React.FC<SkeletonProps> = ({ count = 3, isDanger, className }) => {
    return (
        <div className={`animate-pulse ${className}`}>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className={`h-4 bg-gray-300 rounded mb-2 ${isDanger ? 'bg-red-300' : ''}`}></div>
            ))}
        </div>
    );
};

export default Skeleton;