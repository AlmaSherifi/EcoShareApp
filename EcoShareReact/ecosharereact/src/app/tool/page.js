

const getTools = async (authToken) => {
    try {
        const response = await fetch('http://localhost:5069/api/Tools', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch tools');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching tools:', error);
        throw error;
    }
};
