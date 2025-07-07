
import { type GeneratedIdeas } from '../types';

export const generateBusinessIdeas = async (businessType: string, location:string, brandPersonality: string, targetAudience: string): Promise<GeneratedIdeas> => {
    if (!businessType.trim() || !location.trim()) {
        throw new Error("Business type and location cannot be empty.");
    }
    
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ businessType, location, brandPersonality, targetAudience }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'An error occurred while fetching ideas.');
        }

        const data: GeneratedIdeas = await response.json();
        return data;

    } catch (error) {
        console.error("Error calling backend service:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate ideas: ${error.message}`);
        }
        throw new Error("Failed to generate ideas. Please try again.");
    }
};
