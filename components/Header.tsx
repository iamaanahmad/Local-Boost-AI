
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="py-8 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Local Boost <span className="text-cyan-400">AI</span>
            </h1>
            <p className="mt-3 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
                Enter your business details to generate tailored digital growth ideas in seconds.
            </p>
        </header>
    );
};
