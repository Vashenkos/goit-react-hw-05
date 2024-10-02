import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const getMovies = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && reviews.length === 0 && (
        <p>We don&apos;t have any reviews for this movie</p>
      )}
      {!isLoading && !isError && reviews.length > 0 && (
        <ul >
          {reviews.map((review) => (
            <li key={review.id} >
              <h3 >Author: {review.author}</h3>
              <p >{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieReviews;