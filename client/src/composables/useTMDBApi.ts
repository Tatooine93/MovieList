import { TMDB } from 'tmdb-ts-wrapper'

export async function useTMDBApi() {
  const ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_ACCESS_TOKEN
  const LANGUAGE = 'en-US'
  const SearchMoviesQueryString = 'Jack Reacher'

  const tmdb = new TMDB(ACCESS_TOKEN, LANGUAGE)

  /* const searchSection = tmdb.search.searchMovies({ query: 'Jack Reacher' })
  const search = tmdb.search.multiSearch({ query: 'Jack Reacher' })
  console.log('searchResult of TMDB Api from useTMDBApi:', searchSection, search) */

  return tmdb
}
