import api from "./api";

export const getTecnicos = () => api.get("/tecnicos");
export const createTecnico = (data) => api.post("/tecnicos", data);
export const updateTecnico = (id, data) => api.put(`/tecnicos/${id}`, data);
export const deleteTecnico = (id) => api.delete(`/tecnicos/${id}`);
