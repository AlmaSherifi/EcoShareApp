'use client'

export const fetchTools = async () => {
    try {
        const response = await fetch('http://localhost:5069/api/Tools');
        if (!response.ok) {
            throw new Error('Failed to fetch tools');
        }
        const toolsData = await response.json();
        return toolsData;
    } catch (error) {
        console.error('Error fetching tools:', error);
        throw error;
    }
};




