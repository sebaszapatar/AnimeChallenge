import axios from 'axios';

const searchAnimes = async (title) => {
    try {
        const response = await axios.get(`/api/animes/search?title=${title}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 204) {
            return []; // No results found
        }
        throw error;
    }
};

const getAverageScore = async (title) => {
    const response = await axios.get(`/api/animes/average-score?title=${title}`);
    return response.data;
};

export { searchAnimes, getAverageScore };