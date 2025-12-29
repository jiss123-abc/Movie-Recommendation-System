import { Movie } from '../components/MovieCard';

interface RecommendationOptions {
  limit?: number;
  excludeIds?: number[];
}

/**
 * Calculate similarity score between two movies based on genres
 */
function calculateGenreSimilarity(movie1: Movie, movie2: Movie): number {
  const genres1 = new Set(movie1.genres);
  const genres2 = new Set(movie2.genres);
  
  const intersection = new Set([...genres1].filter((g) => genres2.has(g)));
  const union = new Set([...genres1, ...genres2]);
  
  // Jaccard similarity coefficient
  return intersection.size / union.size;
}

/**
 * Calculate rating similarity (closer ratings = higher similarity)
 */
function calculateRatingSimilarity(movie1: Movie, movie2: Movie): number {
  const ratingDiff = Math.abs(movie1.rating - movie2.rating);
  return 1 - ratingDiff / 10; // Normalize to 0-1
}

/**
 * Calculate year similarity (closer years = higher similarity)
 */
function calculateYearSimilarity(movie1: Movie, movie2: Movie): number {
  const yearDiff = Math.abs(movie1.year - movie2.year);
  const maxDiff = 50; // Consider movies within 50 years as potentially similar
  return Math.max(0, 1 - yearDiff / maxDiff);
}

/**
 * Calculate overall similarity score between two movies
 */
function calculateSimilarity(movie1: Movie, movie2: Movie): number {
  const genreWeight = 0.6;
  const ratingWeight = 0.25;
  const yearWeight = 0.15;
  
  return (
    calculateGenreSimilarity(movie1, movie2) * genreWeight +
    calculateRatingSimilarity(movie1, movie2) * ratingWeight +
    calculateYearSimilarity(movie1, movie2) * yearWeight
  );
}

/**
 * Get similar movies based on a reference movie
 */
export function getSimilarMovies(
  referenceMovie: Movie,
  allMovies: Movie[],
  options: RecommendationOptions = {}
): Movie[] {
  const { limit = 6, excludeIds = [] } = options;
  
  return allMovies
    .filter((movie) => movie.id !== referenceMovie.id && !excludeIds.includes(movie.id))
    .map((movie) => ({
      movie,
      score: calculateSimilarity(referenceMovie, movie),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.movie);
}

/**
 * Get personalized recommendations based on user's watchlist and ratings
 */
export function getPersonalizedRecommendations(
  allMovies: Movie[],
  watchlist: number[],
  ratings: Array<{ movieId: number; rating: number }>,
  options: RecommendationOptions = {}
): Movie[] {
  const { limit = 12, excludeIds = [] } = options;
  
  // Get movies from watchlist and highly rated movies
  const favoriteMovies = allMovies.filter((movie) => {
    const userRating = ratings.find((r) => r.movieId === movie.id);
    return watchlist.includes(movie.id) || (userRating && userRating.rating >= 4);
  });
  
  if (favoriteMovies.length === 0) {
    // If no favorites, return highly rated movies
    return allMovies
      .filter((movie) => !excludeIds.includes(movie.id))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }
  
  // Build genre preference map
  const genreScores = new Map<string, number>();
  favoriteMovies.forEach((movie) => {
    const userRating = ratings.find((r) => r.movieId === movie.id);
    const weight = userRating ? userRating.rating / 5 : 1;
    
    movie.genres.forEach((genre) => {
      genreScores.set(genre, (genreScores.get(genre) || 0) + weight);
    });
  });
  
  // Score all movies based on genre preferences
  const scoredMovies = allMovies
    .filter((movie) => !excludeIds.includes(movie.id) && !favoriteMovies.some((f) => f.id === movie.id))
    .map((movie) => {
      let score = 0;
      movie.genres.forEach((genre) => {
        score += genreScores.get(genre) || 0;
      });
      
      // Boost by movie rating
      score *= movie.rating / 10;
      
      return { movie, score };
    })
    .sort((a, b) => b.score - a.score);
  
  return scoredMovies.slice(0, limit).map((item) => item.movie);
}

/**
 * Get a random movie suggestion
 */
export function getRandomMovie(
  allMovies: Movie[],
  minRating: number = 7.0,
  excludeIds: number[] = []
): Movie | null {
  const eligibleMovies = allMovies.filter(
    (movie) => movie.rating >= minRating && !excludeIds.includes(movie.id)
  );
  
  if (eligibleMovies.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * eligibleMovies.length);
  return eligibleMovies[randomIndex];
}

/**
 * Get trending movies based on year and rating
 */
export function getTrendingMovies(allMovies: Movie[], limit: number = 10): Movie[] {
  const currentYear = new Date().getFullYear();
  
  return allMovies
    .map((movie) => {
      const recencyScore = 1 - Math.min((currentYear - movie.year) / 10, 1);
      const ratingScore = movie.rating / 10;
      const trendScore = recencyScore * 0.6 + ratingScore * 0.4;
      
      return { movie, score: trendScore };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.movie);
}

/**
 * Get movies by director
 */
export function getMoviesByDirector(
  director: string,
  allMovies: Movie[],
  excludeId?: number
): Movie[] {
  return allMovies.filter(
    (movie) => movie.director.toLowerCase() === director.toLowerCase() && movie.id !== excludeId
  );
}

/**
 * Get movies by cast member
 */
export function getMoviesByCast(
  castMember: string,
  allMovies: Movie[],
  excludeId?: number
): Movie[] {
  return allMovies.filter(
    (movie) =>
      movie.cast.some((actor) => actor.toLowerCase().includes(castMember.toLowerCase())) &&
      movie.id !== excludeId
  );
}
