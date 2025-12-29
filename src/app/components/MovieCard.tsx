import { Star, Heart, Bookmark, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useUserPreferences } from '../contexts/UserPreferencesContext';

export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genres: string[];
  poster: string;
  description: string;
  duration: string;
  // Enhanced fields
  trailerUrl?: string;
  director: string;
  cast: string[];
  releaseDate: string;
  boxOffice?: string;
  runtime: number; // in minutes
  plot: string;
  imdbId?: string;
}

interface MovieCardProps {
  movie: Movie;
  onMovieClick: (movie: Movie) => void;
}

export function MovieCard({ movie, onMovieClick }: MovieCardProps) {
  const { isInWatchlist, toggleWatchlist } = useUserPreferences();
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-lg bg-zinc-900 transition-all hover:scale-105 hover:shadow-xl">
      <div className="relative aspect-[2/3] overflow-hidden">
        <ImageWithFallback
          src={movie.poster}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        
        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onMovieClick(movie);
            }}
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>

        {/* Rating Badge */}
        <div className="absolute left-2 top-2 flex items-center gap-1 rounded-md bg-black/80 px-2 py-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-white">{movie.rating.toFixed(1)}</span>
        </div>

        {/* Action Buttons */}
        <div className="absolute right-2 top-2 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="rounded-full bg-black/80 p-2 transition-colors hover:bg-black"
          >
            <Heart
              className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`}
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWatchlist(movie.id);
            }}
            className="rounded-full bg-black/80 p-2 transition-colors hover:bg-black"
          >
            <Bookmark
              className={`h-4 w-4 ${isInWatchlist(movie.id) ? 'fill-blue-500 text-blue-500' : 'text-white'}`}
            />
          </button>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-3">
        <h3 className="truncate text-white font-classic text-lg font-medium movie-title">{movie.title}</h3>
        <div className="mt-1 flex items-center gap-2 text-sm text-zinc-400">
          <span>{movie.year}</span>
          <span>•</span>
          <span>{movie.duration}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {movie.genres.slice(0, 2).map((genre) => (
            <Badge key={genre} variant="secondary" className="text-xs">
              {genre}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}