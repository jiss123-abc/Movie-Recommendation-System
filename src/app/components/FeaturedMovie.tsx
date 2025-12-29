import { Plus, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Movie } from './MovieCard';

interface FeaturedMovieProps {
  movie: Movie;
  onMovieClick: (movie: Movie) => void;
}

export function FeaturedMovie({ movie, onMovieClick }: FeaturedMovieProps) {
  return (
    <div className="relative h-[500px] overflow-hidden rounded-xl">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.poster})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-center px-8 md:px-16">
        <div className="max-w-2xl">
          <div className="flex gap-2 mb-3">
            {movie.genres.map((genre) => (
              <Badge key={genre} variant="outline" className="border-white/30 text-white">
                {genre}
              </Badge>
            ))}
          </div>
          
          <h1 className="mb-4 text-white">{movie.title}</h1>
          
          <p className="mb-6 text-zinc-300 line-clamp-3">
            {movie.description}
          </p>

          <div className="flex items-center gap-4 mb-6 text-sm text-zinc-300">
            <span>{movie.year}</span>
            <span>•</span>
            <span>{movie.duration}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span>{movie.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button size="lg" className="gap-2" onClick={() => onMovieClick(movie)}>
              <Info className="h-5 w-5" />
              More Info
            </Button>
            <Button size="lg" variant="outline">
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}