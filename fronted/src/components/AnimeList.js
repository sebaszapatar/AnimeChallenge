import React, { useState } from 'react';
import '../App.css';

const AnimeList = ({ animes, loading, error }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const animesPerPage = 5;
    const totalPages = Math.ceil(animes.length / animesPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = currentPage * animesPerPage;
    const currentAnimes = Array.isArray(animes) ? animes.slice(startIndex, startIndex + animesPerPage) : [];

    const renderStars = (score) => {
        const stars = [];
        for (let i = 0; i < 10; i++) {
            if (i < score) {
                stars.push(<span key={i} className="star filled">★</span>);
            } else {
                stars.push(<span key={i} className="star">☆</span>);
            }
        }
        return stars;
    };

    return (
        <div className="container">
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="alert">No results found.</p>}
            {!loading && !error && (
                <>
                    <div className="anime-list">
                        {currentAnimes.map(anime => (
                            <div key={anime.title} className="anime-card">
                                <h3>{anime.title}</h3>
                                <img src={anime.imageUrl} alt={anime.title} className="anime-image" />
                                <p className="recommendation">{anime.recommendationMessage}</p>
                            </div>
                        ))}
                    </div>
                    {animes.length > 0 && (
                        <div className="average-container">
                            <h3 className="average-title">AVERAGE</h3>
                            <div className="average-score">
                                {renderStars(animes[0].score)}
                            </div>
                        </div>
                    )}
                    {animes.length > 0 && (
                        <div className="nav-buttons">
                            <button onClick={handlePrevPage} disabled={currentPage === 0}>
                                ←
                            </button>
                            <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
                                →
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AnimeList;
