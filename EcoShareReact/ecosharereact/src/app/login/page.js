// Login.js
'use client'
import React, { useState , useEffect} from 'react';
import styles from './login.module.css'; 


const BASE_URL = 'http://localhost:5069/'; 
const LOGIN_URL = BASE_URL + "login"

//POST-FÖRFRÅGAN FÖR LOGIN
export const loginUser = async (email, password) => {
    try {
        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({email,password})
        });
        if (!response.ok) {
            throw new Error('Failed to login');
        }
        const data = await response.json();
        localStorage.setItem('authToken', data.accessToken);
        localStorage.setItem('email', email); 
        return data.accessToken;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

//POST-FÖRFRÅGAN FÖR TOOL
const addTool = async (toolData, authToken) => {
    try {
        const response = await fetch('http://localhost:5069/api/Tools', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(toolData,authToken)
        });

        if (!response.ok) {
            throw new Error('Failed to add tool');
        }

        const data = await response.json();
        return data.authToken;
    } catch (error) {
        console.error('Error adding tool:', error);
        throw error;
    }
};

//GET-FÖRFRÅGAN FÖR TOOLS
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

//LOGGA IN OCH SPARA LOCALSTORAGE
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [toolName, setToolName] = useState('');
    const [description, setDescription] = useState('');
    const [rentalPrice, setRentalPrice] = useState('');
    const [showPopup, setShowPopup] = useState(false); 
    const [userTools, setUserTools] = useState([]);
    const [selectedToolId, setSelectedToolId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false);

     // Tillståndsvariabler för det valda verktygets data
     const [selectedToolData, setSelectedToolData] = useState({
        name: '',
        description: '',
        rentalPrice: ''
    });

   
    const fillFormWithToolData = () => {
        const selectedTool = userTools.find(tool => tool.id === selectedToolId);
        if (selectedTool) {
            setEditedToolData({
                name: selectedTool.name,
                description: selectedTool.description,
                rentalPrice: selectedTool.rentalPrice
            });
        }
    };
    

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        const email = localStorage.getItem('email');
        if (authToken) {
            fetchUserTools(authToken);
            setUserEmail(email);
        
            
        }
        fillFormWithToolData();
    }, [selectedToolId]);

    const fetchUserTools = async (authToken) => {
        try {
            const tools = await getTools(authToken);
            console.log('Fetched user tools:', tools); 
            setUserTools(tools);
            
        } catch (error) {
            console.error('Error fetching user tools:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(username, password); 
            console.log('User logged in successfully');
            setUsername('');
            setPassword('');
            localStorage.setItem('authToken', response);
            setIsLoggedIn(true); 
            const email = localStorage.getItem('email');
            setUserEmail(email);
            
        } catch (error) {
            console.error('Error logging in:', error);
            
        }
    };


    //LOGGA UT FUNKTION
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('email');
        setIsLoggedIn(false);
    };

    const startEditing = () => {
        if (!selectedToolId) {
            console.error('No tool selected for editing');
            return;
        }
        setIsEditing(true);
        fillFormWithToolData();
    };
    

// Funktion för att avbryta redigeringen och återgå till visningsläget
const cancelEditing = () => {
    setIsEditing(false);
};

const [editedToolData, setEditedToolData] = useState({
    name: '',
    description: '',
    rentalPrice: ''
});

const updateTool = async (toolId, authToken, updatedToolData) => {
    try {
        const response = await fetch(`http://localhost:5069/api/Tools/${toolId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(updatedToolData)
        });
        if (!response.ok) {
            throw new Error('Failed to update tool');
        }
        // Uppdatera användargränssnittet med uppdaterade verktygsdata
        const updatedTool = await response.json();
        setUserTools(prevTools => prevTools.map(tool => tool.id === toolId ? updatedTool : tool));
    } catch (error) {
        console.error('Error updating tool:', error);
    }
    setIsEditing(false);
};



    //LÄGGA TILL EN PRYL NÄR MAN ÄR INLOGGAD
    const handleToolSubmit = async (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem('authToken'); 
    if (!authToken) {
        console.error('Authentication token is missing');
        return;
    }
        const toolData = {
            name: toolName,
            description: description,
            rentalPrice: rentalPrice
        };
        try {
            const addedTool = await addTool(toolData, authToken);
            console.log('Tool added successfully:', addedTool);
            setToolName('');
            setDescription('');
            setRentalPrice('');
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);
            fetchUserTools(authToken);
        } catch (error) {
            console.error('Error adding tool:', error);
        }
    };


    // Uppdatera ett verktyg när användaren är inloggad
const handleEditTool = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('authToken'); 
    if (!authToken) {
        console.error('Authentication token is missing');
        return;
    }

    // Kontrollera om det finns ett valt verktyg innan du fortsätter
    if (!selectedToolId) {
        console.error('No tool selected for editing');
        return;
    }

    // Förbered data som ska skickas
    const updatedToolData = {
        name: editedToolData.name,
        description: editedToolData.description,
        rentalPrice: editedToolData.rentalPrice
    };

    try {
        await updateTool(selectedToolId, authToken, updatedToolData);
        console.log('Tool updated successfully');
        setIsEditing(false);
        fetchUserTools(authToken); // Uppdatera verktygslistan efter redigering
    } catch (error) {
        console.error('Error updating tool:', error);
    }
};

    

const deleteTool = async (toolId) => {
    try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(`http://localhost:5069/api/Tools/${toolId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to delete tool');
        }
    } catch (error) {
        throw error;
    }
};

const handleDeleteTool = async () => {
    try {
        console.log('Selected Tool ID:', selectedToolId);
        
        // Ta bort verktyget från API:et
        await deleteTool(selectedToolId);

        // Uppdatera listan över användarverktyg utan det borttagna verktyget
        const updatedTools = userTools.filter(tool => tool.id !== selectedToolId);
        setUserTools(updatedTools);

        console.log('Tool deleted successfully');
    } catch (error) {
        console.error('Error deleting tool:', error);
    }
};




    //KOLLA OM MAN ÄR INLOGGAD, ISÅFALL VISAS TOOL-FORMULÄR
    if (isLoggedIn) {
        return (
            <div className={styles.loginContainer}>
                <h2>Welcome, {userEmail}!</h2> 
                <h2>Add a Tool</h2>
                <form onSubmit={handleToolSubmit}>
                    <input type="text" placeholder="Tool Name" value={toolName} onChange={(e) => setToolName(e.target.value)} required />
                    <input type= "text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <input type="number" placeholder="Rental Price" value={rentalPrice} onChange={(e) => setRentalPrice(e.target.value)} required />
                    <button type="submit">Add Tool</button>
                    <button className={styles.logoutButton} onClick={handleLogout}>Log Out</button>
                </form>
                {showPopup && (
                    <div className={styles.popup}>
                        <p>Tool added successfully!</p>
                    </div>
                )}
               <div className={styles.toolsContainer}>
                <select value={selectedToolId} onChange={(e) => setSelectedToolId(e.target.value)}>
                    <option value="">Select a Tool to edit or delete</option>
                    {userTools.map((tool) => (
                        <option key={tool.id} value={tool.id}>{tool.name}</option>
                    ))}
                </select>

                    {selectedToolId && (
                        <div className={styles.toolItem}>
                            <button className={styles.editButton} onClick={startEditing}>Edit</button>
                            <button className={styles.deleteButton} onClick={handleDeleteTool}>Delete</button>
                        </div>
                    )}
                    
             {/* Redigeringsformuläret */}
            {isEditing && (
                <div className={styles.editForm}>
                    <h2>Edit Tool</h2>
                    <form>
                        <input type="text" placeholder="Tool Name" value={editedToolData.name} onChange={(e) => setEditedToolData({ ...editedToolData, name: e.target.value })} required />
                        <input type="text" placeholder="Description" value={editedToolData.description} onChange={(e) => setEditedToolData({ ...editedToolData, description: e.target.value })} required />
                        <input type="number" placeholder="Rental Price" value={editedToolData.rentalPrice} onChange={(e) => setEditedToolData({ ...editedToolData, rentalPrice: e.target.value })} required />
                        <button type="button" onClick={handleEditTool}>Submit</button>
                        <button type="button" onClick={cancelEditing}>Cancel</button>
                    </form>
                </div>
            )}

            </div>
        </div>
    );
}

    //LOGIN_FORMULÄR
    return (
        <div className={styles.loginContainer}>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username"  onChange={(e) => setUsername(e.target.value)} autoComplete="off" />
                <input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} autoComplete="off" />
                <button type="text">Login</button>
            </form>
            <p>Need an account?</p> 
            <a href="/register">Register here</a>
        </div>
    );
};

export default Login;
