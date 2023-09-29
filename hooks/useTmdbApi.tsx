import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

/**
 * @description This hook is used to fetch data from the TMDB API.
 * @example
 *  const {data, isLoading} = use useFetchTmdbData("trending/movies/week", "trends")
 * @param configuration  Should be a string that forms the TMDB's query request parameters
 * @param queryName Should be a string that forms the query key for React-Query
 * @param isDependent  Should be a boolean that determines if the query should be enabled or not.
 * @tooling  Under the hook it uses React-Query + Axios
 */

export function useFetchTmdbData(
  configuration: string,
  queryName: string,
  isDependent?: boolean
) {
  return useQuery({
    queryKey: [queryName],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${configuration}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      return response.data;
    },
    enabled: isDependent,
    useErrorBoundary: true,
    refetchOnWindowFocus: false
  });
}
// https://api.themoviedb.org/3/trending/movie/week?api_key=<YOUR_API_KEY>
