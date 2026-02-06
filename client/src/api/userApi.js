import api from "./api";

// search + pagination
export const fetchUsers = async ({ search = "", page = 1, limit = 10 }) => {
  const res = await api.get("/api/users", { params: { search, page, limit } });
  return res.data; // { users, pagination }
};

// api to creatttte new user
export const createUserApi = async (formData) => {
  const res = await api.post("/api/users", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// api to update user detailssssssssssss
export const updateUserApi = async (id, formData) => {
  const res = await api.put(`/api/users/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// api to delete user 
export const deleteUserApi = async (id) => {
  const res = await api.delete(`/api/users/${id}`);
  return res.data;
};

//api to export csv fileeeee
export const exportUsersCsvApi = async ({ search = "" }) => {
  const res = await api.get("/api/users/export", {
    params: { search },
    responseType: "blob",
  });
  return res.data; 
};
