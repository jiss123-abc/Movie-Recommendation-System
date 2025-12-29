import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserRating {
  movieId: number;
  rating: number; // 1-5 stars
}

interface UserPreferences {
  watchlist: number[];
  watched: number[];
  ratings: UserRating[];
  recentlyViewed: number[];
}

interface UserPreferencesContextType {
  watchlist: number[];
  watched: number[];
  ratings: UserRating[];
  recentlyViewed: number[];
  addToWatchlist: (movieId: number) => void;
  removeFromWatchlist: (movieId: number) => void;
  toggleWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
  markAsWatched: (movieId: number) => void;
  markAsUnwatched: (movieId: number) => void;
  toggleWatched: (movieId: number) => void;
  isWatched: (movieId: number) => boolean;
  rateMovie: (movieId: number, rating: number) => void;
  getMovieRating: (movieId: number) => number | undefined;
  addToRecentlyViewed: (movieId: number) => void;
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

const STORAGE_KEY = 'movie-app-preferences';
const MAX_RECENTLY_VIEWED = 20;

export function UserPreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return { watchlist: [], watched: [], ratings: [], recentlyViewed: [] };
      }
    }
    return { watchlist: [], watched: [], ratings: [], recentlyViewed: [] };
  });

  // Save to localStorage whenever preferences change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  const addToWatchlist = (movieId: number) => {
    setPreferences((prev) => ({
      ...prev,
      watchlist: [...new Set([...prev.watchlist, movieId])],
    }));
  };

  const removeFromWatchlist = (movieId: number) => {
    setPreferences((prev) => ({
      ...prev,
      watchlist: prev.watchlist.filter((id) => id !== movieId),
    }));
  };

  const toggleWatchlist = (movieId: number) => {
    if (preferences.watchlist.includes(movieId)) {
      removeFromWatchlist(movieId);
    } else {
      addToWatchlist(movieId);
    }
  };

  const isInWatchlist = (movieId: number) => {
    return preferences.watchlist.includes(movieId);
  };

  const markAsWatched = (movieId: number) => {
    setPreferences((prev) => ({
      ...prev,
      watched: [...new Set([...prev.watched, movieId])],
    }));
  };

  const markAsUnwatched = (movieId: number) => {
    setPreferences((prev) => ({
      ...prev,
      watched: prev.watched.filter((id) => id !== movieId),
    }));
  };

  const toggleWatched = (movieId: number) => {
    if (preferences.watched.includes(movieId)) {
      markAsUnwatched(movieId);
    } else {
      markAsWatched(movieId);
    }
  };

  const isWatched = (movieId: number) => {
    return preferences.watched.includes(movieId);
  };

  const rateMovie = (movieId: number, rating: number) => {
    setPreferences((prev) => {
      const existingIndex = prev.ratings.findIndex((r) => r.movieId === movieId);
      const newRatings = [...prev.ratings];
      
      if (existingIndex >= 0) {
        newRatings[existingIndex] = { movieId, rating };
      } else {
        newRatings.push({ movieId, rating });
      }
      
      return { ...prev, ratings: newRatings };
    });
  };

  const getMovieRating = (movieId: number) => {
    return preferences.ratings.find((r) => r.movieId === movieId)?.rating;
  };

  const addToRecentlyViewed = (movieId: number) => {
    setPreferences((prev) => {
      const filtered = prev.recentlyViewed.filter((id) => id !== movieId);
      const updated = [movieId, ...filtered].slice(0, MAX_RECENTLY_VIEWED);
      return { ...prev, recentlyViewed: updated };
    });
  };

  return (
    <UserPreferencesContext.Provider
      value={{
        watchlist: preferences.watchlist,
        watched: preferences.watched,
        ratings: preferences.ratings,
        recentlyViewed: preferences.recentlyViewed,
        addToWatchlist,
        removeFromWatchlist,
        toggleWatchlist,
        isInWatchlist,
        markAsWatched,
        markAsUnwatched,
        toggleWatched,
        isWatched,
        rateMovie,
        getMovieRating,
        addToRecentlyViewed,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
}

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error('useUserPreferences must be used within UserPreferencesProvider');
  }
  return context;
}
