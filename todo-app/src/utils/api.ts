import axios from 'axios'

const BACKEND_URL = 'https://argo-tech-todo-1.onrender.com/api'

export const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
