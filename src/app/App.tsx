import { useState, useMemo, useCallback } from 'react';
import { Search, Film, TrendingUp, Bookmark, Eye, History } from 'lucide-react';
import { MovieCard, Movie } from './components/MovieCard';
import { FeaturedMovie } from './components/FeaturedMovie';
import { MovieModal } from './components/MovieModal';
import { AdvancedFilters, FilterState } from './components/AdvancedFilters';
import { RandomMovieButton } from './components/RandomMovieButton';
import { MovieGridSkeleton } from './components/MovieSkeletons';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { UserPreferencesProvider, useUserPreferences } from './contexts/UserPreferencesContext';
import { useDebounce } from './hooks/useDebounce';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { getPersonalizedRecommendations, getTrendingMovies } from './utils/recommendations';
import { movies, genres } from './data/movies';

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [sortBy, setSortBy] = useState<'rating' | 'year'>('rating');
  const [isLoading, setIsLoading] = useState(false);
  const [displayCount, setDisplayCount] = useState(12);
  
  const [filters, setFilters] = useState<FilterState>({
    genres: [],
    yearRange: [1980, new Date().getFullYear()],
    ratingRange: [0, 10],
  });

  const { watchlist, watched, ratings, recentlyViewed } = useUserPreferences();

  // Debounced search for better performance
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Featured movie (highest rated)
  const featuredMovie = useMemo(() => {
    return [...movies].sort((a, b) => b.rating - a.rating)[0];
  }, []);

  // Filter and sort movies with advanced filters
  const filteredMovies = useMemo(() => {
    let filtered = movies.filter((movie) => {
      // Search filter (title, description, cast, director)
      const searchLower = debouncedSearch.toLowerCase();
      const matchesSearch = !debouncedSearch || 
        movie.title.toLowerCase().includes(searchLower) ||
        movie.plot.toLowerCase().includes(searchLower) ||
        movie.director.toLowerCase().includes(searchLower) ||
        movie.cast.some(actor => actor.toLowerCase().includes(searchLower));
      
      // Advanced genre filter (multiple selection)
      const matchesGenres = filters.genres.length === 0 || 
        filters.genres.some(genre => movie.genres.includes(genre));
      
      // Year range filter
      const matchesYear = movie.year >= filters.yearRange[0] && 
        movie.year <= filters.yearRange[1];
      
      // Rating range filter
      const matchesRating = movie.rating >= filters.ratingRange[0] && 
        movie.rating <= filters.ratingRange[1];

      return matchesSearch && matchesGenres && matchesYear && matchesRating;
    });

    // Sort movies
    filtered.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.year - a.year;
    });

    return filtered;
  }, [debouncedSearch, filters, sortBy]);

  // Paginated movies for infinite scroll
  const displayedMovies = useMemo(() => {
    return filteredMovies.slice(0, displayCount);
  }, [filteredMovies, displayCount]);

  // Load more movies for infinite scroll
  const loadMore = useCallback(() => {
    if (displayCount < filteredMovies.length) {
      setIsLoading(true);
      setTimeout(() => {
        setDisplayCount(prev => Math.min(prev + 12, filteredMovies.length));
        setIsLoading(false);
      }, 500);
    }
  }, [displayCount, filteredMovies.length]);

  const { sentinelRef } = useInfiniteScroll(loadMore, { threshold: 0.5 });

  // Personalized recommendations based on watchlist and ratings
  const recommendedMovies = useMemo(() => {
    return getPersonalizedRecommendations(movies, watchlist, ratings, { limit: 12 });
  }, [watchlist, ratings]);

  // Trending movies
  const trendingMovies = useMemo(() => {
    return getTrendingMovies(movies, 10);
  }, []);

  // Get movies from watchlist
  const watchlistMovies = useMemo(() => {
    return movies.filter(m => watchlist.includes(m.id));
  }, [watchlist]);

  // Get watched movies
  const watchedMovies = useMemo(() => {
    return movies.filter(m => watched.includes(m.id));
  }, [watched]);

  // Get recently viewed movies
  const recentlyViewedMovies = useMemo(() => {
    return recentlyViewed
      .map(id => movies.find(m => m.id === id))
      .filter((m): m is Movie => m !== undefined)
      .slice(0, 12);
  }, [recentlyViewed]);

  const hasActiveSearch = debouncedSearch.length > 0;
  const hasActiveFilters = filters.genres.length > 0 || 
    filters.yearRange[0] !== 1980 || 
    filters.yearRange[1] !== new Date().getFullYear() ||
    filters.ratingRange[0] !== 0 || 
    filters.ratingRange[1] !== 10;

  return (
    <div className="min-h-screen bg-black font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-black/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Film className="h-8 w-8 text-red-600" />
              <span className="text-white font-elegant text-xl font-semibold tracking-wide">CineMatch</span>
            </div>

            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <Input
                type="text"
                placeholder="Search by title, cast, director..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <RandomMovieButton 
                allMovies={movies} 
                onMovieSelected={setSelectedMovie} 
              />
              <Button
                variant={sortBy === 'rating' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSortBy('rating')}
              >
                Top Rated
              </Button>
              <Button
                variant={sortBy === 'year' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSortBy('year')}
              >
                Newest
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="discover" className="space-y-8">
          <TabsList className="bg-zinc-900">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="watchlist" className="gap-2">
              <Bookmark className="h-4 w-4" />
              Watchlist ({watchlist.length})
            </TabsTrigger>
            <TabsTrigger value="watched" className="gap-2">
              <Eye className="h-4 w-4" />
              Watched ({watched.length})
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-12">
            {/* Featured Section */}
            {!hasActiveSearch && !hasActiveFilters && (
              <section>
                <FeaturedMovie movie={featuredMovie} onMovieClick={setSelectedMovie} />
              </section>
            )}

            {/* Trending Section */}
            {!hasActiveSearch && !hasActiveFilters && (
              <section>
                <div className="mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-red-600" />
                  <h2 className="text-white font-elegant text-xl font-semibold">Trending Now</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {trendingMovies.slice(0, 6).map((movie) => (
                    <MovieCard key={movie.id} movie={movie} onMovieClick={setSelectedMovie} />
                  ))}
                </div>
              </section>
            )}

            {/* Recommended Section */}
            {!hasActiveSearch && !hasActiveFilters && recommendedMovies.length > 0 && (
              <section>
                <h2 className="mb-4 text-white font-elegant text-xl font-semibold">Recommended for You</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {recommendedMovies.slice(0, 6).map((movie) => (
                    <MovieCard key={movie.id} movie={movie} onMovieClick={setSelectedMovie} />
                  ))}
                </div>
              </section>
            )}

            {/* Advanced Filters */}
            <section>
              <AdvancedFilters
                filters={filters}
                onFiltersChange={setFilters}
                availableGenres={genres}
              />
            </section>

            {/* All Movies Grid */}
            <section>
              {displayedMovies.length > 0 ? (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-zinc-400">
                      Showing {displayedMovies.length} of {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {displayedMovies.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} onMovieClick={setSelectedMovie} />
                    ))}
                  </div>
                  
                  {/* Infinite scroll sentinel */}
                  {displayCount < filteredMovies.length && (
                    <div ref={sentinelRef} className="mt-8">
                      {isLoading && <MovieGridSkeleton count={6} />}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Film className="mb-4 h-16 w-16 text-zinc-700" />
                  <h3 className="mb-2 text-white">No movies found</h3>
                  <p className="text-zinc-400">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </section>
          </TabsContent>

          {/* Watchlist Tab */}
          <TabsContent value="watchlist" className="space-y-4">
            <h2 className="text-white font-elegant text-xl font-semibold">My Watchlist</h2>
            {watchlistMovies.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {watchlistMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} onMovieClick={setSelectedMovie} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Bookmark className="mb-4 h-16 w-16 text-zinc-700" />
                <h3 className="mb-2 text-white">Your watchlist is empty</h3>
                <p className="text-zinc-400">
                  Add movies to your watchlist to watch them later
                </p>
              </div>
            )}
          </TabsContent>

          {/* Watched Tab */}
          <TabsContent value="watched" className="space-y-4">
            <h2 className="text-white font-elegant text-xl font-semibold">Watched Movies</h2>
            {watchedMovies.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {watchedMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} onMovieClick={setSelectedMovie} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Eye className="mb-4 h-16 w-16 text-zinc-700" />
                <h3 className="mb-2 text-white">No watched movies yet</h3>
                <p className="text-zinc-400">
                  Mark movies as watched to keep track of what you've seen
                </p>
              </div>
            )}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4">
            <h2 className="text-white font-elegant text-xl font-semibold">Recently Viewed</h2>
            {recentlyViewedMovies.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {recentlyViewedMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} onMovieClick={setSelectedMovie} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <History className="mb-4 h-16 w-16 text-zinc-700" />
                <h3 className="mb-2 text-white">No viewing history</h3>
                <p className="text-zinc-400">
                  Your recently viewed movies will appear here
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          allMovies={movies}
          onClose={() => setSelectedMovie(null)}
          onMovieClick={setSelectedMovie}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <UserPreferencesProvider>
      <AppContent />
    </UserPreferencesProvider>
  );
}
