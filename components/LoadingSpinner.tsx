
import React from 'react';

interface LoadingSpinnerProps {
    size?: number; // size in rem or other tailwind units
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 8 }) => {
    const sizeClasses = `h-${size} w-${size}`;
    return (
        <div 
            className={`animate-spin rounded-full ${sizeClasses} border-t-2 border-b-2 border-cyan-400`}
            role="status"
            aria-live="polite"
        >
             <span className="sr-only">Loading...</span>
        </div>
    );
};
