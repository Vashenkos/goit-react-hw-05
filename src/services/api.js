import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDg0YmM3ZmM4NmFkYTMxYjkxYTlhZWVhYmRkZDc5MyIsIm5iZiI6MTcyNzI5OTgxOS4xNTE2MDQsInN1YiI6IjY2ZjQ2Yzc3NTgyMGQyOGNmYjZhMGZlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VoBwS4TkzPEMw4DYsQvZ0BgxBaT2snYU7XkOYqAWJb8";

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchTrendingMovies = async (page = 1) => {
  const { data } = await axios.get(
    `trending/movie/day?language=en-US&page=${page}`,
    options
  );
  return data;
};

export const fetchMoviesByQuery = async (query, page = 1) => {
  const { data } = await axios.get(
    `search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
    options
  );
  return data;
};

export const fetchMovieDetails = async (movieId) => {
  const { data } = await axios.get(`movie/${movieId}?language=en-US`, options);
  return data;
};

export const fetchMovieCast = async (movieId) => {
  const { data } = await axios.get(
    `movie/${movieId}/credits?language=en-US`,
    options
  );
  return data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const { data } = await axios.get(
    `movie/${movieId}/reviews?language=en-US&page=1`,
    options
  );
  return data.results;
};