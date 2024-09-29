import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import LoadingMore from "../../components/LoadingMore/LoadingMore";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsError(false);
        page === 1 ? setIsLoading(true) : setIsLoadingMore(true);
        const data = await fetchTrendingMovies(page);
        setMovies((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    };
    getMovies();
  }, [page]);

  const loadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Trending today</h2>
      {isLoading && <Loader />}
      {(isError || movies.length === 0) && <ErrorMessage />}
      {!isLoading && !isError && movies.length > 0 && (
        <MovieList movies={movies} />
      )}

      {!isLoading && movies.length > 0 && page < totalPages && (
        <>
          {!isLoadingMore && <LoadMoreBtn onClick={loadMore} />}
          {isLoadingMore && <LoadingMore />}
        </>
      )}
    </div>
  );
}

export default HomePage;