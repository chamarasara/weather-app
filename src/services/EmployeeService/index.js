import api from "../api";

const createEmployee = (payload) => {
  const { data } = payload
  return api.nodeService.post(`/api/v1/employee`, data);
};

const updateEmployee = (payload) => {
  const {id,  data } = payload
  return api.nodeService.put(`/api/v1/employee/${id}`, data);
};

const getEmployees = (cafe) => {
  return api.nodeService.get("/api/v1/employees?cafe=" + cafe)
};

const deleteEmployee = (id) => {
  return api.nodeService.delete(`api/v1/employee/${id}`);
};

const EmployeeService = {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee
};
export default EmployeeService;