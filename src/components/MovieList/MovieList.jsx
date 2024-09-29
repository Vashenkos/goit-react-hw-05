import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();
  const defaultImg =
    "https://dummyimage.com/300x450/cdcdcd/000.jpg&text=No+image";

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link
            to={`/movies/${movie.id}`}
            state={location}
          >
            <div>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : defaultImg
                }
                width={300}
                alt={movie.title}
              />
            </div>
            <div>
              <h3>{movie.title}</h3>
              <div>
                <span>
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
                <span >|</span>
                <span >Votes: {movie.vote_count}</span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;