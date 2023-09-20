import api from "../api";

const createCafe = (payload) => {
    return api.nodeService.post(`api/v1/cafe`, payload);
  };

  const getAllCafes = (location) => {
    return api.nodeService.get("/api/v1/cafe?location=" + location)
  };

  const getCafeById = (id) => {
    return api.nodeService.get(`/api/v1/cafe/${id}`)
  };

  const updateCafe = (payload) => {
    const {id, data} = payload
    return api.nodeService.put(`api/v1/cafe/${id}`, data);
  };

  const deleteCafe = (id) => {
    return api.nodeService.delete(`api/v1/cafe/${id}`);
  };

  const CafeService = {
    createCafe,
    getAllCafes,
    updateCafe,
    deleteCafe,
    getCafeById
  };
  export default CafeService;