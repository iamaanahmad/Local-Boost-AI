
import React, { useState } from 'react';

interface IdeaCardProps {
    title: string;
    icon: React.ReactNode;
    items: string[];
    iconBgColor: string;
}

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

export const IdeaCard: React.FC<IdeaCardProps> = ({ title, icon, items, iconBgColor }) => {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = (text: string, index: number) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                setCopiedIndex(index);
                setTimeout(() => setCopiedIndex(null), 2000);
            });
        }
    };

    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/20 h-full flex flex-col">
            <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-full ${iconBgColor} flex items-center justify-center mr-4 shrink-0`}>
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{title}</h3>
            </div>
            <ul className="space-y-3 text-slate-300 list-none pl-0 flex-grow">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start justify-between group gap-2">
                        <div className="flex items-start flex-grow">
                            <svg className="w-5 h-5 text-cyan-400 mr-3 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="flex-1">{item}</span>
                        </div>
                        <button 
                            onClick={() => handleCopy(item, index)} 
                            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                            aria-label="Copy to clipboard"
                        >
                            {copiedIndex === index ? <CheckIcon /> : <CopyIcon />}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
