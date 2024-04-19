import axios from 'axios';

// TODO: change to .env file
const BACKEND_URL = 'http://localhost:8000';

export const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});