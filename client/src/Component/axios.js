import axios from "axios";

const api = axios.create({
  baseURL: "https://hospital-mangement-bzp1.onrender.com/api/auth", 
});

export default api;
