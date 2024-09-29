import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();
  const defaultImg =
    "https://dummyimage.com/300x450/cdcdcd/000.jpg&text=No+image";

  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.item}>
          <Link
            to={`/movies/${movie.id}`}
            state={location}
            className={styles.link}
          >
            <div className={styles.imageContainer}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : defaultImg
                }
                width={300}
                alt={movie.title}
                className={styles.image}
              />
            </div>
            <div className={styles.info}>
              <h3 className={styles.title}>{movie.title}</h3>
              <div className={styles.details}>
                <span className={styles.rating}>
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
                <span className={styles.separator}>|</span>
                <span className={styles.votes}>Votes: {movie.vote_count}</span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;