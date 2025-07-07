
import React, { useState } from 'react';
import { type GeneratedIdeas, type SocialMediaPost } from '../types';
import { IdeaCard } from './IdeaCard';
import { ICONS } from '../constants';

interface ResultsDisplayProps {
    ideas: GeneratedIdeas;
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

const SocialMediaCard: React.FC<{ posts: SocialMediaPost[] }> = ({ posts }) => {
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
                <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center mr-4 shrink-0">
                    {ICONS.social}
                </div>
                <h3 className="text-2xl font-bold text-white">Social Media Posts</h3>
            </div>
            <div className="space-y-4 flex-grow">
                {posts.map((post, index) => (
                    <div key={index} className="bg-slate-800/50 p-4 rounded-lg group relative">
                         <button 
                            onClick={() => handleCopy(post.content, index)} 
                            className="absolute top-2 right-2 p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Copy post content"
                        >
                            {copiedIndex === index ? <CheckIcon /> : <CopyIcon />}
                        </button>
                        <p className="font-bold text-cyan-400">{post.platform}</p>
                        <p className="text-slate-300 whitespace-pre-wrap">{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ ideas }) => {
    return (
        <div className="w-full max-w-5xl mx-auto animate-fade-in-up grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-1">
                <IdeaCard 
                    title="Marketing Strategies" 
                    icon={ICONS.marketing}
                    items={ideas.marketingStrategies}
                    iconBgColor="bg-blue-500"
                />
            </div>
            <div className="lg:col-span-1">
                <IdeaCard 
                    title="Website Features" 
                    icon={ICONS.website}
                    items={ideas.websiteFeatures}
                    iconBgColor="bg-purple-500"
                />
            </div>
             <div className="lg:col-span-1">
                <SocialMediaCard posts={ideas.socialMediaPosts} />
            </div>
        </div>
    );
};

// Add fade-in-up animation to tailwind config or a style tag if needed. For now, using a simple class name.
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}
`;
document.head.appendChild(style);
