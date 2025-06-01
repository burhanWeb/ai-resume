import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://ai-resume-3-nnuj.onrender.com/api/v1",
  withCredentials: true,
});

export default customFetch;
