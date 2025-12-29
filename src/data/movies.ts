export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genres: string[];
  poster: string;
  backdrop?: string;
  director: string;
  cast: string[];
  runtime: number;
  plot: string;
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    genres: ["Drama"],
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop",
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    runtime: 142,
    plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    rating: 9.2,
    genres: ["Crime", "Drama"],
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    runtime: 175,
    plot: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    genres: ["Action", "Crime", "Drama"],
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1920&h=1080&fit=crop",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    runtime: 152,
    plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    rating: 8.9,
    genres: ["Crime", "Drama"],
    poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop",
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    runtime: 154,
    plot: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
  },
  {
    id: 5,
    title: "Schindler's List",
    year: 1993,
    rating: 9.0,
    genres: ["Biography", "Drama", "History"],
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    director: "Steven Spielberg",
    cast: ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley"],
    runtime: 195,
    plot: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
  },
  {
    id: 6,
    title: "Fight Club",
    year: 1999,
    rating: 8.8,
    genres: ["Drama"],
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    director: "David Fincher",
    cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
    runtime: 139,
    plot: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
  },
  {
    id: 7,
    title: "Inception",
    year: 2010,
    rating: 8.8,
    genres: ["Action", "Adventure", "Sci-Fi"],
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    runtime: 148,
    plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  },
  {
    id: 8,
    title: "Parasite",
    year: 2019,
    rating: 8.5,
    genres: ["Comedy", "Drama", "Thriller"],
    poster: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&h=600&fit=crop",
    director: "Bong Joon Ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    runtime: 132,
    plot: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
  },
];

export const featuredMovie: Movie = {
  id: 0,
  title: "Oppenheimer",
  year: 2023,
  rating: 8.9,
  genres: ["Biography", "Drama", "History"],
  poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
  backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop",
  director: "Christopher Nolan",
  cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
  runtime: 180,
  plot: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb. A riveting exploration of the moral complexities faced during one of history's most pivotal moments.",
};
