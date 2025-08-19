import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sportsoccupancytracker.onrender.com/api',
});

export default instance;