
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="w-full text-center py-4 mt-8">
            <p className="text-sm text-slate-400">
                Powered by CIT. Need help with implementation?{' '}
                <a 
                    href="https://www.cit.org.in/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-semibold text-cyan-400 hover:text-cyan-300 underline"
                >
                    Visit CIT
                </a>
                {' '}for professional Web, Security & Marketing services.
            </p>
        </footer>
    );
};
