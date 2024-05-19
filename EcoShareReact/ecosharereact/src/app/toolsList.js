'use client'
import React, { useEffect, useState } from 'react';
import { fetchTools } from './api.js'; // Importera fetchTools-funktionen från api.js
import styles from './page.module.css';

const ToolList = () => {
    const [tools, setTools] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const toolsData = await fetchTools();
                console.log('Tools:', toolsData);
                setTools(toolsData);
            } catch (error) {
                console.error('Error fetching tools:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const filteredTools = tools.filter(tool =>
            tool.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setSearchResults(filteredTools);
    };


   
    return (
        <div>
            <h1 className={styles.searchHeader}>Rent anything, from anyone, anywhere</h1>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={handleSearch}
                />
                {searchTerm && (
                    <ul className={styles.dropdown}>
                        {searchResults.map(tool => (
                            <li key={tool.id} className={styles.dropdownItem}>
                                {tool.name}
                                <p>{tool.description}</p>
                                <p>Rental price: {tool.rentalPrice}kr/day</p>
                            </li>
                        ))}
                    </ul>
                )}
                <button className={styles.searchButton}>Search</button>
            </div>
            <ul className={styles.toolList}>
                {searchResults.map(tool => (
                    <li key={tool.id} className={styles.toolItem}>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToolList;
