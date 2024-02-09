import { APY_KEY } from '../../myEnv'

// Esto lo consume useMovies

export async function searchMovies ({ search }) {
  if (search === null) return null
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${APY_KEY}&s=${search}`)
    const json = await response.json()
    const movies = json.Search

    // Retorno el objeto mapeado (Buenas practicas)
    return movies?.map(movie => ({ //! MAPEAS LA PETICION COMO BUENAS PRACTICAS
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))
  } catch (e) {
    throw new Error('Error searching movies')
  }
}
