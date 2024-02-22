import axios from "axios";
const API_URL = "http://localhost:3001";

export const notesAPI = {
  getAllNotes: async () => {
    return await axios.get(`${API_URL}/notes`).then((res) => {
      return res.data;
    });
  },

  getNote: async (id) => {
    return await axios.get(`${API_URL}/notes/${id}`).then((res) => {
      return res.data;
    });
  },

  updateNote: async (note) => {
    return await axios.put(`${API_URL}/notes/${note.id}`, note).then((res) => {
      return res.data;
    });
  },

  deleteNote: async (id) => {
    console.log('api delete note with id: ', id)
    return await axios.delete(`${API_URL}/notes/${id}`).then((res) => {
      return res.data;
    });
  },

  createNote: async (note) => {
    return axios.post(`${API_URL}/notes`, note).then((res) => {
      return res.data;
    });
  },
};
