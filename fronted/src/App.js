import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import AnimeList from './components/AnimeList';
import './App.css';
import { searchAnimes } from './api/api';

const App = () => {
    const [title, setTitle] = useState('');
    const [animes, setAnimes] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchDefaultAnimes = async () => {
            setLoading(true);
            setError(false);
            try {
                const defaultTitle = '';
                const results = await searchAnimes(defaultTitle);
                setAnimes(Array.isArray(results) ? results.slice(0, 10) : []);
                if (results.length === 0) {
                    setError(true);
                }
            } catch (error) {
                setError(true);
                console.error('Error fetching default animes', error);
            }
            setLoading(false);
        };

        fetchDefaultAnimes();
    }, []);

    const handleSearch = async () => {
        setHasSearched(true);
        setLoading(true);
        setError(false);
        try {
            const results = await searchAnimes(title);
            setAnimes(Array.isArray(results) ? results : []);
            if (results.length === 0) {
                setError(true);
            }
        } catch (error) {
            setError(true);
            console.error('Error searching for animes', error);
        }
        setLoading(false);
    };

    return (
        <div className="container">
            <SearchBar title={title} setTitle={setTitle} handleSearch={handleSearch} />
            <AnimeList animes={animes} hasSearched={hasSearched} loading={loading} error={error} />
        </div>
    );
};

export default App;