
import React, { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface InputFormProps {
    onSubmit: (businessType: string, location: string, brandPersonality: string, targetAudience: string) => void;
    isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
    const [businessType, setBusinessType] = useState('');
    const [location, setLocation] = useState('');
    const [brandPersonality, setBrandPersonality] = useState('');
    const [targetAudience, setTargetAudience] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isLoading) {
            onSubmit(businessType, location, brandPersonality, targetAudience);
        }
    };

    return (
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-2xl border border-white/20">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                        <label htmlFor="businessType" className="block text-sm font-medium text-slate-200 mb-1">
                            Business Type
                        </label>
                        <input
                            id="businessType"
                            type="text"
                            value={businessType}
                            onChange={(e) => setBusinessType(e.target.value)}
                            placeholder="e.g., Coffee Shop, Bookstore"
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition duration-200"
                            required
                        />
                    </div>
                    <div>
                         <label htmlFor="location" className="block text-sm font-medium text-slate-200 mb-1">
                            Location
                        </label>
                        <input
                            id="location"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g., San Francisco, CA"
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition duration-200"
                            required
                        />
                    </div>
                </div>
                 <div>
                    <label htmlFor="brandPersonality" className="block text-sm font-medium text-slate-200 mb-1">
                        Brand Personality <span className="text-slate-400">(Optional)</span>
                    </label>
                    <input
                        id="brandPersonality"
                        type="text"
                        value={brandPersonality}
                        onChange={(e) => setBrandPersonality(e.target.value)}
                        placeholder="e.g., Playful & witty, Professional & luxurious"
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition duration-200"
                    />
                </div>
                <div>
                    <label htmlFor="targetAudience" className="block text-sm font-medium text-slate-200 mb-1">
                        Target Audience <span className="text-slate-400">(Optional)</span>
                    </label>
                    <input
                        id="targetAudience"
                        type="text"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        placeholder="e.g., Young professionals, Families with kids"
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition duration-200"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-all duration-300 disabled:bg-slate-500 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <><LoadingSpinner size={6} /> <span className="ml-2">Generating...</span></> : 'Generate Ideas'}
                    </button>
                </div>
            </form>
        </div>
    );
};
