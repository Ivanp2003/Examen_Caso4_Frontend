import api from "./api";

export const getTickets = () => api.get("/tickets");
export const createTicket = (data) => api.post("/tickets", data);
export const updateTicket = (id, data) => api.put(`/tickets/${id}`, data);
export const deleteTicket = (id) => api.delete(`/tickets/${id}`);
