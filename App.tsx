
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Footer } from './components/Footer';
import { generateBusinessIdeas } from './services/geminiService';
import { type GeneratedIdeas } from './types';

const App: React.FC = () => {
    const [ideas, setIdeas] = useState<GeneratedIdeas | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateIdeas = useCallback(async (businessType: string, location: string, brandPersonality: string, targetAudience: string) => {
        setIsLoading(true);
        setError(null);
        setIdeas(null);
        try {
            const result = await generateBusinessIdeas(businessType, location, brandPersonality, targetAudience);
            setIdeas(result);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
            <div className="relative flex flex-col flex-grow">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900"></div>
                <div className="absolute inset-0 backdrop-blur-sm"></div>

                <div className="relative z-10 flex flex-col flex-grow">
                    <Header />
                    <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
                        <InputForm onSubmit={handleGenerateIdeas} isLoading={isLoading} />

                        {isLoading && <div className="mt-12"><LoadingSpinner /></div>}

                        {error && (
                            <div className="mt-12 w-full max-w-4xl bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                                <p className="font-bold">Error</p>
                                <p>{error}</p>
                            </div>
                        )}

                        {ideas && !isLoading && (
                            <div className="mt-12 w-full">
                                <ResultsDisplay ideas={ideas} />
                                
                                <div className="w-full max-w-5xl mx-auto mt-8 animate-fade-in-up">
                                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-lg p-6 md:p-8 border border-white/20 text-center">
                                        <h4 className="text-2xl font-bold text-white">Ready to Bring These Ideas to Life?</h4>
                                        <p className="mt-2 text-blue-100 max-w-2xl mx-auto">
                                            Let the experts at CIT.org.in help you with professional web design, development, and digital marketing services to grow your business.
                                        </p>
                                        <a
                                            href="https://www.cit.org.in/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-6 inline-block px-8 py-3 border border-transparent text-base font-bold rounded-lg text-cyan-700 bg-white hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cyan-600 focus:ring-white transition-all duration-300 transform hover:scale-105"
                                        >
                                            Get a Free Consultation
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default App;
