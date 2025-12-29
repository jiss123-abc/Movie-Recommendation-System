import { Shuffle } from 'lucide-react';
import { Button } from './ui/button';
import { Movie } from './MovieCard';
import { getRandomMovie } from '../utils/recommendations';
import { useUserPreferences } from '../contexts/UserPreferencesContext';

interface RandomMovieButtonProps {
  allMovies: Movie[];
  onMovieSelected: (movie: Movie) => void;
}

export function RandomMovieButton({ allMovies, onMovieSelected }: RandomMovieButtonProps) {
  const { watched } = useUserPreferences();

  const handleRandomMovie = () => {
    const randomMovie = getRandomMovie(allMovies, 7.0, watched);
    if (randomMovie) {
      onMovieSelected(randomMovie);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2"
      onClick={handleRandomMovie}
    >
      <Shuffle className="h-4 w-4" />
      Surprise Me
    </Button>
  );
}
