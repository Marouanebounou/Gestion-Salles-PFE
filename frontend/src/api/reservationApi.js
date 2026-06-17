import api from './axiosInstance';

// These endpoints match Adil's backend task contract.
// Until his API is merged, the mock service in mockReservations.js is used as fallback.

export const getMesReservations = () => api.get('/reservations/my');
export const getAllReservations = () => api.get('/reservations');
export const createReservation = (data) => api.post('/reservations', data);
export const updateReservation = (id, data) => api.put(`/reservations/${id}`, data);
export const cancelReservation = (id) => api.put(`/reservations/${id}/annuler`);
export const validateReservation = (id) => api.put(`/reservations/${id}/valider`);
export const deleteReservation = (id) => api.delete(`/reservations/${id}`);
