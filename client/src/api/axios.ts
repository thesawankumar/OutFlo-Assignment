import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000', // change this for deployment
});

export default API;
