import React, { useEffect, useState } from 'react';  
import MovieList from './components/MovieList';  
import axios from 'axios';  

const HomePage = () => {  
  const [movies, setMovies] = useState([]);  

  useEffect(() => {  
    const fetchTrendingMovies = async () => {  
      const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';  
      const options = {  
        headers: {  
          Authorization: '2484bc7fc86ada31b91a9aeeabddd793' 
        }  
      };  
      const response = await axios.get(url, options);  
      setMovies(response.data.results);  
    };  

    fetchTrendingMovies();  
  }, []);  

  return (  
    <div>  
      <h1>Trending Movies</h1>  
      <MovieList movies={movies} />  
    </div>  
  );  
};  

export default HomePage;