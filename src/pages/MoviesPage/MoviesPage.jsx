import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { fetchMoviesByQuery } from "../../services/api";
import SearchForm from "../../components/SearchForm/SearchForm";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import LoadingMore from "../../components/LoadingMore/LoadingMore";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!query) return;

    const searchMovies = async () => {
      try {
        setIsError(false);
        page === 1 ? setIsLoading(true) : setIsLoadingMore(true);
        const data = await fetchMoviesByQuery(query, page);
        if (data.results.length === 0) {
          toast.error("No movies found for this query");
        }
        setMovies((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    };

    searchMovies();
  }, [page, query]);

  const handleSearch = (value) => {
    if (value === query) return;
    setSearchParams({ query: value });
    setPage(1);
    setMovies([]);
  };

  const loadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.container}>
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className={styles.title}>Search Movies</h2>
      <SearchForm onSearch={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
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

export default MoviesPage;