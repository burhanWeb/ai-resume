import axios from "axios";

const customFetch = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:8000/api/v1",
=======
  baseURL: "http://localhost:3000/api/v1",
>>>>>>> 99436b0bbaf9e5582fbed4fc3e6505a91c0bb242
  withCredentials: true,
});

export default customFetch;
