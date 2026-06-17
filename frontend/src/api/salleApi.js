import api from './axiosInstance';

export const getSalles = () => api.get('/salles');
export const getSallesDisponibles = () => api.get('/salles/disponibles');
export const getSallesByType = (type) => api.get(`/salles/type/${type}`);
export const getSallesByCapacite = (min) => api.get(`/salles/capacite/${min}`);
