import axios from "axios";

//Base da URL: https://api.themoviedb.org/3/
//API URL: https://api.themoviedb.org/3/movie/now_playing?api_key=02b5bfa195025d9b25c4abe3f4ef54e8&language=pt-BR

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default api;
