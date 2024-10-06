import {  
  NavLink,  
  Outlet,  
  useLocation,  
  useNavigate,  
  useParams,  
} from "react-router-dom";  
import { fetchMovieDetails } from "../../services/api";  
import { useEffect, useRef, useState } from "react";  
import clsx from "clsx";  
import Loader from "../../components/Loader/Loader";  
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";  
import styles from './MovieDetailsPage.module.css'; 

function MovieDetailsPage() {  
  const [movieData, setMovieData] = useState(null);  
  const [isLoading, setIsLoading] = useState(false);  
  const [isError, setIsError] = useState(false);  
  const { movieId } = useParams();  
  const location = useLocation();  
  const navigate = useNavigate();  
  const backLink = useRef(location.state?.from ?? "/movies"); 

  const defaultImg =  
    "https://dummyimage.com/500x750/cdcdcd/000.jpg&text=No+poster";  

  useEffect(() => {  
    const getMovies = async () => {  
      setIsLoading(true);  
      setIsError(false); // Скидаємо помилку перед запитом  
      try {  
        const data = await fetchMovieDetails(movieId);  
        setMovieData(data);  
      } catch (error) {  
        console.error("Error fetching movie details:", error);  
        setIsError(true);  
      } finally {  
        setIsLoading(false);  
      }  
    };  
    getMovies();  
  }, [movieId]);  

  const handleGoBack = () => navigate(backLink.current);  

  const buildLinkClass = ({ isActive }) => {  
    return clsx(styles.link, isActive && styles.activeLink);  
  };  

  return (  
    <div>  
      {isLoading && <Loader />}  
      {isError && <ErrorMessage />}  
      {!isLoading && !isError && movieData && (  
        <div>  
          <button onClick={handleGoBack}>  
            Go back  
          </button>  
          <div>  
            <img  
              src={  
                movieData.backdrop_path  
                  ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`  
                  : defaultImg  
              }  
              width={500}  
              alt={movieData.title}  
            />  
            <div>  
              <h1>{movieData.title}</h1>  
              <div>  
                <span>⭐ {movieData.vote_average.toFixed(1)}</span>  
                <span>|</span>  
                <span>Release: {movieData.release_date}</span>  
              </div>  
            </div>  
          </div>  

          <div>  
            <NavLink to="cast" className={buildLinkClass}>  
              Cast  
            </NavLink>  
            <NavLink to="reviews" className={buildLinkClass}>  
              Reviews  
            </NavLink>  
          </div>  
          <Outlet />  
        </div>  
      )}  
    </div>  
  );  
}  

export default MovieDetailsPage;