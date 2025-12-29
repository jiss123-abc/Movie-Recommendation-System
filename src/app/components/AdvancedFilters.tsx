import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { useState } from 'react';

export interface FilterState {
  genres: string[];
  yearRange: [number, number];
  ratingRange: [number, number];
}

interface AdvancedFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableGenres: string[];
}

export function AdvancedFilters({ filters, onFiltersChange, availableGenres }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleGenre = (genre: string) => {
    const newGenres = filters.genres.includes(genre)
      ? filters.genres.filter((g) => g !== genre)
      : [...filters.genres, genre];
    onFiltersChange({ ...filters, genres: newGenres });
  };

  const resetFilters = () => {
    onFiltersChange({
      genres: [],
      yearRange: [1980, new Date().getFullYear()],
      ratingRange: [0, 10],
    });
  };

  const hasActiveFilters =
    filters.genres.length > 0 ||
    filters.yearRange[0] !== 1980 ||
    filters.yearRange[1] !== new Date().getFullYear() ||
    filters.ratingRange[0] !== 0 ||
    filters.ratingRange[1] !== 10;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Advanced Filters
          {hasActiveFilters && (
            <Badge variant="default" className="ml-1">
              Active
            </Badge>
          )}
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Clear All
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 space-y-6">
          {/* Genre Selection */}
          <div>
            <h3 className="mb-3 text-white">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {availableGenres.filter(g => g !== 'All').map((genre) => (
                <Badge
                  key={genre}
                  variant={filters.genres.includes(genre) ? 'default' : 'outline'}
                  className="cursor-pointer px-4 py-2 transition-all hover:scale-105"
                  onClick={() => toggleGenre(genre)}
                >
                  {genre}
                  {filters.genres.includes(genre) && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          {/* Year Range */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-white">Release Year</h3>
              <span className="text-sm text-zinc-400">
                {filters.yearRange[0]} - {filters.yearRange[1]}
              </span>
            </div>
            <Slider
              min={1980}
              max={new Date().getFullYear()}
              step={1}
              value={filters.yearRange}
              onValueChange={(value) =>
                onFiltersChange({ ...filters, yearRange: value as [number, number] })
              }
              className="py-4"
            />
          </div>

          {/* Rating Range */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-white">Rating</h3>
              <span className="text-sm text-zinc-400">
                {filters.ratingRange[0].toFixed(1)} - {filters.ratingRange[1].toFixed(1)}
              </span>
            </div>
            <Slider
              min={0}
              max={10}
              step={0.1}
              value={filters.ratingRange}
              onValueChange={(value) =>
                onFiltersChange({ ...filters, ratingRange: value as [number, number] })
              }
              className="py-4"
            />
          </div>
        </div>
      )}
    </div>
  );
}
