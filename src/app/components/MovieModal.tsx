import { X, Star, Clock, Heart, Bookmark, Check, Eye, EyeOff, User, Film } from 'lucide-react';
import { Movie } from './MovieCard';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState, useEffect } from 'react';
import { useUserPreferences } from '../contexts/UserPreferencesContext';
import { getSimilarMovies } from '../utils/recommendations';
import { MovieCard } from './MovieCard';
import { Separator } from './ui/separator';

interface MovieModalProps {
  movie: Movie;
  allMovies: Movie[];
  onClose: () => void;
  onMovieClick: (movie: Movie) => void;
}

export function MovieModal({ movie, allMovies, onClose, onMovieClick }: MovieModalProps) {
  const {
    isInWatchlist,
    toggleWatchlist,
    isWatched,
    toggleWatched,
    rateMovie,
    getMovieRating,
    addToRecentlyViewed,
  } = useUserPreferences();

  const [userRating, setUserRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const similarMovies = getSimilarMovies(movie, allMovies, { limit: 6 });

  useEffect(() => {
    addToRecentlyViewed(movie.id);
    const rating = getMovieRating(movie.id);
    if (rating) setUserRating(rating);
  }, [movie.id, getMovieRating, addToRecentlyViewed]);

  const handleRating = (rating: number) => {
    setUserRating(rating);
    rateMovie(movie.id, rating);
  };

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const youtubeId = movie.trailerUrl ? getYouTubeId(movie.trailerUrl) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <div
        className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-xl bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/80 p-2 text-white transition-colors hover:bg-black"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Trailer or Backdrop */}
        {youtubeId ? (
          <div className="relative aspect-video w-full overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&modestbranding=1&rel=0`}
              title={`${movie.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        ) : (
          <div className="relative h-80 overflow-hidden">
            <img
              src={movie.poster}
              alt={movie.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-8">
          <h2 className="mb-3 text-white">{movie.title}</h2>
          
          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-zinc-400">
            <span>{movie.year}</span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-white">{movie.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{movie.runtime} min</span>
            </div>
            <span>{movie.releaseDate}</span>
            {movie.boxOffice && <span className="text-green-400">{movie.boxOffice}</span>}
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mb-6 flex flex-wrap gap-3">
            <Button
              variant={isInWatchlist(movie.id) ? 'default' : 'outline'}
              className="gap-2"
              onClick={() => toggleWatchlist(movie.id)}
            >
              {isInWatchlist(movie.id) ? (
                <>
                  <Check className="h-5 w-5" />
                  In Watchlist
                </>
              ) : (
                <>
                  <Bookmark className="h-5 w-5" />
                  Add to Watchlist
                </>
              )}
            </Button>
            <Button
              variant={isWatched(movie.id) ? 'default' : 'outline'}
              className="gap-2"
              onClick={() => toggleWatched(movie.id)}
            >
              {isWatched(movie.id) ? (
                <>
                  <Eye className="h-5 w-5" />
                  Watched
                </>
              ) : (
                <>
                  <EyeOff className="h-5 w-5" />
                  Mark as Watched
                </>
              )}
            </Button>
          </div>

          {/* User Rating */}
          <div className="mb-6">
            <h3 className="mb-2 text-white">Your Rating</h3>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= (hoveredStar || userRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-zinc-600'
                    }`}
                  />
                </button>
              ))}
              {userRating > 0 && (
                <span className="ml-2 text-sm text-zinc-400">
                  {userRating} / 5
                </span>
              )}
            </div>
          </div>

          <Separator className="my-6 bg-zinc-800" />

          {/* Plot */}
          <div className="mb-6">
            <h3 className="mb-2 text-white">Plot</h3>
            <p className="text-zinc-300">{movie.plot}</p>
          </div>

          {/* Cast & Crew */}
          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Film className="h-4 w-4 text-zinc-400" />
                <h3 className="text-white">Director</h3>
              </div>
              <p className="text-zinc-300">{movie.director}</p>
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2">
                <User className="h-4 w-4 text-zinc-400" />
                <h3 className="text-white">Cast</h3>
              </div>
              <p className="text-zinc-300">{movie.cast.slice(0, 3).join(', ')}</p>
            </div>
          </div>

          <Separator className="my-6 bg-zinc-800" />

          {/* Similar Movies */}
          {similarMovies.length > 0 && (
            <div>
              <h3 className="mb-4 text-white">Similar Movies</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {similarMovies.map((similarMovie) => (
                  <MovieCard
                    key={similarMovie.id}
                    movie={similarMovie}
                    onMovieClick={(m) => {
                      onMovieClick(m);
                      onClose();
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
