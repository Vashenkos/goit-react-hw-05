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
import styles from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function MovieDetailsPage() {
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const backLink = useRef(location.state ?? "/movies");

  const defaultImg =
    "https://dummyimage.com/500x750/cdcdcd/000.jpg&text=No+poster";

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchMovieDetails(movieId);
        setMovieData(data);
      } catch {
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
    <div className={styles.container}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && movieData && (
        <div className={styles.movieDetails}>
          <button className={styles.button} onClick={handleGoBack}>
            Go back
          </button>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={
                movieData.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
                  : defaultImg
              }
              width={500}
              alt={movieData.title}
            />
            <div className={styles.infoOverlay}>
              <h1 className={styles.title}>{movieData.title}</h1>
              <div className={styles.details}>
                <span className={styles.rating}>
                  ⭐ {movieData.vote_average.toFixed(1)}
                </span>
                <span className={styles.separator}>|</span>
                <span className={styles.releaseDate}>
                  Release: {movieData.release_date}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.navigation}>
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